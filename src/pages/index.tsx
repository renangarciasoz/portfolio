import { Box } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import nextI18NextConfig from "../../next-i18next.config";
import { COMMON } from "constants/translations";
import { EN, PT_BR } from "constants/locales";
import { Header } from "components/layout/Header";
import { Footer } from "components/layout/Footer";
import { Reveal } from "components/common/Reveal";
import { Hero } from "components/home/Hero";
import { About } from "components/home/About";
import { Skills } from "components/home/Skills";
import { Career } from "components/home/Career";
import { Projects } from "components/home/Projects";
import { Education } from "components/home/Education";
import { Contact } from "components/home/Contact";
import { CONTACT, PROFILE_IMAGE, SITE_URL, SOCIALS } from "data/profile";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const title = t("meta.title");
  const description = t("meta.description");
  const ogLocale = locale === PT_BR ? "pt_BR" : "en_US";
  const canonical = locale === EN ? SITE_URL : `${SITE_URL}/${locale}`;
  const ogImage = `${SITE_URL}/images/og.png`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Renan Garcia",
    url: SITE_URL,
    image: `${SITE_URL}${PROFILE_IMAGE}`,
    jobTitle: "Software Engineer",
    email: CONTACT.email,
    nationality: { "@type": "Country", name: "Brazil" },
    knowsLanguage: ["en", "pt-BR"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "UCLA" },
      { "@type": "EducationalOrganization", name: "ILAC" },
      { "@type": "EducationalOrganization", name: "Impacta Tecnologia" },
    ],
    sameAs: SOCIALS.map((s) => s.href),
    description,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="pt-BR" href={`${SITE_URL}/pt-BR`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Renan Garcia" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={ogLocale} />
        <meta
          property="og:locale:alternate"
          content={locale === PT_BR ? "en_US" : "pt_BR"}
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Renan Garcia, Software Engineer"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@renangarciasoz" />
        <meta name="twitter:creator" content="@renangarciasoz" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <Header />

      <Box component="main">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Career />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </Box>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? EN, [COMMON], nextI18NextConfig)),
  },
});

export default Home;
