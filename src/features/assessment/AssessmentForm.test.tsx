import { expect, it, vi } from 'vitest';
import { render, screen, userEvent, waitFor } from '../../../test-utils';
import { AssessmentForm } from './AssessmentForm';
import { SAMPLE_PATIENT } from './formValues';
import { assessmentSchema } from './schema';

it('calls the save handler with the parsed values after loading the sample patient', async () => {
  const onSave = vi.fn().mockResolvedValue(undefined);
  const user = userEvent.setup();
  render(<AssessmentForm onSave={onSave} />);

  await user.click(screen.getByRole('button', { name: 'Load sample patient' }));
  await user.click(screen.getByRole('button', { name: 'Save assessment' }));

  await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
  expect(onSave).toHaveBeenCalledWith(assessmentSchema.parse(SAMPLE_PATIENT));
  expect(await screen.findByText('Assessment saved')).toBeInTheDocument();
});
