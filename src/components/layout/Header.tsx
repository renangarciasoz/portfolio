import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useActiveSection } from "utils/useActiveSection";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "career", href: "#career" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.key);

export const Header = () => {
  const { t } = useTranslation();
  const active = useActiveSection(NAV_IDS);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "saturate(140%) blur(10px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(16,15,13,0.7)"
            : "rgba(245,243,238,0.7)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 } }}>
          <Link href="/" passHref legacyBehavior>
            <MuiLink
              underline="none"
              sx={{
                color: "text.primary",
                "&:hover": { color: "text.secondary" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
                component="span"
              >
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  Renan Garcia
                </Box>
                <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                  RG
                </Box>
              </Typography>
            </MuiLink>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            spacing={3.5}
            sx={{ mr: 3, display: { xs: "none", md: "flex" } }}
          >
            {NAV_ITEMS.map(({ key, href }) => {
              const isActive = active === key;
              return (
                <MuiLink
                  key={key}
                  href={href}
                  underline="none"
                  aria-current={isActive ? "true" : undefined}
                  sx={{
                    fontSize: 14,
                    color: isActive ? "text.primary" : "text.secondary",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {t(`nav.${key}`)}
                </MuiLink>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LanguageSwitch />
            <ThemeToggle />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
