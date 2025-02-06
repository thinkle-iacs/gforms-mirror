import { getFormData } from "./getFormData";

const CACHE_DURATION = 3600; // 1 hour cache
const PROPERTY_EXPIRATION = 86400; // 24 hours for long-term storage
const TRIGGER_KEY = "update-trigger-set";
const FORM_LIST_KEY = "form-id-list";

/**
 * Retrieves form data from cache or fetches if outdated.
 */
export function getCachedFormData(
  formId: string | null,
  formUrl: string | null
) {
  if (!formId && !formUrl) {
    throw new Error("Must provide either formId or formUrl");
  }

  formId = formId || getFormIdFromUrl(formUrl!);
  const cache = CacheService.getScriptCache();
  const properties = PropertiesService.getScriptProperties();

  // Try cache first
  const cachedData = cache.get(formId);
  if (cachedData) {
    console.log(`Returning cached form data for ${formId}`);
    return JSON.parse(cachedData);
  }

  // Try long-term storage
  const storedData = properties.getProperty(`formData-${formId}`);
  const lastModified = properties.getProperty(`lastModified-${formId}`);

  if (storedData && lastModified) {
    console.log(`Using stored data for ${formId}`);
    cache.put(formId, storedData, CACHE_DURATION);
    return JSON.parse(storedData);
  }

  // Fetch fresh data
  console.log(`Fetching fresh form data for ${formId}`);
  const freshData = getFormData(formId, null);
  storeFormData(formId, freshData);

  // Ensure trigger is running
  setupGlobalTrigger();

  return freshData;
}

/**
 * Stores form data and marks last modified timestamp.
 */
function storeFormData(formId: string, formData: any) {
  const properties = PropertiesService.getScriptProperties();
  const jsonData = JSON.stringify(formData);
  properties.setProperty(`formData-${formId}`, jsonData);
  properties.setProperty(`lastModified-${formId}`, `${Date.now()}`);
  CacheService.getScriptCache().put(formId, jsonData, CACHE_DURATION);
  trackFormForUpdates(formId);
}

/**
 * Ensures the form ID is tracked for update checks.
 */
function trackFormForUpdates(formId: string) {
  const properties = PropertiesService.getScriptProperties();
  let formList = properties.getProperty(FORM_LIST_KEY);
  let formIds = formList ? JSON.parse(formList) : [];

  if (!formIds.includes(formId)) {
    formIds.push(formId);
    properties.setProperty(FORM_LIST_KEY, JSON.stringify(formIds));
    console.log(`Tracking form ${formId} for updates`);
  }
}

/**
 * Sets up a global trigger to check form updates every 5 minutes.
 */
function setupGlobalTrigger() {
  const properties = PropertiesService.getScriptProperties();
  if (properties.getProperty(TRIGGER_KEY)) {
    console.log("Global trigger already set.");
    return;
  }

  ScriptApp.newTrigger("checkAndUpdateCachedForms")
    .timeBased()
    .everyMinutes(5)
    .create();

  properties.setProperty(TRIGGER_KEY, "true");
  console.log("Global form update trigger set.");
}

/**
 * Converts a form URL to a form ID.
 */
function getFormIdFromUrl(formUrl: string): string {
  const match = formUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  if (!match) {
    throw new Error("Invalid Google Form URL");
  }
  return match[1];
}

export function checkAndUpdateCachedForms() {
  const properties = PropertiesService.getScriptProperties();
  let formList = properties.getProperty(FORM_LIST_KEY);
  let formIds = formList ? JSON.parse(formList) : [];

  console.log(`Checking ${formIds.length} forms for updates.`);

  formIds.forEach((formId) => {
    try {
      const formFile = DriveApp.getFileById(formId);
      const lastModified = formFile.getLastUpdated().getTime();
      const storedTimestamp = parseInt(
        properties.getProperty(`lastModified-${formId}`) || "0"
      );

      if (lastModified > storedTimestamp) {
        console.log(`Form ${formId} modified, updating cache.`);
        const freshData = getFormData(formId, null);
        storeFormData(formId, freshData);
      }
    } catch (error) {
      console.error(`Error checking form ${formId}:`, error);
    }
  });
}
