import { generateFormats, LOCALE_LIST, testDates } from '../../test-fixtures';

testDates({
  name: 'monthname day year',
  expected: { year: 2016, month: 3, day: 27 },
  // ar and zh do not have a monthname
  locales: LOCALE_LIST.filter(l => !/^ar|^zh/.test(l)),
  formats: (locale: string) => {
    if (/^fi/i.test(locale)) {
      return [
        'cccc, MMMM dd yyyy',
        'cccc MMMM dd yyyy',
        'ccc, MMMM dd yyyy',
        'ccc MMMM dd yyyy',
        'MMMM dd yyyy',
        'LLLL dd yyyy',
        'LLL dd yyyy',
      ];
    }

    return [
      'cccc, MMMM dd yyyy',
      'cccc MMMM dd yyyy',
      'ccc, MMMM dd yyyy',
      'ccc MMMM dd yyyy',
      'MMMM dd yyyy',
      'MMM dd, yyyy',
      'MMM dd yyyy',
    ];
  },
});

testDates({
  name: 'monthname day year',
  expected: { year: 2017, month: 2, day: 28 },
  locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
  formats: (locale: string) => generateFormats('MONTH-DAY-YEAR', /^fi/i.test(locale) ? ['LLL', 'LLLL', 'MMMM'] : ['MMM', 'MMMM'], [' ']),
});
