# Geriatric Care Assessment Form

React 19 + TypeScript + Mantine + `@mantine/form` + Zod 4. All patient data is invented.

- **Github Repo URL** https://github.com/Nikhilsoul/geriateric-test
- **Live URL:** https://geriateric-test.vercel.app/
- **Time spent:** about 1h 40m

## Run it

```bash
corepack yarn install
corepack yarn dev     # http://localhost:5173
corepack yarn test    # typecheck, format, lint, vitest, build
```

## Decisions where the brief was unclear

- **Consent label:** a Mantine `Checkbox` has one label, so I used "Patient or representative has given consent".
- **Assessment date `maxDate`:** a UI constraint only. The schema is fixed, so a future date is not a schema error.
- **Number inputs:** I set `clampBehavior="none"` so a typed 105 is rejected by the schema instead of silently clamped to 100.
- **Template cleanup:** I removed the demo page, router and `react-router-dom`. That left no `.css` files, so I added `--allow-empty-input` to the `stylelint` script. No lint or format config was changed.

## Not done / next

- Cross-field errors only refresh when their own field is blurred or on submit. For example, changing the assessment date does not re-check date of birth until then. Next step: re-validate dependent fields on change.
- A half-typed number like `8.` shows the "required" message, because it reaches Zod as a string. A friendlier message needs a schema change, which was out of scope.
- No accessibility audit or browser-level tests beyond the two unit tests.