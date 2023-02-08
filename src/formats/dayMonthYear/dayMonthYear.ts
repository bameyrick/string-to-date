import { Format } from '../../format';

export const dayMonthYear = new Format({
  name: 'dayMonthYear',
  /* prettier-ignore */
  //           $1     $2        $3          $4
  template: "^(_DAY_)([\\/. -])(_MONTH_)\\2(_YEAR_)$",
  units: ['day', null, 'month', 'year'],
});
