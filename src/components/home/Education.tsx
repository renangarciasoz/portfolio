import { Box, Link as MuiLink, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Section } from "components/layout/Section";
import { CERTIFICATIONS, EDUCATION, EducationMeta } from "data/profile";
import { EducationLocale } from "types/locales";
import { formatEducationPeriod } from "utils/education";

/** Quiet square mark: the institution logo in grayscale, or its monogram. */
const InstitutionMark = ({
  meta,
  institution,
}: {
  meta?: EducationMeta;
  institution: string;
}) => {
  const monogram = meta?.monogram || institution.charAt(0);

  return (
    <Box
      aria-hidden
      sx={{
        flexShrink: 0,
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1.5,
        color: "text.secondary",
        overflow: "hidden",
      }}
    >
      {meta?.logo ? (
        <Box
          component="img"
          src={meta.logo}
          alt=""
          sx={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
            filter: "grayscale(1)",
            opacity: 0.75,
          }}
        />
      ) : (
        <Typography
          component="span"
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: monogram.length > 2 ? "0.04em" : 0,
            fontSize: monogram.length > 2 ? "0.72rem" : "1.05rem",
          }}
        >
          {monogram}
        </Typography>
      )}
    </Box>
  );
};

const EntryList = ({
  heading,
  entries,
  meta,
}: {
  heading: string;
  entries: EducationLocale[];
  meta: EducationMeta[];
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

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
        const period = formatEducationPeriod(m, {
          dateTemplate: t("career.dateTemplate"),
          separator: t("career.to"),
          locale,
        });

        return (
          <Box
            key={entry.id}
            sx={{
              display: "flex",
              gap: 2.5,
              py: 2.5,
              borderTop: (theme) =>
                index === 0 ? "none" : `1px solid ${theme.palette.divider}`,
            }}
          >
            <InstitutionMark meta={m} institution={entry.institution} />
            <Box sx={{ minWidth: 0 }}>
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
            {m?.current && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  letterSpacing: "0.04em",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "#7FA88B",
                  }}
                />
                {t("education.inProgress")}
              </Typography>
            )}
            </Box>
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
        />
        <EntryList
          heading={t("education.certificationsTitle")}
          entries={certifications}
          meta={CERTIFICATIONS}
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
