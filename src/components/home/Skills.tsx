import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Section } from "components/layout/Section";
import { SKILL_GROUPS } from "data/profile";
import { SkillCategoryLocale } from "types/locales";

export const Skills = () => {
  const { t } = useTranslation();

  const categories = t("skills.categories", {
    returnObjects: true,
  }) as unknown as SkillCategoryLocale[];

  const titleById = new Map(categories.map((c) => [c.id, c.title]));

  return (
    <Section id="skills" eyebrow="02" title={t("skills.title")}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          columnGap: { xs: 4, md: 10 },
          rowGap: { xs: 4, md: 6 },
        }}
      >
        {SKILL_GROUPS.map((group) => (
          <Box
            key={group.id}
            sx={{
              pt: 3,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: "block", mb: 1.5 }}
            >
              {titleById.get(group.id) || group.id}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                lineHeight: 1.9,
                color: "text.primary",
              }}
            >
              {group.items.join("  ·  ")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
};
