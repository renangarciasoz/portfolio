import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";

export type ThemeMode = "light" | "dark";

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

// Shared, mode-agnostic design tokens.
const baseTheme: ThemeOptions = {
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: SANS,
    h1: { fontFamily: SERIF, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.04 },
    h2: { fontFamily: SERIF, fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.1 },
    h3: { fontFamily: SERIF, fontWeight: 400, letterSpacing: "-0.015em" },
    h4: { fontFamily: SERIF, fontWeight: 400, letterSpacing: "-0.01em" },
    h5: { fontFamily: SANS, fontWeight: 600 },
    h6: { fontFamily: SANS, fontWeight: 600, letterSpacing: "-0.005em" },
    button: { textTransform: "none", fontWeight: 500, letterSpacing: "0.01em" },
    overline: { letterSpacing: "0.24em", fontWeight: 500, fontSize: "0.7rem" },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
  },
};

const palettes: Record<ThemeMode, ThemeOptions["palette"]> = {
  light: {
    mode: "light",
    primary: { main: "#7A6E5D" },
    background: { default: "#F5F3EE", paper: "#FBFAF7" },
    text: { primary: "#1C1A17", secondary: "#6E685E" },
    divider: "rgba(28,26,23,0.12)",
  },
  dark: {
    mode: "dark",
    primary: { main: "#C3B8A6" },
    background: { default: "#100F0D", paper: "#16150F" },
    text: { primary: "#ECE8E0", secondary: "#9B9488" },
    divider: "rgba(236,232,224,0.13)",
  },
};

export const createAppTheme = (mode: ThemeMode) => {
  const isDark = mode === "dark";

  const theme = createTheme({
    ...baseTheme,
    palette: palettes[mode],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          body: {
            transition: "background-color 0.6s ease, color 0.6s ease",
            WebkitFontSmoothing: "antialiased",
          },
          a: { transition: "color 0.3s ease, opacity 0.3s ease" },
          "::selection": {
            backgroundColor: isDark
              ? "rgba(195,184,166,0.28)"
              : "rgba(122,110,93,0.20)",
          },
          "*:focus-visible": {
            outline: `2px solid ${isDark ? "#ECE8E0" : "#1C1A17"}`,
            outlineOffset: "3px",
            borderRadius: "3px",
          },
          "@media (prefers-reduced-motion: reduce)": {
            "html": { scrollBehavior: "auto" },
            "*, *::before, *::after": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "0.01ms !important",
              scrollBehavior: "auto !important",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            borderRadius: 4,
            paddingInline: 18,
            paddingBlock: 8,
          },
          outlined: {
            borderColor: isDark
              ? "rgba(236,232,224,0.24)"
              : "rgba(28,26,23,0.22)",
            color: isDark ? "#ECE8E0" : "#1C1A17",
            "&:hover": {
              borderColor: isDark ? "#ECE8E0" : "#1C1A17",
              backgroundColor: "transparent",
            },
          },
          text: {
            color: isDark ? "#9B9488" : "#6E685E",
            "&:hover": {
              backgroundColor: "transparent",
              color: isDark ? "#ECE8E0" : "#1C1A17",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontWeight: 400,
            backgroundColor: "transparent",
            border: `1px solid ${
              isDark ? "rgba(236,232,224,0.16)" : "rgba(28,26,23,0.14)"
            }`,
            color: isDark ? "#9B9488" : "#6E685E",
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { fontFamily: SANS, fontSize: "0.7rem" },
        },
      },
    },
  });

  return responsiveFontSizes(theme, { factor: 2.4 });
};

export const themeLight = createAppTheme("light");
export const themeDark = createAppTheme("dark");
