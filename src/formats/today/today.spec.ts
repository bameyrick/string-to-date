import StringToDate from '../..';

describe('now, today, yesterday and tomorrow', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2019, 7 /* august */, 31, 23, 59, 59, 999)));
  });

  it('should handle "now"', () => {
    const actual = StringToDate.parseToObject('now');
    const expected = {
      year: 2019,
      month: 8,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    };

    expect(actual).toEqual(expected);
  });

  it('should handle "today"', () => {
    const actual = StringToDate.parseToObject('today');
    const expected = {
      year: 2019,
      month: 8,
      day: 31,
    };

    expect(actual).toEqual(expected);
  });

  it('should handle "tomorrow"', () => {
    const actual = StringToDate.parseToObject('tomorrow');
    const expected = {
      year: 2019,
      month: 9,
      day: 1,
    };

    expect(actual).toEqual(expected);
  });

  it('should handle "yesterday"', () => {
    const actual = StringToDate.parseToObject('yesterday');
    const expected = {
      year: 2019,
      month: 8,
      day: 30,
    };

    expect(actual).toEqual(expected);
  });
});
