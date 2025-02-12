/* Export all functions you'll want to call with 
google.script.run here -- this will allow our type
definition magic to work, so in your svelte side code
you get clean autocomplete for google.script.run */

export { getFormIdFromUrl } from "./cachedFormData";

export { getCachedFormData } from "./cachedFormData";

export function getActiveUserEmail() {
  const user = Session.getActiveUser();
  return user.getEmail();
}

export function getAppsScriptUrl() {
  return ScriptApp.getService().getUrl();
}

export {
  getTranslationsSpreadsheetUrl,
  setupTranslationsSpreadsheet,
  getTranslations,
} from "./translations";

export { getFormData } from "./getFormData";
