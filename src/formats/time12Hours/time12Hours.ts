import { Format } from '../../format';
import { isNullOrUndefined } from '../../is-null-or-undefined';
import { LocaleHelper } from '../../locale-helper';
import { DateObject } from '../../models';

// lots of 12h time such as "11:59", "11:59pm", "11:59:33 pm", "11:59:33 p.m."
export const time12Hours = new Format({
  name: 'time12Hours',
  /* prettier-ignore */
  //           $1                               $2                 $3           $4                 $5
  template: '^(.*?)_SPACE_*(?:at|on|T|)_SPACE_*(_H12_|_H24_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)?_SPACE_*(_MERIDIEM_)$',
  handler: function (matches, locale) {
    const [, dateExpr, _hour, minute, second, ampm]: Array<string | null> = matches;
    let hour: string | number | null = _hour;

    let result: DateObject | null = {};

    if (dateExpr) {
      result = this.parser!.parseToObject(dateExpr, locale);

      if (isNullOrUndefined(result)) {
        // let other matchers have a chance
        return null;
      }
    }
    const template = LocaleHelper.factory(locale);

    if (ampm) {
      const offset = (template.lookups.meridiem[ampm.toLowerCase()] as number | undefined) || 0;

      hour = parseFloat(hour!);

      if (hour === 12) {
        hour = offset;
      } else if (hour > 12 && offset === 12) {
        hour += 0;
      } else {
        hour += offset;
      }
    }

    result.hour = parseFloat(hour!.toString());

    if (minute) {
      result.minute = parseFloat(minute);
    }

    if (second) {
      result.second = parseFloat(second);
    }

    return result;
  },
});
