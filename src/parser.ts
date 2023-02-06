import { DEFAULT_LOCALE } from './data';
import { Format } from './format';
import { isNullOrUndefined } from './is-null-or-undefined';
import { DateObject } from './models';

export class Parser {
  public readonly formats: Format[] = [];

  /**
   * Register a format object representing a parseable date format
   * @param {Format} format  The Format to add
   * @returns {Parser}
   * @chainable
   */
  public addFormat(format: Format): Parser {
    this.formats.push(format);

    format.parser = this;

    return this;
  }

  /**
   * Register multiple formats
   * @param {Format[]} formats  The array of Formats to add
   * @returns {Parser}
   * @chainable
   */
  public addFormats(formats: Format[]): Parser {
    formats.forEach(format => this.addFormat(format));

    return this;
  }

  /**
   * Unregister a format
   * @param {Format} format  The Format to remove
   * @returns {Boolean}  true if format was found and removed, false if it wasn't registered
   */
  public removeFormat(format: Format): boolean {
    const index = this.formats.indexOf(format);

    if (index > -1) {
      const old = this.formats[index];
      this.formats.splice(index, 1);

      old.parser = undefined;

      return true;
    }

    return false;
  }

  /**
   * Attempt to parse a date string
   * @param {String} date  A parseable date string
   * @param {String} locale  The name of the locale
   * @returns {Date|String} - Returns a Date object if the string was parsed successfully, otherwise returns an error message as a string
   */
  public parse(date: string, locale = DEFAULT_LOCALE): Date | null {
    const result = this.parseToObject(date, locale);

    if (isNullOrUndefined(result)) {
      return null;
    }

    const { year, month, day, hour, minute, second, millisecond }: DateObject = {
      year: 1970,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      ...this.parseToObject(date, locale),
    };

    return new Date(+year, +month - 1, +day, +hour, +minute, +second, +millisecond);
  }

  /**
   * Attempt to parse a date string
   * @param {String} date  A parseable date string
   * @param {String} locale  The name of the locale
   * @returns {Object | null} - Returns a DateObject if the string was parsed successfully, otherwise it returns null
   */
  public parseToObject(date: string, locale = DEFAULT_LOCALE): DateObject<number> | null {
    date = date.replace(/\s+/g, ' ').trim();

    for (const format of this.formats) {
      if (Array.isArray(format.locales) && format.locales.length > 0 && !format.locales.includes(new Intl.Locale(locale).baseName)) {
        // some formats only make sense for certain locales, e.g. month/day/year
        continue;
      }

      const dateObject = format.attempt(date, locale);

      if (dateObject) {
        return dateObject;
      }
    }

    return null;
  }
}
