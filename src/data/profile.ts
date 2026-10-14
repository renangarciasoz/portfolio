/**
 * Non-translatable, structured profile data.
 *
 * Text that changes per language (titles, descriptions) lives in the i18n
 * files under `public/locales/**`. Everything here (URLs, dates, image paths)
 * is language-agnostic and is matched to the translated content by a stable
 * `id`.
 *
 * 👉 Fields marked with TODO are placeholders. Replace them with real data.
 */

export interface ContactInfo {
  /** Public e-mail used on the site and in the generated résumé. */
  email: string;
  /** Optional phone shown only in the résumé (leave "" to hide). */
  phone: string;
}

/** The line shown next to the name is translated: see `hero.location`. */
export const CONTACT: ContactInfo = {
  email: "renangarciasoz@hotmail.com",
  phone: "",
};

export interface SocialLink {
  id: string;
  name: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/renan-g-2a251ba0/",
  },
  { id: "github", name: "GitHub", href: "https://github.com/renangarciasoz" },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/renangarciasoz/",
  },
  { id: "x", name: "X", href: "https://twitter.com/renangarciasoz" },
];

/** Photo shown in the hero. Drop your file in /public/images and update this. */
export const PROFILE_IMAGE = "/images/renan-profile.jpg";

/** Canonical site URL, used for SEO/Open Graph. */
export const SITE_URL = "https://renangarcia.com";

/**
 * Career timeline. `id` matches the `id` field in the i18n `career.jobs`
 * array, so one company can have several stints. `end: null` means "present".
 */
export interface JobDates {
  start: string; // ISO date
  end: string | null; // ISO date or null for present
  url?: string;
}

export const JOB_DATES: Record<string, JobDates> = {
  "EPCVIP-lead": {
    start: "2025-12-01",
    end: "2026-09-30",
    url: "https://www.epcvip.com/",
  },
  "EPCVIP-senior": {
    start: "2022-07-01",
    end: "2024-01-31",
    url: "https://www.epcvip.com/",
  },
  Livus: { start: "2021-08-01", end: "2022-05-31" },
  TC: { start: "2021-02-01", end: "2021-08-01", url: "https://tc.com.br/" },
  Loft: { start: "2019-07-01", end: "2021-02-01", url: "https://loft.com.br/" },
};

/**
 * Earlier roles, shown as a compact single line with no description.
 * Ordered most recent first. 👉 Reorder if needed.
 */
export interface EarlierRole {
  name: string;
  role: string;
}

export const EARLIER_COMPANIES: EarlierRole[] = [
  { name: "CargoX", role: "Senior Front-end" },
  { name: "Ciclic", role: "Front-end" },
  { name: "UOL", role: "Front-end" },
  { name: "Voxel Digital", role: "Junior Front-end" },
  { name: "BetaQuark", role: "Intern" },
  { name: "2001 Video", role: "Intern" },
];

/**
 * Projects. `id` matches the i18n `projects.items[].id`. Text (name,
 * description) lives in the locale files; links/tags are here.
 */
export interface ProjectMeta {
  id: string;
  href?: string;
  repo?: string;
  tags: string[];
}

export const PROJECTS: ProjectMeta[] = [
  { id: "finance-assistant", tags: ["AI"] },
  { id: "movie-curator", tags: ["AI"] },
  {
    id: "portfolio",
    href: "https://renangarcia.com",
    repo: "https://github.com/renangarciasoz/portfolio",
    tags: ["Next.js", "TypeScript", "Material UI", "i18n"],
  },
];

/**
 * Skill groups. The category *titles* are translated (skills.categories[].id
 * → i18n), the individual skills are proper nouns and stay here.
 * 👉 Adjust this list so it reflects your real strengths.
 */
export interface SkillGroup {
  id: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  { id: "languages", items: ["TypeScript", "JavaScript", "HTML5", "CSS3"] },
  {
    id: "frameworks",
    items: ["React", "Next.js", "Node.js", "Material UI", "GraphQL", "Nx"],
  },
  { id: "testing", items: ["Jest", "Cypress", "Playwright"] },
  {
    id: "cloud",
    items: ["AWS", "Terraform", "CI/CD", "Bitbucket Pipelines"],
  },
  {
    id: "practices",
    items: [
      "Design Systems",
      "Web Performance",
      "Accessibility",
      "Leadership & Mentoring",
    ],
  },
  {
    id: "tools",
    items: ["Git", "Vercel", "Google Analytics", "Google Tag Manager"],
  },
];

/**
 * Education & certifications, most recent first. `id` matches the i18n
 * entries. Dates are "yyyy" or "yyyy-MM"; months are formatted per locale.
 *
 * Each entry shows a small mark next to it: the `monogram` by default, or the
 * `logo` image (rendered in grayscale) once you drop the file in
 * /public/images/logos and set its path here.
 */
export interface EducationMeta {
  id: string;
  start?: string;
  end?: string;
  /** Still enrolled: shows an "in progress" note. */
  current?: boolean;
  monogram: string;
  logo?: string;
  url?: string;
}

export const EDUCATION: EducationMeta[] = [
  {
    id: "ucla-data",
    start: "2026-09",
    end: "2027-07",
    current: true,
    monogram: "UCLA",
  },
  { id: "ilac", start: "2020", monogram: "ILAC" },
  { id: "impacta", start: "2016", end: "2018", monogram: "IT" },
];

export const CERTIFICATIONS: EducationMeta[] = [
  { id: "ucla", start: "2025-03", end: "2025-12", monogram: "UCLA" },
];
