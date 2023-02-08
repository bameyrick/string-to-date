import { generateFormats, testDates } from '../../test-fixtures';

testDates({
  name: 'day month year',
  expected: { year: 2020, month: 2, day: 5 },
  locales: ['en-GB'],
  formats: generateFormats('DAY-MONTH-YEAR'),
});
