import { Digits, DigitsLookup } from '../models';

export const START_CODES: Record<string, number> = {
  arab: 1632,
  arabext: 1776,
  bali: 6992,
  beng: 2534,
  deva: 2406,
  fullwide: 65296,
  gujr: 2790,
  khmr: 6112,
  knda: 3302,
  laoo: 3792,
  limb: 6470,
  mlym: 3430,
  mong: 6160,
  mymr: 4160,
  orya: 2918,
  tamldec: 3046,
  telu: 3174,
  thai: 3664,
  tibt: 3872,
};

// full-width numbers, hanidec numbers, latin numbers (\d)
export const CHINESE_GROUP = '[０１２３４５６７８９〇一二三四五六七八九\\d]';

export const DEFAULT_LOOKUP: DigitsLookup = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  '０': 0,
  '１': 1,
  '２': 2,
  '３': 3,
  '４': 4,
  '５': 5,
  '６': 6,
  '７': 7,
  '８': 8,
  '９': 9,
  〇: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
};

const cache: Record<string, Digits> = {};

export function buildDigits(numberingSystem: string): Digits {
  if (cache[numberingSystem]) {
    return cache[numberingSystem];
  }

  if (numberingSystem === 'fullwide' || numberingSystem === 'hanidec') {
    return {
      group: CHINESE_GROUP,
      lookup: { ...DEFAULT_LOOKUP },
    };
  }

  const startCode = START_CODES[numberingSystem];

  if (!startCode) {
    // unknown numbering system; treat like latn
    return { group: '\\d', lookup: { ...DEFAULT_LOOKUP } };
  }

  const start = String.fromCharCode(startCode);
  const end = String.fromCharCode(startCode + 9);
  const lookup = {};

  for (let i = 0; i < 10; i++) {
    lookup[String.fromCharCode(startCode + i)] = i;
  }

  cache[numberingSystem] = {
    group: `[${start}-${end}]`,
    lookup,
  };

  return cache[numberingSystem];
}
