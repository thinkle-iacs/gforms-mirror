
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

     getCachedFormData(formId: string, formUrl: string): Promise<any> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getCachedFormData(formId, formUrl);
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
