import { useEffect, useState, useMemo } from "react";
import {
  Search, Plus, Settings2, LayoutDashboard, User, Briefcase, Layers, Folder, FileStack,
  Plug2, Compass, BarChart3, Settings, Share2, Pencil, Link2, MoreHorizontal,
  Check, Sparkles, Clock, ShieldCheck, X, Zap, ChevronDown, Download, Users, TrendingUp,
  ArrowUpRight, FileText, Building2, GripVertical, Dna, Verified, Link as LinkIcon, Lightbulb,
  GitBranch, Database, Globe, Server, Box, Wrench, Smartphone, Code2, Terminal, Cpu, Eye, ExternalLink,
  AlertTriangle, BookOpen, Flame, Star, MapPin, Mail, Phone, Github, Linkedin, Twitter, Globe2,
  CalendarDays, Award, GraduationCap, Trophy, BriefcaseBusiness, Rocket, Palette, Monitor, Lock,
  Bell, EyeOff, Image as ImageIcon, LayoutGrid, List, Copy, Trash2, Edit3, Save, ChevronRight, ChevronLeft,
  Filter, Heart, Bookmark, MessageSquare, DollarSign, Target, Activity, PieChart, BarChart, LineChart,
  ArrowUp, ArrowDown, Layers3, FileCheck, Paintbrush, Type, Languages, Sun, Moon, Smartphone as PhoneIcon,
  LayoutTemplate, Brush, Globe as GlobeIcon, Shield, UserCheck, Workflow, GitCommit, Package, Figma,
  Play, Pause, RotateCcw, Send, CheckCircle2, AlertCircle, Info, Crown, Gem
} from "lucide-react";
import refImage from "container:///mnt/data/src/assets/905035a972ae16e1-c8e005041ea9d8e1f7229e74e5eb4bb0.jpg";

// Types
type SkillStatus = "Verified" | "Evidenced" | "Declared" | "Assessed";
type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Beginner";
type Skill = {
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

type Project = {
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

type CvVersion = {
  id: string;
  name: string;
  updated: string;
  match: number;
  isDefault?: boolean;
  ats: number;
  template: "Minimal" | "Modern" | "Executive";
};

type Opportunity = {
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

type PageId = "dashboard" | "identity" | "career" | "skills" | "portfolio" | "cv" | "integrations" | "opportunities" | "analytics" | "settings";

const CATEGORIES = [
  { id: "Languages", label: "Languages", icon: Code2 },
  { id: "Frontend", label: "Frontend", icon: Globe },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "DevOps & Cloud", label: "DevOps & Cloud", icon: Box },
  { id: "Data", label: "Data", icon: Database },
  { id: "Mobile", label: "Mobile", icon: Smartphone },
  { id: "Tools", label: "Tools", icon: Wrench },
] as const;

const MOCK_SKILLS: Skill[] = [
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

const MOCK_PROJECTS: Project[] = [
  { id: "orbit", title: "Orbit Design System", subtitle: "React • TS • 2024", desc: "Sistema de design escalável para produtos Linear-grade, com 47 componentes acessíveis e tokens pipeline.", role: "Lead Frontend • Staff Engineer", impact: "40% faster dev velocity, 2.3k stars", stack: ["React", "TypeScript", "Figma Tokens", "Storybook"], stars: "2.3k", prs: 45, status: "Open Source", color: "#FF5A2C", featured: true, imagePattern: "orbit", links: { github: "#", live: "#" } },
  { id: "gateway", title: "API Gateway", subtitle: "Node.js • AWS • 2024", desc: "Gateway resiliente processando 2M req/dia, com rate limiting distribuído e observabilidade completa.", role: "Backend Lead • Architecture", impact: "99.99% uptime, -60% latency", stack: ["Node.js", "Redis", "PostgreSQL", "AWS"], stars: "840", prs: 120, status: "Live", color: "#111111", featured: true, imagePattern: "gateway", links: { live: "#" } },
  { id: "fintech", title: "Fintech Dashboard", subtitle: "Next.js • GraphQL • 2023", desc: "Dashboard financeiro com visualização de dados em tempo real e compliance PIX.", role: "Full-Stack • Product Engineer", impact: "R$ 40M volume tracked", stack: ["Next.js", "GraphQL", "Tailwind", "ClickHouse"], stars: "1.2k", prs: 89, status: "Live", color: "#1BC47D", featured: true, imagePattern: "fintech", links: { github: "#", live: "#" } },
  { id: "ai-sdk", title: "AI Chat SDK", subtitle: "Python • WebSocket • 2023", desc: "SDK para integração LLM com streaming, memória conversacional e function calling.", role: "Creator • OSS Maintainer", impact: "12k downloads/mês", stack: ["Python", "LangChain", "Pinecone", "FastAPI"], stars: "3.4k", prs: 32, status: "Open Source", color: "#8B5CF6", imagePattern: "ai", links: { github: "#" } },
  { id: "ecom", title: "E-commerce Platform", subtitle: "React Native • Node • 2022", desc: "Plataforma headless com checkout otimizado e integração marketplace.", role: "Mobile Lead", impact: "+28% conversion", stack: ["React Native", "Stripe", "PostgreSQL"], stars: "560", prs: 67, status: "Private", color: "#E8C86A", imagePattern: "ecom", links: {} },
  { id: "banking", title: "Mobile Banking", subtitle: "Kotlin • Compose • 2022", desc: "App bancário com biometria, PIX e design system proprietário.", role: "Android Engineer", impact: "4.8★ • 500k users", stack: ["Kotlin", "Jetpack", "GraphQL"], stars: "420", prs: 41, status: "Private", color: "#0EA5E9", imagePattern: "bank", links: {} },
];

const MOCK_OPPS: Opportunity[] = [
  { id: "vercel", company: "Vercel", logo: "▲", role: "Senior Front-end @ Vercel", match: 94, salary: "R$ 22k • $ 5.5k", location: "Remote • SF", mode: "Remote", desc: "Lidere a evolução do Next.js App Router com foco em performance e DX. Time distribuído, cultura open-source.", requirements: [{ label: "React Expert (5y)", matched: true }, { label: "Next.js Advanced", matched: true }, { label: "TypeScript Expert", matched: true }, { label: "System Design", matched: false }], tags: ["React", "Next.js", "RSC", "Turbopack"] },
  { id: "linear", company: "Linear", logo: "L", role: "Staff Frontend @ Linear", match: 88, salary: "R$ 28k • $ 7k", location: "Remote • LDN", mode: "Remote", desc: "Build the next generation issue tracking with CRDT sync and delightful interactions.", requirements: [{ label: "React Expert", matched: true }, { label: "Framer Motion", matched: true }, { label: "CRDT / Sync", matched: true }, { label: "Design Systems", matched: true }], tags: ["React", "Motion", "Sync Engine"] },
  { id: "nubank", company: "Nubank", logo: "Nu", role: "Staff Full-Stack @ Nubank", match: 82, salary: "R$ 24k", location: "São Paulo • Remote", mode: "Hybrid", desc: "Escala global de microserviços financeiros com Clojure e Kotlin.", requirements: [{ label: "Backend Expert", matched: true }, { label: "Clojure", matched: false }, { label: "AWS", matched: true }, { label: "PostgreSQL", matched: true }], tags: ["Clojure", "Kotlin", "AWS"] },
  { id: "stripe", company: "Stripe", logo: "S", role: "Senior Engineer @ Stripe", match: 91, salary: "R$ 32k • $ 8k", location: "Remote • US", mode: "Remote", desc: "Payments infrastructure at global scale. APIs que movimentam trilhões.", requirements: [{ label: "Node.js Expert", matched: true }, { label: "PostgreSQL Advanced", matched: true }, { label: "API Design", matched: true }, { label: "Fintech", matched: true }], tags: ["Node", "Postgres", "Fintech"] },
  { id: "inter", company: "Inter", logo: "I", role: "Frontend Lead @ Inter", match: 76, salary: "R$ 18k", location: "Belo Horizonte • Hybrid", mode: "Hybrid", desc: "Super app financeiro brasileiro com 30M usuários.", requirements: [{ label: "React Native", matched: false }, { label: "TypeScript", matched: true }, { label: "Mobile", matched: false }, { label: "Leadership", matched: true }], tags: ["React", "Leadership", "Fintech"] },
];

const CV_VERSIONS: CvVersion[] = [
  { id: "1", name: "CV - Frontend Senior", updated: "2 days ago", match: 94, isDefault: true, ats: 94, template: "Modern" },
  { id: "2", name: "CV - Full-Stack Staff", updated: "1 week ago", match: 88, ats: 92, template: "Minimal" },
  { id: "3", name: "CV - General", updated: "2 weeks ago", match: 76, ats: 86, template: "Executive" },
];

function RadarChart({ hoveredIdx, setHoveredIdx }: { hoveredIdx: number | null; setHoveredIdx: (n: number | null) => void }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 96;
  const axes = [
    { label: "Frontend", value: 88 },
    { label: "Backend", value: 78 },
    { label: "DevOps", value: 71 },
    { label: "Data", value: 54 },
    { label: "Mobile", value: 42 },
    { label: "Tools", value: 84 },
  ];
  const angleStep = (Math.PI * 2) / axes.length;
  const points = axes.map((a, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (a.value / 100) * maxR;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, value: a.value };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(" ");
  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {[20, 40, 60, 80, 100].map((lvl) => {
          const pts = axes.map((_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const r = (lvl / 100) * maxR;
            return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
          }).join(" ");
          return <polygon key={lvl} points={pts} fill="none" stroke="#F0EDE8" strokeWidth={lvl === 100 ? 1.2 : 0.8} strokeDasharray={lvl !== 100 ? "3 4" : undefined} />;
        })}
        {axes.map((_, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const x = cx + Math.cos(angle) * maxR;
          const y = cy + Math.sin(angle) * maxR;
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#EDE8E2" strokeWidth="1" />;
        })}
        <polygon points={polygon} fill="rgba(17,17,17,0.08)" stroke="#111" strokeWidth="2.2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer">
            {hoveredIdx === i && <circle cx={p.x} cy={p.y} r="14" fill="#111" opacity={0.08} />}
            <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? 6 : 4.5} fill="#111" stroke="white" strokeWidth="2" />
          </g>
        ))}
        {axes.map((a, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const r = maxR + 22;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return <text key={a.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" letterSpacing="0.04em" fill={hoveredIdx === i ? "#111" : "#8E8E93"}>{a.label.toUpperCase()}</text>;
        })}
      </svg>
      {hoveredIdx !== null && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[68%] mt-2 bg-[#111] text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-2">
          <span>{axes[hoveredIdx].label}</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded-full">{axes[hoveredIdx].value}% • Senior</span>
        </div>
      )}
    </div>
  );
}

