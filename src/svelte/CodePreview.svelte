<script lang="ts">
  import type { Form, Translations, Settings } from "../gas/types";

  export let formsUrl: string;
  export let appsScriptUrl: string;
  export let data: Form;
  export let translations: Translations;
  export let settings: Settings;
  export let cdnUrl: string = "https://fixme.com";

  function generateEmbedCode() {
    let embedCode = `
  <script src="${cdnUrl}"><\/script>
  <gforms-mirror 
    id="gform"
    formsUrl="${formsUrl}"    
    appsScriptUrl="${appsScriptUrl}"
    >
  </gforms-mirror>
  `;

    if (
      (settings.embedData && data) ||
      (settings.embedTranslations && translations)
    ) {
      embedCode += `
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const formElement = document.getElementById("gform");
      
      if (formElement) {
        ${settings.embedData && data ? `formElement.data = ${JSON.stringify(data, null, 2)};` : ""}
        ${settings.embedTranslations && translations ? `formElement.translations = ${JSON.stringify(translations, null, 2)};` : ""}
      }
    });
  <\/script>`;
    }

    return embedCode;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generateEmbedCode()).then(() => {
      alert("Copied to clipboard!");
    });
  }

  function escapeHtml(html: string) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
</script>

<div class="bg-gray-900 text-white rounded-lg p-4 mt-4 relative">
  <h3 class="text-lg font-semibold">Embed Code</h3>
  <pre
    class="bg-gray-800 text-green-300 p-3 rounded-md overflow-x-auto text-sm">
    {@html escapeHtml(generateEmbedCode())}
  </pre>
  <button
    on:click={copyToClipboard}
    class="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
  >
    Copy
  </button>
</div>
