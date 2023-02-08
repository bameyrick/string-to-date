import { TIMEZONE_NAMES } from '../../data';
import { Format } from '../../format';
import { isNullOrUndefined } from '../../is-null-or-undefined';
import { LocaleHelper } from '../../locale-helper';
import { DateObject } from '../../models';

// lots of 24h time such as "23:59", "T23:59:59+0700", "23:59:59 GMT-05:00", "23:59:59 CST", "T23:59:59Z"
export const time24Hours = new Format({
  name: 'time24Hours',
  /* prettier-ignore */
  //           $1                               $2        $3           $4              $5                                $6                 $7
  template: '^(.*?)_SPACE_*(?:at|on|T|)_SPACE_*(_H24_)\\:(_MIN_)(?:\\:(_SEC_)(?:[\\.,](_MS_))?)?_SPACE_*(?:GMT)?_SPACE_*(_OFFSET_)?_SPACE_*(_ZONE_)?$',
  handler: function (matches, locale) {
    const [, dateExpr, hour, minute, second, millisecond, offset, zone] = matches;
    let result: DateObject | null = {};

    if (dateExpr) {
      result = this.parser!.parseToObject(dateExpr, locale);

      if (isNullOrUndefined(result)) {
        return result;
      }
    }

    if (!isNullOrUndefined(hour)) {
      result.hour = hour;
    }

    if (!isNullOrUndefined(minute)) {
      result.minute = minute;
    }

    if (second) {
      result.second = second;
    }

    if (millisecond && millisecond.length > 3) {
      result.millisecond = millisecond.slice(0, 3);
    } else if (millisecond) {
      result.millisecond = millisecond;
    }

    if (zone && !offset && zone in TIMEZONE_NAMES) {
      result.offset = TIMEZONE_NAMES[zone] as number;
    } else if (offset) {
      const locHelper = LocaleHelper.factory(locale);
      result.offset = locHelper.offsetToMinutes(offset);
    }

    return result;
  },
});
