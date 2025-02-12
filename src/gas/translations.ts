import { getFormIdFromUrl } from "./cachedFormData";
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
    let translationFile = fileIterator.next();
    let id = translationFile.getId();

    translationSheet = SpreadsheetApp.openById(id);
    console.log("Using existing translation sheet", translationSheet.getUrl());
  } else {
    console.log("Creating new translation sheet");
    translationSheet = SpreadsheetApp.create(`${name}+Translations`);
    translationSheet.insertSheet(TRANSLATION_SHEET_NAME, 0);
    let sheet = translationSheet.getSheetByName(TRANSLATION_SHEET_NAME);
    let header = ["Original", ...initialLanguages];
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    let translationFile = DriveApp.getFileById(translationSheet.getId());
    translationFile.moveTo(parent);
    console.log("Created", translationFile.getUrl());
  }
  return translationSheet;
}

export function getTranslationsSpreadsheetUrl(
  formId,
  initialLanguages = ["es", "pt"]
) {
  return getTranslationsSpreadsheet(formId, initialLanguages).getUrl();
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
  try {
    var existingStrings = sheet
      .getRange(2, 1, sheet.getLastRow() - 1)
      .getValues()
      .map((r) => r[0]);
  } catch (e) {
    console.log("No existing translations found.");
    existingStrings = [];
  }
  let existingData = getTranslationsFromSheet(ss);
  sheet.clear();
  let languages = Object.keys(existingData);
  // Add any new languages
  for (let lang of languages) {
    if (!existingData[lang]) {
      existingData[lang] = {};
    }
  }
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
  console.log("Getting translations from sheet", translationSheet.getUrl());
  let translations: Translations = {};
  let sheet = translationSheet.getSheetByName(TRANSLATION_SHEET_NAME);
  let data = sheet.getDataRange().getValues();
  let headerRow = data[0];
  // Loop through each row and populate the translations object
  for (let col = 1; col < headerRow.length; col++) {
    let lang = headerRow[col];
    translations[lang] = {};
  }
  console.log("Got header row:", headerRow);
  for (let row = 1; row < data.length; row++) {
    let rowData = data[row];
    let translationString = rowData[0];
    for (let col = 1; col < headerRow.length; col++) {
      let lang = headerRow[col];
      if (lang) {
        if (!translations[lang]) {
          translations[lang] = {}; // shouldn't be necessary
        }
        translations[lang][translationString] = rowData[col];
      }
    }
  }
  console.log("Returning translations", translations);
  return translations;
}

export function getTranslations(formId) {
  console.log("Getting translations for form", formId);
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

function test() {
  let url =
    "https://docs.google.com/forms/d/1xh9cSzZvDqV9cm0n5ph4L4KwFx00ZQPkY8O3X6-nNLY/edit";
  let id = getFormIdFromUrl(url);
  setupTranslationsSpreadsheet(id, ["es", "pt", "kh"]);
}
