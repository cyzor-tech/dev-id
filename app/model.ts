import { Code2, Globe, Server, Box, Database, Smartphone, Wrench } from 'lucide-react';

// Types
export type SkillStatus = "Verified" | "Evidenced" | "Declared" | "Assessed";
export type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Beginner";
export type Skill = {
  id: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "DevOps & Cloud" | "Data" | "Mobile" | "Tools";
  years: number;
  pct: number;
  level: SkillLevel;
  status: SkillStatus;
  projectsLinked: number;
  prs?: number;
  stars?: string;
  evidence: { type: string; label: string; verified?: boolean }[];
  history: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  role: string;
  impact: string;
  stack: string[];
  stars: string;
  prs: number;
  status: "Live" | "Open Source" | "Private";
  color: string;
  featured?: boolean;
  imagePattern: string;
  links: { github?: string; live?: string };
};

export type CvVersion = {
  id: string;
  name: string;
  updated: string;
  match: number;
  isDefault?: boolean;
  ats: number;
  template: "Minimal" | "Modern" | "Executive";
};

export type Opportunity = {
  id: string;
  company: string;
  logo: string;
  role: string;
  match: number;
  salary: string;
  location: string;
  mode: string;
  desc: string;
  requirements: { label: string; matched: boolean }[];
  tags: string[];
};

export type PageId = "dashboard" | "identity" | "career" | "skills" | "portfolio" | "cv" | "integrations" | "opportunities" | "analytics" | "settings";

export const CATEGORIES = [
  { id: "Languages", label: "Languages", icon: Code2 },
  { id: "Frontend", label: "Frontend", icon: Globe },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "DevOps & Cloud", label: "DevOps & Cloud", icon: Box },
  { id: "Data", label: "Data", icon: Database },
  { id: "Mobile", label: "Mobile", icon: Smartphone },
  { id: "Tools", label: "Tools", icon: Wrench },
] as const;

export const MOCK_SKILLS: Skill[] = [
  { id: "ts", name: "TypeScript", category: "Languages", years: 6, pct: 95, level: "Expert", status: "Verified", projectsLinked: 3, evidence: [{ type: "Project", label: "Orbit UI System", verified: true }, { type: "PR", label: "47 components • 2.3k stars", verified: true }], history: "2020 Intermediate → 2021 Advanced → 2023 Expert → 2024 Staff-level" },
  { id: "js", name: "JavaScript", category: "Languages", years: 5.5, pct: 90, level: "Expert", status: "Verified", projectsLinked: 5, evidence: [{ type: "Commit", label: "1.2k commits linked" }], history: "2019 Junior → 2022 Advanced → 2024 Expert" },
  { id: "py", name: "Python", category: "Languages", years: 2.8, pct: 55, level: "Intermediate", status: "Evidenced", projectsLinked: 1, evidence: [{ type: "Course", label: "Data Pipelines @ Nubank" }], history: "2021 Beginner → 2023 Intermediate" },
  { id: "go", name: "Go", category: "Languages", years: 1.5, pct: 40, level: "Intermediate", status: "Declared", projectsLinked: 0, evidence: [], history: "2023 Started → Declared" },
  { id: "react", name: "React", category: "Frontend", years: 5, pct: 88, level: "Expert", status: "Verified", projectsLinked: 4, prs: 45, stars: "2.3k", evidence: [{ type: "Project", label: "Orbit Design System", verified: true }], history: "2019 Mid → 2022 Senior-level → 2024 Staff" },
  { id: "next", name: "Next.js", category: "Frontend", years: 4, pct: 80, level: "Advanced", status: "Verified", projectsLinked: 3, evidence: [{ type: "Project", label: "Linear App • Next 14 RSC migration" }], history: "2020 Started → 2024 Advanced" },
  { id: "tw", name: "Tailwind", category: "Frontend", years: 4, pct: 78, level: "Advanced", status: "Evidenced", projectsLinked: 3, evidence: [{ type: "Design", label: "Orbit Tokens pipeline" }], history: "2020 Intermediate → 2023 Advanced" },
  { id: "node", name: "Node.js", category: "Backend", years: 4.5, pct: 80, level: "Expert", status: "Verified", projectsLinked: 4, evidence: [{ type: "Project", label: "API Gateway • 2M req/day", verified: true }], history: "2019 → 2024 Expert" },
  { id: "pg", name: "PostgreSQL", category: "Backend", years: 4, pct: 75, level: "Advanced", status: "Verified", projectsLinked: 3, evidence: [{ type: "Project", label: "PlanetScale migration" }], history: "2020 → 2024" },
  { id: "aws", name: "AWS", category: "DevOps & Cloud", years: 3, pct: 65, level: "Advanced", status: "Evidenced", projectsLinked: 2, evidence: [{ type: "Cert", label: "AWS Solutions Architect" }], history: "2021 → 2024" },
  { id: "docker", name: "Docker", category: "DevOps & Cloud", years: 3, pct: 70, level: "Advanced", status: "Evidenced", projectsLinked: 2, evidence: [{ type: "Infra", label: "CI/CD containerized" }], history: "2021 → 2024" },
  { id: "vercel", name: "Vercel", category: "DevOps & Cloud", years: 4, pct: 80, level: "Advanced", status: "Verified", projectsLinked: 3, evidence: [{ type: "Deploy", label: "Orbit UI • Edge deployment" }], history: "2020 → 2024" },
];

