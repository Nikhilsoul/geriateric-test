import type { Assessment } from './schema';

const FAKE_SAVE_DELAY_MS = 800;


export function saveAssessment(assessment: Assessment): Promise<Assessment> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(assessment), FAKE_SAVE_DELAY_MS);
  });
}
