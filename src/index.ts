import {
  ago,
  atSeconds,
  chinese,
  dayMonth,
  dayMonthname,
  dayMonthnameYear,
  dayMonthYear,
  microsoftJson,
  monthDay,
  monthDayYear,
  monthnameDay,
  monthnameDayYear,
  time12Hours,
  time24Hours,
  today,
  twitter,
  yearMonthDay,
} from './formats';
import { Parser } from './parser';

// create a default parser instance and register all the default formats
const StringToDate = new Parser();

// all formats can have time strings at the end
StringToDate.addFormats([
  time24Hours,
  time12Hours,
  dayMonthnameYear,
  monthnameDayYear,
  monthDayYear,
  dayMonthYear,
  // from most unambiguous and popular to least
  yearMonthDay,
  chinese,
  twitter,
  today,
  ago,
  monthnameDay,
  dayMonthname,
  monthDay,
  dayMonth,
  atSeconds,
  microsoftJson,
]);

export default StringToDate;
export { Format, FormatDefinition, FormatHandler } from './format';
export {
  ago,
  atSeconds,
  chinese,
  dayMonth,
  dayMonthname,
  dayMonthnameYear,
  dayMonthYear,
  microsoftJson,
  monthDay,
  monthDayYear,
  monthnameDay,
  monthnameDayYear,
  time12Hours,
  time24Hours,
  today,
  twitter,
  yearMonthDay,
} from './formats';
export { DateObject } from './models';
export { Parser } from './parser';
