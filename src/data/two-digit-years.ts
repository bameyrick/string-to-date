import { TwoDigitYears } from '../models';

export const TWO_DIGIT_YEARS: TwoDigitYears = new Array(100).fill(null).reduce((result, _, i) => {
  const key = i.toString().padStart(2, '0');

  return { ...result, [key]: i + (i > 49 ? 1900 : 2000) } as Partial<TwoDigitYears>;
}, {}) as TwoDigitYears;
