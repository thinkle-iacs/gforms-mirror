import type { StandardFormItem } from "../../gas/types";

export type Page = {
  id: string;
  items: StandardFormItem[];
  title?: string;
  description?: string;
  defaultNextPage: string | null;
};
