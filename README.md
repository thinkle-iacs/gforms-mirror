# GFormsMirror

A Google-Apps-Script + Custom Web Element Project to allow "Mirroring" Google Forms in a more modern looking forms interface. Our immediate goal is to support better translation, here's the full suite of services this would allow:

* Improved Translation Support / UX
* Improved Styling/Integration with other web pages
* Custom validation / auto-fill support.

## Technical Details

### Submitting Forms

Submitting forms happens by hitting a custom Google Apps Script URI which handles posting form responses. This works around issues with posting directly to google forms, and prevents us from relying on reverse-engineering Google Forms built-in behavior which is designed to prevent automated form-filling-out.

### Performance

The most *convenient* solution is to just point a custom element at a google apps script URL with a form ID and call it a day. HOWEVER, Google Apps Script is not exactly performant, so if you want your form to load quickly, you'll want to hard-code the form data and translations onto your webpage. That way, you don't have to wait for an Apps Script call before your users see the form.

## Set Up...

To submit forms, you will need an Apps Script process running which has edit access to the forms in question. The easiest way to do that is to copy our source code into Apps Script, but we will also keep a "built" script available you can copy [here](fixme).

1. Copy [script](fixme).
2. Deploy as web app
3. Visit web app URL and use interface to generate form code.
4. Copy generated form code into wherever you are hosting your pages.

## Google Apps Script + Svelte (Template used for this project...)

I love Google Apps Script for whipping together projects for our Google Apps School, and I love svelte development in Visual Studio, but before now, I haven't been able to  bring them together. This repo will give me a recipe for fixing that!

With this package, you can write Google Apps Script code in a modular modern fashion using Typescript and have it compile down to code that runs in the v8 runtime.

And you can write the browser-side code that gets served up in Apps Script using svelte, a delightful modern component framework which can get compiled down to one single index.html file that's easy to host and serve in Apps Script (no external dependencies!). What's more, we auto-generate a handy API for grabbing the apps script code, so you can code with type safety and beautiful autocompletion.

For example in the Apps Script side we could write
```typescript
export function getSheetRows (n : number) : [number][][] {
  return SpreadsheetApp.getActiveSheet().getDataRange().getValues();
}
```

And then in our svelte code, we can write something like this:
```typescript
let data = await getSheetRows(10);
```

All while getting autocomplete and type hinting!

## Quick Start

1. Clone this repository.
1. Install the dependencies: npm install
1. Run development server for Svelte: npm run dev
1. Build for production: npm run build
1. Create a new Google Apps Script project: npm run create-clasp-project
1. Push the build to Google Apps Script: npm run push-to-clasp

## Google-Apps-Script

We can use import and export and typescript to build Google Apps Script functions. Whatever is imported into main will be built for export.

The src/gas/serve.ts file contains several utility functions to serve your Svelte code within different Google Workspace apps:

doGet(e): Serves the Svelte application as a web page.
showDialog(title, modal, app): Shows the Svelte application as a dialog in Google Docs, Sheets, or Slides.
title: Title of the dialog.
modal: Whether the dialog should be modal.
app: The Google Workspace app to show the dialog in (DocumentApp, SpreadsheetApp, SlidesApp)

### Using google.script.run

To simplify things, we define a file `api.ts` in our src/gas/ directory which should contain all
functions that we will need in client side svelte code.

Functions from api.ts can then automatically be read so we can generate appropriate typescript
definition files and mock functions in src/svelte/mock/mockApi.ts

This magic happens automatically with `npm run dev`

So, for example, if you go into api.ts and you add a new function call:

```ts

function getNumberOfRowsInSheet (sheetname : string) : number {
  // ... add logic here...
}
```

Saving that file now gets you three benefits:
1. We get types generated for google.script.run so if you're using the Google API you get autocomplete.
2. If you'd rather use a more modern API, we generate a file in your svelte code called `gasApi.ts` which will have modern, fully typed bindings for calling your Google Apps Script code.
3. We generate template code in `mock/mockApi.ts` to let you mock your apps script code so you can test your client code locally without having to deploy to google.

## Roadmap

- Proof of concept: build svelte interface served with GAS! (x)
- Improved type handling and testing framework. (x)