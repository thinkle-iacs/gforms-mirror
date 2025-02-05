import { getFormData } from "./getFormData";

import { ALL_TESTS, SINGLEPAGE_TEST } from "./consts";

export function testGetFormData() {
  for (let formUrl of ALL_TESTS) {
    const formData = getFormData(null, formUrl);
    console.log(formData);
  }
}
