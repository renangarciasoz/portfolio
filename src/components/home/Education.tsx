import { Box, Link as MuiLink, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Section } from "components/layout/Section";
import { CERTIFICATIONS, EDUCATION, EducationMeta } from "data/profile";
import { EducationLocale } from "types/locales";

const EntryList = ({
  heading,
  entries,
  meta,
  rangeSeparator,
}: {
  heading: string;
  entries: EducationLocale[];
  meta: EducationMeta[];
  rangeSeparator: string;
}) => {
  if (!entries || entries.length === 0) {
    return null;
  }

  const metaById = new Map(meta.map((m) => [m.id, m]));

  return (
    <Box>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}
      >
        {heading}
      </Typography>
      {entries.map((entry, index) => {
        const m = metaById.get(entry.id);
        const period = [m?.start, m?.end]
          .filter(Boolean)
          .join(` ${rangeSeparator} `);

        return (
          <Box
            key={entry.id}
            sx={{
              py: 2,
              borderTop: (theme) =>
                index === 0 ? "none" : `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" component="h3" sx={{ fontSize: "1.05rem" }}>
              {m?.url ? (
                <MuiLink
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "text.primary" }}
                >
                  {entry.degree}
                </MuiLink>
              ) : (
                entry.degree
              )}
            </Typography>
            <Typography color="text.secondary">
              {entry.institution}
              {entry.location ? ` · ${entry.location}` : ""}
              {period ? ` · ${period}` : ""}
            </Typography>
            {entry.detail && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75, opacity: 0.85 }}
              >
                {entry.detail}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export const Education = () => {
  const { t } = useTranslation();

  const education = t("education.education", {
    returnObjects: true,
  }) as unknown as EducationLocale[];
  const certifications = t("education.certifications", {
    returnObjects: true,
  }) as unknown as EducationLocale[];

  const languages = t("education.languages", {
    returnObjects: true,
  }) as unknown as { name: string; level: string }[];

  const hasEducation = education && education.length > 0;
  const hasCertifications = certifications && certifications.length > 0;
  const hasLanguages = languages && languages.length > 0;

  if (!hasEducation && !hasCertifications && !hasLanguages) {
    return null;
  }

  return (
    <Section id="education" eyebrow="05" title={t("education.title")}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 8 },
        }}
      >
        <EntryList
          heading={t("education.educationTitle")}
          entries={education}
          meta={EDUCATION}
          rangeSeparator={t("career.to")}
        />
        <EntryList
          heading={t("education.certificationsTitle")}
          entries={certifications}
          meta={CERTIFICATIONS}
          rangeSeparator={t("career.to")}
        />
      </Box>

      {hasLanguages && (
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 2 }}
          >
            {t("education.languagesTitle")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {languages.map((lang) => (
              <Typography key={lang.name} color="text.secondary">
                <Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
                  {lang.name}
                </Box>
                {`  ·  ${lang.level}`}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Section>
  );
};
