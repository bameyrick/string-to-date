import StringToDate from '../..';
import { testDates } from '../../test-fixtures';

testDates({
  name: 'month day year',
  expected: { year: 2020, month: 3, day: 14 },
  locales: [
    'ee-TG', // Togo (Ewe)
    'en-AS', // American Samoa
    'en-CA', // Canada
    'en-FM', // Federated States of Micronesia
    'en-GH', // Ghana
    'en-GU', // Guam
    'en-KE', // Kenya
    'en-KY', // Cayman Islands
    'en-MH', // Marshall Islands
    'en-MP', // Northern Mariana Islands
    'en-US', // United States
    'en-VI', // US Virgin Islands
    'en-WS', // Western Samoa
    'sm-AS', // American Samoa (Samoan)
    'sm-SM', // Samoa
  ],
  formats: ['MM/dd/yyyy', 'MM-dd-yyyy', 'M/dd/yyyy', 'M-dd-yyyy', 'MM/dd/yy', 'MM-dd-yy'],
});

describe('month day year for other locales', () => {
  it('should not support month day year with slashes', () => {
    const actual = StringToDate.parseToObject('5/31/2021', 'FR');

    expect(actual).toBe(null);
  });
  it('should not support month day year with dashes', () => {
    const actual = StringToDate.parseToObject('5-31-2021', 'FR');

    expect(actual).toBe(null);
  });
  it('should recognize day month year with slashes instead', () => {
    const actual = StringToDate.parseToObject('5/3/2021', 'FR');

    expect(actual).toEqual({
      month: 3,
      day: 5,
      year: 2021,
    });
  });
  it('should recognize day month year with dashes instead', () => {
    const actual = StringToDate.parseToObject('5-3-2021', 'FR');

    expect(actual).toEqual({
      month: 3,
      day: 5,
      year: 2021,
    });
  });
});
