import { generateFormats, testDates } from '../../test-fixtures';

testDates({
  name: 'day month',
  expected: { month: 3, day: 3 },
  locales: ['en-US'],
  formats: generateFormats('DAY-MONTH'),
});
