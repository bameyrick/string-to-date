import { Format } from './format';
import { Parser } from './parser';

describe('Parser', () => {
  it('should set a parser prop on the format', () => {
    const format = new Format({ units: [], template: '', name: 'test' });
    const parser = new Parser();

    parser.addFormat(format);

    expect(format.parser).toBe(parser);
    expect(parser.formats).toEqual([format]);
  });

  it('should remove format', () => {
    const format = new Format({ units: [], template: '', name: 'test' });
    const parser = new Parser();
    parser.addFormat(format);

    const result = parser.removeFormat(format);

    expect(result).toBe(true);
    expect(format.parser).toBe(undefined);
    expect(parser.formats).toEqual([]);
  });

  it('should fail to remove unadded format', () => {
    const format = new Format({ units: [], template: '', name: 'test' });
    const parser = new Parser();
    const result = parser.removeFormat(format);

    expect(result).toBe(false);
  });

  it('should attempt() a single format', () => {
    const format = new Format({ units: [], template: '', name: 'test' });
    const spy = jest.spyOn(format, 'attempt').mockReturnValue(null);
    const parser = new Parser();

    parser.addFormat(format);

    const result = parser.parseToObject('date', 'locale');
    const result2 = parser.parse('date', 'locale');

    expect(result).toEqual(null);
    expect(result2).toEqual(null);
    expect(spy).toHaveBeenCalledWith('date', 'locale');
  });

  it('should attempt() 2 formats', () => {
    const format1 = new Format({ units: [], template: '', name: 'test' });
    const spy1 = jest.spyOn(format1, 'attempt').mockReturnValue(null);
    const format2 = new Format({ units: [], template: '', name: 'test' });
    const spy2 = jest.spyOn(format2, 'attempt').mockReturnValue(null);

    const parser = new Parser();

    parser.addFormat(format1);
    parser.addFormat(format2);

    const result = parser.parseToObject('date', 'locale');
    const result2 = parser.parse('date', 'locale');

    expect(result).toEqual(null);
    expect(result2).toEqual(null);
    expect(spy1).toHaveBeenCalledWith('date', 'locale');
    expect(spy2).toHaveBeenCalledWith('date', 'locale');
  });

  it('should return invalid when all attempt()s fail', () => {
    const format = new Format({ units: [], template: '', name: 'test' });
    jest.spyOn(format, 'attempt').mockReturnValue(null);
    const parser = new Parser();

    parser.addFormat(format);

    const result = parser.parseToObject('baddate', 'locale');
    const result2 = parser.parse('baddate', 'locale');

    expect(result).toEqual(null);
    expect(result2).toEqual(null);
  });

  it('should return invalid on empty string', () => {
    const format = new Format({ units: [], template: '', name: 'test' });

    jest.spyOn(format, 'attempt').mockReturnValue(null);

    const parser = new Parser();
    parser.addFormat(format);

    const result = parser.parseToObject('', 'locale');
    const result2 = parser.parse('', 'locale');

    expect(result).toEqual(null);
    expect(result2).toEqual(null);
  });
});
