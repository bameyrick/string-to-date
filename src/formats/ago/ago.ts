import { UNIT_SHORTCUTS } from '../../data/unit-shortcuts';
import { Format } from '../../format';

export const ago = new Format({
  name: 'ago',
  /* prettier-ignore */
  //          $1          $2        $3                                                                                   $4
  matcher: /^(\+|-|in|) ?([\d.]+) ?(years?|months?|weeks?|days?|hours?|minutes?|seconds?|milliseconds?|ms|s|m|h|w|d|M|y)( ago)?$/i,
  handler: ([, sign, amount, unit, isAgo]) => {
    let amountFloat = parseFloat(amount!);

    if (unit!.length <= 2) {
      unit = UNIT_SHORTCUTS[unit!];
    } else {
      unit = unit!.replace(/s$/, '');
      unit = unit.toLowerCase();
    }

    if (unit === 'week') {
      unit = 'day';
      amountFloat *= 7;
    }

    if (sign === '-' || isAgo) {
      amountFloat *= -1;
    }
    const now = new Date();

    if (unit === 'millisecond') {
      now.setUTCMilliseconds(now.getUTCMilliseconds() + amountFloat);
    } else if (unit === 'second') {
      now.setUTCSeconds(now.getUTCSeconds() + amountFloat);
    } else if (unit === 'minute') {
      now.setUTCMinutes(now.getUTCMinutes() + amountFloat);
    } else if (unit === 'hour') {
      now.setUTCHours(now.getUTCHours() + amountFloat);
    } else if (unit === 'day') {
      now.setUTCDate(now.getUTCDate() + amountFloat);
    } else if (unit === 'month') {
      now.setUTCMonth(now.getUTCMonth() + amountFloat);
    } else if (unit === 'year') {
      now.setUTCFullYear(now.getUTCFullYear() + amountFloat);
    }

    return {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      day: now.getUTCDate(),
      hour: now.getUTCHours(),
      minute: now.getUTCMinutes(),
      second: now.getUTCSeconds(),
      millisecond: now.getUTCMilliseconds(),
    };
  },
});
