export function generateFormats(
  template: string,
  monthFormats = ['MM', 'M'],
  separatorFormats = ['/', '-', ' ', '.'],
  dayFormats = ['dd', 'd'],
  yearFormats = ['yyyy', 'yy']
): string[] {
  const formats: string[] = [];

  for (const separatorFormat of separatorFormats) {
    for (const yearFormat of yearFormats) {
      for (const monthFormat of monthFormats) {
        for (const dayFormat of dayFormats) {
          const format = template
            .replace('DAY', dayFormat)
            .replace('MONTH', monthFormat)
            .replace('YEAR', yearFormat)
            .replace(/-/g, separatorFormat);

          formats.push(format);
        }
      }
    }
  }

  return formats;
}
