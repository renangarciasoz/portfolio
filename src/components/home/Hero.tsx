import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { SocialIcons } from "components/common/SocialIcons";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: "auto", md: "calc(100vh - 76px)" },
        pt: { xs: 10, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Abstract background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          // warm glow
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(46% 52% at 82% 22%, rgba(195,184,166,0.18), transparent 68%)"
              : "radial-gradient(46% 52% at 82% 22%, rgba(122,110,93,0.14), transparent 68%)",
        }}
      />
      {/* subtle dot grid, faded away from the text */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: (theme) => (theme.palette.mode === "dark" ? 0.5 : 0.6),
          backgroundImage: (theme) =>
            `radial-gradient(${theme.palette.text.secondary} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 75% 30%, rgba(0,0,0,0.35), transparent 70%)",
          maskImage:
            "radial-gradient(80% 80% at 75% 30%, rgba(0,0,0,0.35), transparent 70%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 720 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 4,
              pl: 1.5,
              pr: 2,
              py: 0.5,
              borderRadius: 999,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#7FA88B",
                animation: "heroPulse 2.4s ease-in-out infinite",
                "@keyframes heroPulse": {
                  "0%, 100%": { opacity: 1, boxShadow: "0 0 0 0 rgba(127,168,139,0.5)" },
                  "50%": { opacity: 0.6, boxShadow: "0 0 0 5px rgba(127,168,139,0)" },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {t("hero.status")}
            </Typography>
          </Box>

          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 3, opacity: 0.85 }}
          >
            {t("hero.greeting")}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
              fontSize: { xs: "3.4rem", sm: "5rem", md: "7rem" },
            }}
          >
            Renan Garcia
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "text.secondary",
              fontSize: { xs: "1.15rem", md: "1.6rem" },
              fontWeight: 500,
            }}
          >
            {t("hero.role")}
          </Typography>

          <Typography
            sx={{
              mt: 4,
              maxWidth: 620,
              color: "text.secondary",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              lineHeight: 1.75,
            }}
          >
            {t("hero.tagline")}
          </Typography>

          <Divider sx={{ my: 4, maxWidth: 620 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t("hero.location")}
            </Typography>
            <SocialIcons size="small" />
          </Box>
        </Box>
      </Container>

      <Box
        component="a"
        href="#about"
        aria-label={t("hero.scroll")}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { color: "text.primary" },
        }}
      >
        <Typography variant="overline" sx={{ fontSize: "0.6rem" }}>
          {t("hero.scroll")}
        </Typography>
        <KeyboardArrowDown
          fontSize="small"
          sx={{
            animation: "heroBounce 2s ease-in-out infinite",
            "@keyframes heroBounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(5px)" },
            },
          }}
        />
      </Box>
    </Box>
  );
};
