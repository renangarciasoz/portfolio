import { ThemeProvider as ThemeProviderMaterial } from "@mui/material";
import { createAppTheme, ThemeMode } from "configs/theme";
import Head from "next/head";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "theme-mode";

interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  toggle: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("dark");

  // Resolve the preferred mode on the client: stored choice first, then the OS.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;

    if (stored === "light" || stored === "dark") {
      setMode(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setMode(prefersDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setMode((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);
  const isDark = mode === "dark";

  return (
    <ThemeContext.Provider value={value}>
      <Head>
        <meta name="theme-color" content={isDark ? "#100F0D" : "#F5F3EE"} />
        <meta
          name="msapplication-TileColor"
          content={isDark ? "#100F0D" : "#F5F3EE"}
        />
      </Head>
      <ThemeProviderMaterial theme={theme}>{children}</ThemeProviderMaterial>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);

// Backwards-compatible helper: returns the toggle function.
export const useChangeTheme = () => useContext(ThemeContext).toggle;
