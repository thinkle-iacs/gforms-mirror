const IDX = "index.html"; // file name for svelte output
const APPNAME = `My App`;

import { getAddOnEnvironment } from "./addOn";
import { getFormData } from "./getFormData";

export function doGet(e) {
  // Depending on parameters, we either return the form
  // in a JSON format...
  if (
    (e.parameters.formId || e.parameters.formUrl) &&
    e.parameters.getFormData
  ) {
    return getFormData(e.parameters.formId, e.parameters.formUrl);
  } else {
    // Or we return a web-based UI for e.g. generating code that
    // uses our API...
    return serveFormBuilderUi();
  }
}

export function doPost(e) {
  // We act as a "mirror" for posting form data to forms
  // using the GoogleAppsScript APIs...
}

export function serveFormBuilderUi() {
  return HtmlService.createHtmlOutputFromFile(IDX);
}
