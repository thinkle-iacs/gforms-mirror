import { getFormData } from "./getFormData";

import type { Form, Translations } from "./types";

const TRANSLATION_SHEET_NAME = "Translations";

function getTranslationsSpreadsheet(formId, initialLanguages = ["es", "pt"]) {
  let driveFile = DriveApp.getFileById(formId);
  let name = driveFile.getName();
  let parent = driveFile.getParents().next();
  let fileIterator = parent.getFilesByName(`${name}+Translations`);
  let translationSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  if (fileIterator.hasNext()) {
    console.log("Using existing translation sheet");
    let translationFile = fileIterator.next();
    let id = translationFile.getId();
    translationSheet = SpreadsheetApp.openById(id);
  } else {
    console.log("Creating new translation sheet");
    translationSheet = SpreadsheetApp.create(`${name}+Translations`);
    translationSheet.insertSheet(0, TRANSLATION_SHEET_NAME);
    let sheet = translationSheet.getSheetByName(TRANSLATION_SHEET_NAME);
    let header = ["Original", ...initialLanguages];
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    let translationFile = DriveApp.getFileById(translationSheet.getId());
    translationFile.moveTo(parent);
  }
  return translationSheet;
}

/**
 * Sets up a translations spreadsheet for a given form.
 *
 * This function retrieves the translations spreadsheet and form data for the specified form ID.
 * It then updates the translations sheet with the current translation strings from the form,
 * preserving any existing translations that are no longer on the form.
 *
 * @param {string} formId - The ID of the form for which to set up the translations spreadsheet.
 * @param {string[]} [initialLanguages=['es','pt']] - The initial languages to set up in the translations sheet.
 * @returns {string} The URL of the translations spreadsheet.
 */
export function setupTranslationsSpreadsheet(
  formId,
  initialLanguages = ["es", "pt"]
): string {
  let ss = getTranslationsSpreadsheet(formId, initialLanguages);
  let form = getFormData(formId);
  let sheet = ss.getSheetByName(TRANSLATION_SHEET_NAME);
  let existingStrings = sheet
    .getRange(2, 1, sheet.getLastRow() - 1)
    .getValues()
    .map((r) => r[0]);
  let existingData = getTranslationsFromSheet(ss);
  sheet.clear();
  let languages = Object.keys(existingData);
  let header = ["Original", ...languages];
  let data = [header];
  let items = getTranslationStringsFromForm(form);
  // Conserve any existing translations not on the current form, just in case...
  let extraItems = existingStrings.filter((s) => !items.includes(s));
  if (extraItems.length) {
    items.push(
      "Legacy Translations (No longer on form - delete when not needed)"
    );
    items.push(...extraItems);
  }

  for (let item of items) {
    data.push([
      item,
      ...languages.map((lang) => existingData[lang][item] || ""),
    ]);
  }
  // Insert the data into the sheet
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  return ss.getUrl();
}

function getTranslationsFromSheet(
  translationSheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): Translations {
  let translations: Translations = {};
  let sheet = translationSheet.getSheetByName(TRANSLATION_SHEET_NAME);
  let data = sheet.getDataRange().getValues();
  let headerRow = data[0];
  // Loop through each row and populate the translations object
  for (let col = 1; col < headerRow.length; col++) {
    let lang = headerRow[col];
    translations[lang] = {};
  }
  for (let row = 1; row < data.length; row++) {
    let rowData = data[row];
    let translationString = rowData[0];
    for (let col = 0; col < headerRow.length; col++) {
      let lang = headerRow[col];
      if (lang) {
        translations[lang][translationString] = rowData[col];
      }
    }
  }
  return translations;
}

export function getTranslations(formId) {
  let translationSheet = getTranslationsSpreadsheet(formId);
  return getTranslationsFromSheet(translationSheet);
}

export function getTranslationStringsFromForm(form: Form) {
  let strings = [];
  if (form.title && strings.indexOf(form.title) === -1) {
    strings.push(form.title);
  }
  if (form.description && strings.indexOf(form.description) === -1) {
    strings.push(form.description);
  }
  if (
    form.confirmationMessage &&
    strings.indexOf(form.confirmationMessage) === -1
  ) {
    strings.push(form.confirmationMessage);
  }
  for (let item of form.items) {
    if (item.title && strings.indexOf(item.title) === -1) {
      strings.push(item.title);
    }
    if (item.description && strings.indexOf(item.description) === -1) {
      strings.push(item.description);
    }
    if (item.choices) {
      for (let choice of item.choices) {
        if (strings.indexOf(choice) === -1) {
          strings.push(choice);
        }
      }
    }
  }
  return strings;
}
