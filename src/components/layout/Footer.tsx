import { Box, Container, Divider, Link as MuiLink, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { SocialIcons } from "components/common/SocialIcons";

const TECHS = [
  { name: "Next.js", href: "https://nextjs.org/" },
  { name: "React", href: "https://react.dev/" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/" },
  { name: "Material UI", href: "https://mui.com/" },
  { name: "Vercel", href: "https://vercel.com/" },
];

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Box component="footer">
      <Divider />
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {t("footer.credits")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t("footer.techsTitle")}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mt: 1 }}>
              {TECHS.map((tech) => (
                <MuiLink
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {tech.name}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
            <SocialIcons />
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              © {year} Renan Garcia. {t("footer.rights")}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
