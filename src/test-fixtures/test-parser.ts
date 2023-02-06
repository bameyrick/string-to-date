import StringToDate from '..';
import { DateObject } from '../models';

export function testParser({
  name,
  expected,
  locales,
  dates,
}: {
  name: string;
  formats?: string[];
  expected: DateObject;
  locales: string[];
  dates: string[];
}) {
  describe(name, () => {
    locales.forEach(locale => {
      dates.forEach(date => {
        it(`should handle "${date}" (${locale})`, () => {
          const actual = StringToDate.parseToObject(date, locale);

          expect(actual).toEqual(expected);
        });
      });
    });
  });
}
