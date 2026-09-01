import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useThemeMode } from "contexts/theme.ctx";
import { useTranslation } from "next-i18next";

export const ThemeToggle = () => {
  const { mode, toggle } = useThemeMode();
  const { t } = useTranslation();
  const isDark = mode === "dark";
  const label = isDark ? t("theme.toLight") : t("theme.toDark");

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggle}
        aria-label={label}
        sx={{
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        {isDark ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};
