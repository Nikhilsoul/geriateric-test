import { expect, it } from 'vitest';
import { SAMPLE_PATIENT } from './formValues';
import { assessmentSchema } from './schema';

// The assessment date is 2026-08-07, so the cut-off birthday is exactly 1966-08-07.
it('accepts a patient who turns 60 on the assessment date but rejects one a day short', () => {
  const exactlySixty = assessmentSchema.safeParse({ ...SAMPLE_PATIENT, dateOfBirth: '1966-08-07' });
  expect(exactlySixty.success).toBe(true);

  const oneDayShort = assessmentSchema.safeParse({ ...SAMPLE_PATIENT, dateOfBirth: '1966-08-08' });
  expect(oneDayShort.success).toBe(false);
  expect(oneDayShort.error?.issues).toHaveLength(1);
  expect(oneDayShort.error?.issues[0]).toMatchObject({
    path: ['dateOfBirth'],
    message: 'This pathway is for patients aged 60 and over',
  });
});
