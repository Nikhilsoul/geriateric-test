import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { EMPTY_ASSESSMENT, SAMPLE_PATIENT, type AssessmentFormValues } from './formValues';
import { MOBILITY_OPTIONS } from './mobilityOptions';
import { assessmentSchema, type Assessment } from './schema';

interface AssessmentFormProps {
  onSave: (assessment: Assessment) => Promise<unknown>;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [saved, setSaved] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues, Assessment>({
    mode: 'controlled',
    initialValues: EMPTY_ASSESSMENT,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
    
    transformValues: (values) => assessmentSchema.parse(values),
  });

  const handleSubmit = async (assessment: Assessment) => {
    setSaved(null);
    form.setSubmitting(true);
    try {
      await onSave(assessment);
      setSaved(assessment);
    } finally {
      form.setSubmitting(false);
    }
  };

  const loadSamplePatient = () => {
    form.setValues(SAMPLE_PATIENT);
    form.clearErrors();
    setSaved(null);
  };

  return (
    <Container size="sm" my="xl">
      <Paper withBorder p="lg">
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <Title order={2}>Geriatric Care Assessment</Title>

            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              withAsterisk
              key={form.key('mrn')}
              {...form.getInputProps('mrn')}
            />
            <TextInput
              label="Patient name"
              withAsterisk
              key={form.key('patientName')}
              {...form.getInputProps('patientName')}
            />
            <DateInput
              label="Date of birth"
              withAsterisk
              key={form.key('dateOfBirth')}
              {...form.getInputProps('dateOfBirth')}
            />
            <DateInput
              label="Assessment date"
              maxDate={dayjs().format('YYYY-MM-DD')}
              withAsterisk
              key={form.key('assessmentDate')}
              {...form.getInputProps('assessmentDate')}
            />
            <Select
              label="Mobility"
              data={MOBILITY_OPTIONS}
              withAsterisk
              key={form.key('mobility')}
              {...form.getInputProps('mobility')}
            />
            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              // Default 'blur' would silently clamp 105 to 100. The schema must reject it instead.
              clampBehavior="none"
              withAsterisk
              key={form.key('barthelIndex')}
              {...form.getInputProps('barthelIndex')}
            />
            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              clampBehavior="none"
              withAsterisk
              key={form.key('medicationCount')}
              {...form.getInputProps('medicationCount')}
            />
            <Checkbox
              label="Pharmacist review requested"
              key={form.key('pharmacistReviewRequested')}
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />
            <DateInput
              label="Next review date"
              withAsterisk
              key={form.key('followUpDate')}
              {...form.getInputProps('followUpDate')}
            />
            <Checkbox
              label="Patient or representative has given consent"
              key={form.key('consentObtained')}
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />

            <Group justify="space-between">
              <Button variant="default" onClick={loadSamplePatient}>
                Load sample patient
              </Button>
              <Button type="submit" loading={form.submitting}>
                Save assessment
              </Button>
            </Group>

            {saved && (
              <Alert color="green" title="Assessment saved">
                <Code block>{JSON.stringify(saved, null, 2)}</Code>
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
