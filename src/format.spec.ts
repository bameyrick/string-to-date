import { Format } from './format';

describe('Format', () => {
  it('should require units or handler', () => {
    function missingUnitsAndHandler() {
      return new Format({ template: '', name: 'test' });
    }

    expect(missingUnitsAndHandler).toThrowError();
  });

  it('should require template or matcher', () => {
    function missingTemplateAndRegex() {
      return new Format({ units: [], name: 'test' });
    }

    expect(missingTemplateAndRegex).toThrowError();
  });

  it('should build RegExp from template', () => {
    const format = new Format({ handler: () => null, template: 'year:_YEAR_', name: 'test' });
    const regex = format.getRegExp();

    expect(regex).toEqual(/year:[1-9]\d{3}|\d{2}/i);
  });

  it('should getMatches()', () => {
    const format = new Format({ handler: () => null, matcher: /foo:(\d)(\d)/, name: 'test' });
    const matches = [...format.getMatches('foo:42')!];

    expect(matches).toEqual(['foo:42', '4', '2']);
  });

  it('should convert numeric matches to Object', () => {
    const format = new Format({
      units: ['year', 'month', 'day'],
      matcher: /./,
      name: 'test',
    });
    const actual = format.toDateTime([null, '2020', '10', '13']);

    expect(actual).toEqual(expect.objectContaining({ year: 2020, month: 10, day: 13 }));
  });

  it('should convert monthname matches to Object', () => {
    const format = new Format({
      units: ['year', 'month', 'day'],
      matcher: /./,
      name: 'test',
    });
    const actual = format.toDateTime([null, '2020', 'oct', '13']);

    expect(actual).toEqual(expect.objectContaining({ year: 2020, month: 10, day: 13 }));
  });

  it('should convert 2-digit years', () => {
    const format = new Format({
      units: ['year', 'month', 'day', 'minute'],
      matcher: /./,
      name: 'test',
    });
    const actual = format.toDateTime([null, '20', 'october', '13', '59']);

    expect(actual).toEqual(expect.objectContaining({ year: 2020, month: 10, day: 13, minute: 59 }));
  });

  it('should attempt to parse', () => {
    const format = new Format({
      matcher: /(\d+)m (\d+)s/,
      units: ['minute', 'second'],
      name: 'test',
    });
    const actual = format.attempt('56m 22s');

    expect(actual).toMatchObject({ minute: 56, second: 22 });
  });

  it('should trim()', () => {
    const format = new Format({
      matcher: /^(\d+)s (\d+)ms$/,
      units: ['second', 'millisecond'],
      name: 'test',
    });
    const actual = format.attempt(' 56s 813ms\t');

    expect(actual).toEqual(expect.objectContaining({ second: 56, millisecond: 813 }));
  });
});
