import type { Assessment } from './schema';

const FAKE_SAVE_DELAY_MS = 800;

// No backend in scope: pretend to save, then hand back what was "stored".
export function saveAssessment(assessment: Assessment): Promise<Assessment> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(assessment), FAKE_SAVE_DELAY_MS);
  });
}
