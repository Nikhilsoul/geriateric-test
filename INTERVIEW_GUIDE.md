# How to explain this to the interviewer (keep OUT of the repo)

## 30-second pitch
"The schema is the single source of truth. The form just feeds it: `schemaResolver` turns Zod issues into Mantine field errors, and on submit I use `transformValues` so the app receives Zod's parsed output, not raw form state. Types come from `z.infer`, and the input-shape gap is handled with one derived type."

## Walk through in this order (matches their scoring: 40 / 30 / 20 / 10)
1. Demo: empty submit (9 errors), Load sample, Save (spinner ~800ms, green alert with parsed JSON). Then set barthel 105, then 82: errors stay, number is NOT changed.
2. `AssessmentForm.tsx`: one `useForm` call. Point at `validate: schemaResolver(...)`, `validateInputOnBlur`, `transformValues`.
3. `formValues.ts`: why input type differs from output type.
4. `schema.test.ts` and `AssessmentForm.test.tsx`.
5. README limits.

## Questions to expect, and answers
- **Why `transformValues` with `parse`?** It runs after validation succeeds, so parse cannot throw; it gives the parsed output (trim applied) with type `Assessment`, no cast, no `any`.
- **Why `AssessmentFormValues`?** Blank Select, unchecked consent, and blank number cannot satisfy `Assessment`. I derive it from `Assessment` and widen only 7 fields, so schema changes still flow through. No duplicate interface.
- **Why `clampBehavior="none"`?** Default clamps 105 to 100 on blur: silently changing a clinical score, their listed red flag.
- **Why no 9-error stacking?** Refines are guarded in the schema, and `z.iso.date` custom `error` gives one message per blank date. I checked the empty form yields exactly 9.
- **Why `sync: true`?** Zod schema has no async refinements, so synchronous validation avoids promise handling on every blur.
- **Why is `onSave` a prop?** Dependency injection: production uses the 800ms fake, test uses `vi.fn()` and no fake timers.
- **Why those test boundaries?** Age uses `<=` on ISO strings: off-by-one is the likeliest bug, so test the exact day and the day after.
- **What would you do next?** Re-validate dependent fields on change, friendlier partial-number message, e2e test, a11y check.
- **Did you use AI?** Be honest. They allow it, but you must be able to explain every line above. Read the code once, run it, and change something small (e.g. add `'crutches'` to `MOBILITY` and watch it appear in the dropdown).

## Before you submit
1. `yarn install`, `yarn add @mantine/form @mantine/dates dayjs zod` (updates `yarn.lock`), then `yarn test`.
2. Make real commits (see the list in the chat reply), push to a PUBLIC repo.
3. Deploy (Vercel/Netlify: build `yarn build`, output `dist`), put URL and honest time in README.
