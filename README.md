# @qntm-code/string-to-date

Parse a wide range of date formats including human-input dates.

## Installation

```bash
npm install string-to-date
```

or

```bash
yarn add string-to-date
```

## Table of Contents

- [@qntm-code/string-to-date](#qntm-codestring-to-date)
  - [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Supported formats](#supported-formats)
  - [Locale Support](#locale-support)
  - [Adding custom formats](#adding-custom-formats)
    - [Example 1: matcher + units](#example-1-matcher--units)
    - [Example 2: matcher + handler](#example-2-matcher--handler)
    - [Example 3: template + units](#example-3-template--units)
    - [Example 4: template + handler](#example-4-template--handler)
    - [Removing parsing rules](#removing-parsing-rules)
    - [Creating a custom parser](#creating-a-custom-parser)
  - [Unit tests](#unit-tests)
    - [Testing](#testing)
  - [Contributing](#contributing)
  - [Exhaustive list of date formats](#exhaustive-list-of-date-formats)
  - [Credits](#credits)

## Usage

There are two ways to use string-to-date:

1.) Return a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
object.

`parse()` arguments:

| argument | type     | description         | optional |
| -------- | -------- | ------------------- | -------- |
| `input`  | `string` | The string to parse | no       |
| `locale` | `string` | The locale to use   | yes      |

Example:

```typescript
import StringToDate from 'string-to-date';

StringToDate.parse('2020-10-15');
// same as new Date(2020, 9, 15, 0, 0, 0, 0)
```

If the string cannot be parsed, `null` is returned.

2.) Return an object with one or more integer values for the following keys: year,
month, day, hour, minute, second, millisecond, offset.

`parseToObject()` arguments:

| argument | type     | description         | optional |
| -------- | -------- | ------------------- | -------- |
| `input`  | `string` | The string to parse | no       |
| `locale` | `string` | The locale to use   | yes      |

Example:

```typescript
import StringToDate from 'string-to-date'

StringToDate.parseToObject('15 Oct 2020 at 6pm');
// returns:
{
  year: 2020,
  month: 10,
  day: 15,
  hour: 18,
}
```

If the string cannot be parsed, `null` is returned.

## Supported formats

Summary:

- 24 hour time
- 12 hour time
- timezone offsets
- timezone abbreviations
- year month day
- year monthname day
- month day year
- monthname day year
- day month year
- day monthname year
- +/-/ago periods
- now/today/yesterday/tomorrow
- Twitter

[Exhaustive list of date formats](#exhaustive-list-of-date-formats)

## Locale Support

string-to-date supports any locale that your runtime's `Intl` (ECMAScript
Internationalization API) supports. In browsers that usually means the operating
system language. In Node, that means the compiled language or the icu modules
included.

## Adding custom formats

string-to-date has an `addFormat()` function to add a custom parser.

First, parsers must have `matcher` or `template`.

- `matcher`: A RegExp to match a string
- `template`: A string with template variables such as `_YEAR_` `_MONTH_` etc.
  that will be converted to a regular expression

Second, parsers must have `units` or `handler`.

- `units`: An array of unit strings to fit matches into (year, month, day, etc.)
- `handler`: A function that takes matches and returns an object with keys year,
  month, day etc.

### Example 1: matcher + units

```typescript
import StringToDate from 'string-to-date';

parser.addFormat(
  new Format({
    matcher: /^(\d+) days? into month (\d+) in year (\d{4})$/,
    units: ['day', 'month', 'year'],
  })
);
```

Keep in mind that `\d` does not support other numbering system such as Chinese
or Bengali. To support those you can use the `template` option given in
[example 3](#example-3-template--units) and
[example 4](#example-4-template--handler).

### Example 2: matcher + handler

```typescript
import StringToDate from 'string-to-date';

parser.addFormat(
  new Format({
    matcher: /^Q([1-4]) (\d{4})$/,
    handler: function ([, quarter, year]) {
      const monthByQuarter = { 1: 1, 2: 4, 3: 7, 4: 10 };
      const month = monthByQuarter[quarter];
      return { year, month };
    },
  })
);
```

### Example 3: template + units

```typescript
import StringToDate from 'string-to-date';

parser.addFormat(
  new Format({
    template: 'The (_DAY_)(?:_ORDINAL_) day of (_MONTH_), (_YEAR_)',
    units: ['day', 'month', 'year'],
  })
);
```

### Example 4: template + handler

```typescript
import StringToDate from 'string-to-date';

parser.addFormat(
  new Format({
    template: '^Q([1-4]) (_YEAR_)$',
    handler: function ([, quarter, year]) {
      const monthByQuarter = { 1: 1, 2: 4, 3: 7, 4: 10 };
      const month = monthByQuarter[quarter];
      return { year, month };
    },
  })
);
```

### Removing parsing rules

To remove support for a certain format, use `removeFormat()`

```typescript
import StringToDate, { dayMonth } from 'string-to-date';

parser.removeFormat(dayMonth);
```

### Creating a custom parser

To create a new parser with a limited list of formats or your own custom
formats, use `new Parser`

```typescript
import { Parser, time24Hours, yearMonthDay, ago } from 'string-to-date';

const parser = new Parser();

parser.addFormats([time24Hours, yearMonthDay, ago]);
```

## Unit tests

### Testing

- To run tests, run `npm test`

## Contributing

Contributions are welcome. Please open a GitHub ticket for bugs or feature
requests. Please make a pull request for any fixes or new code you'd like to be
incorporated.

## Exhaustive list of date formats

24 hour time (any date format followed by a 24-hour time expression)

- 2020-10-06 17:41:28
- 2020-10-06T17:41:28Z
- 17:41:28
- 2020-10-06T17:41:28.999Z
- 2020-10-06T17:41:28.999999Z
- 2020-10-06T17:41:28.999999999Z
- 2020-10-06T17:41:28 MST
- 2020-10-06T17:41:28 Eastern Daylight Time
- 2020-10-06T17:41:28 GMT+03:00
- 2020-10-06T17:41:28 GMT-9
- 2020-10-06T17:41:28-09:00
- 2020-10-06T17:41:28+0900

12 hour time (any date format followed by a 12-hour time expression)

- March 14, 2015 at 9:26:53 am
- 14 Mar 2015 9:26:53 a.m.
- 9:26:53am
- 9:26pm
- 9pm

year month day

- 2016-09-24
- 2016-9-24
- 20160924

day monthname year

- Wednesday, 01 January 2020
- Wednesday 01 January 2020
- Wed, 01 January 2020
- Wed 01 January 2020
- 01 January 2020
- 01-January-2020
- 1 Jan 2020
- 1-Jan-2020
- 01 Jan 20
- 1 Jan 20

monthname day year

- Sunday, March 27 2016
- Sunday March 27 2016
- Sun, March 27 2016
- Sun March 27 2016
- March 27 2016
- Mar 27, 2016
- Mar 27 2016

month day year

- 03/14/2020
- 03-14-2020
- 3/14/2020
- 3-14-2020
- 03/14/20
- 03-14-20

day month year

- 14/03/2020
- 14.03.2020
- 14/3/2020
- 14.3.2020
- 14/03/20
- 14.03.20
- 14/3/20
- 14.3.20

relative time

- 5 minutes ago
- -8 months
- in 13 days
- +21 weeks

monthname day

- Sunday, June 28
- Sunday June 28
- Sun, June 28
- Sun June 28
- June 28
- Jun 28

day monthname

- 16 March
- 16 Mar

month day

- 03/14
- 03-14
- 3/14
- 3-14

day month

- 14/03
- 14.03
- 14/3
- 14.3

Twitter

- Fri Apr 09 12:53:54 +0000 2010

unix timestamp

- `@1602604901`

Microsoft JSON date string

- `/Date(1601677889008-0700)/`
- `/Date(1601677889008)/`

chinese

- `2020年09月26日`
- `2020年9月26日`
- `2020 年 9 月 26 日`
- `２０１７年０８月３１日`

## Credits

This package is based on [any-date-parser](https://www.npmjs.com/package/any-date-parser) by [Ken Snyder](https://github.com/kensnyder)
