import { format, parseISO } from "date-fns";
import { EducationMeta } from "data/profile";
import { getDateFnsLocale } from "utils/jobs";

/** "2025-03" → "Mar 2025" (localized); a bare year is returned as is. */
const formatEducationDate = (
  value: string,
  dateTemplate: string,
  locale?: string
) =>
  /^\d{4}-\d{2}$/.test(value)
    ? format(parseISO(`${value}-01`), dateTemplate, {
        locale: getDateFnsLocale(locale),
      })
    : value;

export const formatEducationPeriod = (
  meta: EducationMeta | undefined,
  options: { dateTemplate: string; separator: string; locale?: string }
): string =>
  [meta?.start, meta?.end]
    .filter((value): value is string => Boolean(value))
    .map((value) =>
      formatEducationDate(value, options.dateTemplate, options.locale)
    )
    .join(` ${options.separator} `);
