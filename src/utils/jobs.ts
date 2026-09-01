import { differenceInMonths, parseISO } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { JOB_DATES } from "data/profile";

/** Maps a Next.js locale to the matching date-fns locale for month names. */
export const getDateFnsLocale = (locale?: string) =>
  locale === "pt-BR" ? ptBR : enUS;

export interface ComputedJobDates {
  start: Date;
  end: Date;
  isPresent: boolean;
  months: number;
}

export const getJobDates = (companyId: string): ComputedJobDates | null => {
  const entry = JOB_DATES[companyId];

  if (!entry) {
    return null;
  }

  const start = parseISO(entry.start);
  const end = entry.end ? parseISO(entry.end) : new Date();

  return {
    start,
    end,
    isPresent: !entry.end,
    months: Math.max(differenceInMonths(end, start), 0),
  };
};

/** Human-friendly duration such as "2 yrs 4 mos" using localized unit labels. */
export const formatDuration = (
  months: number,
  units: { year: string; month: string }
): string => {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${units.year}`);
  }

  if (remaining > 0 || years === 0) {
    parts.push(`${remaining} ${units.month}`);
  }

  return parts.join(" ");
};
