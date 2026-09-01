import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Section } from "components/layout/Section";
import { PROJECTS } from "data/profile";
import { ProjectLocale } from "types/locales";

export const Projects = () => {
  const { t } = useTranslation();

  const items = t("projects.items", {
    returnObjects: true,
  }) as unknown as ProjectLocale[];

  if (!items || items.length === 0) {
    return null;
  }

  const metaById = new Map(PROJECTS.map((p) => [p.id, p]));

  const linkSx = {
    fontSize: 14,
    color: "text.secondary",
    "&:hover": { color: "text.primary" },
  } as const;

  return (
    <Section id="projects" eyebrow="04" title={t("projects.title")}>
      <Box>
        {items.map((project, index) => {
          const meta = metaById.get(project.id);
          return (
            <Box
              key={project.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
                gap: { xs: 1.5, md: 6 },
                py: { xs: 4, md: 5 },
                borderTop: (theme) =>
                  index === 0 ? "none" : `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}
                >
                  {project.name}
                </Typography>
                {meta?.tags?.length ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {meta.tags.join("  ·  ")}
                  </Typography>
                ) : null}
              </Box>

              <Box>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>
                <Stack direction="row" spacing={3}>
                  {meta?.href && (
                    <MuiLink
                      href={meta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={linkSx}
                    >
                      {t("projects.visit")} ↗
                    </MuiLink>
                  )}
                  {meta?.repo && (
                    <MuiLink
                      href={meta.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={linkSx}
                    >
                      {t("projects.code")} ↗
                    </MuiLink>
                  )}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
};
