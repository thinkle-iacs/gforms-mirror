export function getActiveUserEmail(): string {
  return "thinkle@example.com";
}

export function testMe(number: number): number {
  return 17;
}

export function foo(s: string): number {
  return 17;
}

export function getAppsScriptUrl(): string {
  //return "http://foo.bar";
  // Actual URL
  // dev URL needs authentication?
  //return "https://script.google.com/a/macros/innovationcharter.org/s/AKfycbxYPm-A45TqQlpjnepuhnCNYtZospa3729lw9C9Aj4/dev";
  return "https://script.google.com/macros/s/AKfycbxMX5zXcqs1j5eYBmeStDXQCW6xhe7BYWqp1iXIgu38oUyll-MCM8sSZrWFYtF3asYT/exec";
}
export function getFormData(
  formId: string,
  formUrl: string
): import("/Users/thinkle/BackedUpProjects/gas/gforms-mirror/src/gas/types").Form {
  return {
    id: formId || "mock-form-id",
    title: "Svelte Feedback Survey",
    editUrl: formUrl || "https://docs.google.com/forms/d/mock-edit-url",
    publishedUrl: "https://docs.google.com/forms/d/e/mock-public-url",
    items: [
      // ✅ 1. Initial Question: Do you like Svelte?
      {
        id: "q1",
        title: "Do you like Svelte?",
        description: "Select one.",
        type: "multipleChoice",
        required: true,
        choices: ["Yes", "No", "I'm Neutral", "I am in a hurry!"],
        choicesNavigation: [
          { type: "page", id: "pLikeSvelte" }, // If "Yes", go to "What do you like?"
          { type: "page", id: "pDislikeSvelte" }, // If "No", go to "What don't you like?"
          { type: "page", id: "pExit" }, // If "Neutral", go directly to Exit
          { type: "submit" },
        ],
      },

      // ✅ 2A. Page Break for "Like Svelte" Section
      {
        id: "pLikeSvelte",
        title: "You like Svelte!",
        type: "pageBreak",
        navigation: { type: "page", id: "pContact" }, // Ensures correct natural flow
      },
      {
        id: "qLike",
        title: "What do you like most about Svelte?",
        description: "Select all that apply.",
        type: "checkbox",
        required: true,
        choices: [
          "Reactivity",
          "Performance",
          "Syntax",
          "Small Bundle Size",
          "Other",
        ],
      },

      // ✅ 2B. Page Break for "Dislike Svelte" Section
      {
        id: "pDislikeSvelte",
        title: "You don't like Svelte!",
        type: "pageBreak",
        navigation: { type: "page", id: "pContact" }, // ✅ Corrects "natural" flow to Contact
      },
      {
        id: "qDislike",
        title: "What do you dislike about Svelte?",
        description: "Provide your feedback.",
        type: "paragraph",
        required: true,
      },

      // ✅ 3. Page Break for Contact Page (Shared for Like & Dislike Paths)
      {
        id: "pContact",
        title: "Stay in Touch",
        type: "pageBreak",
        navigation: { type: "page", id: "pExit" }, // Ensures correct flow to exit
      },
      {
        id: "qEmail",
        title: "Enter your email if you'd like updates.",
        description: "Optional.",
        type: "text",
        required: false,
      },

      // ✅ 4. Exit Page (For Neutral Response & Contact Page)
      {
        id: "pExit",
        title: "Thank you!",
        type: "pageBreak",
      },
      {
        id: "qExitMessage",
        title: "You’re all set! Thanks for your time.",
        type: "sectionHeader",
      },
    ],
  };
}


export function getCachedFormData(formId: string, formUrl: string): any {
  return null; // TODO: Replace with mock return value of type any
}