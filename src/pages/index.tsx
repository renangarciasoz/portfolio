import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Twitter from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Container,
  Divider,
  Link as LinkMUI,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useChangeTheme } from "contexts/theme.ctx";
import { format, isEqual } from "date-fns";
import type { NextPage } from "next";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Lottie from "react-lottie";
import { EN, PT_BR } from "src/constants/locales";
import { COMMON } from "src/constants/translations";
import * as darkLightLottie from "src/lotties/light-dark-mode.json";
import { Companies } from "types/companies";
import { CareerJobsLocale, PrinciplesLocale } from "types/locales";
import { getJobsDates } from "utils/jobs";

const UsedTechs = () => {
  const usedTechs = [
    {
      name: "Next.js",
      href: "https://nextjs.org/",
    },
    {
      name: "MaterialUI",
      href: "https://mui.com/",
    },
    {
      name: "TypesScript",
      href: "https://www.typescriptlang.org/",
    },
    {
      name: "React-I18Next",
      href: "https://react.i18next.com/",
    },
    {
      name: "Lottie",
      href: "https://lottiefiles.com/",
    },
    {
      name: "Vercel",
      href: "https://vercel.com/",
    },
    {
      name: "GitHub",
      href: "https://github.com/",
    },
  ];

  return (
    <>
      {usedTechs.map((tech, key) => (
        <LinkMUI
          key={key}
          fontSize="small"
          href={tech.href}
          target="_blank"
          rel="noreferrer"
          underline="hover"
          sx={{
            m: 1,
            display: "inline-flex",
            alignItems: "center",

            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          {tech.name}
        </LinkMUI>
      ))}
    </>
  );
};

const SocialMedias = () => {
  const socialMedias = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/renangarciasoz/",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/renan-g-2a251ba0/",
      icon: LinkedIn,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/renangarciasoz",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "https://github.com/renangarciasoz",
      icon: GitHub,
    },
  ];
  return (
    <>
      {socialMedias.map(({ name, href, icon: Icon }, key) => (
        <LinkMUI
          target="_blank"
          href={href}
          rel="noreferrer"
          key={key}
          underline="hover"
          sx={{
            m: 1,
            display: "inline-flex",
            alignItems: "center",

            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          <Icon />
          <Typography variant="caption">{name}</Typography>
        </LinkMUI>
      ))}
    </>
  );
};

const Home: NextPage = () => {
  const { t } = useTranslation();
  const changeTheme = useChangeTheme();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const router = useRouter();
  const isMobile = useMediaQuery(
    (theme: Theme) => theme.breakpoints.down("sm"),
    {
      noSsr: true,
    }
  );
  const [darkLightAnimation, setLightDarkAnimation] = useState({
    isStopped: false,
    isPaused: false,
    speed: 2,
    direction: 1,
    isLike: true,
  });

  const lottieDefaultData = {
    animationData: darkLightLottie,
    loop: false,
    autoplay: isDarkMode,
  };

  const toggleTheme = useCallback(() => {
    if (!darkLightAnimation.isStopped) {
      setLightDarkAnimation(() => ({
        ...darkLightAnimation,
        direction: darkLightAnimation.direction * -1,
      }));
    } else {
      setLightDarkAnimation(() => ({
        ...darkLightAnimation,
        isStopped: false,
        isLike: !darkLightAnimation.isLike,
      }));
    }

    changeTheme();
  }, [darkLightAnimation, changeTheme]);

  const formatCareerJobDates = (dates: {
    start: Date;
    end: Date;
    worked: number;
  }) =>
    isEqual(dates.end, new Date())
      ? `${format(dates.start, t("career.dateTemplate"))} - ${t(
          "career.present"
        )} • ${dates.worked}${t("career.shortMonths")}`
      : `${format(dates.start, t("career.dateTemplate"))} - ${format(
          dates.end,
          t("career.dateTemplate")
        )} • ${dates.worked}${t("career.shortMonths")}`;

  return (
    <>
      <Box
        component="header"
        position="sticky"
        top={0}
        bgcolor="background.default"
      >
        <Container maxWidth="xl">
          <Box
            component="nav"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={{ xs: 2, sm: 3 }}
          >
            <Link href="/" passHref legacyBehavior>
              <LinkMUI
                href="/"
                sx={{
                  color: "text.primary",
                  "&:hover": { color: "text.secondary" },
                }}
                underline="none"
              >
                <Typography variant="h5" fontWeight={700}>
                  {isMobile ? "R." : "Renan."}
                </Typography>
              </LinkMUI>
            </Link>
            <Box>
              <Link
                href={router.pathname}
                locale={PT_BR}
                passHref
                legacyBehavior
              >
                <LinkMUI
                  fontSize={isMobile ? "small" : "medium"}
                  sx={{
                    mr: 2,

                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                  color="text.secondary"
                  underline={router.locale === PT_BR ? "always" : "hover"}
                >
                  {PT_BR}
                </LinkMUI>
              </Link>
              <Link href={router.pathname} locale={EN} passHref legacyBehavior>
                <LinkMUI
                  fontSize={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: "uppercase",
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                  color="text.secondary"
                  underline={router.locale === EN ? "always" : "hover"}
                >
                  {EN}
                </LinkMUI>
              </Link>
            </Box>

            <Button
              disableRipple
              sx={{
                position: "relative",
                color: "text.secondary",
                pl: 6,
              }}
              onClick={toggleTheme}
            >
              <Lottie
                options={lottieDefaultData}
                isStopped={darkLightAnimation.isStopped}
                isPaused={darkLightAnimation.isPaused}
                speed={darkLightAnimation.speed}
                direction={darkLightAnimation.direction}
                width={50}
                height={50}
                style={{
                  position: "absolute",
                  left: -8,
                }}
              />
              <Typography variant="caption" sx={{ ml: -1 }}>
                {isDarkMode
                  ? t<string>("turnLightsOn")
                  : t<string>("turnLightsOff")}
              </Typography>
            </Button>
          </Box>
        </Container>
        <Divider />
      </Box>

      <Box component="main" mt={3} my={4} mb={6}>
        <Container maxWidth="xl">
          <Typography component="h1" variant={isMobile ? "h2" : "h1"}>
            <Trans i18nKey="introduction" components={{ br: <br /> }} />
          </Typography>
          <Typography
            component="p"
            variant={isMobile ? "body1" : "h5"}
            sx={{ my: 3, mb: isMobile ? 8 : 12, maxWidth: 920 }}
          >
            <Trans i18nKey="about" components={{ br: <br /> }} />
          </Typography>
          <Box mb={{ xs: 8, sm: 12 }}>
            <Typography variant={isMobile ? "h4" : "h3"} component="h2">
              {t("principles.title")}
            </Typography>
            {t<string, PrinciplesLocale[]>("principles.principles", {
              returnObjects: true,
            }).map(({ title }) => (
              <Typography component="h3" variant="h6" key={title}>
                {title}
              </Typography>
            ))}
          </Box>

          <Typography variant={isMobile ? "h4" : "h3"} component="h2">
            {t("career.title")}
          </Typography>
          {t<string, CareerJobsLocale[]>("career.jobs", {
            returnObjects: true,
          }).map(({ title, company, location }) => (
            <Box mt={1} mb={4} key={title}>
              <Typography variant="h6" component="h3">
                {title}
              </Typography>
              <Typography>
                {company} - {location}
              </Typography>
              <Typography>
                {formatCareerJobDates(getJobsDates(company as Companies))}
              </Typography>
            </Box>
          ))}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <MoreHoriz />
            <Typography variant="caption">
              {t("footer.underConstruction")}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Divider />
      <Box
        component="footer"
        p={{ xs: 3, md: 4 }}
        display="flex"
        flexDirection="column"
        alignItems={{ xs: "left", md: "center" }}
        textAlign={{ xs: "left", md: "center" }}
      >
        <Box>
          <Typography variant="body2">
            {t("footer.socialMediasTitle")}
          </Typography>
          <SocialMedias />
        </Box>
        <Box my={2}>
          <Typography variant="body2">{t("footer.credits")}</Typography>
          <Box>
            <Typography variant="body2">{t("footer.techsTitle")}</Typography>
            <UsedTechs />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, [COMMON])),
    },
  };
};

export default Home;
