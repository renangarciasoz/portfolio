export interface PrincipleLocale {
  title: string;
  description?: string;
}

export interface CareerJobLocale {
  id: string;
  title: string;
  company: string;
  location: string;
  summary?: string;
  highlights?: string[];
}

export interface SkillCategoryLocale {
  id: string;
  title: string;
}

export interface ProjectLocale {
  id: string;
  name: string;
  description: string;
}

export interface EducationLocale {
  id: string;
  institution: string;
  degree: string;
  location?: string;
  detail?: string;
}

// Backwards-compatible aliases (older imports).
export type PrinciplesLocale = PrincipleLocale;
export type CareerJobsLocale = CareerJobLocale;
