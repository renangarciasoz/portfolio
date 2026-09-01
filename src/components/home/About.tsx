import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import { Section } from "components/layout/Section";
import { PROFILE_IMAGE } from "data/profile";
import { PrincipleLocale } from "types/locales";

export const About = () => {
  const { t } = useTranslation();

  const principles = t("principles.items", {
    returnObjects: true,
  }) as unknown as PrincipleLocale[];

  return (
    <Section id="about" eyebrow="01" title={t("about.title")}>
      <Box
        sx={{
          position: "relative",
          width: { xs: 116, md: 140 },
          height: { xs: 116, md: 140 },
          borderRadius: "50%",
          overflow: "hidden",
          mb: { xs: 4, md: 6 },
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Image
          src={PROFILE_IMAGE}
          alt="Renan Garcia"
          fill
          sizes="140px"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr" },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Typography
          component="div"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.75,
          }}
        >
          <Trans i18nKey="about.body" components={{ br: <br /> }} />
        </Typography>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t("principles.title")}
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {principles.map(({ title, description }, index) => (
              <Box
                component="li"
                key={title}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  borderBottom: (theme) =>
                    index < principles.length - 1
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                }}
              >
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "0.8rem",
                    opacity: 0.7,
                    mt: "0.2em",
                    minWidth: 22,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Box>
                  <Typography component="span" sx={{ fontWeight: 500, display: "block" }}>
                    {title}
                  </Typography>
                  {description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                      {description}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
};
