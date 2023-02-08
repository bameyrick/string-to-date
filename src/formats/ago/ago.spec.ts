import StringToDate from '../..';

describe('(amount) (unit) ago', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "8 years ago"', () => {
    const actual = StringToDate.parseToObject('8 years ago');
    const actual2 = StringToDate.parse('8 years ago');

    const expected = {
      year: 2012,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
    expect(actual2).toEqual(new Date(Date.UTC(2012, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "7 months ago"', () => {
    const actual = StringToDate.parseToObject('7 months ago');
    const expected = {
      year: 2019,
      month: 8,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "2 weeks"', () => {
    const actual = StringToDate.parseToObject('2 weeks ago');
    const expected = {
      year: 2020,
      month: 2,
      day: 16,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "2 days ago"', () => {
    const actual = StringToDate.parseToObject('2 days ago');
    const expected = {
      year: 2020,
      month: 2,
      day: 28,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "18 hours ago"', () => {
    const actual = StringToDate.parseToObject('18 hours ago');
    const expected = {
      year: 2020,
      month: 2,
      day: 29,
      hour: 21,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "1 minute ago"', () => {
    const actual = StringToDate.parseToObject('1 minute ago');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 15,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "30 seconds ago"', () => {
    const actual = StringToDate.parseToObject('30 seconds ago');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 15,
      second: 30,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "199 milliseconds ago"', () => {
    const actual = StringToDate.parseToObject('199 milliseconds ago');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 1,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe('-(amount) (unit)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "-8 years"', () => {
    const actual = StringToDate.parseToObject('-8 years');
    const expected = {
      year: 2012,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-7 months"', () => {
    const actual = StringToDate.parseToObject('-7 months');
    const expected = {
      year: 2019,
      month: 8,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-2 days"', () => {
    const actual = StringToDate.parseToObject('-2 days');
    const expected = {
      year: 2020,
      month: 2,
      day: 28,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-2 weeks"', () => {
    const actual = StringToDate.parseToObject('-2 weeks');
    const expected = {
      year: 2020,
      month: 2,
      day: 16,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-18 hours"', () => {
    const actual = StringToDate.parseToObject('-18 hours');
    const expected = {
      year: 2020,
      month: 2,
      day: 29,
      hour: 21,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-1 minute"', () => {
    const actual = StringToDate.parseToObject('-1 minute');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 15,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-30 seconds"', () => {
    const actual = StringToDate.parseToObject('-30 seconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 15,
      second: 30,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "-199 milliseconds"', () => {
    const actual = StringToDate.parseToObject('-199 milliseconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 1,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe('in (amount) (unit)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "in 8 years"', () => {
    const actual = StringToDate.parseToObject('in 8 years');
    const expected = {
      year: 2028,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 17 months"', () => {
    const actual = StringToDate.parseToObject('in 17 months');
    const expected = {
      year: 2021,
      month: 8,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 1 week"', () => {
    const actual = StringToDate.parseToObject('in 1 week');
    const expected = {
      year: 2020,
      month: 3,
      day: 8,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 2 days"', () => {
    const actual = StringToDate.parseToObject('in 2 days');
    const expected = {
      year: 2020,
      month: 3,
      day: 3,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 18 hours"', () => {
    const actual = StringToDate.parseToObject('in 18 hours');
    const expected = {
      year: 2020,
      month: 3,
      day: 2,
      hour: 9,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 1 minute"', () => {
    const actual = StringToDate.parseToObject('in 1 minute');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 17,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 30 seconds"', () => {
    const actual = StringToDate.parseToObject('in 30 seconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 30,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "in 199 milliseconds"', () => {
    const actual = StringToDate.parseToObject('in 199 milliseconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 399,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe('+(amount) (unit)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "+8 years"', () => {
    const actual = StringToDate.parseToObject('+8 years');
    const expected = {
      year: 2028,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+17 months"', () => {
    const actual = StringToDate.parseToObject('+17 months');
    const expected = {
      year: 2021,
      month: 8,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+2 weeks"', () => {
    const actual = StringToDate.parseToObject('+2 weeks');
    const expected = {
      year: 2020,
      month: 3,
      day: 15,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+2 days"', () => {
    const actual = StringToDate.parseToObject('+2 days');
    const expected = {
      year: 2020,
      month: 3,
      day: 3,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+18 hours"', () => {
    const actual = StringToDate.parseToObject('+18 hours');
    const expected = {
      year: 2020,
      month: 3,
      day: 2,
      hour: 9,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+1 minute"', () => {
    const actual = StringToDate.parseToObject('+1 minute');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 17,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+30 seconds"', () => {
    const actual = StringToDate.parseToObject('+30 seconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 30,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+199 milliseconds"', () => {
    const actual = StringToDate.parseToObject('+199 milliseconds');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 399,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe('+(amount)(short unit)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200)));
  });

  it('should handle "+8y"', () => {
    const actual = StringToDate.parseToObject('+8y');
    const expected = {
      year: 2028,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+17M"', () => {
    const actual = StringToDate.parseToObject('+17M');
    const expected = {
      year: 2021,
      month: 8,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+2w"', () => {
    const actual = StringToDate.parseToObject('+2w');
    const expected = {
      year: 2020,
      month: 3,
      day: 15,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+2d"', () => {
    const actual = StringToDate.parseToObject('+2d');
    const expected = {
      year: 2020,
      month: 3,
      day: 3,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+18h"', () => {
    const actual = StringToDate.parseToObject('+18h');
    const expected = {
      year: 2020,
      month: 3,
      day: 2,
      hour: 9,
      minute: 16,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+1m"', () => {
    const actual = StringToDate.parseToObject('+1m');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 17,
      second: 0,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+30s"', () => {
    const actual = StringToDate.parseToObject('+30s');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 30,
      millisecond: 200,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle "+199ms"', () => {
    const actual = StringToDate.parseToObject('+199ms');
    const expected = {
      year: 2020,
      month: 3,
      day: 1,
      hour: 15,
      minute: 16,
      second: 0,
      millisecond: 399,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});
