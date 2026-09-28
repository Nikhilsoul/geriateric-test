import { MOBILITY } from './schema';

// 'home_visit' -> 'Home visit'. Any value added to MOBILITY shows up in the Select automatically.
const toLabel = (value: string) => {
  const spaced = value.replaceAll('_', ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

export const MOBILITY_OPTIONS = MOBILITY.map((value) => ({ value, label: toLabel(value) }));
