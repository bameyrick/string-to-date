import { DateObjectUnits, DateTime, DateTimeJSOptions, FixedOffsetZone } from 'luxon';
import StringToDate, { Format } from '..';
import { DateObject } from '../models';

export function testDates({
  name,
  formats,
  expected,
  locales,
  formatsToRemove,
}: {
  name: string;
  formats: string[];
  expected: DateObject;
  locales: string[];
  formatsToRemove?: Format[];
}) {
  for (const locale of locales) {
    describe(`${name} (${locale})`, () => {
      for (const format of formats) {
        const luxonObj = { ...expected } as DateObjectUnits & { offset?: number };

        const opts: DateTimeJSOptions = {};

        if (typeof luxonObj.offset === 'number') {
          opts.zone = FixedOffsetZone.instance(+expected.offset!);
          luxonObj.offset = undefined;
        }

        const date = DateTime.fromObject(luxonObj, opts);
        const formatted = date.toFormat(format, { locale });

        if (formatsToRemove) {
          for (const formatToRemove of formatsToRemove) {
            StringToDate.removeFormat(formatToRemove);
          }
        }

        it(`${formatted} (${format})`, () => {
          const actual = StringToDate.parseToObject(formatted, locale);

          expect(actual).toEqual(expect.objectContaining(expected));
        });
      }
    });
  }
}
