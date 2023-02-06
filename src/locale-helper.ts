import { BASE_LOOKUPS, buildDigits, DEFAULT_LOCALE, LATN, OTHER } from './data';
import { Unit } from './enums';
import { DateObject, DayNameLookup, Lookup, MeridiemLookup, MonthLookup, Template, Units } from './models';

export type LocaleCastConfig = Partial<Record<Units, string | number>>;

const cache: Record<string, LocaleHelper> = {};

export class LocaleHelper {
  public readonly lookups: Lookup = { ...BASE_LOOKUPS };
  private readonly vars: Template = { ...LATN };
  public numberingSystem: string;

  /**
   * Create a new instance with the given locale
   * @param {string} locale such as en, en-US, es, fr-FR, etc.
   */
  constructor(public readonly locale = DEFAULT_LOCALE) {
    if (typeof locale !== 'string') {
      throw new Error('locale must be a string');
    }

    this.numberingSystem = new Intl.NumberFormat(this.locale).resolvedOptions().numberingSystem;

    this.build();
  }

  /**
   * Get a singleton instance with the given locale
   * @param {string} locale such as en, en-US, es, fr-FR, etc.
   * @returns {LocaleHelper}
   */
  public static factory(locale = DEFAULT_LOCALE): LocaleHelper {
    if (!cache[locale.toLowerCase()]) {
      cache[locale.toLowerCase()] = new LocaleHelper(locale);
    }

    return cache[locale.toLowerCase()];
  }

  /**
   * Cast a string to an integer, minding numbering system
   * @param {string|number} digitString  Such as "2020" or "二〇二〇"
   * @returns {number}
   */
  public toInt(digitString: string | number): number {
    if (typeof digitString === 'number') {
      return digitString;
    }

    if (this.numberingSystem === 'latn') {
      return parseInt(digitString, 10);
    }

    let latn = '';

    for (let i = 0; i < digitString.length; i++) {
      latn += String(this.lookups.digit[digitString[i]]);
    }

    return parseInt(latn, 10);
  }

  /**
   * Given a list of unit names and matches, build result object
   * @param {Array} units  Unit names such as "year", "month" and "millisecond"
   * @param {Array} matches  The values matched by a Format's RegExp
   * @returns {Object}
   */
  public getObject(units: Array<Units | 'offset' | null>, matches: Array<string | null>): DateObject {
    const object: DateObject = {};

    units.forEach((unit, i) => {
      if (!unit) {
        return;
      }

      let match = matches[i + 1];

      if (match !== null) {
        match = match.toLowerCase();
        match = match.replace(/\.$/, '');

        if (unit === 'offset') {
          object.offset = this.offsetToMinutes(match);
        } else if (this.lookups[unit]) {
          object[unit] = +(this.lookups[unit] as Record<string, string>)[match] || this.toInt(match);
        } else {
          object[unit] = this.toInt(match);
        }
      }
    });

    return object;
  }

  /**
   * Take a response object and cast each unit to Number
   * @param {Object} object  An object with one or more units
   * @returns {Object}  An object with same units but Numeric
   */
  public castObject(object: LocaleCastConfig): DateObject {
    const casted: DateObject = {};

    Object.entries(object).forEach(([unit, value]) => {
      if (unit in Unit) {
        casted[unit] = this.toInt(value);
      }
    });

    if (typeof object.offset === 'string') {
      casted.offset = this.offsetToMinutes(object.offset);
    } else if (typeof object.offset === 'number') {
      casted.offset = object.offset;
    }

    return casted;
  }

  /**
   * Compile template into a RegExp and return it
   * @param {String} template  The template string
   * @returns {RegExp}
   */
  public compile(template: string): RegExp {
    const regexString = template.replace(/_([A-Z0-9]+)_/g, (_, $1: string) => {
      if (!this.vars[$1]) {
        throw new Error(`Template string contains invalid variable _${$1}_`);
      }

      return this.vars[$1] as string;
    });

    return new RegExp(regexString, 'i');
  }

  /**
   * Convert an offset string to Numeric minutes (e.g. "-0500", "+5", "+03:30")
   * @param {String} offsetString
   * @returns {Number}
   */
  public offsetToMinutes(offsetString: string): number {
    const captured = offsetString.match(/^([+-])(..?):?(..)?$/);

    if (captured) {
      const [, sign, hours, minutes] = captured;

      return (sign === '-' ? -1 : 1) * (this.toInt(hours) * 60 + this.toInt(minutes || 0));
    }

    return 0;
  }

  /**
   * Build lookups for digits, month names, day names, and meridiems based on the locale
   */
  private build(): void {
    if (this.numberingSystem !== 'latn') {
      this.buildDigits();
    }

    if (!/^en/i.test(this.locale)) {
      this.buildMonthNames();
      this.buildDaynames();
      this.buildMeridiems();
    }
  }

