import { generateFormats, testDates } from '../../test-fixtures';

testDates({
  name: 'month day',
  expected: { month: 3, day: 14 },
  locales: ['en-US'],
  formats: generateFormats('MONTH-DAY'),
});
