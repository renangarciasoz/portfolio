export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  summary?: string;
  highlights?: string[];
}

export interface ResumeSkillGroup {
  category: string;
  items: string[];
}

export interface ResumeEducation {
  title: string;
  institution: string;
  detail: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeData {
  locale: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  socials: { name: string; href: string }[];
  summaryParagraphs: string[];
  labels: {
    summary: string;
    experience: string;
    skills: string;
    education: string;
    languages: string;
  };
  experience: ResumeExperience[];
  skills: ResumeSkillGroup[];
  education: ResumeEducation[];
  earlierLabel: string;
  earlierCompanies: string[];
  languages: ResumeLanguage[];
}
