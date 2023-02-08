import { Format } from '../../format';

// example: "Fri Apr 09 12:53:54 +0000 2010"
export const twitter = new Format({
  name: 'twitter',
  /* prettier-ignore */
  //                         $1            $2      $3      $4      $5      $6         $7
  template: '^(?:_DAYNAME_) (_MONTHNAME_) (_DAY_) (_H24_):(_MIN_):(_SEC_) (_OFFSET_) (_YEAR_)$',
  units: ['month', 'day', 'hour', 'minute', 'second', 'offset', 'year'],
});
