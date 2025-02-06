import type { FormResponse, FormSubmissionResult } from "./types";
import { decodeRowAndId, hasRowIdentifier } from "../util";

export function processFormSubmission(
  formResponse: FormResponse
): FormSubmissionResult {
  const result: FormSubmissionResult = {
    success: true,
    unrecognizedItems: [],
    errors: [],
  };

  try {
    console.log("Processing form submission:", JSON.stringify(formResponse));

    const form = FormApp.openById(formResponse.id);
    if (!form) {
      throw new Error("Form not found.");
    }

    const response = form.createResponse();

    const gridResponses: Record<string, Record<string, string>> = {};
    const checkboxGridResponses: Record<string, Record<string, string[]>> = {};

    for (const [key, value] of Object.entries(formResponse.items)) {
      let row, id;
      if (hasRowIdentifier(key)) {
        [id, row] = decodeRowAndId(key);
      } else {
        id = key;
      }

      const item = form.getItems().find((i) => i.getId().toString() === id);
      if (!item) {
        console.warn(`Skipping unrecognized item ID: ${id}`);
        result.unrecognizedItems.push(id);
        continue;
      }

      try {
        const itemType = item.getType();

        if (itemType === FormApp.ItemType.GRID) {
          processGridItem(gridResponses, id, row, value);
        } else if (itemType === FormApp.ItemType.CHECKBOX_GRID) {
          processCheckboxGridItem(checkboxGridResponses, id, row, value);
        } else {
          processStandardItem(response, item, itemType, value, result);
        }
      } catch (error) {
        console.error(`Error processing item ${id}:`, error);
        result.errors.push({
          itemId: id,
          message: `Processing error: ${error.message}`,
        });
      }
    }

    // 🟢 Process collected grid responses
    finalizeGridResponses(response, form, gridResponses);
    finalizeCheckboxGridResponses(response, form, checkboxGridResponses);

    if (result.errors.length === 0) {
      response.submit();
    } else {
      result.success = false;
    }
  } catch (error) {
    console.error("Critical error submitting form response:", error);
    result.success = false;
    result.errors.push({
      itemId: "GENERAL",
      message: `Critical error: ${error.message}`,
    });
  }

  return result;
}

/**
 * Processes standard form items (text, multiple choice, scale, etc.)
 */
function processStandardItem(
  response: GoogleAppsScript.Forms.FormResponse,
  item: GoogleAppsScript.Forms.Item,
  itemType: GoogleAppsScript.Forms.ItemType,
  value: any,
  result: FormSubmissionResult
) {
  try {
    const responseItem = getResponseItem(item, itemType, value);
    if (responseItem) {
      response.withItemResponse(responseItem);
    } else {
      result.errors.push({
        itemId: item.getId().toString(),
        message: `Could not process response for item type: ${itemType}`,
      });
    }
  } catch (error) {
    console.error(`Error processing standard item:`, error);
  }
}

/**
 * Handles responses for GRID items by collecting them into a structured map.
 */
function processGridItem(
  gridResponses: Record<string, Record<string, string>>,
  id: string,
  row: string,
  value: string
) {
  if (!gridResponses[id]) {
    gridResponses[id] = {};
  }
  gridResponses[id][row] = value;
}

/**
 * Handles responses for CHECKBOX GRID items by collecting them into a structured map.
 */
function processCheckboxGridItem(
  checkboxGridResponses: Record<string, Record<string, string[]>>,
  id: string,
  row: string,
  value: string
) {
  if (!checkboxGridResponses[id]) {
    checkboxGridResponses[id] = {};
  }
  if (!checkboxGridResponses[id][row]) {
    checkboxGridResponses[id][row] = [];
  }
  checkboxGridResponses[id][row].push(value);
}

/**
 * Converts collected grid responses into the ordered format required by Forms API.
 */
function finalizeGridResponses(
  response: GoogleAppsScript.Forms.FormResponse,
  form: GoogleAppsScript.Forms.Form,
  gridResponses: Record<string, Record<string, string>>
) {
  for (const [id, rowData] of Object.entries(gridResponses)) {
    const item = form.getItems().find((i) => i.getId().toString() === id);
    if (item) {
      const rowOrder = item.asGridItem().getRows();
      const rowArray = rowOrder.map((row) => rowData[row] || null);
      response.withItemResponse(item.asGridItem().createResponse(rowArray));
    }
  }
}

/**
 * Converts collected checkbox grid responses into the ordered 2D format required by Forms API.
 */
function finalizeCheckboxGridResponses(
  response: GoogleAppsScript.Forms.FormResponse,
  form: GoogleAppsScript.Forms.Form,
  checkboxGridResponses: Record<string, Record<string, string[]>>
) {
  for (const [id, rowData] of Object.entries(checkboxGridResponses)) {
    const item = form.getItems().find((i) => i.getId().toString() === id);
    if (item) {
      const rowOrder = item.asCheckboxGridItem().getRows();
      const rowArray = rowOrder.map((row) => rowData[row] || []);
      response.withItemResponse(
        item.asCheckboxGridItem().createResponse(rowArray)
      );
    }
  }
}

/**
 * Creates response objects for non-grid form items.
 */
function getResponseItem(
  item: GoogleAppsScript.Forms.Item,
  itemType: GoogleAppsScript.Forms.ItemType,
  value: any
): GoogleAppsScript.Forms.ItemResponse | null {
  try {
    switch (itemType) {
      case FormApp.ItemType.TEXT:
        return item.asTextItem().createResponse(value);

      case FormApp.ItemType.PARAGRAPH_TEXT:
        return item.asParagraphTextItem().createResponse(value);

      case FormApp.ItemType.MULTIPLE_CHOICE:
        return item.asMultipleChoiceItem().createResponse(value);

      case FormApp.ItemType.CHECKBOX:
        return item
          .asCheckboxItem()
          .createResponse(Array.isArray(value) ? value : [value]);

      case FormApp.ItemType.LIST:
        return item.asListItem().createResponse(value);

      case FormApp.ItemType.SCALE:
        return item.asScaleItem().createResponse(Number(value));

      case FormApp.ItemType.DATE:
        return item.asDateItem().createResponse(value);

      case FormApp.ItemType.TIME:
        return item.asTimeItem().createResponse(value);

      case FormApp.ItemType.DURATION:
        return item.asDurationItem().createResponse(Number(value));

      case FormApp.ItemType.RATING:
        return item.asRatingItem().createResponse(Number(value));

      default:
        console.warn(`Unsupported form item type: ${itemType}`);
        return null;
    }
  } catch (error) {
    console.error(`Error handling form item: ${error.message}`);
    return null;
  }
}
