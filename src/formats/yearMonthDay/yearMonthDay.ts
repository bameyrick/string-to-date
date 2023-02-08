import { Format } from '../../format';

export const yearMonthDay = new Format({
  /* prettier-ignore */
  //           $1      $2        $3          $4
  template: "^(_YEAR_)([\\/. -])(_MONTH_)\\2(_DAY_)$",
  units: ['year', null, 'month', 'day'],
});
