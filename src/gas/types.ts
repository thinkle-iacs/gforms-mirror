export type FormType =
  | "checkbox"
  | "checkboxGrid"
  | "date"
  | "datetime"
  | "duration"
  | "fileUpload"
  | "grid"
  | "image"
  | "list"
  | "multipleChoice"
  | "pageBreak"
  | "paragraph"
  | "rating"
  | "scale"
  | "sectionHeader"
  | "text"
  | "time"
  | "video";

export type BaseFormItem = {
  id: string; // Google Forms assigns unique IDs to each item
  title: string;
  description?: string;
  type: FormType;
  required?: boolean;
};

export type ChoiceFormItem = BaseFormItem & {
  type: "multipleChoice" | "checkbox" | "list";
  choices: string[];
  choicesNavigation?: Navigation[]; // If navigation logic exists
};

export type ScaleFormItem = BaseFormItem & {
  type: "scale";
  min: number;
  max: number;
  labels?: [string, string]; // Optional left/right labels
};

export type RatingFormItem = BaseFormItem & {
  type: "rating";
  max: number;
  icon: "THUMBS_UP" | "HEART" | "STAR";
};

export type Navigation =
  | { type: "page"; id: string }
  | { type: "submit" }
  | null; // If no navigation is set

export type GridFormItem = BaseFormItem & {
  type: "grid"; // Multiple Choice Grid (single selection per row)
  rows: string[];
  columns: string[];
};

export type CheckboxGridFormItem = BaseFormItem & {
  type: "checkboxGrid"; // Checkbox Grid (multiple selections per row)
  rows: string[];
  columns: string[];
};

export type FileUploadFormItem = BaseFormItem & {
  type: "fileUpload";
  maxSizeMb: number;
  allowedTypes?: string[]; // Restrict file types if needed
};

export type SectionHeaderFormItem = BaseFormItem & {
  type: "sectionHeader";
};

export type PageBreakFormItem = BaseFormItem & {
  type: "pageBreak";
  navigation?: Navigation;
};

export type StandardFormItem =
  | BaseFormItem
  | ChoiceFormItem
  | ScaleFormItem
  | GridFormItem
  | CheckboxGridFormItem
  | FileUploadFormItem
  | SectionHeaderFormItem
  | RatingFormItem
  | PageBreakFormItem;

export type Form = {
  id: string;
  title: string;
  description: string;
  confirmationMessage: string; // Message shown after submission
  editUrl: string;
  publishedUrl: string;
  items: StandardFormItem[];
};

export type FormResponse = {
  id: string;
  items: { [key: string]: string };
};

export type FormSubmissionResult = {
  success: boolean;
  unrecognizedItems: string[];
  errors: { itemId: string; message: string }[];
  editResponseUrl?: string;
};

export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export type Settings = {
  theme?: undefined | "dark" | "light"; // maybe some set of predefined themes here eventually...
  styleVars: {
    [key: string]: string;
  };
  embedData: boolean;
  embedTranslations: boolean;
};
