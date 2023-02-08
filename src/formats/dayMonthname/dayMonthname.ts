import { Format } from '../../format';

export const dayMonthname = new Format({
  name: 'dayMonthname',
  /* prettier-ignore */
  //           $1                       $2
  template: "^(_DAY_)(?:_ORDINAL_)?[ -](_MONTHNAME_)$",
  units: ['day', 'month'],
});
