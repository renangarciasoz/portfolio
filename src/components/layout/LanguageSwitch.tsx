import { Box, Link as MuiLink } from "@mui/material";
import { EN, PT_BR } from "constants/locales";
import Link from "next/link";
import { useRouter } from "next/router";

const LOCALES = [
  { code: EN, label: "EN" },
  { code: PT_BR, label: "PT" },
];

export const LanguageSwitch = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        color: "text.secondary",
        fontSize: 14,
      }}
    >
      {LOCALES.map(({ code, label }, index) => {
        const active = router.locale === code;
        return (
          <Box
            key={code}
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            {index > 0 && (
              <Box component="span" sx={{ opacity: 0.4, mx: 0.5 }}>
                /
              </Box>
            )}
            <Link
              href={{ pathname: router.pathname, query: router.query }}
              as={router.asPath}
              locale={code}
              passHref
              legacyBehavior
            >
              <MuiLink
                underline="none"
                aria-current={active ? "true" : undefined}
                sx={{
                  fontWeight: active ? 700 : 500,
                  color: active ? "text.primary" : "text.secondary",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {label}
              </MuiLink>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};
