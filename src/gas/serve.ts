const IDX = "index.html"; // file name for svelte output
const APPNAME = `My App`;

import { getAddOnEnvironment } from "./addOn";
import { getCachedFormData, getFormIdFromUrl } from "./cachedFormData";
import { processFormSubmission } from "./processFormSubmission";
import { getTranslations, setupTranslationsSpreadsheet } from "./translations";

/**
 * Handles HTTP GET requests.
 *
 * @param {GoogleAppsScript.Events.DoGet} e - The event parameter containing request information.
 * @returns {GoogleAppsScript.Content.TextOutput} The response to be returned to the client.
 *
 * If the request contains a `uuid` parameter, it returns the response from `returnPostResponse`.
 * If the request contains `formId` or `formUrl` parameters, it returns either the form data or translations based on the presence of the `translations` parameter.
 * If none of the above conditions are met, it serves the form builder UI.
 */
export function doGet(e) {
  if (e.parameter.uuid) {
    return returnPostResponse(e.parameter.uuid);
  }

  // Otherwise, handle normal form data request
  if (e.parameters.formId || e.parameters.formUrl) {
    if (e.parameters.translations) {
      try {
        return doGetTranslations(e);
      } catch (error) {
        console.error("Error in doGetTranslations:", error);
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: error.message })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      return doGetFormData(e);
    }
  } else {
    return serveFormBuilderUi();
  }
}

function doGetFormData(e) {
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
}

/**
 * Handles the GET request to fetch or create translations for a Google Form.
 *
 * @param {GoogleAppsScript.Events.DoGet} e - The event parameter containing request parameters.
 * @param {Object} e.parameters - The parameters from the GET request.
 * @param {string | string[]} e.parameters.languages - A comma-separated list of languages.
 * @param {boolean | boolean[]} e.parameters.create - A boolean indicating whether to create a new translations spreadsheet.
 * @param {string | string[]} e.parameters.formId - The ID of the Google Form.
 * @param {string | string[]} e.parameters.formUrl - The URL of the Google Form.
 * @returns {GoogleAppsScript.Content.TextOutput} - The JSON response containing the result of the operation.
 */
function doGetTranslations(e) {
  let languages = e.parameters.language; // comma-separated list of languages
  let create = e.parameters.create; // boolean
  let formId = e.parameters.formId;
  let formUrl = e.parameters.formUrl;
  if (Array.isArray(formId)) {
    formId = formId[0];
  }
  if (Array.isArray(formUrl)) {
    formUrl = formUrl[0];
  }
  formId = formId || getFormIdFromUrl(formUrl!);
  let result: any;
  if (create) {
    result = setupTranslationsSpreadsheet(formId, languages);
  } else {
    result = getTranslations(formId);
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}

export function doPost(e) {
  let formResponse;
  try {
    formResponse = JSON.parse(e.postData.contents);
  } catch (error) {
    console.error("Invalid JSON in request body:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Invalid JSON payload" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  /* NOTE: I could not find any way to get Google Apps Script to work with CORS,
   * So, I had to use the following workaround:
   * -> (1) Every post request must include a UUID in the request body
   * -> (2) The UUID is used to store the response temporarily in script properties
   * -> (3) The next time we get a GET request with that UUID, we return the response
   * -> (4) We delete the UUID from script properties after returning the response
   *
   * This is a bit nuts, but it's working, so we'll take it for now.
   * If we find a way to make CORS work in the future, we can remove this workaround.
   * Oddly, there are forums online that seem to imply that CORS should work with Google Apps Script,
   * but they use non-existent methods (like addHeader on ContentService) to do so.
   *  */
  const uuid = formResponse.uuid;
  if (!uuid) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Missing UUID" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  console.log("Processing form submission with UUID:", uuid);
  const result = processFormSubmission(formResponse);

  // Store the response temporarily in script properties
  PropertiesService.getScriptProperties().setProperty(
    uuid,
    JSON.stringify(result)
  );

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, uuid })
  ).setMimeType(ContentService.MimeType.JSON);
}

function returnPostResponse(uuid: string) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const responseData = scriptProperties.getProperty(uuid);

  if (responseData) {
    scriptProperties.deleteProperty(uuid); // Clean up
    return ContentService.createTextOutput(responseData).setMimeType(
      ContentService.MimeType.JSON
    );
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "UUID not found or expired" })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

export function serveFormBuilderUi() {
  return HtmlService.createHtmlOutputFromFile(IDX);
}
