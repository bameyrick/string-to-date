import { generateFormats, LOCALE_LIST, testDates } from '../../test-fixtures';

testDates({
  name: 'monthname day',
  expected: { month: 6, day: 28 },
  // ar and zh do not have a monthname
  locales: LOCALE_LIST.filter(l => !/^ar|^zh/.test(l)),
  formats: (locale: string) => {
    if (/^fi/i.test(locale)) {
      return ['cccc, MMMM dd', 'cccc MMMM dd', 'ccc, MMMM dd', 'ccc MMMM dd', 'MMMM dd', 'LLLL dd', 'LLL dd'];
    }

    return ['cccc, MMMM dd', 'cccc MMMM dd', 'ccc, MMMM dd', 'ccc MMMM dd', 'MMMM dd', 'MMM dd'];
  },
});

testDates({
  name: 'monthname day',
  expected: { month: 2, day: 28 },
  locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
  formats: (locale: string) => generateFormats('MONTH-DAY', /^fi/i.test(locale) ? ['LLL', 'LLLL', 'MMMM'] : ['MMM', 'MMMM'], [' ']),
});
