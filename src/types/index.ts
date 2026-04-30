export interface Portal {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
  icon: string;
  dialogText: string;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  techStack: string[];
  impact: string;
  github?: string;
  live?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'language' | 'framework' | 'tool' | 'design';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  note?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface PlayerStats {
  name: string;
  title: string;
  level: number;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  profile: string;
  education: string;
  educationEntries: EducationEntry[];
  languages: string[];
  skills: Skill[];
  experiences: Experience[];
  achievements: Achievement[];
}

export type AppView = 'hub' | 'transition' | 'level';

export interface AppState {
  currentView: AppView;
  activePortal: string | null;
  hoveredElement: string | null;
  statsOpen: boolean;
  isMuted: boolean;
}
