import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import { Button, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  CERTIFICATIONS,
  CONTACT,
  EARLIER_COMPANIES,
  EDUCATION,
  SKILL_GROUPS,
  SOCIALS,
} from "data/profile";
import {
  CareerJobLocale,
  EducationLocale,
  SkillCategoryLocale,
} from "types/locales";
import { formatEducationPeriod } from "utils/education";
import { getDateFnsLocale, getJobDates } from "utils/jobs";
import { ResumeData, ResumeEducation } from "./resume.types";

interface DownloadResumeButtonProps {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
}

const stripBreaks = (value: string) =>
  value
    .split(/<br\s*\/?>\s*<br\s*\/?>/i)[0]
    .replace(/<br\s*\/?>/gi, " ")
    .trim();

export const DownloadResumeButton = ({
  size = "medium",
  variant = "contained",
}: DownloadResumeButtonProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);

  const buildData = (): ResumeData => {
    const dateFnsLocale = getDateFnsLocale(locale);
    const dateTemplate = t("career.dateTemplate");

    const jobs = t("career.jobs", {
      returnObjects: true,
    }) as unknown as CareerJobLocale[];
    const skillCategories = t("skills.categories", {
      returnObjects: true,
    }) as unknown as SkillCategoryLocale[];
    const educationEntries = t("education.education", {
      returnObjects: true,
    }) as unknown as EducationLocale[];
    const certificationEntries = t("education.certifications", {
      returnObjects: true,
    }) as unknown as EducationLocale[];

    const experience = jobs.map((job) => {
      const dates = getJobDates(job.id);
      const period = dates
        ? `${format(dates.start, dateTemplate, { locale: dateFnsLocale })} ${t(
            "career.to"
          )} ${
            dates.isPresent
              ? t("resume.present")
              : format(dates.end, dateTemplate, { locale: dateFnsLocale })
          }`
        : "";
      return {
        title: job.title,
        company: job.company,
        location: job.location,
        period,
        summary: job.summary,
        highlights: job.highlights,
      };
    });

    const titleById = new Map(skillCategories.map((c) => [c.id, c.title]));
    const skills = SKILL_GROUPS.map((group) => ({
      category: titleById.get(group.id) || group.id,
      items: group.items,
    }));

    const toEducation = (
      entries: EducationLocale[],
      meta: typeof EDUCATION
    ): ResumeEducation[] => {
      const metaById = new Map(meta.map((m) => [m.id, m]));
      return entries.map((entry) => {
        const m = metaById.get(entry.id);
        const period = formatEducationPeriod(m, {
          dateTemplate,
          separator: t("career.to"),
          locale,
        });
        return {
          title: entry.degree,
          institution: entry.institution,
          detail: [
            entry.location,
            period,
            m?.current ? t("education.inProgress") : "",
          ]
            .filter(Boolean)
            .join("  ·  "),
        };
      });
    };

    return {
      locale: locale || "en",
      name: "Renan Garcia",
      role: t("hero.role"),
      location: t("hero.location"),
      email: CONTACT.email,
      phone: CONTACT.phone,
      socials: SOCIALS.map(({ name, href }) => ({ name, href })),
      summaryParagraphs: [stripBreaks(t("about.body"))],
      labels: {
        summary: t("resume.summaryTitle"),
        experience: t("resume.experienceTitle"),
        skills: t("resume.skillsTitle"),
        education: t("resume.educationTitle"),
        languages: t("education.languagesTitle"),
      },
      experience,
      skills,
      education: [
        ...toEducation(educationEntries, EDUCATION),
        ...toEducation(certificationEntries, CERTIFICATIONS),
      ],
      earlierLabel: t("career.earlier"),
      earlierCompanies: EARLIER_COMPANIES.map((c) => `${c.name} (${c.role})`),
      languages: t("education.languages", {
        returnObjects: true,
      }) as unknown as ResumeData["languages"],
    };
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const [{ pdf }, { ResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumeDocument"),
      ]);

      const blob = await pdf(<ResumeDocument data={buildData()} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Renan-Garcia-CV-${locale || "en"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to generate résumé PDF", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      size={size}
      variant={variant}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <DownloadIcon />
        )
      }
    >
      {loading ? t("resume.generating") : t("resume.download")}
    </Button>
  );
};
