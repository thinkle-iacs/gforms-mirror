const IDX = "index.html"; // file name for svelte output
const APPNAME = `My App`;

import { getAddOnEnvironment } from "./addOn";
import { getCachedFormData } from "./cachedFormData";
import { processFormSubmission } from "./processFormSubmission";

export function doGet(e) {
  // Depending on parameters, we either return the form
  // in a JSON format...
  if (
    (e.parameters.formId || e.parameters.formUrl) &&
    e.parameters.getFormData
  ) {
    let formId = e.parameters.formId;
    let formUrl = e.parameters.formUrl;
    if (Array.isArray(formId)) {
      formId = formId[0];
    }
    if (Array.isArray(formUrl)) {
      formUrl = formUrl[0];
    }
    let data = getCachedFormData(formId, formUrl);
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
      ContentService.MimeType.JSON
    );
  } else {
    // Or we return a web-based UI for e.g. generating code that
    // uses our API...
    return serveFormBuilderUi();
  }
}

export function doPost(
  e: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
  let formResponse: FormResponse;

  try {
    formResponse = JSON.parse(e.postData.contents);
  } catch (error) {
    console.error("Invalid JSON in request body:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Invalid JSON payload" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const result = processFormSubmission(formResponse);

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}

export function serveFormBuilderUi() {
  return HtmlService.createHtmlOutputFromFile(IDX);
}
