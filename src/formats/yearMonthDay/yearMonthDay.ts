import { Format } from '../../format';
import { isNullOrUndefined } from '../../is-null-or-undefined';
import { LocaleHelper } from '../../locale-helper';

let locHelper: LocaleHelper;

const name = 'yearMonthDay';

export const yearMonthDay = new Format({
  name,
  /* prettier-ignore */
  //           $1      $2        $3          $4
  template: "^(_YEAR_)([\\/. -])?(_MONTH_)\\2(_DAY_)$",
  handler: function ([dateExpr, year, separator, month, day], locale) {
    if (!locHelper) {
      locHelper = new LocaleHelper(locale);
    }

    if (!isNullOrUndefined(separator) && separator !== ' ') {
      return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
    }

    if (separator === ' ') {
      [year, month, day] = dateExpr?.split(' ');

      return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
    }

    switch (dateExpr?.length) {
      case 8:
      case 7:
      case 4: {
        return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
      }
      case 6: {
        if (year!.length !== 2 && parseInt(year!) <= 1900) {
          year = dateExpr.slice(0, 2);

          dateExpr = dateExpr.slice(2);

          if (dateExpr.length === 4) {
            month = dateExpr.slice(0, 2);
            day = dateExpr.slice(2);
          } else if (dateExpr.length === 3 && dateExpr[0] === '0') {
            month = dateExpr[1];
            day = dateExpr.slice(2);
          } else {
            month = dateExpr[0];
            day = dateExpr.slice(1);
          }
        }

        const result = locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);

        return result;
      }
      case 5: {
        if (month![0] === '0') {
          month = month![1];
          day = dateExpr.slice(dateExpr.indexOf(month) + 1);

          return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
        } else if (parseInt(month![0]) > 1) {
          month = month![0];
          day = dateExpr.slice(3);

          return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
        } else if (day![0] === '0') {
          day = day![1];

          return locHelper.getObject(['year', 'month', 'day'], [null, year, month, day], name);
        }
      }
    }

    return null;
  },
});
