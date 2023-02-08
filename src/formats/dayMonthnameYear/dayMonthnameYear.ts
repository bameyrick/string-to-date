import { Format } from '../../format';

export const dayMonthnameYear = new Format({
  name: 'dayMonthnameYear',
  /* prettier-ignore */
  //                                $1                   $2    $3              $4
  template: "^(?:(?:_DAYNAME_),? )?(_DAY_)(?:_ORDINAL_)?([ -])(_MONTHNAME_)\\2(_YEAR_)$",
  units: ['day', null, 'month', 'year'],
});
