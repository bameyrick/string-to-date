import StringToDate from '../..';

describe('12 hour time', () => {
  it('should handle hours: "8pm"', () => {
    const actual = StringToDate.parseToObject('8pm');
    const expected = {
      hour: 20,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle invalid date: "Foobarbaz at 8pm"', () => {
    const actual = StringToDate.parseToObject('Foobarbaz at 8pm');

    expect(actual).toBe(null);
  });

  it('should handle dots in "a.m.": "4 a.m."', () => {
    const actual = StringToDate.parseToObject('4 a.m.');
    const expected = {
      hour: 4,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle minutes: "8:15pm"', () => {
    const actual = StringToDate.parseToObject('8:15pm');
    const expected = {
      hour: 20,
      minute: 15,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle seconds: "8:15:14am"', () => {
    const actual = StringToDate.parseToObject('8:15:14am');
    const expected = {
      hour: 8,
      minute: 15,
      second: 14,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle leap seconds: "11:59:60pm"', () => {
    const actual = StringToDate.parseToObject('11:59:60pm');
    const expected = {
      hour: 23,
      minute: 59,
      second: 60,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle dates: "March 14, 2015 9:26pm"', () => {
    const actual = StringToDate.parseToObject('March 14, 2015 9:26pm');
    const expected = {
      year: 2015,
      month: 3,
      day: 14,
      hour: 21,
      minute: 26,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle dates joined with "at": "March 14, 2015 at 9:26:53 am"', () => {
    const actual = StringToDate.parseToObject('March 14, 2015 at 9:26:53 am');
    const expected = {
      year: 2015,
      month: 3,
      day: 14,
      hour: 9,
      minute: 26,
      second: 53,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should handle dates with commas: "4/19/2021, 10:04:02 AM"', () => {
    const actual = StringToDate.parseToObject('4/19/2021, 10:04:02 AM', 'en-US');
    const expected = {
      year: 2021,
      month: 4,
      day: 19,
      hour: 10,
      minute: 4,
      second: 2,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});
