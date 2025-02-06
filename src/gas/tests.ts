import { getFormData } from "./getFormData";

import { ALL_TESTS, NAVIGATION_TEST, SINGLEPAGE_TEST } from "./consts";

export function testGetFormData() {
  for (let formUrl of [NAVIGATION_TEST]) {
    const formData = getFormData(null, formUrl);
    console.log(JSON.stringify(formData, null, 2));
    /* console.log(
      formData.items.map((i) =>
        JSON.stringify({
          id: i.id,
          type: i.type,
          title: i.title,
          desc: i.description,
          choices: i.choices ? i.choices.join(",") : null,
          navigation: i.navigation
            ? i.navigation?.id
            : i.choicesNavigation
            ? i.choicesNavigation
                .map((n) => JSON.stringify([n?.type, n?.id]))
                .join(",")
            : null,
        })
      )
    ); */
  }
}