export const MOCK_PROJECTS: Project[] = [
  { id: "orbit", title: "Orbit Design System", subtitle: "React • TS • 2024", desc: "Sistema de design escalável para produtos Linear-grade, com 47 componentes acessíveis e tokens pipeline.", role: "Lead Frontend • Engenheiro staff", impact: "40% faster dev velocity, 2.3k stars", stack: ["React", "TypeScript", "Figma Tokens", "Storybook"], stars: "2.3k", prs: 45, status: "Open Source", color: "#FF5A2C", featured: true, imagePattern: "orbit", links: { github: "#", live: "#" } },
  { id: "gateway", title: "API Gateway", subtitle: "Node.js • AWS • 2024", desc: "Gateway resiliente processando 2M req/dia, com rate limiting distribuído e observabilidade completa.", role: "Backend Lead • Architecture", impact: "99.99% uptime, -60% latency", stack: ["Node.js", "Redis", "PostgreSQL", "AWS"], stars: "840", prs: 120, status: "Live", color: "#111111", featured: true, imagePattern: "gateway", links: { live: "#" } },
  { id: "fintech", title: "Fintech Dashboard", subtitle: "Next.js • GraphQL • 2023", desc: "Dashboard financeiro com visualização de dados em tempo real e compliance PIX.", role: "Full-Stack • Product Engineer", impact: "R$ 40M volume tracked", stack: ["Next.js", "GraphQL", "Tailwind", "ClickHouse"], stars: "1.2k", prs: 89, status: "Live", color: "#1BC47D", featured: true, imagePattern: "fintech", links: { github: "#", live: "#" } },
  { id: "ai-sdk", title: "AI Chat SDK", subtitle: "Python • WebSocket • 2023", desc: "SDK para integração LLM com streaming, memória conversacional e function calling.", role: "Creator • OSS Maintainer", impact: "12k downloads/mês", stack: ["Python", "LangChain", "Pinecone", "FastAPI"], stars: "3.4k", prs: 32, status: "Open Source", color: "#8B5CF6", imagePattern: "ai", links: { github: "#" } },
  { id: "ecom", title: "E-commerce Platform", subtitle: "React Native • Node • 2022", desc: "Plataforma headless com checkout otimizado e integração marketplace.", role: "Mobile Lead", impact: "+28% conversion", stack: ["React Native", "Stripe", "PostgreSQL"], stars: "560", prs: 67, status: "Private", color: "#E8C86A", imagePattern: "ecom", links: {} },
  { id: "banking", title: "Mobile Banking", subtitle: "Kotlin • Compose • 2022", desc: "App bancário com biometria, PIX e design system proprietário.", role: "Android Engineer", impact: "4.8★ • 500k users", stack: ["Kotlin", "Jetpack", "GraphQL"], stars: "420", prs: 41, status: "Private", color: "#0EA5E9", imagePattern: "bank", links: {} },
];

export const MOCK_OPPS: Opportunity[] = [
  { id: "vercel", company: "Vercel", logo: "▲", role: "Frontend sênior na Vercel", match: 94, salary: "R$ 22k • $ 5.5k", location: "Remoto • SF", mode: "Remote", desc: "Lidere a evolução do Next.js App Router com foco em performance e DX. Time distribuído, cultura open-source.", requirements: [{ label: "React Expert (5y)", matched: true }, { label: "Next.js Advanced", matched: true }, { label: "TypeScript Expert", matched: true }, { label: "System Design", matched: false }], tags: ["React", "Next.js", "RSC", "Turbopack"] },
  { id: "linear", company: "Linear", logo: "L", role: "Frontend staff na Linear", match: 88, salary: "R$ 28k • $ 7k", location: "Remoto • LDN", mode: "Remote", desc: "Build the next generation issue tracking with CRDT sync and delightful interactions.", requirements: [{ label: "React Expert", matched: true }, { label: "Framer Motion", matched: true }, { label: "CRDT / Sync", matched: true }, { label: "Design Systems", matched: true }], tags: ["React", "Motion", "Sync Engine"] },
  { id: "nubank", company: "Nubank", logo: "Nu", role: "Full stack staff no Nubank", match: 82, salary: "R$ 24k", location: "São Paulo • Remoto", mode: "Hybrid", desc: "Escala global de microserviços financeiros com Clojure e Kotlin.", requirements: [{ label: "Backend Expert", matched: true }, { label: "Clojure", matched: false }, { label: "AWS", matched: true }, { label: "PostgreSQL", matched: true }], tags: ["Clojure", "Kotlin", "AWS"] },
  { id: "stripe", company: "Stripe", logo: "S", role: "Engenheiro sênior na Stripe", match: 91, salary: "R$ 32k • $ 8k", location: "Remoto • US", mode: "Remote", desc: "Payments infrastructure at global scale. APIs que movimentam trilhões.", requirements: [{ label: "Node.js Expert", matched: true }, { label: "PostgreSQL Advanced", matched: true }, { label: "API Design", matched: true }, { label: "Fintech", matched: true }], tags: ["Node", "Postgres", "Fintech"] },
  { id: "inter", company: "Inter", logo: "I", role: "Líder frontend no Inter", match: 76, salary: "R$ 18k", location: "Belo Horizonte • Hybrid", mode: "Hybrid", desc: "Super app financeiro brasileiro com 30M usuários.", requirements: [{ label: "React Native", matched: false }, { label: "TypeScript", matched: true }, { label: "Mobile", matched: false }, { label: "Leadership", matched: true }], tags: ["React", "Leadership", "Fintech"] },
];

export const CV_VERSIONS: CvVersion[] = [
  { id: "1", name: "CV - Frontend Senior", updated: "2 days ago", match: 94, isDefault: true, ats: 94, template: "Modern" },
  { id: "2", name: "CV - Full-Stack Staff", updated: "1 week ago", match: 88, ats: 92, template: "Minimal" },
  { id: "3", name: "CV - General", updated: "2 weeks ago", match: 76, ats: 86, template: "Executive" },
];
