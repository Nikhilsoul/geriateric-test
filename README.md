# Geriatric Care Assessment Form

One-page form a visiting nurse fills in during a home visit. React 19 + TypeScript + Mantine 9 + `@mantine/form` + Zod 4.
All patient data in this repo is invented.

- **Live URL:** _<add your deployed URL here>_
- **Time spent:** _<add your honest number, e.g. "about 2h 15m">_

## Run it

```bash
corepack yarn install
corepack yarn dev        # http://localhost:5173
corepack yarn test       # typecheck + format check + lint + vitest + build
```

## How it is wired

| File (`src/features/assessment/`) | Purpose |
| --- | --- |
| `schema.ts` | The given Zod schema, unchanged. The only place rules live. |
| `formValues.ts` | `AssessmentFormValues` (input shape, derived from `Assessment`), empty initial values, sample patient. |
| `AssessmentForm.tsx` | The form UI. `schemaResolver(assessmentSchema)` is the only validation. |
| `mobilityOptions.ts` | Builds Select options from `MOBILITY`; adding a value there adds it to the dropdown. |
| `saveAssessment.ts` | Fake 800 ms save. Injected as `onSave` so the test can swap it. |

### Decisions worth knowing

- **Input type vs output type.** Empty inputs cannot satisfy `Assessment` (blank Select, unchecked consent, blank numbers). The form is typed as `AssessmentFormValues` (built from `Assessment` with `Omit` and only the widened fields overridden, no second hand-written interface) and `useForm`'s second generic is `Assessment`.
- **Parsed output on submit.** `transformValues: (v) => assessmentSchema.parse(v)` runs only after validation passes, so `onSubmit` receives what Zod returned (e.g. trimmed strings), and that is what the success `Code` block prints.
- **No silent clamping.** Mantine's `NumberInput` clamps to min/max on blur by default, which would turn a typed 105 into 100. I set `clampBehavior="none"` so the schema rejects it and the nurse sees the error. I also left `allowDecimal` on so "82.5" reaches the schema and gets the "whole number" message.
- **Dates are `YYYY-MM-DD` strings** end to end; blank is `null` (Mantine's convention).
- **Validation timing:** `validateInputOnBlur` plus full validation on submit. Untouched fields show nothing.
- **Empty form gives exactly 9 errors** (checked while building), because the cross-field refines are already guarded in the schema.
- **Consent label:** the brief gives a field label "Consent" and the text "Patient or representative has given consent". A Mantine `Checkbox` has one label, so I used the sentence.
- **`assessmentDate` `maxDate`** is a UI constraint only. The schema is fixed, so a future date is not a schema error.
- **Template cleanup:** removed the demo Welcome page, router and `react-router-dom` (out of scope, dead code). That left no `.css` files, so `stylelint` failed with "no files found"; I added `--allow-empty-input` to that script rather than touching any lint config.

## Tests (two, as briefed)

1. `schema.test.ts`: `safeParse` at the exact 60-year boundary (1966-08-07 passes, 1966-08-08 fails on `dateOfBirth`).
2. `AssessmentForm.test.tsx`: render, click "Load sample patient", submit, assert `onSave` received the parsed values.

## Not done / next

- Cross-field errors only refresh on blur of the field that owns them (e.g. changing the assessment date does not re-check date of birth until you blur or submit). I would re-validate dependent fields on change.
- A half-typed number like `8.` reaches Zod as a string and shows the "required" message; a friendlier message needs a schema change, which was out of scope.
- No accessibility audit or browser tests beyond the two unit tests.