function ProjectArt({ pattern, color }: { pattern: string; color: string }) {
  return (
    <div className="w-full h-[168px] rounded-[18px] overflow-hidden relative" style={{ background: color }}>
      <div className="absolute inset-0 opacity-20">
        {pattern === "orbit" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <circle cx="60" cy="40" r="28" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="60" cy="40" r="16" fill="white" />
            <path d="M100 30 L160 90 L40 90 Z" fill="none" stroke="white" strokeWidth="1.5" />
            <rect x="120" y="20" width="32" height="32" rx="6" fill="white" opacity="0.9" />
          </svg>
        )}
        {pattern === "gateway" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="20" y="20" width="160" height="8" rx="4" fill="white" />
            <rect x="20" y="40" width="120" height="8" rx="4" fill="white" opacity="0.7" />
            <rect x="20" y="60" width="100" height="8" rx="4" fill="white" opacity="0.5" />
            <circle cx="160" cy="80" r="20" fill="none" stroke="white" strokeWidth="2" />
            <path d="M150 80 L170 80 M160 70 L160 90" stroke="white" strokeWidth="2" />
          </svg>
        )}
        {pattern !== "orbit" && pattern !== "gateway" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="12" fill="white" opacity="0.8" />
            <circle cx="130" cy="40" r="24" fill="white" opacity="0.9" />
            <path d="M20 100 L180 100" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        )}
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="h-6 px-2.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold text-[#111] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#1BC47D] animate-pulse" />Live</span>
        <span className="h-6 px-2.5 rounded-full bg-[#111]/80 backdrop-blur text-[10px] font-bold text-white flex items-center gap-1"><Star size={10} />2.3k</span>
      </div>
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><ArrowUpRight size={16} /></div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("skills");
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPS);
  const [cvVersions, setCvVersions] = useState<CvVersion[]>(CV_VERSIONS);
  const [recordIds, setRecordIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | SkillStatus>("All");
  const [catFilter, setCatFilter] = useState<"All" | Skill["category"]>("All");
  const [expandedId, setExpandedId] = useState<string | null>("ts");
  const [hoveredRadar, setHoveredRadar] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [linkingFor, setLinkingFor] = useState<Skill | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: string; msg: string }[]>([]);
  const [evidencePublic, setEvidencePublic] = useState<Record<string, boolean>>({ "Orbit Design System → React, TS": true });
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  // Portfolio filters
  const [portfolioFilter, setPortfolioFilter] = useState<"All" | "Featured" | "Professional" | "Open Source">("All");
  const [portfolioLayout, setPortfolioLayout] = useState<"grid" | "masonry">("grid");
  // CV
  const [selectedCvId, setSelectedCvId] = useState("1");
  const [cvSections, setCvSections] = useState({ header: true, summary: true, experience: true, skills: true, projects: true, education: true });
  const [cvTemplate, setCvTemplate] = useState<"Minimal" | "Modern" | "Executive">("Modern");
  const [cvAccent, setCvAccent] = useState("#111111");
  // Integrations
  const [connected, setConnected] = useState<Record<string, boolean>>({ github: true, linkedin: true, vercel: true, figma: true });
  // Opportunities
  const [oppTab, setOppTab] = useState<"Discover" | "Invites" | "Applications" | "Saved">("Discover");
  const [oppFilters, setOppFilters] = useState({ stack: "React", seniority: "Senior", location: "Remote", salary: "15k+" });
  const [kanban, setKanban] = useState<Record<string, string[]>>({ Applied: ["vercel"], Screening: ["linear"], Interview: ["stripe"], Offer: [] });
  const [savedOpps, setSavedOpps] = useState<Set<string>>(new Set(["nubank"]));
  // Analytics
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  // Settings
  const [themeSel, setThemeSel] = useState("Light Beige");
  const [publicLayout, setPublicLayout] = useState<"Timeline" | "Grid" | "Masonry">("Timeline");
  const [density, setDensity] = useState<"Comfortable" | "Compact">("Comfortable");

  const [form, setForm] = useState<Partial<Skill>>({ name: "", category: "Languages", years: 3, pct: 70, level: "Advanced", status: "Evidenced", projectsLinked: 0 });
  const [projForm, setProjForm] = useState<Partial<Project>>({ title: "", subtitle: "", desc: "", role: "", stack: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.list", args: { collection: "dev_skills", limit: 100 } }) });
        const json = await res.json();
        if (json.data?.records?.length > 0) {
          const mapped: Skill[] = json.data.records.map((r: any) => r.value as Skill);
          const idMap: Record<string, string> = {};
          json.data.records.forEach((r: any) => { idMap[(r.value as Skill).id] = r.id; });
          setSkills(mapped.sort((a, b) => b.pct - a.pct));
          setRecordIds(idMap);
        }
        // portfolio
        try {
          const r2 = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.list", args: { collection: "dev_projects", limit: 50 } }) });
          const j2 = await r2.json();
          if (j2.data?.records?.length) setProjects(j2.data.records.map((x: any) => x.value));
        } catch {}
      } catch {}
      finally { setLoading(false); }
    };
    load();
  }, []);

  const pushToast = (msg: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  };

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (search && currentPage === "skills") {
        const q = search.toLowerCase();
        if (!(s.name + s.category + s.level + s.status).toLowerCase().includes(q)) return false;
      }
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      if (catFilter !== "All" && s.category !== catFilter) return false;
      return true;
    });
  }, [skills, search, statusFilter, catFilter, currentPage]);

  const topSkills = useMemo(() => [...skills].sort((a, b) => b.pct - a.pct).slice(0, 6), [skills]);
  const stats = useMemo(() => {
    const total = skills.length;
    const verified = skills.filter(s => s.status === "Verified").length;
    const evidenced = skills.filter(s => s.status === "Evidenced").length;
    const withProj = skills.filter(s => s.projectsLinked > 0).length;
    const pct = Math.round((verified / total) * 100);
    return { total, verified, evidenced, withProj, pct };
  }, [skills]);

  const grouped = useMemo(() => {
    const g: Record<string, Skill[]> = {};
    filtered.forEach((s) => { if (!g[s.category]) g[s.category] = []; g[s.category].push(s); });
    Object.keys(g).forEach(k => g[k].sort((a, b) => b.pct - a.pct));
    return g;
  }, [filtered]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (search && currentPage === "portfolio") {
        const q = search.toLowerCase();
        if (!(p.title + p.desc + p.stack.join(" ")).toLowerCase().includes(q)) return false;
      }
      if (portfolioFilter === "Featured" && !p.featured) return false;
      if (portfolioFilter === "Open Source" && p.status !== "Open Source") return false;
      if (portfolioFilter === "Professional" && p.status === "Open Source") return false;
      return true;
    });
  }, [projects, search, portfolioFilter, currentPage]);

  const filteredOpps = useMemo(() => {
    return opportunities.filter(o => {
      if (search && currentPage === "opportunities") {
        const q = search.toLowerCase();
        if (!(o.company + o.role + o.tags.join(" ")).toLowerCase().includes(q)) return false;
      }
      if (oppTab === "Saved" && !savedOpps.has(o.id)) return false;
      return true;
    });
  }, [opportunities, search, currentPage, oppTab, savedOpps]);

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    setTimeout(async () => {
      const updated = skills.map(s => s.id === id ? { ...s, status: "Verified" as SkillStatus } : s);
      setSkills(updated);
      setVerifyingId(null);
      pushToast("Verified • GitHub evidence linked");
      try {
        const recId = recordIds[id];
        const skill = updated.find(s => s.id === id);
        if (skill && recId) await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.replace", args: { collection: "dev_skills", id: recId, value: skill } }) });
      } catch {}
    }, 1100);
  };
  const handleVerifyAll = () => {
    pushToast("Verifying 4 skills with GitHub • Scanning commits...");
    setTimeout(() => { setSkills((prev) => prev.map(s => s.status === "Evidenced" ? { ...s, status: "Verified" as SkillStatus } : s)); pushToast("All matched skills verified • 68% → 84%"); }, 1500);
  };
  const handleAddSkill = async () => {
    if (!form.name) { pushToast("Skill name required"); return; }
    const newSkill: Skill = {
      id: Math.random().toString(36).slice(2, 9),
      name: form.name!,
      category: (form.category as any) || "Languages",
      years: form.years || 2,
      pct: form.pct || 60,
      level: (form.level as any) || "Intermediate",
      status: (form.status as any) || "Declared",
      projectsLinked: form.projectsLinked || 0,
      evidence: [],
      history: `${new Date().getFullYear()} Declared → ${form.level}`,
    };
    try {
      const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.create", args: { collection: "dev_skills", value: newSkill, idempotency_key: `skill-${newSkill.id}` } }) });
      const json = await res.json();
      if (json.data?.id) setRecordIds((prev) => ({ ...prev, [newSkill.id]: json.data.id }));
    } catch {}
    setSkills((prev) => [newSkill, ...prev].sort((a, b) => b.pct - a.pct));
    setShowAdd(false);
    setForm({ name: "", category: "Languages", years: 3, pct: 70, level: "Advanced", status: "Evidenced", projectsLinked: 0 });
    pushToast(`${newSkill.name} added • Technical DNA updated`);
  };
  const handleAddProject = async () => {
    if (!projForm.title) { pushToast("Title required"); return; }
    const p: Project = {
      id: Math.random().toString(36).slice(2, 7),
      title: projForm.title!,
      subtitle: projForm.subtitle || "React • 2024",
      desc: projForm.desc || "Project description",
      role: projForm.role || "Creator",
      impact: "New project",
      stack: (projForm.stack as any) || ["React"],
      stars: "0",
      prs: 0,
      status: "Open Source",
      color: "#111",
      imagePattern: "orbit",
      links: {},
    };
    setProjects(prev => [p, ...prev]);
    try { await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.create", args: { collection: "dev_projects", value: p, idempotency_key: `proj-${p.id}` } }) }); } catch {}
    setShowAddProject(false);
    pushToast("Project added • Portfolio updated");
  };
  const handleDragStart = (id: string) => setDragged(id);
  const handleDrop = (targetId: string) => {
    if (!dragged || dragged === targetId) return;
    const draggedSkill = skills.find(s => s.id === dragged);
    const targetSkill = skills.find(s => s.id === targetId);
    if (!draggedSkill || !targetSkill || draggedSkill.category !== targetSkill.category) { setDragged(null); return; }
    const catSkills = skills.filter(s => s.category === draggedSkill.category).sort((a,b)=>b.pct-a.pct);
    const fromIdx = catSkills.findIndex(s => s.id === dragged);
    const toIdx = catSkills.findIndex(s => s.id === targetId);
    if (fromIdx === -1 || toIdx === -1) { setDragged(null); return; }
    const reordered = [...catSkills];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    const otherSkills = skills.filter(s => s.category !== draggedSkill.category);
    setSkills([...otherSkills, ...reordered].sort((a,b)=> b.pct - a.pct));
    pushToast(`Reordered ${draggedSkill.name} in ${draggedSkill.category}`);
    setDragged(null);
  };

  const navItems: { id: PageId; icon: any; label: string; count?: string }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "identity", icon: User, label: "Identity" },
    { id: "career", icon: Briefcase, label: "Career" },
    { id: "skills", icon: Layers, label: "Skills", count: `${stats.total}` },
    { id: "portfolio", icon: Folder, label: "Portfolio", count: `${projects.length}` },
    { id: "cv", icon: FileStack, label: "CV Studio" },
    { id: "integrations", icon: Plug2, label: "Integrações" },
    { id: "opportunities", icon: Compass, label: "Oportunidades", count: "5" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Personalização" },
  ];

  const pageConfig: Record<PageId, { placeholder: string; actionLabel: string; actionIcon: any }> = {
    dashboard: { placeholder: "Search overview, projects, opportunities...", actionLabel: "Share Profile", actionIcon: Share2 },
    identity: { placeholder: "Search profile sections, links...", actionLabel: "Public Preview", actionIcon: Eye },
    career: { placeholder: "Search experiences, companies, roles...", actionLabel: "Add Experience", actionIcon: Plus },
    skills: { placeholder: "Search technologies, frameworks...", actionLabel: "Add Skill", actionIcon: Plus },
    portfolio: { placeholder: "Search projects, stacks, roles...", actionLabel: "New Project", actionIcon: Plus },
    cv: { placeholder: "Search CV versions, templates...", actionLabel: "Generate PDF", actionIcon: Download },
    integrations: { placeholder: "Search integrations, accounts...", actionLabel: "Import Data", actionIcon: Download },
    opportunities: { placeholder: "Search companies, roles, stacks...", actionLabel: "New Application", actionIcon: Plus },
    analytics: { placeholder: "Search keywords, companies...", actionLabel: "Export Report", actionIcon: Download },
    settings: { placeholder: "Search settings, preferences...", actionLabel: "Save Changes", actionIcon: Save },
  };

  const currentConfig = pageConfig[currentPage];

  if (loading) {
    return <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 rounded-full border-2 border-[#111] border-t-transparent animate-spin" /><span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#8E8E93]">Loading DEV ID</span></div></div>;
  }

  return (
    <div data-safe-area-inset-root className="min-h-screen w-full bg-[#F8F5F1] overflow-x-clip" style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }}>
      <div className="pointer-events-none fixed inset-0 opacity-[0.018]" style={{ backgroundImage: `url(${refImage})`, backgroundSize: "400px" }} />
      <div className="flex min-h-screen w-full max-w-[1920px] mx-auto">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-[88px] shrink-0 flex-col items-center py-6 sticky top-0 h-screen z-20">
          <div className="w-[72px] flex flex-col items-center py-5 px-2 gap-5 h-[calc(100vh-48px)] rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 rounded-[12px] bg-[#111] flex items-center justify-center text-white font-bold text-[16px] tracking-[-0.02em]">◈</div>
            <div className="w-full h-[1px] bg-[#F0EDE8]" />
            <nav className="flex flex-col gap-[8px] w-full items-center">
              {navItems.map((it) => {
                const isActive = it.id === currentPage;
                return (
                  <button
                    key={it.id}
                    onClick={() => setCurrentPage(it.id)}
                    className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]" : "text-[#8E8E93] hover:bg-[#F6F2EB] hover:text-[#111]"}`}
                    title={it.label}
                  >
                    <it.icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                    {it.count && !isActive && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[9px] font-bold text-[#111] flex items-center justify-center">{it.count}</span>}
                  </button>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col items-center gap-3">
              <div className="w-full h-[1px] bg-[#F0EDE8]" />
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#F0EDE8] relative">
                <div className="w-full h-full bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center text-[13px] font-bold text-[#5A4A32]">AN</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1BC47D] rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header data-safe-area-sticky-top className="sticky z-20 bg-[#F8F5F1]/85 backdrop-blur-[16px] border-b border-transparent" style={{ top: "var(--safe-area-inset-top)" }}>
            <div className="flex items-center gap-3 px-4 lg:px-8 py-4 lg:py-5">
              <div className="lg:hidden w-9 h-9 rounded-[10px] bg-[#111] flex items-center justify-center text-white font-bold">◈</div>
              <div className="flex-1 max-w-[560px] relative group">
                <div className="h-[44px] bg-white border border-[#F0EDE8] rounded-full flex items-center px-4 gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] group-focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-focus-within:border-[#E8E2D8] transition-all">
                  <Search size={18} className="text-[#8E8E93] shrink-0" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={currentConfig.placeholder} className="flex-1 bg-transparent outline-none text-[13.5px] font-medium placeholder:text-[#A8A8AD] text-[#111]" />
                  <div className="flex items-center gap-2">
                    {search && <button onClick={() => setSearch("")} className="w-6 h-6 rounded-full bg-[#F6F2EB] flex items-center justify-center text-[#8E8E93] hover:text-[#111]"><X size={12} /></button>}
                    <div className="w-[1px] h-5 bg-[#F0EDE8]" />
                    <button onClick={() => pushToast("Filters • contextual search")} className="w-7 h-7 rounded-full hover:bg-[#F6F2EB] flex items-center justify-center text-[#8E8E93]"><Settings2 size={16} /></button>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-9 px-3 rounded-full bg-white border border-[#F0EDE8] flex items-center gap-2 text-[11px] font-medium text-[#8E8E93]"><div className="w-2 h-2 rounded-full bg-[#1BC47D] animate-pulse" />dev.id/alex-nakamura • Live</div>
                </div>
                <button
                  onClick={() => {
                    if (currentPage === "skills") { setForm({ name: "", category: "Languages", years: 3, pct: 70, level: "Advanced", status: "Evidenced", projectsLinked: 0 }); setShowAdd(true); }
                    else if (currentPage === "portfolio") setShowAddProject(true);
                    else if (currentPage === "cv") pushToast("PDF generated • ATS 94%");
                    else if (currentPage === "opportunities") pushToast("Application tracker opened");
                    else if (currentPage === "analytics") pushToast("Report exported • analytics_30d.pdf");
                    else if (currentPage === "settings") pushToast("Changes saved • Theme updated");
                    else pushToast(`${currentConfig.actionLabel} • Coming from header`);
                  }}
                  className="h-10 lg:h-[44px] px-5 bg-[#111] text-white rounded-full flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] hover:bg-black transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                >
                  <currentConfig.actionIcon size={16} />
                  <span className="hidden sm:inline">{currentConfig.actionLabel}</span>
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-6 xl:px-8 py-5 lg:py-6 pb-[88px] lg:pb-6">
            <div className="max-w-[1480px] mx-auto flex flex-col gap-5">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] flex-wrap">
                <span className="text-[#8E8E93] font-medium">Developer Workspace</span>
                <span className="text-[#E8E2D8]">/</span>
                <span className="text-[#111] font-bold flex items-center gap-1.5 capitalize">
                  <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center">
                    {(() => { const it = navItems.find(n => n.id === currentPage); const Ic = it?.icon || Layers; return <Ic size={12} />; })()}
                  </span>
                  {navItems.find(n => n.id === currentPage)?.label}
                </span>
                <span className="ml-auto hidden md:flex items-center gap-3 text-[11px] text-[#8E8E93]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1BC47D] animate-pulse" />Evidence sync • 2h ago</span>
                  <span className="w-[1px] h-3 bg-[#E8E2D8]" />
                  <span>{currentPage === "skills" ? `${stats.total} skills • 6y evolving` : currentPage === "portfolio" ? `${projects.length} projects • 8.4k stars` : "DEV ID • v2.4"}</span>
                </span>
              </div>

              {/* PAGES */}
              {currentPage === "dashboard" && (
                <DashboardPage pushToast={pushToast} skills={skills} projects={projects} topSkills={topSkills} stats={stats} setCurrentPage={setCurrentPage} />
              )}

              {currentPage === "identity" && (
                <IdentityPage pushToast={pushToast} />
              )}

              {currentPage === "career" && (
                <CareerPage pushToast={pushToast} />
              )}

              {currentPage === "skills" && (
                <SkillsPage
                  skills={skills} grouped={grouped} topSkills={topSkills} stats={stats} filtered={filtered}
                  expandedId={expandedId} setExpandedId={setExpandedId}
                  hoveredRadar={hoveredRadar} setHoveredRadar={setHoveredRadar}
                  hoveredBar={hoveredBar} setHoveredBar={setHoveredBar}
                  statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                  catFilter={catFilter} setCatFilter={setCatFilter}
                  collapsedCats={collapsedCats} setCollapsedCats={setCollapsedCats}
                  dragged={dragged} handleDragStart={handleDragStart} handleDrop={handleDrop} setDragged={setDragged}
                  verifyingId={verifyingId} handleVerify={handleVerify} handleVerifyAll={handleVerifyAll}
                  setLinkingFor={setLinkingFor} evidencePublic={evidencePublic} setEvidencePublic={setEvidencePublic}
                  pushToast={pushToast}
                />
              )}

              {currentPage === "portfolio" && (
                <PortfolioPage
                  projects={filteredProjects} allProjects={projects} portfolioFilter={portfolioFilter} setPortfolioFilter={setPortfolioFilter}
                  layout={portfolioLayout} setLayout={setPortfolioLayout}
                  setSelectedProject={setSelectedProject} setShowAdd={setShowAddProject} pushToast={pushToast} search={search}
                />
              )}

              {currentPage === "cv" && (
                <CvPage
                  versions={cvVersions} selectedId={selectedCvId} setSelectedId={setSelectedCvId}
                  sections={cvSections} setSections={setCvSections}
                  template={cvTemplate} setTemplate={setCvTemplate}
                  accent={cvAccent} setAccent={setCvAccent}
                  pushToast={pushToast} setVersions={setCvVersions}
                />
              )}

              {currentPage === "integrations" && (
                <IntegrationsPage connected={connected} setConnected={setConnected} pushToast={pushToast} />
              )}

              {currentPage === "opportunities" && (
                <OpportunitiesPage
                  opportunities={filteredOpps} allOpps={opportunities} oppTab={oppTab} setOppTab={setOppTab}
                  filters={oppFilters} setFilters={setOppFilters}
                  kanban={kanban} setKanban={setKanban}
                  saved={savedOpps} setSaved={setSavedOpps}
                  pushToast={pushToast}
                />
              )}

              {currentPage === "analytics" && (
                <AnalyticsPage period={analyticsPeriod} setPeriod={setAnalyticsPeriod} projects={projects} pushToast={pushToast} />
              )}

              {currentPage === "settings" && (
                <SettingsPage
                  themeSel={themeSel} setThemeSel={setThemeSel}
                  publicLayout={publicLayout} setPublicLayout={setPublicLayout}
                  density={density} setDensity={setDensity}
                  pushToast={pushToast}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-2 bg-gradient-to-t from-[#F8F5F1] via-[#F8F5F1] to-transparent">
        <div className="bg-white border border-[#F0EDE8] rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.map((it) => {
            const active = it.id === currentPage;
            return (
              <button key={it.id} onClick={() => setCurrentPage(it.id)} className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${active ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]" : "text-[#8E8E93]"}`}>
                <it.icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* MODALS */}
      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center p-0 lg:p-6">
          <div className="absolute inset-0 bg-[#111]/20 backdrop-blur-[8px]" onClick={() => setShowAdd(false)} />
          <div className="relative w-full lg:max-w-[520px] bg-white rounded-t-[28px] lg:rounded-[28px] border border-[#F0EDE8] shadow-[0_24px_64px_rgba(0,0,0,0.16)] max-h-[90vh] overflow-auto animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="sticky top-0 bg-white/90 backdrop-blur-[12px] p-6 border-b border-[#F0EDE8] flex items-center justify-between">
              <h3 className="text-[16px] font-bold flex items-center gap-2.5"><span className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center"><Layers size={14} /></span>Add Skill</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><X size={14} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Technology *</label>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                  <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rust, Kubernetes, GraphQL..." className="h-[44px] w-full pl-11 pr-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[14px] font-semibold outline-none focus:bg-white focus:border-[#111] focus:ring-[3px] focus:ring-[#111]/10 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })} className="h-[44px] px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-semibold outline-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Level</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as any })} className="h-[44px] px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-semibold outline-none">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Years</label>
                  <input type="number" step="0.5" min={0} max={20} value={form.years} onChange={(e) => setForm({ ...form, years: Number(e.target.value), pct: Math.min(95, Math.max(10, Number(e.target.value) * 12 + 20)) })} className="h-[44px] px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[14px] font-semibold outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="h-[44px] px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-semibold outline-none">
                    <option>Declared</option><option>Evidenced</option><option>Verified</option><option>Assessed</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 h-11 rounded-full bg-white border border-[#F0EDE8] text-[13px] font-bold">Cancel</button>
                <button onClick={handleAddSkill} className="flex-1 h-11 rounded-full bg-[#111] text-white text-[13px] font-bold flex items-center justify-center gap-2"><Zap size={14} /> Add Skill</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddProject && (
        <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center p-0 lg:p-6">
          <div className="absolute inset-0 bg-[#111]/20 backdrop-blur-[8px]" onClick={() => setShowAddProject(false)} />
          <div className="relative w-full lg:max-w-[520px] bg-white rounded-t-[28px] lg:rounded-[28px] border border-[#F0EDE8] shadow-[0_24px_64px_rgba(0,0,0,0.16)] max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white/90 backdrop-blur-[12px] p-6 border-b border-[#F0EDE8] flex items-center justify-between">
              <h3 className="text-[16px] font-bold flex items-center gap-2.5"><span className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center"><Folder size={14} /></span>New Project</h3>
              <button onClick={() => setShowAddProject(false)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><X size={14} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Project Title *</label>
                <input value={projForm.title || ""} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} placeholder="Orbit Design System" className="h-[44px] w-full px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[14px] font-semibold outline-none focus:border-[#111]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Stack</label>
                  <input value={projForm.subtitle || ""} onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })} placeholder="React • TS • 2024" className="h-[44px] w-full px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-semibold outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Your Role</label>
                  <input value={projForm.role || ""} onChange={(e) => setProjForm({ ...projForm, role: e.target.value })} placeholder="Lead Frontend" className="h-[44px] w-full px-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-semibold outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] ml-1">Description</label>
                <textarea value={projForm.desc || ""} onChange={(e) => setProjForm({ ...projForm, desc: e.target.value })} placeholder="What you built, impact..." className="min-h-[80px] w-full p-4 bg-[#FDFCFA] border border-[#EDE8E2] rounded-[12px] text-[13px] font-medium outline-none focus:border-[#111] resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddProject(false)} className="flex-1 h-11 rounded-full bg-white border border-[#F0EDE8] text-[13px] font-bold">Cancel</button>
                <button onClick={handleAddProject} className="flex-1 h-11 rounded-full bg-[#111] text-white text-[13px] font-bold flex items-center justify-center gap-2"><Rocket size={14} /> Create Project</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center p-0 lg:p-6">
          <div className="absolute inset-0 bg-[#111]/30 backdrop-blur-[10px]" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full lg:max-w-[720px] bg-white rounded-t-[28px] lg:rounded-[28px] border border-[#F0EDE8] shadow-[0_24px_64px_rgba(0,0,0,0.16)] max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white/90 backdrop-blur-[12px] p-6 border-b border-[#F0EDE8] flex items-center justify-between">
              <h3 className="text-[16px] font-bold flex items-center gap-2.5"><span className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: selectedProject.color }}><Layers3 size={14} /></span>{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><X size={14} /></button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <ProjectArt pattern={selectedProject.imagePattern} color={selectedProject.color} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-bold px-2.5 py-1 rounded-full bg-[#111] text-white">{selectedProject.status}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">{selectedProject.subtitle}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-[#F0EDE8] flex items-center gap-1"><Star size={10} />{selectedProject.stars}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-[#F0EDE8]">{selectedProject.prs} PRs</span>
                </div>
                <h4 className="text-[20px] font-bold tracking-[-0.02em] mt-3">{selectedProject.title}</h4>
                <p className="text-[13px] text-[#8E8E93] mt-1 leading-[1.5]">{selectedProject.desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[16px] bg-[#F8F5F1] border border-[#F0EDE8] p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Your Role</div>
                  <div className="text-[13px] font-semibold mt-1">{selectedProject.role}</div>
                </div>
                <div className="rounded-[16px] bg-[#F8F5F1] border border-[#F0EDE8] p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Impact</div>
                  <div className="text-[13px] font-semibold mt-1 text-[#1BC47D]">{selectedProject.impact}</div>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map(s => <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-[#F0EDE8]">{s}</span>)}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { pushToast("Opening GitHub • Orbit"); }} className="h-10 px-4 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center gap-2"><Github size={14} /> GitHub</button>
                <button onClick={() => { pushToast("Opening Live demo"); }} className="h-10 px-4 rounded-full bg-white border border-[#F0EDE8] text-[12px] font-bold flex items-center gap-2"><ExternalLink size={14} /> Live Demo</button>
                <button onClick={() => setSelectedProject(null)} className="ml-auto h-10 px-4 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[12px] font-bold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {linkingFor && (
        <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center p-0 lg:p-6">
          <div className="absolute inset-0 bg-[#111]/20 backdrop-blur-[8px]" onClick={() => setLinkingFor(null)} />
          <div className="relative w-full lg:max-w-[480px] bg-white rounded-t-[28px] lg:rounded-[28px] border border-[#F0EDE8] shadow-[0_24px_64px_rgba(0,0,0,0.16)] max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white/90 backdrop-blur-[12px] p-6 border-b border-[#F0EDE8] flex items-center justify-between">
              <h3 className="text-[15px] font-bold flex items-center gap-2"><Link2 size={14} className="p-1 w-7 h-7 rounded-full bg-[#111] text-white" /> Link Evidence to {linkingFor.name}</h3>
              <button onClick={() => setLinkingFor(null)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><X size={14} /></button>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {["Orbit Design System → React, TS", "API Gateway → Node.js, AWS", "Linear Sync Engine → CRDT, Redis"].map((proj) => (
                <button key={proj} onClick={() => { setSkills((prev) => prev.map(s => s.id === linkingFor.id ? { ...s, evidence: [...s.evidence, { type: "Project", label: proj, verified: true }], projectsLinked: s.projectsLinked + 1, status: "Verified" as SkillStatus } : s)); pushToast(`Linked ${proj} to ${linkingFor.name} • Verified`); setLinkingFor(null); }} className="flex items-center gap-3 p-3 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] hover:bg-white hover:border-[#E8E2D8] text-left transition-colors">
                  <div className="w-8 h-8 rounded-[10px] bg-white border border-[#F0EDE8] flex items-center justify-center text-[11px] font-bold">{proj[0]}</div>
                  <div className="flex-1 min-w-0"><div className="text-[13px] font-semibold truncate">{proj}</div><div className="text-[11px] text-[#8E8E93]">Project • Click to link</div></div>
                  <Plus size={16} className="text-[#8E8E93]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 z-[70] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto bg-[#111] text-white text-[13px] font-medium px-4 py-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex items-center gap-2.5 animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center"><Sparkles size={12} /></div>{t.msg}
          </div>
        ))}
      </div>

      <style>{`@keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .scrollbar-none::-webkit-scrollbar { display: none; } .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}

// PAGES COMPONENTS

function DashboardPage({ pushToast, skills, projects, topSkills, stats, setCurrentPage }: any) {
  return (
    <div className="flex flex-col gap-5">
      {/* Hero Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px] lg:p-[28px] relative overflow-hidden">
          <div className="flex items-start gap-5">
            <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center text-[22px] font-bold text-[#5A4A32] shrink-0">AN</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[22px] font-bold tracking-[-0.02em]">Alex Nakamura</h2>
                <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center"><Check size={12} strokeWidth={3} /></span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#111] text-white">Staff Engineer</span>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">São Paulo • Remote</span>
              </div>
              <p className="text-[13px] text-[#8E8E93] mt-2 leading-[1.5]">Staff Frontend Engineer focused on design systems, realtime sync, and performance. Ex-Linear, Nubank. Building delightful devtools.</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["React", "TypeScript", "Next.js", "Node.js", "Design Systems", "CRDT"].map(t => <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8]">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { k: "1.24k", l: "Profile Views", d: "+18%", c: "text-[#1BC47D]" },
              { k: "47", l: "Recruiter Views", d: "+12%", c: "text-[#1BC47D]" },
              { k: "12", l: "Invites", d: "3 new", c: "text-[#FF5A2C]" },
            ].map((m, i) => (
              <div key={i} className="rounded-[16px] bg-[#F8F5F1] border border-[#F0EDE8] p-3">
                <div className="flex items-center gap-1.5"><span className="text-[18px] font-bold tracking-[-0.02em]">{m.k}</span><span className={`text-[11px] font-bold ${m.c}`}>{m.d}</span></div>
                <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px] flex flex-col gap-4">
          <div className="flex items-center justify-between"><h4 className="text-[14px] font-bold flex items-center gap-2"><Compass size={16} /> Opportunities matching</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#FF5A2C] text-white">5 new</span></div>
          {[
            { co: "Vercel", match: "94% Match", role: "Senior Front-end", color: "#111" },
            { co: "Linear", match: "88% Match", role: "Staff Frontend", color: "#5A4A32" },
            { co: "Stripe", match: "91% Match", role: "Senior Engineer", color: "#635BFF" },
          ].map((o, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] hover:bg-white transition-colors cursor-pointer" onClick={() => pushToast(`${o.co} • Open opportunity`)}>
              <div className="w-9 h-9 rounded-[12px] bg-white border border-[#F0EDE8] flex items-center justify-center font-bold text-[13px]" style={{ color: o.color }}>{o.co[0]}</div>
              <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold truncate">{o.role} @ {o.co}</div><div className="text-[11px] text-[#8E8E93]">{o.match} • Remote • R$ 22k</div></div>
              <ArrowUpRight size={14} className="text-[#8E8E93]" />
            </div>
          ))}
          <button onClick={() => setCurrentPage("opportunities")} className="h-9 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center justify-center gap-1.5"><Compass size={14} /> View all opportunities</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><Dna size={16} /> Technical DNA • Top skills</h3><button onClick={() => setCurrentPage("skills")} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] hover:border-[#111]">View DNA</button></div>
          <div className="flex flex-col gap-3">
            {topSkills.map((s: Skill) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-[13px] font-bold w-[96px] truncate">{s.name}</span>
                <div className="flex-1 h-[8px] bg-[#F0EDE8] rounded-full overflow-hidden"><div className="h-full bg-[#111] rounded-full" style={{ width: `${s.pct}%` }} /></div>
                <span className="text-[11px] font-bold mono w-8 text-right">{s.pct}%</span>
                <span className={`w-2 h-2 rounded-full ${s.status === "Verified" ? "bg-[#111]" : "bg-[#E8C86A]"}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px] flex flex-col gap-3">
          <h4 className="text-[14px] font-bold flex items-center gap-2"><Activity size={16} /> Recruiter Activity</h4>
          {[
            { text: "Stripe viewed your profile • 2h ago", dot: "bg-[#111]" },
            { text: "Vercel recruiter saved API Gateway • 5h ago", dot: "bg-[#FF5A2C]" },
            { text: "Linear invited you to Staff role • 1d ago", dot: "bg-[#1BC47D]" },
            { text: "Your profile appeared in 12 searches today", dot: "bg-[#E8C86A]" },
          ].map((a, i) => (
            <div key={i} className="flex gap-2.5 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8] text-[12px]">
              <span className={`mt-1 w-2 h-2 rounded-full ${a.dot} shrink-0`} /><span className="text-[#444] leading-[1.4]">{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
        <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><Folder size={16} /> Portfolio highlights</h3><button onClick={() => setCurrentPage("portfolio")} className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#111] text-white">View all {projects.length}</button></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((p: Project) => (
            <div key={p.id} className="rounded-[20px] border border-[#F0EDE8] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all group">
              <div className="p-3"><ProjectArt pattern={p.imagePattern} color={p.color} /></div>
              <div className="p-4 pt-2">
                <div className="text-[13px] font-bold">{p.title}</div>
                <div className="text-[11px] text-[#8E8E93] mt-1">{p.subtitle} • {p.impact}</div>
                <div className="flex gap-1 mt-2 flex-wrap">{p.stack.slice(0, 3).map((s: string) => <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">{s}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IdentityPage({ pushToast }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
      <div className="flex flex-col gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><User size={16} /> Photo & Headline</h3>
          <div className="flex gap-5">
            <div className="w-[88px] h-[88px] rounded-[22px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center text-[24px] font-bold text-[#5A4A32] shrink-0">AN</div>
            <div className="flex-1">
              <div className="text-[18px] font-bold">Alex Nakamura — Staff Frontend Engineer</div>
              <div className="text-[13px] text-[#8E8E93] mt-1">Building delightful interfaces • Design Systems • Realtime sync • 6y exp • São Paulo/Remote</div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => pushToast("Edit photo")} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><Pencil size={12} /> Edit</button>
                <button onClick={() => pushToast("Crop photo")} className="h-8 px-3 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[11px] font-bold">Crop</button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><BriefcaseBusiness size={16} /> Professional Position</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Current Role</label>
              <div className="h-[44px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">Staff Frontend Engineer</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Company</label>
              <div className="h-[44px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">Linear • ex-Nubank</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Specialization</div>
            <div className="flex flex-wrap gap-2">
              {["Design Systems", "Realtime Sync", "Performance", "Frontend Architecture"].map(s => <span key={s} className="px-3 py-1.5 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center gap-1.5">{s} <X size={12} className="opacity-60" /></span>)}
              <button onClick={() => pushToast("Add specialization")} className="px-3 py-1.5 rounded-full bg-white border border-dashed border-[#E8E2D8] text-[11px] font-bold text-[#8E8E93] flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Seniority Level</div>
            <div className="flex p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">
              {["Mid", "Senior", "Staff", "Principal"].map(l => <span key={l} className={`h-8 px-4 rounded-full text-[12px] font-bold flex items-center ${l === "Staff" ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{l}</span>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><MapPin size={14} /> Location & Work</h4>
            <div className="flex flex-col gap-2 text-[12px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Location</span><span className="font-semibold">São Paulo, BR • Remote</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Work mode</span><span className="font-semibold">Remote • Hybrid ok</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Relocation</span><span className="font-semibold">Open to EU/US</span></div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Languages size={14} /> Languages & Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { icon: Github, label: "github.com/alexnakamura", verified: true },
                { icon: Linkedin, label: "linkedin.com/in/alexn", verified: true },
                { icon: Globe2, label: "alexn.dev • Personal site", verified: false },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]">
                  <div className="w-8 h-8 rounded-[10px] bg-white border border-[#F0EDE8] flex items-center justify-center"><l.icon size={14} /></div>
                  <span className="text-[12px] font-medium flex-1 truncate">{l.label}</span>
                  {l.verified && <span className="w-5 h-5 rounded-full bg-[#111] text-white flex items-center justify-center"><Check size={10} strokeWidth={3} /></span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><Eye size={16} /> Public Preview</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1BC47D] text-white">Live</span></div>
          <div className="rounded-[16px] border border-[#F0EDE8] overflow-hidden bg-[#F8F5F1]">
            <div className="h-8 bg-white border-b border-[#F0EDE8] flex items-center px-3 gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5A2C]" /><div className="w-2.5 h-2.5 rounded-full bg-[#E8C86A]" /><div className="w-2.5 h-2.5 rounded-full bg-[#1BC47D]" /><div className="ml-3 flex-1 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center px-2 text-[10px] text-[#8E8E93]">dev.id/alex-nakamura</div></div>
            <div className="p-4 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center font-bold text-[#5A4A32]">AN</div>
              <div className="text-[14px] font-bold">Alex Nakamura</div>
              <div className="text-[11px] text-[#8E8E93]">Staff Frontend • Design Systems</div>
              <div className="h-2 bg-white rounded-full w-3/4" />
              <div className="h-2 bg-white rounded-full w-1/2" />
            </div>
          </div>
          <button onClick={() => pushToast("Opening dev.id/alex-nakamura")} className="mt-3 w-full h-9 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center justify-center gap-2"><ExternalLink size={14} /> Open public profile</button>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <h4 className="text-[13px] font-bold mb-3">Completeness • 87%</h4>
          <div className="relative w-[88px] h-[88px] mx-auto">
            <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90"><circle cx="44" cy="44" r="36" fill="none" stroke="#F0EDE8" strokeWidth="8" /><circle cx="44" cy="44" r="36" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.87} ${2 * Math.PI * 36}`} /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[18px] font-bold">87%</div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-[11px]">
            <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>Photo & Headline</span><Check size={12} className="text-[#065F46]" /></div>
            <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>Experience • 3 roles</span><Check size={12} className="text-[#065F46]" /></div>
            <div className="flex justify-between p-2 rounded-[10px] bg-[#FFF7ED] border border-[#FFEDD5]"><span>Add 1 more project</span><AlertTriangle size={12} className="text-[#9A3412]" /></div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
          <h4 className="text-[13px] font-bold flex items-center gap-2"><Lock size={14} /> Privacy</h4>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { label: "Show salary expectation", on: true },
              { label: "Show contact email", on: false },
              { label: "Allow recruiter messages", on: true },
              { label: "Public portfolio", on: true },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between text-[12px]">
                <span className="text-white/80">{p.label}</span>
                <div className={`w-[36px] h-[22px] rounded-full relative border transition-all ${p.on ? "bg-white border-white" : "bg-white/15 border-white/15"}`}>
                  <div className={`w-[16px] h-[16px] rounded-full absolute top-[2px] transition-all ${p.on ? "bg-[#111] translate-x-[14px]" : "bg-white translate-x-[2px]"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerPage({ pushToast }: any) {
  const experiences = [
    { company: "Linear", role: "Staff Frontend Engineer", period: "2022 → Now • 2.5y", location: "Remote • London", desc: "Leading design systems and realtime sync engine with CRDT. Staff-level scope.", badges: ["Staff", "Design Systems", "CRDT"], tech: ["React", "TypeScript", "Framer Motion", "Yjs"], achievements: ["Reduced UI latency 60%", "Built Orbit DS used by 40 engineers"] },
    { company: "Nubank", role: "Senior Frontend", period: "2020 → 2022 • 2y", location: "São Paulo • Hybrid", desc: "Scaled fintech dashboard, Pix compliance, design tokens pipeline.", badges: ["Senior", "Fintech"], tech: ["React", "GraphQL", "Tailwind"], achievements: ["R$ 40M volume tracked", "Migrated to Style Dictionary"] },
    { company: "Stone", role: "Mid Frontend Intern", period: "2019 → 2020 • 1y", location: "São Paulo", desc: "First role • Built internal tools and payment dashboards.", badges: ["Intern", "First"], tech: ["JavaScript", "Vue"], achievements: ["Shipped 12 internal tools"] },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px] overflow-hidden">
        <div className="flex items-center justify-between mb-6"><h3 className="text-[15px] font-bold flex items-center gap-2"><CalendarDays size={16} /> Timeline • 2019 → 2024 • 6y</h3><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">3 experiences • Staff-level</span></div>
        <div className="relative">
          <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-[#F0EDE8]" />
          <div className="absolute top-[22px] left-0 w-[85%] h-[2px] bg-[#111]" />
          <div className="flex justify-between relative">
            {[
              { year: "2019", label: "Stone • Intern", dot: "bg-white border-2 border-[#E8E2D8]" },
              { year: "2020", label: "Nubank • Mid", dot: "bg-[#E8C86A]" },
              { year: "2022", label: "Linear • Senior", dot: "bg-[#111] ring-4 ring-[#111]/15" },
              { year: "2024", label: "Linear • Staff", dot: "bg-[#111] ring-4 ring-[#111]/20 scale-110" },
            ].map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-[20px] h-[20px] rounded-full ${n.dot} relative z-10 flex items-center justify-center`}>
                  {i === 3 && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                <div className="text-[11px] font-bold">{n.year}</div>
                <div className="text-[10px] text-[#8E8E93] font-medium text-center">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => (
            <div key={i} className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-[14px] bg-[#111] text-white flex items-center justify-center font-bold text-[14px]">{exp.company[0]}</div>
                  <div>
                    <div className="text-[15px] font-bold flex items-center gap-2">{exp.role} @ {exp.company} <span className="w-5 h-5 rounded-full bg-[#111] text-white flex items-center justify-center"><Check size={10} strokeWidth={3} /></span></div>
                    <div className="text-[11px] text-[#8E8E93] mt-1 flex items-center gap-2"><Clock size={10} /> {exp.period} • <MapPin size={10} /> {exp.location}</div>
                  </div>
                </div>
                <button onClick={() => pushToast(`Edit ${exp.company}`)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><Pencil size={12} /></button>
              </div>
              <p className="text-[13px] text-[#444] mt-4 leading-[1.5]">{exp.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.badges.map(b => <span key={b} className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#111] text-white">{b}</span>)}
                {exp.tech.map(t => <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8]">{t}</span>)}
              </div>
              <div className="mt-4 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Achievements</div>
                <div className="flex flex-col gap-1.5">
                  {exp.achievements.map((a, j) => <div key={j} className="flex items-center gap-2 text-[12px]"><Check size={12} className="text-[#1BC47D]" /> {a}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><GraduationCap size={16} /> Education</h4>
            <div className="p-3 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8]">
              <div className="text-[13px] font-bold">USP • Computer Science</div>
              <div className="text-[11px] text-[#8E8E93] mt-1">2015 → 2019 • Bachelor • GPA 8.9</div>
              <div className="flex gap-1 mt-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#F0EDE8]">Top 5%</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111] text-white">Honors</span></div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Award size={16} /> Certifications • 2</h4>
            <div className="flex flex-col gap-2">
              {[
                { name: "AWS Solutions Architect", issuer: "Amazon • 2023", verified: true },
                { name: "Meta Frontend Professional", issuer: "Meta • 2022", verified: true },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]">
                  <div className="w-8 h-8 rounded-[10px] bg-[#111] text-white flex items-center justify-center"><Award size={14} /></div>
                  <div className="flex-1"><div className="text-[12px] font-semibold">{c.name}</div><div className="text-[10px] text-[#8E8E93]">{c.issuer}</div></div>
                  {c.verified && <Check size={14} className="text-[#1BC47D]" />}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Trophy size={16} /> Career Insights</h4>
            <div className="h-[84px] w-full relative">
              <svg viewBox="0 0 200 84" className="w-full h-full">
                <path d="M0 60 Q 50 50, 100 30 T 200 10" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="200" cy="10" r="6" fill="#111" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-[#8E8E93] mt-1"><span>2019 • Mid</span><span>2024 • Staff</span></div>
            <div className="mt-3 p-2.5 rounded-[12px] bg-[#111] text-white text-[11px] flex gap-2"><TrendingUp size={14} className="shrink-0 mt-0.5" /><span>Growth 200% • 6y • From intern to Staff at Linear-grade company. Top 5% trajectory.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsPage(props: any) {
  const { grouped, topSkills, stats, expandedId, setExpandedId, hoveredRadar, setHoveredRadar, hoveredBar, setHoveredBar, statusFilter, setStatusFilter, catFilter, setCatFilter, collapsedCats, setCollapsedCats, dragged, handleDragStart, handleDrop, setDragged, verifyingId, handleVerify, handleVerifyAll, setLinkingFor, evidencePublic, setEvidencePublic, pushToast } = props;
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px] lg:p-[28px] overflow-hidden relative">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-[16px] lg:text-[18px] font-bold tracking-[-0.02em] flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center"><Dna size={14} /></span>
            Technical DNA
            <span className="text-[#E8E2D8] font-normal">•</span>
            <span className="font-normal text-[#8E8E93] text-[14px]">{stats.total} skills • 6y evolving</span>
            <span className="hidden sm:inline-flex items-center gap-2 ml-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white bg-[#111] px-2.5 py-1 rounded-full flex items-center gap-1"><ShieldCheck size={12} /> Verified {stats.pct}%</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8E8E93] bg-[#F6F2EB] border border-[#F0EDE8] px-2.5 py-1 rounded-full">{stats.verified} Verified • {stats.evidenced} Evidenced</span>
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={handleVerifyAll} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[12px] font-semibold flex items-center gap-1.5 hover:border-[#111]"><GitBranch size={14} /> Verify All with GitHub</button>
            <button onClick={() => pushToast("Export DNA PDF")} className="h-9 px-4 rounded-full bg-[#111] text-white text-[12px] font-semibold flex items-center gap-1.5"><Download size={14} /> Export DNA</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_240px] gap-8 items-start">
          <div className="flex flex-col items-center"><RadarChart hoveredIdx={hoveredRadar} setHoveredIdx={setHoveredRadar} /><div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]"><span className="w-2 h-2 rounded-full bg-[#111]" /> Proficiency Radar<span className="w-[1px] h-3 bg-[#E8E2D8]" /><span>6 axes • avg 69%</span></div></div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Top Skills • Experience</span><span className="text-[11px] font-semibold text-[#8E8E93] flex items-center gap-1"><Clock size={12} /> Years active</span></div>
            <div className="flex flex-col gap-3.5">
              {topSkills.map((s: Skill) => (
                <div key={s.id} onMouseEnter={() => setHoveredBar(s.id)} onMouseLeave={() => setHoveredBar(null)} className="group relative">
                  <div className="flex items-center justify-between mb-1.5"><div className="flex items-center gap-2"><span className="text-[13px] font-bold">{s.name}</span><span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{s.years}y</span><span className={`w-2 h-2 rounded-full ${s.status === "Verified" ? "bg-[#111]" : s.status === "Evidenced" ? "bg-[#E8C86A]" : "bg-[#D6D0C8]"}`} /></div><span className="text-[11px] font-bold mono text-[#8E8E93]">{s.pct}%</span></div>
                  <div className="h-[8px] bg-[#F0EDE8] rounded-full overflow-hidden relative"><div className="h-full bg-[#111] rounded-full transition-all duration-700" style={{ width: `${s.pct}%` }} /><div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-[#111] shadow-sm" style={{ left: `calc(${s.pct}% - 4px)` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[16px] bg-[#F8F5F1] border border-[#F0EDE8] p-4">
              <div className="flex items-center justify-between mb-3"><span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Evolution • Skills growth</span><span className="text-[11px] font-bold text-[#1BC47D] flex items-center gap-1"><TrendingUp size={12} /> +200% • 2020→2024</span></div>
              <div className="relative h-[64px] w-full"><svg viewBox="0 0 300 64" className="w-full h-full"><defs><linearGradient id="evo" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#111" stopOpacity="0.12" /><stop offset="100%" stopColor="#111" stopOpacity="0" /></linearGradient></defs><path d="M0 52 Q 40 48, 75 40 T 150 28 T 225 16 T 300 8 L 300 64 L 0 64 Z" fill="url(#evo)" /><path d="M0 52 Q 40 48, 75 40 T 150 28 T 225 16 T 300 8" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" /></svg></div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.06em] text-[#A8A8AD] mt-1"><span>2020 • 8</span><span>2021 • 12</span><span>2022 • 16</span><span>2023 • 20</span><span>2024 • 24</span></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-[16px] bg-[#FDFCFA] border border-[#F0EDE8] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-3 flex items-center gap-1.5"><ShieldCheck size={12} /> Evidence Engine • Legend</div>
              <div className="flex flex-col gap-2.5">
                {[{ dot: "bg-[#C9C5BE]", label: "Declared", desc: "Self-reported, no proof yet", count: `${stats.total - stats.verified - stats.evidenced} skills` }, { dot: "bg-[#E8C86A]", label: "Evidenced", desc: "Linked to project / commit / cert", count: `${stats.evidenced} skills` }, { dot: "bg-[#111]", label: "Verified", desc: "GitHub + peer verified, trusted", count: `${stats.verified} skills` }].map((l) => (
                  <div key={l.label} className="flex gap-2.5"><div className={`mt-1 w-2.5 h-2.5 rounded-full ${l.dot} shrink-0`} /><div><div className="text-[12px] font-bold flex items-center gap-1.5">{l.label} <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{l.count}</span></div><div className="text-[11px] text-[#8E8E93] leading-[1.3] mt-0.5">{l.desc}</div></div></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">{[{ k: `${stats.total}`, v: "Total" }, { k: `${stats.verified}`, v: "Verified" }, { k: `${stats.evidenced}`, v: "Evidenced" }, { k: `${stats.withProj}`, v: "With Projects" }].map((m, i) => (<div key={i} className="rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3"><div className="text-[16px] font-bold tracking-[-0.02em]">{m.k}</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">{m.v}</div></div>))}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-[14px] font-bold flex items-center gap-2"><Code2 size={16} className="text-[#8E8E93]" /> Skills by Category<span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{props.filtered.length} skills</span></h3>
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#F0EDE8] rounded-full">
              {(["All", "Languages", "Frontend", "Backend", "DevOps & Cloud"] as const).map((c) => (<button key={c} onClick={() => setCatFilter(c as any)} className={`h-7 px-3 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${catFilter === c ? "bg-[#111] text-white" : "text-[#8E8E93] hover:text-[#111]"}`}>{c}</button>))}
            </div>
          </div>
          {Object.entries(grouped).map(([cat, catSkills]: any) => {
            const isCollapsed = collapsedCats.has(cat);
            const verifiedPct = Math.round((catSkills.filter((s: Skill) => s.status === "Verified").length / catSkills.length) * 100);
            return (
              <div key={cat} className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px] lg:p-[26px] group">
                <button onClick={() => setCollapsedCats((prev: Set<string>) => { const n = new Set(prev); if (n.has(cat)) n.delete(cat); else n.add(cat); return n; })} className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3"><span className="w-9 h-9 rounded-[12px] bg-[#111] text-white flex items-center justify-center"><Code2 size={16} /></span><div className="text-left"><div className="text-[15px] font-bold tracking-[-0.01em] flex items-center gap-2">{cat} <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{catSkills.length}</span></div><div className="text-[11px] text-[#8E8E93] flex items-center gap-1.5"><ShieldCheck size={11} /> {verifiedPct}% verified • {catSkills.filter((s: Skill) => s.projectsLinked > 0).length} with projects</div></div></div>
                  <span className={`w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93] transition-transform ${isCollapsed ? "" : "rotate-180"}`}><ChevronDown size={14} /></span>
                </button>
                {!isCollapsed && (
                  <div className="mt-5 flex flex-col gap-3">
                    {catSkills.map((skill: Skill) => {
                      const isExpanded = expandedId === skill.id;
                      const isDragging = dragged === skill.id;
                      return (
                        <div key={skill.id} draggable onDragStart={() => handleDragStart(skill.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(skill.id)} onDragEnd={() => setDragged(null)} className={`rounded-[20px] border bg-[#FDFCFA] border-[#F0EDE8] p-4 hover:bg-white hover:border-[#E8E2D8] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all ${isDragging ? "opacity-40 scale-[0.98] border-dashed" : ""} ${isExpanded ? "bg-white border-[#E8E2D8] shadow-[0_8px_24px_rgba(0,0,0,0.06)]" : ""}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              <button className="mt-1 w-6 h-6 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center text-[#C9C5BE] hover:text-[#111] cursor-grab"><GripVertical size={12} /></button>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[14px] font-bold">{skill.name}</span><span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{skill.years}y</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${skill.level === "Expert" ? "bg-[#111] text-white" : "bg-[#EDE8E0] text-[#5A4A32] border border-[#E8E2D8]"}`}>{skill.level}</span>
                                  {skill.status === "Verified" ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111] text-white flex items-center gap-1"><Check size={10} /> Verified</span> : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-[#9A3412]">{skill.status}</span>}
                                </div>
                                <div className="mt-2.5 h-[8px] bg-[#F0EDE8] rounded-full overflow-hidden relative max-w-[320px]"><div className="h-full bg-[#111] rounded-full" style={{ width: `${skill.pct}%` }} /></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <div className={`hidden sm:flex items-center gap-1 p-1 bg-[#F8F5F1] rounded-full border border-[#F0EDE8] transition-opacity ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                <button onClick={() => pushToast("Edit skill")} className="w-7 h-7 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><Pencil size={12} /></button>
                                <button onClick={() => setLinkingFor(skill)} className="w-7 h-7 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><Link2 size={12} /></button>
                                <button onClick={() => handleVerify(skill.id)} disabled={verifyingId === skill.id || skill.status === "Verified"} className="w-7 h-7 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93] disabled:opacity-50">{verifyingId === skill.id ? <div className="w-3 h-3 border-[2px] border-[#111] border-t-transparent rounded-full animate-spin" /> : <Verified size={12} />}</button>
                              </div>
                              <button onClick={() => setExpandedId(isExpanded ? null : skill.id)} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} /></button>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-[#F0EDE8] flex flex-col gap-3">
                              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2 flex items-center gap-1.5"><FileText size={12} /> Evidence linked</div>
                                {skill.evidence.length === 0 ? <div className="text-[12px] text-[#8E8E93] p-3 rounded-[12px] bg-[#F8F5F1] border border-dashed border-[#E8E2D8] flex items-center gap-2"><AlertTriangle size={14} /> No evidence yet • Link a project</div> : <div className="flex flex-col gap-2">{skill.evidence.map((ev, i) => (<div key={i} className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><div className={`w-7 h-7 rounded-[8px] flex items-center justify-center text-[10px] font-bold ${ev.verified ? "bg-[#111] text-white" : "bg-white border border-[#F0EDE8]"}`}>{ev.type[0]}</div><div className="flex-1 min-w-0"><div className="text-[12px] font-semibold truncate">{ev.label}</div><div className="text-[10px] text-[#8E8E93]">{ev.type} • {ev.verified ? "Verified" : "Evidenced"}</div></div>{ev.verified && <Check size={14} className="text-[#1BC47D]" />}</div>))}</div>}
                              </div>
                              <div className="flex gap-2"><button onClick={() => setLinkingFor(skill)} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-semibold flex items-center gap-1.5"><Link2 size={12} /> Link Evidence</button><button onClick={() => handleVerify(skill.id)} disabled={skill.status === "Verified" || verifyingId === skill.id} className="h-8 px-3 rounded-full bg-[#111] text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50">{verifyingId === skill.id ? <><div className="w-3 h-3 border-[2px] border-white border-t-transparent rounded-full animate-spin" /> Verifying...</> : <><ShieldCheck size={12} /> {skill.status === "Verified" ? "Verified" : "Verify now"}</>}</button></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><ShieldCheck size={16} /> Evidence Status</h4><button className="w-7 h-7 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><MoreHorizontal size={14} /></button></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-[88px] h-[88px] shrink-0"><svg viewBox="0 0 88 88" className="w-full h-full -rotate-90"><circle cx="44" cy="44" r="36" fill="none" stroke="#F0EDE8" strokeWidth="8" /><circle cx="44" cy="44" r="36" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.68} ${2 * Math.PI * 36}`} /><circle cx="44" cy="44" r="36" fill="none" stroke="#E8C86A" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.22} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.68} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><div className="text-[20px] font-bold leading-none">{stats.pct}%</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Verified</div></div></div>
              <div className="flex flex-col gap-2 text-[11px]"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#111]" /> Verified • {stats.verified}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8C86A]" /> Evidenced • {stats.evidenced}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D6D0C8]" /> Declared • {stats.total - stats.verified - stats.evidenced}</div></div>
            </div>
            <button onClick={handleVerifyAll} className="w-full h-9 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[12px] font-semibold flex items-center justify-center gap-1.5"><GitBranch size={14} /> Verify All with GitHub</button>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#9A3412]"><Lightbulb size={14} /></span>Skill Gaps</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#111] text-white">Today</span></div>
            <div className="flex flex-col gap-2.5">
              {[{ title: "Gap: System Design", desc: "Recommended: Advanced Distributed Systems • 12h", badge: "Gap", color: "bg-[#FF8C42] text-white" }, { title: "Trending: Rust +12%", desc: "Demand up in your network • 34 jobs", badge: "Trending", color: "bg-[#111] text-white" }].map((it, i) => (
                <div key={i} className="p-3 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8]"><div className="flex items-center gap-1.5"><span className="text-[12px] font-semibold">{it.title}</span><span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${it.color}`}>{it.badge}</span></div><div className="text-[11px] text-[#8E8E93] mt-0.5">{it.desc}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPage({ projects, portfolioFilter, setPortfolioFilter, layout, setLayout, setSelectedProject, setShowAdd, pushToast }: any) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 p-1 bg-white border border-[#F0EDE8] rounded-full">
          {(["All", "Featured", "Professional", "Open Source"] as const).map(f => (
            <button key={f} onClick={() => setPortfolioFilter(f)} className={`h-8 px-4 rounded-full text-[12px] font-bold transition-all ${portfolioFilter === f ? "bg-[#111] text-white" : "text-[#8E8E93] hover:text-[#111]"}`}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-white border border-[#F0EDE8] rounded-full">
            <button onClick={() => setLayout("grid")} className={`w-8 h-8 rounded-full flex items-center justify-center ${layout === "grid" ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}><LayoutGrid size={14} /></button>
            <button onClick={() => setLayout("masonry")} className={`w-8 h-8 rounded-full flex items-center justify-center ${layout === "masonry" ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}><Layers3 size={14} /></button>
          </div>
          <button onClick={() => setShowAdd(true)} className="h-9 px-4 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center gap-2"><Plus size={14} /> New Project</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
        <div className={`grid gap-4 ${layout === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 auto-rows-masonry"}`}>
          {projects.map((p: Project) => (
            <div key={p.id} onClick={() => setSelectedProject(p)} className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-4 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all cursor-pointer group">
              <ProjectArt pattern={p.imagePattern} color={p.color} />
              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${p.status === "Live" ? "bg-[#111] text-white" : p.status === "Open Source" ? "bg-[#FFF0EC] border border-[#FFD5C2] text-[#9A3412]" : "bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]"}`}>{p.status}</span>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white border border-[#F0EDE8] text-[#8E8E93] flex items-center gap-1"><Star size={10} />{p.stars}</span>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white border border-[#F0EDE8] text-[#8E8E93]">{p.prs} PRs</span>
                </div>
                <h4 className="text-[15px] font-bold mt-3 flex items-center gap-1.5">{p.title} <ArrowUpRight size={14} className="text-[#8E8E93] group-hover:text-[#111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" /></h4>
                <div className="text-[11px] text-[#8E8E93] mt-1">{p.subtitle}</div>
                <p className="text-[12px] text-[#444] mt-2 leading-[1.5] line-clamp-2">{p.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#1BC47D]">{p.impact}</span>
                  <span className="w-[1px] h-3 bg-[#E8E2D8]" />
                  <span className="text-[11px] text-[#8E8E93]">{p.role}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">{p.stack.map((s: string) => <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F8F5F1] border border-[#F0EDE8]">{s}</span>)}</div>
                <div className="flex gap-1.5 mt-4">
                  <button onClick={(e) => { e.stopPropagation(); pushToast("GitHub opened"); }} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><Github size={12} /> GitHub</button>
                  <button onClick={(e) => { e.stopPropagation(); pushToast("Live demo opened"); }} className="h-8 px-3 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><ExternalLink size={12} /> Live</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-4"><Crown size={16} /> Featured Projects • 3</h4>
            {projects.filter((p: Project) => p.featured).slice(0, 3).map((p: Project) => (
              <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] mb-2 hover:bg-white transition-colors cursor-pointer" onClick={() => setSelectedProject(p)}>
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-white font-bold text-[12px]" style={{ background: p.color }}>{p.title[0]}</div>
                <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold truncate">{p.title}</div><div className="text-[10px] text-[#8E8E93]">{p.stars} stars • {p.prs} PRs</div></div>
                <ArrowUpRight size={12} className="text-[#8E8E93]" />
              </div>
            ))}
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><BarChart3 size={16} /> Stats</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3 text-center"><div className="text-[16px] font-bold">12</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Projects</div></div>
              <div className="rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3 text-center"><div className="text-[16px] font-bold">8.4k</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Stars</div></div>
              <div className="rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3 text-center"><div className="text-[16px] font-bold">342</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">PRs</div></div>
            </div>
            <div className="mt-4 p-3 rounded-[14px] bg-[#111] text-white flex gap-2.5"><div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"><Github size={14} /></div><div><div className="text-[12px] font-bold">GitHub Sync • Active</div><div className="text-[11px] text-white/60 mt-0.5">12 repos linked • Last sync 2h ago</div></div></div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Globe2 size={16} /> External Portfolios</h4>
            <div className="flex flex-col gap-2">
              {[{ name: "Behance", url: "behance.net/alexn" }, { name: "Dribbble", url: "dribbble.com/alexn" }, { name: "Read.cv", url: "read.cv/alexn" }].map((e) => (
                <div key={e.name} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8] text-[12px]"><span className="font-semibold">{e.name}</span><span className="text-[#8E8E93] text-[11px]">{e.url}</span><ExternalLink size={12} className="text-[#8E8E93]" /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CvPage({ versions, selectedId, setSelectedId, sections, setSections, template, setTemplate, accent, setAccent, pushToast, setVersions }: any) {
  const selected = versions.find((v: any) => v.id === selectedId);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-5 items-start">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between"><h3 className="text-[13px] font-bold">CV Versions • {versions.length}</h3><button onClick={() => { const nv = { id: Math.random().toString(36).slice(2, 5), name: `CV - New ${versions.length + 1}`, updated: "now", match: 80, ats: 88, template: "Modern" }; setVersions((prev: any) => [nv, ...prev]); pushToast("Duplicated CV version"); }} className="w-8 h-8 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center"><Copy size={14} /></button></div>
        <div className="flex flex-col gap-2.5">
          {versions.map((cv: CvVersion) => (
            <button key={cv.id} onClick={() => setSelectedId(cv.id)} className={`text-left rounded-[20px] border p-4 transition-all ${selectedId === cv.id ? "bg-[#111] text-white border-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.15)]" : "bg-white border-[#F0EDE8] hover:border-[#E8E2D8]"}`}>
              <div className="flex items-start justify-between gap-2">
                <div><div className="text-[13px] font-bold">{cv.name}</div><div className={`text-[11px] mt-1 ${selectedId === cv.id ? "text-white/60" : "text-[#8E8E93]"}`}>{cv.updated} • {cv.match}% match • {cv.template}</div></div>
                {cv.isDefault && <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${selectedId === cv.id ? "bg-white text-[#111]" : "bg-[#111] text-white"}`}>Default</span>}
              </div>
              <div className="mt-3 flex items-center gap-2"><div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden"><div className="h-full bg-[#1BC47D] rounded-full" style={{ width: `${cv.ats}%` }} /></div><span className="text-[10px] font-bold">ATS {cv.ats}</span></div>
            </button>
          ))}
        </div>
        <div className="rounded-[20px] bg-white border border-[#F0EDE8] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">ATS Score</div>
          <div className="text-[22px] font-bold">{selected?.ats}/100</div>
          <div className="text-[11px] text-[#8E8E93] mt-1">Optimized for recruiter scanners</div>
        </div>
      </div>

      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6"><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">A4 • {template}</span><div className="flex items-center gap-1.5"><button onClick={() => pushToast("Share link copied")} className="w-8 h-8 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center"><Share2 size={14} /></button><button onClick={() => pushToast("Download PDF")} className="h-8 px-3 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center gap-1.5"><Download size={12} /> PDF</button></div></div>
        {/* Document */}
        <div className="bg-white border border-[#F0EDE8] rounded-[16px] p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[600px] flex flex-col gap-6" style={{ borderLeft: `4px solid ${accent}` }}>
          {sections.header && (
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center font-bold text-[#5A4A32]">AN</div>
              <div className="flex-1">
                <div className="text-[18px] font-bold">Alex Nakamura</div>
                <div className="text-[12px] text-[#8E8E93]">Staff Frontend Engineer • Design Systems • Remote</div>
                <div className="flex gap-2 mt-2 text-[10px]"><span className="px-2 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">alex@dev.id</span><span className="px-2 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">github.com/alexn</span></div>
              </div>
            </div>
          )}
          {sections.summary && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Summary</div><p className="text-[12px] leading-[1.6] text-[#444]">Staff Frontend Engineer with 6 years scaling design systems and realtime collaboration at Linear-grade companies. Expert in React, TypeScript, and performance.</p></div>}
          {sections.experience && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Experience</div><div className="flex flex-col gap-3">{["Linear • Staff Frontend • 2022→Now • Led Orbit DS • 40% faster", "Nubank • Senior Frontend • 2020→2022 • Fintech Dashboard • R$40M"].map((e, i) => <div key={i} className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#111] mt-1.5" /><div className="text-[12px] font-medium">{e}</div></div>)}</div></div>}
          {sections.skills && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Skills</div><div className="flex flex-wrap gap-1.5">{["React", "TypeScript", "Next.js", "Node.js", "Design Systems", "PostgreSQL", "AWS"].map(s => <span key={s} className="text-[10px] font-bold px-2 py-1 rounded-full border" style={{ background: `${accent}10`, borderColor: `${accent}20`, color: accent }}>{s}</span>)}</div></div>}
          {sections.projects && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Featured Projects</div><div className="grid grid-cols-2 gap-2">{["Orbit DS • 2.3k stars • 45 PRs", "API Gateway • 2M req/day • 99.99%"].map((p, i) => <div key={i} className="p-2.5 rounded-[10px] bg-[#F8F5F1] border border-[#F0EDE8] text-[11px] font-medium">{p}</div>)}</div></div>}
          {sections.education && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Education</div><div className="text-[12px] font-medium">USP • Computer Science • 2015-2019 • GPA 8.9 • Top 5%</div></div>}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => pushToast("Sync with profile • Updated")} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><RotateCcw size={12} /> Sync Profile</button>
          <button onClick={() => pushToast("Version history • 12 versions")} className="h-9 px-4 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[11px] font-bold">History</button>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><Paintbrush size={14} /> Personalization</h4>
          <div className="flex flex-col gap-4">
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Template</div><div className="grid grid-cols-3 gap-2">{["Minimal", "Modern", "Executive"].map((t) => (<button key={t} onClick={() => setTemplate(t as any)} className={`h-[64px] rounded-[12px] border flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition-all ${template === t ? "bg-[#111] text-white border-[#111]" : "bg-[#F8F5F1] border-[#F0EDE8] text-[#8E8E93] hover:border-[#E8E2D8]"}`}><LayoutTemplate size={16} />{t}</button>))}</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Accent Color</div><div className="flex gap-2">{["#111111", "#2563EB", "#FF5A2C", "#1BC47D", "#8B5CF6"].map(c => (<button key={c} onClick={() => setAccent(c)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accent === c ? "border-[#111] scale-110" : "border-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"}`} style={{ background: c }}>{accent === c && <Check size={12} className="text-white" strokeWidth={3} />}</button>))}</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Sections</div><div className="flex flex-col gap-2">{Object.entries(sections).map(([k, v]) => (<div key={k} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[12px] font-medium capitalize">{k}</span><button onClick={() => setSections((prev: any) => ({ ...prev, [k]: !prev[k] }))} className={`w-[36px] h-[22px] rounded-full relative border transition-all ${v ? "bg-[#111] border-[#111]" : "bg-[#EDE8E0] border-[#E8E2D8]"}`}><div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] transition-all shadow ${v ? "translate-x-[14px]" : "translate-x-[2px]"}`} /></button></div>))}</div></div>
            <button onClick={() => pushToast("CV Generated • ATS 94% • PDF ready")} className="w-full h-10 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center justify-center gap-2"><Download size={14} /> Generate PDF • {selected?.ats}% ATS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsPage({ connected, setConnected, pushToast }: any) {
  const integrations = [
    { id: "github", name: "GitHub", desc: "342 contributions • 12 repos linked", icon: Github, status: "Connected", color: "#111", stats: "Last sync 2h ago • Auto-sync on" },
    { id: "linkedin", name: "LinkedIn", desc: "500+ connections • Verified", icon: Linkedin, status: "Connected", color: "#0A66C2", stats: "Last sync 1d ago • Profile verified" },
    { id: "gitlab", name: "GitLab", desc: "Self-hosted • Coming soon", icon: GitBranch, status: "Coming Soon", color: "#FC6D26", stats: "Waitlist • Q2 2024" },
    { id: "credly", name: "Credly / Acclaim", desc: "2 certs • AWS + Meta", icon: Award, status: "Connected", color: "#FF6B00", stats: "2 badges synced • Verified" },
    { id: "vercel", name: "Vercel", desc: "3 deployments • Edge", icon: TriangleIcon, status: "Connected", color: "#111", stats: "Last deploy 3h ago • Orbit UI" },
    { id: "figma", name: "Figma", desc: "Tokens pipeline • Style Dictionary", icon: Figma, status: "Connected", color: "#F24E1E", stats: "Design tokens sync • 47 components" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((int) => {
          const isConnected = connected[int.id];
          const isComing = int.status === "Coming Soon";
          return (
            <div key={int.id} className={`rounded-[28px] bg-white border shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px] transition-all ${isComing ? "border-[#F0EDE8] opacity-70" : "border-[#F0EDE8] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] flex items-center justify-center" style={{ color: int.color }}><int.icon size={18} /></div><div><div className="text-[14px] font-bold">{int.name}</div><div className="text-[11px] text-[#8E8E93]">{int.desc}</div></div></div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isComing ? "bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]" : isConnected ? "bg-[#111] text-white" : "bg-white border border-[#F0EDE8] text-[#8E8E93]"}`}>{isComing ? "Soon" : isConnected ? "Connected" : "Disconnected"}</span>
              </div>
              <div className="mt-4 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8] text-[11px] text-[#8E8E93] flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#1BC47D] animate-pulse" : "bg-[#D6D0C8]"}`} />{int.stats}</div>
              <div className="mt-4 flex gap-2">
                <button disabled={isComing} onClick={() => { if (!isComing) { setConnected((prev: any) => ({ ...prev, [int.id]: !prev[int.id] })); pushToast(`${int.name} ${!isConnected ? "connected" : "disconnected"}`); } }} className={`flex-1 h-9 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${isComing ? "bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93] cursor-not-allowed" : isConnected ? "bg-white border border-[#F0EDE8] hover:border-[#111]" : "bg-[#111] text-white hover:bg-black"}`}>{isComing ? "Join Waitlist" : isConnected ? "Disconnect" : "Connect"}</button>
                <button onClick={() => pushToast(`${int.name} • View details`)} className="w-9 h-9 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><ExternalLink size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><GitCommit size={16} /> GitHub • Contribution Graph</h3>
          <div className="grid grid-cols-[repeat(20,1fr)] gap-1.5 mb-4">
            {Array.from({ length: 120 }).map((_, i) => {
              const intensity = Math.random();
              return <div key={i} className="aspect-square rounded-[3px]" style={{ background: intensity > 0.8 ? "#111" : intensity > 0.5 ? "#8E8E93" : intensity > 0.2 ? "#E8E2D8" : "#F0EDE8" }} />;
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E8E93]"><span>342 contributions in the last year</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-[2px] bg-[#F0EDE8]" /> Less <span className="w-2 h-2 rounded-[2px] bg-[#111]" /> More</span></div>
          <div className="mt-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Top Repositories</div>
            <div className="flex flex-col gap-2">
              {[{ name: "orbit-design-system", stars: "2.3k", lang: "TypeScript" }, { name: "linear-sync-engine", stars: "840", lang: "Go" }, { name: "api-gateway", stars: "420", lang: "Node" }].map((r) => (
                <div key={r.name} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[12px] font-semibold">{r.name}</span><span className="flex items-center gap-2 text-[11px] text-[#8E8E93]"><span className="flex items-center gap-1"><Star size={10} />{r.stars}</span><span className="w-2 h-2 rounded-full bg-[#111]" />{r.lang}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Package size={16} /> Import Data</h4>
            <div onClick={() => pushToast("Drop files to import • JSON, CSV supported")} className="rounded-[16px] border-2 border-dashed border-[#E8E2D8] bg-[#FDFCFA] p-6 flex flex-col items-center gap-2 text-center cursor-pointer hover:bg-white hover:border-[#111] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center"><Download size={16} className="text-[#8E8E93]" /></div>
              <div className="text-[12px] font-bold">Drag & drop files</div>
              <div className="text-[11px] text-[#8E8E93]">JSON, CSV, GitHub export</div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3">Sync Health • 98%</h4>
            <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden"><div className="h-full bg-[#1BC47D] rounded-full" style={{ width: "98%" }} /></div>
            <div className="mt-3 flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>GitHub • Success</span><span className="font-bold text-[#065F46]">2h ago</span></div>
              <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>LinkedIn • Success</span><span className="font-bold text-[#065F46]">1d ago</span></div>
              <div className="flex justify-between p-2 rounded-[10px] bg-[#FFF7ED] border border-[#FFEDD5]"><span>Figma • Warning</span><span className="font-bold text-[#9A3412]">Token limit</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunitiesPage({ opportunities, oppTab, setOppTab, filters, setFilters, kanban, setKanban, saved, setSaved, pushToast }: any) {
  const [dragOpp, setDragOpp] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[18px] flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mr-2"><Filter size={14} /> Matching Engine:</div>
        {Object.entries(filters).map(([k, v]) => (
          <span key={k} className="h-8 px-3 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center gap-1.5">{k}: {v as string} <button onClick={() => pushToast(`Edit filter ${k}`)} className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><X size={10} /></button></span>
        ))}
        <button onClick={() => pushToast("Edit matching preferences")} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold">+ Add filter</button>
        <div className="ml-auto text-[11px] text-[#8E8E93] hidden md:flex items-center gap-1.5"><Info size={12} /> 94% match = 100% stack + 90% seniority + 85% location</div>
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#F0EDE8] rounded-full w-fit">
        {(["Discover", "Invites", "Applications", "Saved"] as const).map(tab => (
          <button key={tab} onClick={() => setOppTab(tab)} className={`h-8 px-4 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all ${oppTab === tab ? "bg-[#111] text-white" : "text-[#8E8E93] hover:text-[#111]"}`}>
            {tab}
            {tab === "Invites" && <span className="w-5 h-5 rounded-full bg-[#FF5A2C] text-white text-[10px] flex items-center justify-center">3</span>}
            {tab === "Saved" && <span className="w-5 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[10px]">{saved.size}</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="flex flex-col gap-4">
          {oppTab === "Applications" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {Object.entries(kanban).map(([col, ids]: any) => (
                <div key={col} className="rounded-[20px] bg-[#F8F5F1] border border-[#F0EDE8] p-3 min-h-[400px]">
                  <div className="flex items-center justify-between mb-3"><span className="text-[11px] font-bold uppercase tracking-[0.06em]">{col}</span><span className="w-5 h-5 rounded-full bg-white border border-[#F0EDE8] text-[10px] font-bold flex items-center justify-center">{ids.length}</span></div>
                  <div className="flex flex-col gap-2">
                    {ids.map((id: string) => {
                      const opp = opportunities.find((o: any) => o.id === id) || opportunities[0];
                      return (
                        <div key={id} draggable onDragStart={() => setDragOpp(id)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (dragOpp && dragOpp !== id) { const newKanban: any = {}; Object.entries(kanban).forEach(([c, list]: any) => { newKanban[c] = list.filter((x: string) => x !== dragOpp); }); newKanban[col] = [...(newKanban[col] || []), dragOpp]; setKanban(newKanban); setDragOpp(null); pushToast(`Moved to ${col}`); } }} className="rounded-[14px] bg-white border border-[#F0EDE8] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-grab">
                          <div className="text-[12px] font-bold">{opp.company}</div><div className="text-[11px] text-[#8E8E93] mt-1">{opp.role}</div>
                          <div className="mt-2 flex gap-1"><span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#111] text-white">{opp.match}% Match</span><span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">{opp.location}</span></div>
                        </div>
                      );
                    })}
                    {ids.length === 0 && <div className="text-[11px] text-[#8E8E93] p-3 rounded-[12px] border border-dashed border-[#E8E2D8] text-center">Drop here</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            opportunities.map((opp: Opportunity) => (
              <div key={opp.id} className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-[14px] bg-[#111] text-white flex items-center justify-center font-bold text-[14px]">{opp.logo}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap"><span className="text-[15px] font-bold">{opp.role}</span><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FF5A2C] text-white">{opp.match}% Match</span></div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8E8E93]"><DollarSign size={12} /> {opp.salary} • <MapPin size={12} /> {opp.location} • <Clock size={12} /> {opp.mode}</div>
                    </div>
                  </div>
                  <button onClick={() => { const ns = new Set(saved); if (ns.has(opp.id)) ns.delete(opp.id); else ns.add(opp.id); setSaved(ns); pushToast(ns.has(opp.id) ? "Saved opportunity" : "Unsaved"); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${saved.has(opp.id) ? "bg-[#111] text-white border-[#111]" : "bg-white border-[#F0EDE8] text-[#8E8E93] hover:border-[#111]"}`}><Bookmark size={14} fill={saved.has(opp.id) ? "white" : "none"} /></button>
                </div>
                <p className="text-[13px] text-[#444] mt-4 leading-[1.5]">{opp.desc}</p>
                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Requirements • Transparent matching</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {opp.requirements.map((r, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-[10px] border text-[11px] ${r.matched ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]" : "bg-[#F8F5F1] border-[#F0EDE8] text-[#8E8E93]"}`}>
                        {r.matched ? <CheckCircle2 size={12} className="text-[#1BC47D]" /> : <AlertCircle size={12} className="text-[#8E8E93]" />}{r.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">{opp.tags.map(t => <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8]">{t}</span>)}</div>
                <div className="flex gap-2 mt-5">
                  <button onClick={() => pushToast(`Applied to ${opp.company} • Pipeline updated`)} className="h-9 px-5 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center gap-1.5"><Send size={14} /> Apply • {opp.match}% match</button>
                  <button onClick={() => pushToast(`Message recruiter at ${opp.company}`)} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[12px] font-bold flex items-center gap-1.5"><MessageSquare size={14} /> Message</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          {oppTab === "Invites" && (
            <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
              <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Mail size={14} /> Invites • 3 new</h4>
              {[
                { company: "Linear", person: "Karina • Recruiter", msg: "Staff Frontend role • Would love to chat about Orbit DS...", avatar: "K" },
                { company: "Vercel", person: "Lee • Hiring Manager", msg: "Impressed by your Next.js RSC migration...", avatar: "L" },
                { company: "Stripe", person: "Sarah • Talent", msg: "Senior role • API design focus...", avatar: "S" },
              ].map((inv, i) => (
                <div key={i} className="p-3 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] mb-2">
                  <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center font-bold text-[11px]">{inv.avatar}</div><div><div className="text-[12px] font-bold">{inv.person} • {inv.company}</div><div className="text-[11px] text-[#8E8E93]">2h ago • Direct invite</div></div></div>
                  <div className="text-[11px] text-[#444] mt-2 leading-[1.4]">{inv.msg}</div>
                  <div className="flex gap-1.5 mt-2"><button onClick={() => pushToast("Accepted invite")} className="h-7 px-3 rounded-full bg-[#111] text-white text-[10px] font-bold">Accept</button><button onClick={() => pushToast("Declined")} className="h-7 px-3 rounded-full bg-white border border-[#F0EDE8] text-[10px] font-bold">Decline</button></div>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Target size={14} /> Preferences</h4>
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Desired roles</span><span className="font-bold">Staff Frontend, Frontend Lead</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Not desired</span><span className="font-bold">On-site only • No relocation</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Salary expectation</span><span className="font-bold">R$ 22k+ • Remote</span></div>
            </div>
            <button onClick={() => pushToast("Edit preferences")} className="mt-3 w-full h-9 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold">Edit preferences</button>
          </div>
          <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2"><BarChart3 size={14} /> Salary Insights</h4>
            <div className="mt-4 h-[64px] flex items-end gap-1">
              {[40, 60, 45, 80, 65, 90, 70].map((h, i) => <div key={i} className="flex-1 rounded-t-[6px] bg-white/20" style={{ height: `${h}%` }}><div className="w-full rounded-t-[6px] bg-white" style={{ height: i === 3 ? "100%" : "0%" }} /></div>)}
            </div>
            <div className="flex justify-between text-[10px] text-white/50 mt-2"><span>15k</span><span>22k avg • You</span><span>35k</span></div>
            <div className="mt-3 text-[11px] text-white/70">You are at 78th percentile for Staff Frontend in São Paulo Remote.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage({ period, setPeriod, projects, pushToast }: any) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Period:</span>
          <div className="flex p-1 bg-white border border-[#F0EDE8] rounded-full">
            {(["7d", "30d", "90d", "1y"] as const).map(p => <button key={p} onClick={() => setPeriod(p)} className={`h-7 px-3 rounded-full text-[11px] font-bold ${period === p ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{p}</button>)}
          </div>
        </div>
        <div className="text-[11px] text-[#8E8E93] flex items-center gap-2"><Activity size={12} /> Last updated 2h ago • Auto-tracked</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: "1.24k", l: "Profile Views", d: "+18%", up: true },
          { k: "47", l: "Recruiter Views", d: "+12%", up: true },
          { k: "342", l: "Search Appearances", d: "+8%", up: true },
          { k: "892", l: "Project Views", d: "+24%", up: true },
        ].map((m, i) => (
          <div key={i} className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">{m.l}</span><span className={`text-[11px] font-bold flex items-center gap-0.5 ${m.up ? "text-[#1BC47D]" : "text-[#FF5A2C]"}`}>{m.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{m.d}</span></div>
            <div className="text-[24px] font-bold tracking-[-0.02em] mt-2">{m.k}</div>
            <div className="mt-3 h-[32px] w-full"><svg viewBox="0 0 100 32" className="w-full h-full"><path d={`M0 ${20 + Math.random() * 10} Q 20 ${10 + Math.random() * 10}, 40 ${15 + Math.random() * 8} T 80 ${8 + Math.random() * 6} T 100 ${5 + Math.random() * 5}`} fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" /></svg></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="flex flex-col gap-5">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
            <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><LineChart size={16} /> Profile Views • Last {period}</h3><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">Avg 42/day</span></div>
            <div className="h-[160px] w-full relative">
              <svg viewBox="0 0 400 160" className="w-full h-full">
                <defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#111" stopOpacity="0.12" /><stop offset="100%" stopColor="#111" stopOpacity="0" /></linearGradient></defs>
                <path d="M0 120 Q 40 100, 80 90 T 160 60 T 240 50 T 320 30 T 400 20 L 400 160 L 0 160 Z" fill="url(#fill)" />
                <path d="M0 120 Q 40 100, 80 90 T 160 60 T 240 50 T 320 30 T 400 20" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                {[0, 80, 160, 240, 320, 400].map((x, i) => <circle key={i} cx={x} cy={[120, 90, 60, 50, 30, 20][i]} r={i === 5 ? 5 : 3} fill="#111" stroke="white" strokeWidth="2" />)}
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.06em] text-[#A8A8AD] mt-2"><span>May 1</span><span>May 8</span><span>May 15</span><span>May 22</span><span>May 30</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
              <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><PieChart size={16} /> Origin • Visits</h4>
              <div className="flex items-center gap-4">
                <div className="w-[96px] h-[96px] relative"><svg viewBox="0 0 96 96" className="w-full h-full -rotate-90"><circle cx="48" cy="48" r="36" fill="none" stroke="#F0EDE8" strokeWidth="10" /><circle cx="48" cy="48" r="36" fill="none" stroke="#111" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.45} ${2 * Math.PI * 36}`} /><circle cx="48" cy="48" r="36" fill="none" stroke="#8E8E93" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.25} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.45} /><circle cx="48" cy="48" r="36" fill="none" stroke="#E8C86A" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.20} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.70} /><circle cx="48" cy="48" r="36" fill="none" stroke="#D6D0C8" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.10} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.90} /></svg></div>
                <div className="flex flex-col gap-2 text-[11px] flex-1"><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#111]" />Search</span><span className="font-bold">45%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8E8E93]" />Direct</span><span className="font-bold">25%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E8C86A]" />Recruiter</span><span className="font-bold">20%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D6D0C8]" />Social</span><span className="font-bold">10%</span></div></div>
              </div>
            </div>
            <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
              <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><BarChart size={16} /> Project Performance</h4>
              <div className="flex flex-col gap-2.5">
                {projects.slice(0, 4).map((p: Project) => {
                  const v = Math.round(Math.random() * 60 + 40);
                  return <div key={p.id} className="flex items-center gap-2"><span className="text-[11px] font-bold w-[96px] truncate">{p.title}</span><div className="flex-1 h-[8px] bg-[#F0EDE8] rounded-full overflow-hidden"><div className="h-full bg-[#111] rounded-full" style={{ width: `${v}%` }} /></div><span className="text-[11px] font-bold w-8 text-right">{v * 9}</span></div>;
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><Clock size={16} /> Recent Activity</h4>
            <div className="flex flex-col gap-2">
              {[
                { icon: Eye, text: "Recruiter from Stripe viewed your profile • 2h ago", color: "bg-[#111] text-white" },
                { icon: Star, text: "Orbit Design System starred by 12 users • 5h ago", color: "bg-[#FFF7ED] text-[#9A3412] border border-[#FFEDD5]" },
                { icon: GitBranch, text: "GitHub sync • 3 new contributions • 8h ago", color: "bg-[#F6F2EB] text-[#111] border border-[#F0EDE8]" },
                { icon: Compass, text: "Your profile appeared in Vercel search • 1d ago", color: "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]">
                  <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center ${a.color}`}><a.icon size={14} /></div>
                  <span className="text-[12px] text-[#444]">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Search size={14} /> Top Keywords</h4>
            <div className="flex flex-wrap gap-1.5">
              {["react design system", "staff frontend", "typescript expert", "next.js rsc", "crdt sync", "framer motion", "linear clone"].map(k => <span key={k} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8] hover:border-[#111] cursor-pointer" onClick={() => pushToast(`Search: ${k}`)}>{k}</span>)}
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Building2 size={14} /> Companies that visited</h4>
            <div className="flex flex-col gap-2">
              {[{ co: "Stripe", views: 8, logo: "S" }, { co: "Vercel", views: 5, logo: "▲" }, { co: "Linear", views: 4, logo: "L" }, { co: "Nubank", views: 3, logo: "Nu" }].map((c) => (
                <div key={c.co} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-[8px] bg-white border border-[#F0EDE8] flex items-center justify-center font-bold text-[11px]">{c.logo}</div><span className="text-[12px] font-semibold">{c.co}</span></div><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#111] text-white">{c.views} views</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3">Engagement</h4>
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Avg time on profile</span><span className="font-bold">2m 34s</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Scroll depth</span><span className="font-bold">78%</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Device</span><span className="font-bold">Desktop 72% • Mobile 28%</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Top location</span><span className="font-bold">SP 45% • SF 20% • NY 12%</span></div>
            </div>
            <button onClick={() => pushToast("Export Report • analytics_30d.pdf")} className="mt-4 w-full h-9 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center justify-center gap-1.5"><Download size={12} /> Export Report • {period}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ themeSel, setThemeSel, publicLayout, setPublicLayout, density, setDensity, pushToast }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
      <div className="flex flex-col gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Palette size={16} /> Appearance • Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Light Beige", bg: "#F8F5F1", dot: "#111", active: true },
              { name: "Dark", bg: "#111111", dot: "#FFF", active: false },
              { name: "Midnight", bg: "#0F172A", dot: "#38BDF8", active: false },
              { name: "Warm", bg: "#FFF7ED", dot: "#FF5A2C", active: false },
            ].map(t => (
              <button key={t.name} onClick={() => { setThemeSel(t.name); pushToast(`Theme ${t.name} selected • Preview updated`); }} className={`rounded-[20px] border p-3 text-left transition-all ${themeSel === t.name ? "border-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.08)] scale-[1.02]" : "border-[#F0EDE8] hover:border-[#E8E2D8]"}`}>
                <div className="h-[64px] rounded-[12px] border border-[#F0EDE8] overflow-hidden relative" style={{ background: t.bg }}>
                  <div className="absolute top-2 left-2 right-2 h-3 rounded-full bg-white/80" />
                  <div className="absolute top-6 left-2 w-8 h-8 rounded-[8px] bg-white/90" />
                  <div className="absolute bottom-2 left-2 right-2 h-2 rounded-full bg-white/60" />
                </div>
                <div className="mt-3 flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: t.dot }} /><span className="text-[12px] font-bold">{t.name}</span>{themeSel === t.name && <Check size={12} className="ml-auto text-[#1BC47D]" strokeWidth={3} />}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Monitor size={16} /> Public Profile Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Header Style</div><div className="flex gap-1.5 p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Minimal", "Bold", "Creative"].map(h => <button key={h} onClick={() => pushToast(`Header ${h}`)} className="h-8 px-4 rounded-full text-[11px] font-bold bg-white border border-[#F0EDE8] hover:border-[#111]">{h}</button>)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Layout</div><div className="flex gap-1.5 p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Timeline", "Grid", "Masonry"].map(l => <button key={l} onClick={() => setPublicLayout(l)} className={`h-8 px-4 rounded-full text-[11px] font-bold transition-all ${publicLayout === l ? "bg-[#111] text-white" : "bg-white border border-[#F0EDE8] text-[#8E8E93]"}`}>{l}</button>)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Show / Hide Sections</div><div className="flex flex-col gap-1.5">{["Experience", "Skills", "Projects", "Education", "Contact"].map(s => (<div key={s} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[12px] font-medium">{s}</span><div className="w-[36px] h-[22px] rounded-full bg-[#111] border border-[#111] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] right-[2px] shadow" /></div></div>))}</div></div>
            </div>
            <div className="flex flex-col gap-4">
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Accent Color</div><div className="flex gap-2">{["#111111", "#2563EB", "#FF5A2C", "#1BC47D", "#8B5CF6", "#E8C86A"].map(c => <button key={c} className="w-9 h-9 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center" style={{ background: c }} onClick={() => pushToast(`Accent ${c}`)} />)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Domain</div><div className="flex flex-col gap-2"><div className="h-[44px] flex items-center px-4 bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px]"><span className="text-[#8E8E93]">dev.id/</span><span className="font-bold ml-1">alex-nakamura</span><span className="ml-auto w-5 h-5 rounded-full bg-[#1BC47D] text-white flex items-center justify-center"><Check size={10} strokeWidth={3} /></span></div><div className="h-[44px] flex items-center px-4 bg-white border border-[#F0EDE8] rounded-[12px] text-[13px]"><span className="font-semibold">alexn.dev</span><span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-full bg-[#111] text-white">Verified</span></div></div><div className="text-[11px] text-[#8E8E93] mt-2">DNS: CNAME → cname.dev.id • SSL auto</div></div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Settings2 size={16} /> Interface Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Density</div><div className="flex p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Comfortable", "Compact"].map(d => <button key={d} onClick={() => setDensity(d)} className={`h-8 px-4 rounded-full text-[11px] font-bold ${density === d ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{d}</button>)}</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Animations</div><div className="flex items-center gap-2"><div className="w-[36px] h-[22px] rounded-full bg-[#111] border border-[#111] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] right-[2px]" /></div><span className="text-[12px] font-medium">Enabled • Premium motion</span></div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Language</div><div className="h-[40px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">English • PT-BR available</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Reduced Motion</div><div className="flex items-center gap-2"><div className="w-[36px] h-[22px] rounded-full bg-[#EDE8E0] border border-[#E8E2D8] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] left-[2px] shadow" /></div><span className="text-[12px] font-medium">Off</span></div></div>
          </div>
          <button onClick={() => pushToast("Changes saved • Theme updated • Domain verified")} className="mt-6 w-full h-11 rounded-full bg-[#111] text-white text-[13px] font-bold flex items-center justify-center gap-2"><Save size={16} /> Save Changes</button>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold flex items-center gap-2"><Eye size={16} /> Live Preview • {publicLayout}</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1BC47D] text-white">Live</span></div>
          <div className="rounded-[16px] border border-[#F0EDE8] overflow-hidden bg-[#F8F5F1]">
            <div className="h-8 bg-white border-b border-[#F0EDE8] flex items-center px-3 gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5A2C]" /><div className="w-2.5 h-2.5 rounded-full bg-[#E8C86A]" /><div className="w-2.5 h-2.5 rounded-full bg-[#1BC47D]" /><div className="ml-3 flex-1 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center px-2 text-[10px] text-[#8E8E93]">dev.id/alex-nakamura • {themeSel}</div></div>
            <div className="p-4 flex flex-col gap-3">
              <div className="flex gap-3"><div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center font-bold text-[#5A4A32]">AN</div><div><div className="text-[14px] font-bold">Alex Nakamura</div><div className="text-[11px] text-[#8E8E93]">Staff Frontend • Design Systems • {publicLayout}</div></div></div>
              <div className={`grid gap-2 ${publicLayout === "Grid" ? "grid-cols-2" : publicLayout === "Masonry" ? "grid-cols-[1fr_1fr] auto-rows-[80px]" : "grid-cols-1"}`}>
                <div className="h-16 rounded-[12px] bg-white border border-[#F0EDE8] p-2"><div className="h-2 bg-[#F6F2EB] rounded-full w-3/4 mb-2" /><div className="h-2 bg-[#F6F2EB] rounded-full w-1/2" /></div>
                <div className="h-16 rounded-[12px] bg-white border border-[#F0EDE8] p-2"><div className="h-2 bg-[#F6F2EB] rounded-full w-3/4 mb-2" /><div className="h-2 bg-[#F6F2EB] rounded-full w-1/2" /></div>
                {publicLayout !== "Timeline" && <div className="h-16 rounded-[12px] bg-white border border-[#F0EDE8] p-2 col-span-2"><div className="h-2 bg-[#F6F2EB] rounded-full w-1/2 mb-2" /><div className="h-2 bg-[#F6F2EB] rounded-full w-3/4" /></div>}
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2"><button onClick={() => pushToast("Opening public preview")} className="flex-1 h-9 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center justify-center gap-1.5"><ExternalLink size={12} /> Open</button><button onClick={() => pushToast("Link copied")} className="flex-1 h-9 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center justify-center gap-1.5"><Link2 size={12} /> Copy Link</button></div>
        </div>
        <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
          <h4 className="text-[13px] font-bold flex items-center gap-2"><Shield size={14} /> Domain • Verified</h4>
          <div className="mt-3 text-[12px] text-white/70 leading-[1.5]">Your custom domain alexn.dev is verified and serving with SSL. DNS configured via Cloudflare.</div>
          <div className="mt-3 p-2.5 rounded-[12px] bg-white/10 border border-white/10 text-[11px] font-mono">CNAME alexn.dev → cname.dev.id<br />SSL • Auto • Let's Encrypt</div>
        </div>
      </div>
    </div>
  );
}

function TriangleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor"><path d="M12 2L2 20h20L12 2z" /></svg>
  );
}
