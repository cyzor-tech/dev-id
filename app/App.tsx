import { useEffect, useState, useMemo } from "react";
import {
  Search, Plus, Settings2, LayoutDashboard, User, Briefcase, Layers, Folder, FileStack,
  Plug2, Compass, BarChart3, Settings, Share2, Pencil, Link2, MoreHorizontal,
  Check, Sparkles, Clock, ShieldCheck, X, Zap, ChevronDown, Download, Users, TrendingUp,
  ArrowUpRight, FileText, Building2, GripVertical, Dna, Verified, Link as LinkIcon, Lightbulb,
  GitBranch, Database, Globe, Server, Box, Wrench, Smartphone, Code2, Terminal, Cpu, Eye, ExternalLink,
  AlertTriangle, BookOpen, Flame, Star, MapPin, Mail, Phone, Globe2,
  CalendarDays, Award, GraduationCap, Trophy, BriefcaseBusiness, Rocket, Palette, Monitor, Lock,
  Bell, EyeOff, Image as ImageIcon, LayoutGrid, List, Copy, Trash2, Edit3, Save, ChevronRight, ChevronLeft,
  Filter, Heart, Bookmark, MessageSquare, DollarSign, Target, Activity, PieChart, BarChart, LineChart,
  ArrowUp, ArrowDown, Layers3, FileCheck, Paintbrush, Type, Languages, Sun, Moon, Smartphone as PhoneIcon,
  LayoutTemplate, Brush, Globe as GlobeIcon, Shield, UserCheck, Workflow, GitCommit, Package,
  Play, Pause, RotateCcw, Send, CheckCircle2, AlertCircle, Info, Crown, Gem
} from "lucide-react";
const Github = Globe2;
import { Sidebar, Topbar, MobileNav, Footer } from "./components/Shell";

import { CATEGORIES, MOCK_SKILLS, MOCK_PROJECTS, MOCK_OPPS, CV_VERSIONS } from "./model";
import type { Skill, SkillStatus, Project, Opportunity, CvVersion, PageId } from "./model";
import { ProjectArt } from "./components/Visuals";
import { DashboardPage } from "./pages/Dashboard";
import { IdentityPage } from "./pages/Identity";
import { CareerPage } from "./pages/Career";
import { SkillsPage } from "./pages/Skills";
import { PortfolioPage } from "./pages/Portfolio";
import { CvPage } from "./pages/Cv";
import { IntegrationsPage } from "./pages/Integrations";
import { OpportunitiesPage } from "./pages/Opportunities";
import { AnalyticsPage } from "./pages/Analytics";
import { SettingsPage } from "./pages/Settings";

