import { Format } from '../../format';

export const monthDay = new Format({
  /* prettier-ignore */
  //           $1                 $2
  template: "^(_MONTH_)(?:[\\/-])(_DAY_)$",
  units: ['month', 'day'],
});
