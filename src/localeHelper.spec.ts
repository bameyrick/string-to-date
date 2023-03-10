import { LocaleHelper } from './locale-helper';
import { Units } from './models';

describe('LocaleHelper general', () => {
  it('should use singleton pattern', () => {
    const l1 = LocaleHelper.factory('en');
    const l2 = LocaleHelper.factory('en');

    expect(l1).toBe(l2);
  });

  it('should use singleton pattern (case insensitive)', () => {
    const l1 = LocaleHelper.factory('en');
    const l2 = LocaleHelper.factory('En');

    expect(l1).toBe(l2);
  });

  it('should factory default to system default', () => {
    const l1 = LocaleHelper.factory();

    expect(l1.locale).toBeTruthy();
  });

  it('should instance default to system default', () => {
    const l1 = new LocaleHelper();

    expect(l1.locale).toBeTruthy();
  });

  it(`should throw an error if locale isn't a string`, () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(() => new LocaleHelper(123 as any)).toThrow('locale must be a string');
  });

  it('should store locale name', () => {
    const l = new LocaleHelper('en-GB');

    expect(l.locale).toBe('en-GB');
  });

  it('should build objects from numbers', () => {
    const l = new LocaleHelper('en');
    const units: Units[] = ['year', 'month', 'offset'];
    const matches = [null, '2020', '10', '+07:30'];
    const expected = { year: 2020, month: 10, offset: 450 };

    expect(l.getObject(units, matches, 'test')).toEqual(expect.objectContaining(expected));
  });

  it('should build objects from month name', () => {
    const l = new LocaleHelper('en');
    const units: Units[] = ['month', 'minute'];
    const matches = [null, 'september', '59'];
    const expected = { month: 9, minute: 59 };

    expect(l.getObject(units, matches, 'test')).toEqual(expect.objectContaining(expected));
  });

  it('should build objects from short month name', () => {
    const l = new LocaleHelper('en');
    const units: Units[] = ['month', 'hour'];
    const matches = [null, 'sep', '23'];
    const expected = { month: 9, hour: 23 };

    expect(l.getObject(units, matches, 'test')).toEqual(expect.objectContaining(expected));
  });

  it('should build objects from short month name with period', () => {
    const l = new LocaleHelper('en');
    const units: Units[] = ['month', 'second'];
    const matches = [null, 'sep.', '00'];
    const expected = { month: 9, second: 0 };

    expect(l.getObject(units, matches, 'test')).toEqual(expect.objectContaining(expected));
  });

  it('should build objects from "deva" numbers', () => {
    const l = new LocaleHelper('ar');
    const units: Units[] = ['year', 'month'];
    const matches = [null, '????????', '??'];
    const expected = { year: 2017, month: 6 };

    expect(l.getObject(units, matches, 'test')).toMatchObject(expected);
  });

  it('should handle invalid offsets', () => {
    const l = new LocaleHelper('en');
    const actual = l.offsetToMinutes('foo');

    expect(actual).toEqual(0);
  });

  it('should error on bad templates', () => {
    const l = new LocaleHelper('ar');

    function invalidFoobar() {
      return l.compile('_FOOBAR_');
    }

    expect(invalidFoobar).toThrowError('Template string contains invalid variable _FOOBAR_');
  });
});

describe('LocaleHelper numbering systems', () => {
  it('should cast digit string to number (latn)', () => {
    const l = new LocaleHelper('en');

    expect(l.toInt('1234567890')).toBe(1234567890);
  });

  it('should cast digit string to number (invalid)', () => {
    const l = new LocaleHelper('en-u-nu-invalid');

    expect(l.toInt('1234567890')).toBe(1234567890);
  });

  it('should cast digit string to number (arab)', () => {
    const l = new LocaleHelper('en-u-nu-arab');

    expect(l.toInt('????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (arabext)', () => {
    const l = new LocaleHelper('en-u-nu-arabext');

    expect(l.toInt('????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (bali)', () => {
    const l = new LocaleHelper('en-u-nu-bali');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (beng)', () => {
    const l = new LocaleHelper('en-u-nu-beng');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (deva)', () => {
    const l = new LocaleHelper('en-u-nu-deva');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (fullwide)', () => {
    const l = new LocaleHelper('en-u-nu-fullwide');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
    expect(l.toInt('1234567890')).toBe(1234567890);
  });

  it('should cast digit string to number (gujr)', () => {
    const l = new LocaleHelper('en-u-nu-gujr');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (hanidec)', () => {
    const l = new LocaleHelper('en-u-nu-hanidec');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
    expect(l.toInt('1234567890')).toBe(1234567890);
  });

  it('should cast digit string to number (khmr)', () => {
    const l = new LocaleHelper('en-u-nu-khmr');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (knda)', () => {
    const l = new LocaleHelper('en-u-nu-knda');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (laoo)', () => {
    const l = new LocaleHelper('en-u-nu-laoo');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (limb)', () => {
    const l = new LocaleHelper('en-u-nu-limb');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (mlym)', () => {
    const l = new LocaleHelper('en-u-nu-mlym');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (mong)', () => {
    const l = new LocaleHelper('en-u-nu-mong');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (mymr)', () => {
    const l = new LocaleHelper('en-u-nu-mymr');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (orya)', () => {
    const l = new LocaleHelper('en-u-nu-orya');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (tamldec)', () => {
    const l = new LocaleHelper('en-u-nu-tamldec');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (telu)', () => {
    const l = new LocaleHelper('en-u-nu-telu');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (thai)', () => {
    const l = new LocaleHelper('en-u-nu-thai');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });

  it('should cast digit string to number (tibt)', () => {
    const l = new LocaleHelper('en-u-nu-tibt');

    expect(l.toInt('??????????????????????????????')).toBe(1234567890);
  });
});
