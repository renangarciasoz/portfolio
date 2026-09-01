import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Section } from "components/layout/Section";
import { SocialIcons } from "components/common/SocialIcons";
import { DownloadResumeButton } from "components/resume/DownloadResumeButton";
import { CONTACT } from "data/profile";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact" eyebrow="06" title={t("contact.title")}>
      <Box sx={{ maxWidth: 760 }}>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1.05rem", md: "1.15rem" },
            lineHeight: 1.75,
            mb: { xs: 4, md: 6 },
          }}
        >
          {t("contact.body")}
        </Typography>

        <MuiLink
          href={`mailto:${CONTACT.email}`}
          underline="none"
          sx={{
            fontFamily: "'Fraunces', serif",
            fontSize: { xs: "1.7rem", md: "2.4rem" },
            fontWeight: 400,
            color: "text.primary",
            display: "inline-block",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            pb: 0.5,
            transition: "border-color 0.3s ease",
            "&:hover": { borderColor: "text.primary" },
          }}
        >
          {CONTACT.email}
        </MuiLink>

        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          sx={{ mt: { xs: 5, md: 7 } }}
        >
          <SocialIcons size="small" />
          <DownloadResumeButton variant="text" size="small" />
        </Stack>
      </Box>
    </Section>
  );
};
