import { CHINESE_GROUP } from '../../data';
import { Format } from '../../format';
import { LocaleHelper } from '../../locale-helper';

let locHelper: LocaleHelper;

export const chinese = new Format({
  /* prettier-ignore */
  //           $1                         $2                  $3
  template: `^(${CHINESE_GROUP}{4}|${CHINESE_GROUP}{2})\\s*年\\s*(${CHINESE_GROUP}{1,2})\\s*月\\s*(${CHINESE_GROUP}{1,2})\\s*日$`,
  handler: ([, year, month, day]) => {
    if (!locHelper) {
      // sometimes zh has numbering system "latn" instead of fullwide or hanidec
      locHelper = new LocaleHelper('zh');
      locHelper.numberingSystem = 'hanidec';
      locHelper.buildDigits();
    }

    return locHelper.castObject({ year: year!, month: month!, day: day! });
  },
});
