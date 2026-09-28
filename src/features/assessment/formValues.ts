import type { Assessment } from './schema';


export type AssessmentFormValues = Omit<
  Assessment,
  | 'dateOfBirth'
  | 'assessmentDate'
  | 'followUpDate'
  | 'mobility'
  | 'barthelIndex'
  | 'medicationCount'
  | 'consentObtained'
> & {
  dateOfBirth: string | null;
  assessmentDate: string | null;
  followUpDate: string | null;
  mobility: Assessment['mobility'] | '';
  barthelIndex: number | string;
  medicationCount: number | string;
  consentObtained: boolean;
};

export const EMPTY_ASSESSMENT: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: '',
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};

// Invented patient, safe to commit.
export const SAMPLE_PATIENT: AssessmentFormValues = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};
