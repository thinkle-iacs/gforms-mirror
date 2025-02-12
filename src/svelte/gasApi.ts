
export const GoogleAppsScript = {
  
     getActiveUserEmail(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getActiveUserEmail();
      });
    },

     getAppsScriptUrl(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getAppsScriptUrl();
      });
    },

     getFormIdFromUrl(formUrl: string): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getFormIdFromUrl(formUrl);
      });
    },

     getCachedFormData(formId: string, formUrl: string): Promise<any> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getCachedFormData(formId, formUrl);
      });
    },

     getTranslationsSpreadsheetUrl(formId: any, initialLanguages: string[]): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getTranslationsSpreadsheetUrl(formId, initialLanguages);
      });
    },

     setupTranslationsSpreadsheet(formId: any, initialLanguages: string[]): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .setupTranslationsSpreadsheet(formId, initialLanguages);
      });
    },

     getTranslations(formId: any): Promise<import("../gas/types").Translations> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../gas/types").Translations) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getTranslations(formId);
      });
    },

     getFormData(formId: string, formUrl: string): Promise<import("../gas/types").Form> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../gas/types").Form) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getFormData(formId, formUrl);
      });
    }
}
