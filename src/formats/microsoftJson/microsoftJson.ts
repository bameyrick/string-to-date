import { Format } from '../../format';

export const microsoftJson = new Format({
  matcher: /^\/Date\((\d+)([+-]\d{4})?\)\/$/,
  handler: matches => {
    const milliseconds = parseInt(matches[1]!, 10);
    const date = new Date(milliseconds);

    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
      millisecond: date.getUTCMilliseconds(),
      offset: matches[2] || 0,
    };
  },
});
