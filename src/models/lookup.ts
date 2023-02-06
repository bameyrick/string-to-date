import { DayNameLookup } from './day-name-lookup';
import { DigitsLookup } from './digits-lookup';
import { MeridiemLookup } from './meridiem-lookup';
import { MonthLookup } from './month-lookup';
import { TimezoneNames } from './timezone-names';
import { TwoDigitYears } from './two-digit-years';

export interface Lookup {
  zone: TimezoneNames;
  year: TwoDigitYears;
  meridiem: MeridiemLookup;
  month: MonthLookup;
  dayname: DayNameLookup;
  digit: DigitsLookup;
}
