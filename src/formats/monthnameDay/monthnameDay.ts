import { Format } from '../../format';

export const monthnameDay = new Format({
  name: 'monthnameDay',
  /* prettier-ignore */
  //                                $1             $2
  template: '^(?:(?:_DAYNAME_),? )?(_MONTHNAME_)? (_DAY_)(?:_ORDINAL_)?$',
  units: ['month', 'day'],
});
