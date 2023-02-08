import { DEFAULT_LOCALE } from './data/default-locale';
import { isNullOrUndefined } from './is-null-or-undefined';
import { LocaleHelper } from './locale-helper';
import { DateObject, Units } from './models';
import { Parser } from './parser';

export type FormatHandler = (matches: Array<string | null>, locale: string) => DateObject | null;

export interface FormatDefinition {
  /**
   * Name of the formatter
   */
  name: string;

  /**
   * A template for RegExp that can handle multiple languages
   */
  template?: string;

  /**
   * A RegExp to match against
   */
  matcher?: RegExp;

  /**
   * If the template or RegExp match exact units, you can define the units
   */
  units?: Array<Units | null>;

  /**
   * A flexible alternative to units
   */
  handler?: FormatHandler;

  /**
    A list of locales that this format should be restricted to
   */
  locales?: string[];

  /**
   * The parser that created this format
   */
  parser?: Parser;
}

export class Format implements FormatDefinition {
  /**
   * Name of the formatter
   */
  public readonly name: string;

  /**
   *  A template for RegExp that can handle multiple languages
   */
  public readonly template?: string;

  /**
   * A RegExp to match against
   */
  public readonly matcher?: RegExp;

  /**
   * If the template or RegExp match exact units, you can define the units
   */
  public readonly units?: Array<Units | null>;

  /**
   * A flexible alternative to units; must return an object
   */
  public readonly handler?: FormatHandler;

  /**
   * A list of locales that this format should be restricted to
   */
  public readonly locales?: string[];

  /**
   * The parser that created this format
   */
  public parser?: Parser;

  /**
   * A cache of RegExp indexed by locale name
   */
  private readonly regexByLocale: Record<string, RegExp> = {};

  constructor({ name, template, matcher, units, handler, locales }: FormatDefinition) {
    if (!Array.isArray(units) && typeof handler !== 'function') {
      throw new Error('new Format must receive a "units" array or "handler" function');
    }

    if (typeof template !== 'string' && !(matcher instanceof RegExp)) {
      throw new Error('new Format must receive a "template" string or "matcher" RegExp');
    }

    this.name = name;
    this.template = template;
    this.units = units;
    this.matcher = matcher;
    this.handler = handler;
    this.locales = locales;
  }

  /**
   * Build the RegExp from the template for a given locale
   * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {RegExp}  A RegExp that matches when this format is recognized
   */
  public getRegExp(locale = DEFAULT_LOCALE): RegExp {
    if (this.template) {
      if (!this.regexByLocale[locale]) {
        this.regexByLocale[locale] = LocaleHelper.factory(locale).compile(this.template);
      }

      return this.regexByLocale[locale];
    }

    return this.matcher!;
  }

  /**
   * Run this format's RegExp against the given string
   * @param {String} string  The date string
   * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {Array|null}  Array of matches or null on non-match
   */
  public getMatches(string: string, locale = DEFAULT_LOCALE): Array<string> | null {
    const matches = string.match(this.getRegExp(locale)) as Array<string> | null;

    return matches;
  }

  /**
   * Given matches against this RegExp, convert to object
   * @param {String[]} matches  An array of matched parts
   * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {Object}  Object which may contain year, month, day, hour, minute, second, millisecond, offset
   */
  public toDateTime(matches: Array<string | null>, locale = DEFAULT_LOCALE): DateObject<number> | null {
    const locHelper = LocaleHelper.factory(locale);

    if (this.units) {
      return locHelper.getObject(this.units, matches, this.name);
    }

    const dateObject = this.handler!(matches, locale);

    if (isNullOrUndefined(dateObject)) {
      return null;
    }

    return locHelper.castObject(dateObject, this.name);
  }

  /**
   * Attempt to parse a string in this format
   * @param {String} string  The date string
   * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {Object|null}  Null if format can't handle this string, Object for result or error
   */
  public attempt(string: string, locale = DEFAULT_LOCALE): DateObject<number> | null {
    string = String(string).trim();

    const matches = this.getMatches(string, locale);

    if (matches) {
      const dateObject = this.toDateTime(matches, locale);

      if (!isNullOrUndefined(dateObject)) {
        return dateObject;
      }
    }

    return null;
  }
}
