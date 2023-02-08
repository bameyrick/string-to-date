import { generateFormats, LOCALE_LIST, testDates } from '../../test-fixtures';

testDates({
  name: 'monthname day',
  expected: { month: 6, day: 28 },
  locales: LOCALE_LIST.filter(l => !/^ar|^zh/.test(l)),
  formats: ['cccc, MMMM dd', 'cccc MMMM dd', 'ccc, MMMM dd', 'ccc MMMM dd', 'MMMM dd', 'MMM dd'],
});

testDates({
  name: 'monthname day',
  expected: { month: 2, day: 28 },
  locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
  formats: generateFormats('MONTH-DAY', ['MMM', 'MMMM'], [' ']),
});
