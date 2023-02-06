import { normalizeLocale } from './normalize-locale';

export let DEFAULT_LOCALE = 'en-US';

if (typeof navigator !== 'undefined') {
  DEFAULT_LOCALE = normalizeLocale((Array.isArray(navigator.languages) ? navigator.languages[0] : navigator.language) as string);
} else if (typeof process !== 'undefined') {
  const locale = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || process.env.LANGUAGE;

  if (typeof locale === 'string') {
    DEFAULT_LOCALE = normalizeLocale(locale);
  }
}
