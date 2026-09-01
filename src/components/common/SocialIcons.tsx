import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Language from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import { IconButton, Stack, SvgIconProps, Tooltip } from "@mui/material";
import { ComponentType } from "react";
import { SOCIALS } from "data/profile";

const ICONS: Record<string, ComponentType<SvgIconProps>> = {
  linkedin: LinkedIn,
  github: GitHub,
  instagram: Instagram,
  x: XIcon,
};

export const SocialIcons = ({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) => (
  <Stack direction="row" spacing={0.5} sx={{ ml: -1 }}>
    {SOCIALS.map(({ id, name, href }) => {
      const Icon = ICONS[id] || Language;
      return (
        <Tooltip title={name} key={id}>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            size={size}
            sx={{
              color: "text.secondary",
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": { color: "text.primary", transform: "translateY(-2px)" },
            }}
          >
            <Icon fontSize={size === "large" ? "medium" : "small"} />
          </IconButton>
        </Tooltip>
      );
    })}
  </Stack>
);
