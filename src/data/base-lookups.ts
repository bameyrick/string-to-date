import { Lookup } from '../models';
import { TIMEZONE_NAMES } from './timezone-names';
import { TWO_DIGIT_YEARS } from './two-digit-years';

export const BASE_LOOKUPS: Lookup = {
  zone: TIMEZONE_NAMES,
  year: TWO_DIGIT_YEARS,
  meridiem: {
    am: 0,
    pm: 12,
    'a.m.': 0,
    'p.m.': 12,
  },
  month: {
    january: 1,
    jan: 1,
    february: 2,
    feb: 2,
    march: 3,
    mar: 3,
    april: 4,
    apr: 4,
    may: 5,
    june: 6,
    jun: 6,
    july: 7,
    jul: 7,
    august: 8,
    aug: 8,
    september: 9,
    sep: 9,
    october: 10,
    oct: 10,
    november: 11,
    nov: 11,
    december: 12,
    dec: 12,
  },
  dayname: {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  },
  digit: {},
};
