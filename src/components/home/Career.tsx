import { Box, Link as MuiLink, Typography } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Section } from "components/layout/Section";
import { EARLIER_COMPANIES, JOB_DATES } from "data/profile";
import { CareerJobLocale } from "types/locales";
import { formatDuration, getDateFnsLocale, getJobDates } from "utils/jobs";

export const Career = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const dateFnsLocale = getDateFnsLocale(locale);
  const dateTemplate = t("career.dateTemplate");

  const jobs = t("career.jobs", {
    returnObjects: true,
  }) as unknown as CareerJobLocale[];

  const formatRange = (id: string) => {
    const dates = getJobDates(id);
    if (!dates) return "";

    const start = format(dates.start, dateTemplate, { locale: dateFnsLocale });
    const end = dates.isPresent
      ? t("career.present")
      : format(dates.end, dateTemplate, { locale: dateFnsLocale });
    const duration = formatDuration(dates.months, {
      year: t("career.yearsShort"),
      month: t("career.monthsShort"),
    });

    return `${start} ${t("career.to")} ${end} · ${duration}`;
  };

  return (
    <Section id="career" eyebrow="03" title={t("career.title")}>
      <Box>
        {jobs.map((job, index) => {
          const url = JOB_DATES[job.id]?.url;

          return (
            <Box
              key={job.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
                gap: { xs: 0.5, md: 4 },
                py: { xs: 3, md: 4 },
                borderTop: (theme) =>
                  index === 0 ? "none" : `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ fontVariantNumeric: "tabular-nums", fontSize: 15 }}
              >
                {formatRange(job.id)}
              </Typography>
              <Box>
                <Typography variant="h6" component="h3">
                  {job.title}
                </Typography>
                <Typography color="text.secondary">
                  {url ? (
                    <MuiLink
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                      {job.company}
                    </MuiLink>
                  ) : (
                    <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
                      {job.company}
                    </Box>
                  )}
                  {" · "}
                  {job.location}
                </Typography>

                {job.summary && (
                  <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                    {job.summary}
                  </Typography>
                )}

                {job.highlights && job.highlights.length > 0 && (
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      p: 0,
                      mt: 2,
                      mb: 0,
                      display: "grid",
                      gap: 1,
                    }}
                  >
                    {job.highlights.map((item, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          color: "text.secondary",
                          lineHeight: 1.6,
                        }}
                      >
                        <Box
                          component="span"
                          aria-hidden
                          sx={{
                            mt: "0.6em",
                            flexShrink: 0,
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            bgcolor: "text.secondary",
                            opacity: 0.6,
                          }}
                        />
                        <Box component="span">{item}</Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}

        {EARLIER_COMPANIES.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
              gap: { xs: 0.5, md: 4 },
              pt: { xs: 4, md: 5 },
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ fontSize: 15 }}
            >
              {t("career.earlier")}
            </Typography>
            <Typography color="text.secondary">
              {EARLIER_COMPANIES.map((company, i) => (
                <Box component="span" key={company.name}>
                  {i > 0 && "  ·  "}
                  {company.name}{" "}
                  <Box component="span" sx={{ opacity: 0.65 }}>
                    ({company.role})
                  </Box>
                </Box>
              ))}
            </Typography>
          </Box>
        )}
      </Box>
    </Section>
  );
};
