import { generateFormats, testDates } from '../../test-fixtures';
import { dayMonthYear } from '../dayMonthYear/dayMonthYear';
import { monthDayYear } from '../monthDayYear/monthDayYear';

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 9, day: 24 },
  locales: ['en-US'],
  formats: generateFormats('YEAR-MONTH-DAY'),
  formatsToRemove: [monthDayYear, dayMonthYear],
});
