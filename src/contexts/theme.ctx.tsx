import { Theme, ThemeProvider as ThemeProviderMaterial } from "@mui/material";
import { themeDark, themeLight } from "configs/theme";
import React, { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext(() => {});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(themeDark);

  useEffect(() => {
    if (window) {
      const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(systemDarkTheme.matches ? themeDark : themeLight);
    }
  }, []);

  const changeTheme = useCallback(() => {
    setTheme(theme.palette.mode === "dark" ? themeLight : themeDark);
  }, [theme]);

  return (
    <ThemeContext.Provider value={changeTheme}>
      <ThemeProviderMaterial theme={theme}>{children}</ThemeProviderMaterial>
    </ThemeContext.Provider>
  );
};

export const useChangeTheme = () => React.useContext(ThemeContext);
