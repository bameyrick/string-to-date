import { generateFormats, LOCALE_LIST, testDates } from '../../test-fixtures';

testDates({
  name: 'day monthname',
  expected: { month: 3, day: 16 },
  // ar and zh do not have a monthname
  locales: LOCALE_LIST.filter(l => !/^ar|^zh/.test(l)),
  formats: generateFormats('DAY-MONTH', ['MMM', 'MMMM'], [' ']),
});
