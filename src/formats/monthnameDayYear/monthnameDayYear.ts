import { Format } from '../../format';

export const monthnameDayYear = new Format({
  name: 'monthnameDayYear',
  /* prettier-ignore */
  //                                $1             $2                      $3
  template: '^(?:(?:_DAYNAME_),? )?(_MONTHNAME_)? (_DAY_)(?:_ORDINAL_)?,? (_YEAR_)$',
  units: ['month', 'day', 'year'],
});
