import { Format } from '../../format';

export const dayMonth = new Format({
  /* prettier-ignore */
  //           $1            $2
  template: "^(_DAY_)[\\/. ](_MONTH_)$",
  units: ['day', 'month'],
});
