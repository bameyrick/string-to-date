import { Format } from '../../format';
import { DateObject } from '../../models';

export const today = new Format({
  matcher: /^(now|today|tomorrow|yesterday)/i,
  handler: match => {
    const now = new Date();
    const keyword = match[1]!.toLowerCase();

    switch (keyword) {
      case 'tomorrow': {
        // JavaScript automatically handles flowing from one day to the next
        // For example, 31 jan 2020 will auto convert to 1 feb 2020
        now.setUTCDate(now.getUTCDate() + 1);
        break;
      }
      case 'yesterday': {
        now.setUTCDate(now.getUTCDate() - 1);
        break;
      }
    }

    const result: DateObject = {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      day: now.getUTCDate(),
    };

    if (keyword === 'now') {
      result.hour = now.getUTCHours();
      result.minute = now.getUTCMinutes();
      result.second = now.getUTCSeconds();
      result.millisecond = now.getUTCMilliseconds();
    }

    return result;
  },
});
