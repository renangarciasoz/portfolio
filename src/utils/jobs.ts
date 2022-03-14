import { differenceInMonths } from "date-fns";
import { Companies } from "types/companies";

export const getJobsDates = (
  company: Companies
): {
  start: Date;
  end: Date;
  worked: number;
} => {
  const jobsStartDate = {
    Livus: {
      start: new Date("2021-08-01"),
      end: new Date(),
    },
    TC: {
      start: new Date("2021-02-1"),
      end: new Date("2021-08-1"),
    },
    Loft: {
      start: new Date("2019-07-1"),
      end: new Date("2021-02-1"),
    },
  };

  const jobDates = (Object.keys(jobsStartDate) as Companies[]).reduce(
    (hash, company) => {
      const dates = jobsStartDate[company];
      return {
        ...hash,
        [company]: {
          ...dates,
          worked: differenceInMonths(dates.end, dates.start),
        },
      };
    },
    {} as {
      [key in Companies]: {
        end: Date;
        start: Date;
        worked: number;
      };
    }
  );

  return jobDates[company];
};