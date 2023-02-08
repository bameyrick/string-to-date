import { generateFormats, testDates } from '../../test-fixtures';
import { dayMonthYear } from '../dayMonthYear/dayMonthYear';
import { monthDayYear } from '../monthDayYear/monthDayYear';

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 9, day: 24 },
  locales: ['en-US'],
  formats: generateFormats('YEAR-MONTH-DAY', ['MM', 'M'], ['/', '-', ' ', '.', '']),
  formatsToRemove: [monthDayYear, dayMonthYear],
});

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 9, day: 4 },
  locales: ['en-US'],
  formats: generateFormats('YEAR-MONTH-DAY', ['MM', 'M'], ['/', '-', ' ', '.', '']),
  formatsToRemove: [monthDayYear, dayMonthYear],
});

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 11, day: 4 },
  locales: ['en-US'],
  formats: generateFormats('YEAR-MONTH-DAY', ['MM', 'M']),
  formatsToRemove: [monthDayYear, dayMonthYear],
});

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 1, day: 14 },
  locales: ['en-US'],
  formats: generateFormats('YEAR-MONTH-DAY', ['MM', 'M']),
  formatsToRemove: [monthDayYear, dayMonthYear],
});
