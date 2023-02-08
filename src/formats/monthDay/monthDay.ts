import { Format } from '../../format';

export const monthDay = new Format({
  name: 'monthDay',
  /* prettier-ignore */
  //           $1                 $2
  template: "^(_MONTH_)(?:[\\/. -])(_DAY_)$",
  units: ['month', 'day'],
  // only certain locales use this date
  // see https://en.wikipedia.org/wiki/Date_format_by_country
  // see https://www.localeplanet.com/icu/
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
});
