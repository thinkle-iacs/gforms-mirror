
declare namespace google.script {  
  interface GoogleScriptRun {
      withFailureHandler(callback: (error: Error, object?: any) => void): this;
      withSuccessHandler(callback: (value: any, object?: any) => void): this;
      withUserObject(object: Object): this;
      getActiveUserEmail(): void;
  getAppsScriptUrl(): void;
  getFormIdFromUrl(formUrl: string): void;
  getCachedFormData(formId: string, formUrl: string): void;
  getTranslationsSpreadsheetUrl(formId: any, initialLanguages: string[]): void;
  setupTranslationsSpreadsheet(formId: any, initialLanguages: string[]): void;
  getTranslations(formId: any): void;
  getFormData(formId: string, formUrl: string): void
  }
  const run : GoogleScriptRun;

  interface GoogleScriptHost {
  close(): void;
  setHeight(height: number): void;
  setWidth(width: number): void;
  editor: {
    focus(): void;
  };
}
const host : GoogleScriptHost;
  

  interface IUrlLocation {
  hash: string;
  parameter: { [key: string]: any };
  parameters: { [key: string]: any[] };
}

interface GoogleScriptUrl {
  getLocation(callback: (location: IUrlLocation) => void): void;
}
const url : GoogleScriptUrl;
  
}