  /**
   * Build lookups for digits
   */
  public buildDigits(): void {
    const { group, lookup } = buildDigits(this.numberingSystem);

    this.lookups.digit = lookup;

    for (const name in OTHER) {
      if (!OTHER.hasOwnProperty(name)) {
        continue;
      }

      this.vars[name] = (OTHER[name] as string).replace(/\*/g, group);
    }
  }

  /**
   * Build lookup for month names
   */
  private buildMonthNames(): void {
    const vars: Partial<Template> = {};
    const lookup: Partial<MonthLookup> = {};

    if (/^fi/i.test(this.locale)) {
      const months = 'tammi|helmi|maalis|huhti|touko|kesä|heinä|elo|syys|loka|marras|joulu';

      months.split('|').forEach((month, idx) => {
        ['', 'k', 'kuu', 'kuuta'].forEach((suffix, i) => {
          const maybePeriod = i < 2 ? '\\.?' : '';
          vars[month + suffix + maybePeriod] = true;
          lookup[month + suffix] = idx + 1;
        });
      });
    } else {
      const dates: Date[] = [];
      const findMonth = (item: Intl.DateTimeFormatPart) => item.type === 'month';

      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        dates.push(new Date(2017, monthIdx, 1));
      }

      const dateStyles: Array<'full' | 'long' | 'medium' | 'short' | undefined> = ['full', 'long', 'medium'];

      for (const dateStyle of dateStyles) {
        const format = Intl.DateTimeFormat(this.locale, { dateStyle });

        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
          const parts = format.formatToParts(dates[monthIdx]);
          let text = parts.find(item => findMonth(item))?.value.toLowerCase() ?? '';

          if (/^ko/i.test(this.locale)) {
            // Korean word for month is sometimes used
            text += '월';
          }

          if (dateStyle === 'medium') {
            // some languages (including arabic and chinese) don't have a 'medium' size
            if (/^ar|zh/i.test(this.locale)) {
              return;
            }
            text = text.replace(/\.$/, '');
            vars[`${text}\\.?`] = true;
          } else {
            vars[text] = true;
          }

          lookup[text] = monthIdx + 1;
        }
      }

      const format = Intl.DateTimeFormat(this.locale, { month: 'short' });

      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        const parts = format.formatToParts(dates[monthIdx]);
        let text = parts.find(item => findMonth(item))?.value.toLowerCase() ?? '';

        text = text.replace(/\.$/, '');
        vars[`${text}\\.?`] = true;
        lookup[text] = monthIdx + 1;
      }
    }

    this.vars.MONTHNAME = Object.keys(vars).join('|');
    this.lookups.month = lookup as MonthLookup;
  }

  /**
   * Build lookup for day name
   */
  private buildDaynames(): void {
    const dates: Date[] = [];
    const findDay = (item: Intl.DateTimeFormatPart) => item.type === 'weekday';

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      dates.push(new Date(2017, 0, dayIndex + 1));
    }

    const weekdays: Array<'long' | 'short' | 'narrow' | undefined> = ['long', 'short'];
    const list: string[] = [];
    const lookup: Partial<DayNameLookup> = {};

    for (const weekday of weekdays) {
      const format = Intl.DateTimeFormat(this.locale, { weekday });

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const parts = format.formatToParts(dates[dayIndex]);
        let text = parts.find(item => findDay(item))?.value.toLowerCase() ?? '';

        if (weekday === 'short') {
          text = text.replace(/\.$/, '');
          list.push(`${text}\\.?`);
        } else {
          list.push(text);
        }
        lookup[text] = dayIndex;
      }
    }

    this.vars.DAYNAME = list.join('|');
    this.lookups.dayname = lookup as DayNameLookup;
  }

  /**
   * Build lookup for meridiems (e.g. AM/PM)
   */
  private buildMeridiems(): void {
    const dates = [new Date(2017, 0, 1), new Date(2017, 0, 1, 23, 0, 0)];
    const findDayPeriod = (item: Intl.DateTimeFormatPart) => item.type === 'dayPeriod';
    const list: string[] = [];
    const lookup: Partial<MeridiemLookup> = {};
    const format = Intl.DateTimeFormat(this.locale, { timeStyle: 'long' });

    for (let i = 0; i < 2; i++) {
      const parts = format.formatToParts(dates[i]);
      const dayPeriod = parts.find(item => findDayPeriod(item));

      if (!dayPeriod) {
        // this locale does not use AM/PM
        return;
      }
      const text = dayPeriod.value.toLowerCase();

      list.push(text);
      lookup[text] = i * 12;
    }

    this.vars.MERIDIEM = list.join('|');
    this.lookups.meridiem = lookup as MeridiemLookup;
  }
}
