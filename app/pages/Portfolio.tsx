import { Plus, BarChart3, ArrowUpRight, ExternalLink, Star, Globe2, LayoutGrid, Layers3, Crown } from "lucide-react";
const Github = Globe2;
import type { Project } from "../model";
import { ProjectArt } from "../components/Visuals";

export function PortfolioPage({ projects, portfolioFilter, setPortfolioFilter, layout, setLayout, setSelectedProject, setShowAdd, pushToast }: any) {
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
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-4"><Crown size={16} /> Projetos em destaque • 3</h4>
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
            <div className="mt-4 p-3 rounded-[14px] bg-[#111] text-white flex gap-2.5"><div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"><Github size={14} /></div><div><div className="text-[12px] font-bold">GitHub Sync • Active</div><div className="text-[11px] text-white/60 mt-0.5">12 repos linked • Última sincronização 2h ago</div></div></div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Globe2 size={16} /> Portfólios externos</h4>
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

\n