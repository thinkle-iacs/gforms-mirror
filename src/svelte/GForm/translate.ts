import type { Translations } from "../../gas/types";
import { builtInTranslations } from "./translations";

export const getText = (
  word: string,
  translations: Translations,
  lang: string = "en"
) => {
  if (translations[lang] && translations[lang][word]) {
    return translations[lang][word];
  } else if (builtInTranslations[lang] && builtInTranslations[lang][word]) {
    return builtInTranslations[lang][word];
  } else {
    return word;
  }
};