const PAGE_PATHS: Record<PageId, string> = {
  dashboard: '/', identity: '/identidade', career: '/carreira', skills: '/competencias',
  portfolio: '/portfolio', cv: '/curriculo', integrations: '/integracoes',
  opportunities: '/oportunidades', analytics: '/analises', settings: '/personalizacao',
};
const PAGE_NAMES: Record<PageId, string> = {
  dashboard: 'Painel', identity: 'Identidade', career: 'Carreira', skills: 'Competências',
  portfolio: 'Portfólio', cv: 'Estúdio de CV', integrations: 'Integrações',
  opportunities: 'Oportunidades', analytics: 'Análises', settings: 'Personalização',
};
function pageFromPath(pathname: string): PageId {
  const path = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  const match = (Object.entries(PAGE_PATHS) as [PageId, string][]).find(([, value]) => value === path);
  if (match) return match[0];
  const legacy = path.slice(1) as PageId;
  return legacy in PAGE_PATHS ? legacy : 'dashboard';
}
function readDemoData<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => pageFromPath(window.location.pathname));
  const navigate = (page: PageId) => { if (page === 'dashboard') { window.location.assign('/'); return; } window.history.pushState({}, "", PAGE_PATHS[page]); setCurrentPage(page); window.scrollTo(0, 0); };
  useEffect(() => { const onPop = () => { if (window.location.pathname === '/') window.location.assign('/'); else setCurrentPage(pageFromPath(window.location.pathname)); }; window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  useEffect(() => { document.title = `${PAGE_NAMES[currentPage]} — DEV ID`; }, [currentPage]);
  const [skills, setSkills] = useState<Skill[]>(() => readDemoData('dev-id:skills', MOCK_SKILLS));
  const [projects, setProjects] = useState<Project[]>(() => readDemoData('dev-id:projects', MOCK_PROJECTS));
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPS);
  const [cvVersions, setCvVersions] = useState<CvVersion[]>(CV_VERSIONS);
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

  useEffect(() => { localStorage.setItem('dev-id:skills', JSON.stringify(skills)); }, [skills]);
  useEffect(() => { localStorage.setItem('dev-id:projects', JSON.stringify(projects)); }, [projects]);

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
      pushToast("Verificação simulada nesta prévia");
    }, 1100);
  };
  const handleVerifyAll = () => {
    pushToast("Simulando verificação das competências com evidências...");
    setTimeout(() => { setSkills((prev) => prev.map(s => s.status === "Evidenced" ? { ...s, status: "Verified" as SkillStatus } : s)); pushToast("Simulação concluída nesta prévia"); }, 1500);
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
    { id: "dashboard", icon: LayoutDashboard, label: "Painel" },
    { id: "identity", icon: User, label: "Identidade" },
    { id: "career", icon: Briefcase, label: "Carreira" },
    { id: "skills", icon: Layers, label: "Competências", count: `${stats.total}` },
    { id: "portfolio", icon: Folder, label: "Portfólio", count: `${projects.length}` },
    { id: "cv", icon: FileStack, label: "Estúdio de CV" },
    { id: "integrations", icon: Plug2, label: "Integrações" },
    { id: "opportunities", icon: Compass, label: "Oportunidades", count: "5" },
    { id: "analytics", icon: BarChart3, label: "Análises" },
    { id: "settings", icon: Settings, label: "Personalização" },
  ];

  const pageConfig: Record<PageId, { placeholder: string; actionLabel: string; actionIcon: any }> = {
    dashboard: { placeholder: "Buscar projetos e oportunidades...", actionLabel: "Compartilhar perfil", actionIcon: Share2 },
    identity: { placeholder: "Buscar seções e links do perfil...", actionLabel: "Visualizar perfil", actionIcon: Eye },
    career: { placeholder: "Buscar experiências e empresas...", actionLabel: "Adicionar experiência", actionIcon: Plus },
    skills: { placeholder: "Buscar tecnologias...", actionLabel: "Adicionar competência", actionIcon: Plus },
    portfolio: { placeholder: "Buscar projetos...", actionLabel: "Novo projeto", actionIcon: Plus },
    cv: { placeholder: "Buscar versões do currículo...", actionLabel: "Gerar PDF", actionIcon: Download },
    integrations: { placeholder: "Buscar integrações...", actionLabel: "Importar dados", actionIcon: Download },
    opportunities: { placeholder: "Buscar empresas e vagas...", actionLabel: "Nova candidatura", actionIcon: Plus },
    analytics: { placeholder: "Buscar análises...", actionLabel: "Exportar relatório", actionIcon: Download },
    settings: { placeholder: "Buscar preferências...", actionLabel: "Salvar alterações", actionIcon: Save },
  };

  const currentConfig = pageConfig[currentPage];

  const handleHeaderAction = () => {
    if (currentPage === "skills") { setForm({ name: "", category: "Languages", years: 3, pct: 70, level: "Advanced", status: "Evidenced", projectsLinked: 0 }); setShowAdd(true); }
    else if (currentPage === "portfolio") setShowAddProject(true);
    else if (currentPage === "cv") pushToast("PDF generated • ATS 94%");
    else if (currentPage === "opportunities") pushToast("Application tracker opened");
    else if (currentPage === "analytics") pushToast("Report exported • analytics_30d.pdf");
    else if (currentPage === "settings") pushToast("Changes saved • Theme updated");
    else pushToast(`${currentConfig.actionLabel} • indisponível nesta prévia`);
  };


  return (
    <div data-safe-area-inset-root className="min-h-screen w-full bg-[#F8F5F1] overflow-x-clip" style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }}>
      <div className="flex min-h-screen w-full max-w-[1920px] mx-auto">
        <Sidebar navItems={navItems} currentPage={currentPage} setCurrentPage={navigate} />

        {/* MAIN */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar search={search} setSearch={setSearch} currentConfig={currentConfig} pushToast={pushToast} onAction={handleHeaderAction} />

          <div className="px-4 lg:px-6 xl:px-8 py-5 lg:py-6 pb-[88px] lg:pb-6">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-5">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] flex-wrap">
                <span className="text-[#8E8E93] font-medium">Área do desenvolvedor</span>
                <span className="text-[#E8E2D8]">/</span>
                <span className="text-[#111] font-bold flex items-center gap-1.5 capitalize">
                  <span className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center">
                    {(() => { const it = navItems.find(n => n.id === currentPage); const Ic = it?.icon || Layers; return <Ic size={12} />; })()}
                  </span>
                  {navItems.find(n => n.id === currentPage)?.label}
                </span>
                <span className="ml-auto hidden md:flex items-center gap-3 text-[11px] text-[#8E8E93]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1BC47D] animate-pulse" />Dados demonstrativos</span>
                  <span className="w-[1px] h-3 bg-[#E8E2D8]" />
                  <span>{currentPage === "skills" ? `${stats.total} competências` : currentPage === "portfolio" ? `${projects.length} projetos` : "DEV ID • prévia"}</span>
                </span>
              </div>

              {/* PAGES */}
              {currentPage === "dashboard" && (
                <DashboardPage pushToast={pushToast} skills={skills} projects={projects} topSkills={topSkills} stats={stats} setCurrentPage={navigate} />
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
            <Footer />
          </div>
        </div>
      </div>

      <MobileNav navItems={navItems} currentPage={currentPage} setCurrentPage={navigate} />

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
