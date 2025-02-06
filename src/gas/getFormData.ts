import { Form, StandardFormItem, FormType } from "./types";

export type Navigation =
  | { type: "page"; id: string }
  | { type: "submit" }
  | null; // If navigation isn't set

export function getFormData(formId: string, formUrl: string): Form {
  let form: GoogleAppsScript.Forms.Form;
  if (formId) {
    form = FormApp.openById(formId);
  } else {
    form = FormApp.openByUrl(formUrl);
  }

  if (!form) {
    throw new Error("Form not found");
  }

  let formObject: Form = {
    id: form.getId(),
    title: form.getTitle(),
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl(),
    items: [],
  };

  for (let item of form.getItems()) {
    let formItem: StandardFormItem;
    let itemType = item.getType();
    let baseItem = {
      id: item.getId().toString(),
      title: item.getTitle(),
      description: item.getHelpText(),
      type: mapGoogleFormType(itemType),
    };

    switch (itemType) {
      case FormApp.ItemType.TEXT:
        formItem = {
          ...baseItem,
          required: item.asTextItem().isRequired(),
        };
        break;

      case FormApp.ItemType.PARAGRAPH_TEXT:
        formItem = {
          ...baseItem,
          required: item.asParagraphTextItem().isRequired(),
        };
        break;

      case FormApp.ItemType.MULTIPLE_CHOICE:
        let multipleChoiceItem = item.asMultipleChoiceItem();
        formItem = {
          ...baseItem,
          required: multipleChoiceItem.isRequired(),
          choices: multipleChoiceItem
            .getChoices()
            .map((choice) => choice.getValue()),
          navigation: multipleChoiceItem.getChoices().map((choice) => {
            let navType = choice.getPageNavigationType();
            return parseNavigation(navType, choice);
          }),
        };
        break;

      case FormApp.ItemType.CHECKBOX:
        formItem = {
          ...baseItem,
          required: item.asCheckboxItem().isRequired(),
          choices: item
            .asCheckboxItem()
            .getChoices()
            .map((choice) => choice.getValue()),
        };
        break;

      case FormApp.ItemType.LIST:
        formItem = {
          ...baseItem,
          required: item.asListItem().isRequired(),
          choices: item
            .asListItem()
            .getChoices()
            .map((choice) => choice.getValue()),
        };
        break;

      case FormApp.ItemType.SCALE:
        let scaleItem = item.asScaleItem();
        formItem = {
          ...baseItem,
          required: scaleItem.isRequired(),
          type: "scale",
          min: scaleItem.getLowerBound(),
          max: scaleItem.getUpperBound(),
          labels:
            scaleItem.getLeftLabel() && scaleItem.getRightLabel()
              ? [scaleItem.getLeftLabel(), scaleItem.getRightLabel()]
              : undefined,
        };
        break;

      case FormApp.ItemType.GRID:
        let gridItem = item.asGridItem();
        formItem = {
          ...baseItem,
          required: gridItem.isRequired(),
          type: "grid",
          rows: gridItem.getRows(),
          columns: gridItem.getColumns(),
        };
        break;

      case FormApp.ItemType.CHECKBOX_GRID:
        let checkboxGridItem = item.asCheckboxGridItem();
        formItem = {
          ...baseItem,
          required: checkboxGridItem.isRequired(),
          type: "checkboxGrid",
          rows: checkboxGridItem.getRows(),
          columns: checkboxGridItem.getColumns(),
        };
        break;

      case FormApp.ItemType.FILE_UPLOAD:
        let fileUploadItem = item.asFileUploadItem();
        formItem = {
          ...baseItem,
          required: fileUploadItem.isRequired(),
          type: "fileUpload",
          maxSizeMb: fileUploadItem.getMaxFileSize(),
          allowedTypes: fileUploadItem.getAllowedFileTypes(),
        };
        break;

      case FormApp.ItemType.DATE:
        formItem = {
          ...baseItem,
          required: item.asDateItem().isRequired(),
          type: "date",
        };
        break;

      case FormApp.ItemType.TIME:
        formItem = {
          ...baseItem,
          required: item.asTimeItem().isRequired(),
          type: "time",
        };
        break;

      case FormApp.ItemType.DURATION:
        formItem = {
          ...baseItem,
          required: item.asDurationItem().isRequired(),
          type: "duration",
        };
        break;

      case FormApp.ItemType.RATING:
        formItem = {
          ...baseItem,
          required: item.asRatingItem().isRequired(),
          type: "rating",
          max: item.asRatingItem().getRatingScaleLevel(),
          icon: item.asRatingItem().getRatingIcon(),
        };
        break;

      case FormApp.ItemType.PAGE_BREAK:
        let pageBreakItem = item.asPageBreakItem();
        formItem = {
          ...baseItem,
          type: "pageBreak",
          navigation: parseNavigation(pageBreakItem.getGoToPage(), null), // Handles next-page logic
        };
        break;

      // ❌ These items do NOT support "isRequired" or navigation.
      case FormApp.ItemType.SECTION_HEADER:
      case FormApp.ItemType.IMAGE:
      case FormApp.ItemType.VIDEO:
        formItem = baseItem;
        break;

      default:
        Logger.log(`Unsupported form item type: ${itemType}`);
        continue;
    }

    formObject.items.push(formItem);
  }

  return formObject;
}

/**
 * Maps Google Form item types to the corresponding FormType values.
 */
function mapGoogleFormType(
  itemType: GoogleAppsScript.Forms.ItemType
): FormType {
  const typeMap: Record<GoogleAppsScript.Forms.ItemType, FormType> = {
    [FormApp.ItemType.TEXT]: "text",
    [FormApp.ItemType.PARAGRAPH_TEXT]: "paragraph",
    [FormApp.ItemType.MULTIPLE_CHOICE]: "multipleChoice",
    [FormApp.ItemType.CHECKBOX]: "checkbox",
    [FormApp.ItemType.LIST]: "list",
    [FormApp.ItemType.SCALE]: "scale",
    [FormApp.ItemType.GRID]: "grid",
    [FormApp.ItemType.CHECKBOX_GRID]: "checkboxGrid",
    [FormApp.ItemType.DATE]: "date",
    [FormApp.ItemType.TIME]: "time",
    [FormApp.ItemType.DURATION]: "duration",
    [FormApp.ItemType.FILE_UPLOAD]: "fileUpload",
    [FormApp.ItemType.IMAGE]: "image",
    [FormApp.ItemType.VIDEO]: "video",
    [FormApp.ItemType.SECTION_HEADER]: "sectionHeader",
    [FormApp.ItemType.PAGE_BREAK]: "pageBreak",
    [FormApp.ItemType.RATING]: "rating",
  };
  return typeMap[itemType] || "text"; // Default to "text" for unknown types
}

/**
 * Parses Google Forms navigation into structured objects.
 */
function parseNavigation(
  navType: GoogleAppsScript.Forms.PageNavigationType,
  choice: GoogleAppsScript.Forms.Choice | null
): Navigation {
  if (!navType) return null;

  if (navType === FormApp.PageNavigationType.SUBMIT) {
    return { type: "submit" };
  }

  if (navType === FormApp.PageNavigationType.GO_TO_PAGE) {
    return choice?.getGotoPage()?.getId()
      ? { type: "page", id: choice.getGotoPage().getId().toString() }
      : null;
  }

  return null;
}
