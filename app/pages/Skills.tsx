import { Pencil, Link2, MoreHorizontal, Check, Clock, ShieldCheck, ChevronDown, Download, TrendingUp, FileText, GripVertical, Dna, Verified, Lightbulb, GitBranch, Code2, AlertTriangle, Languages } from "lucide-react";
import type { Skill } from "../model";
import { RadarChart } from "../components/Visuals";

export function SkillsPage(props: any) {
  const { grouped, topSkills, stats, expandedId, setExpandedId, hoveredRadar, setHoveredRadar, hoveredBar, setHoveredBar, statusFilter, setStatusFilter, catFilter, setCatFilter, collapsedCats, setCollapsedCats, dragged, handleDragStart, handleDrop, setDragged, verifyingId, handleVerify, handleVerifyAll, setLinkingFor, evidencePublic, setEvidencePublic, pushToast } = props;
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px] lg:p-[28px] overflow-hidden relative">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-[16px] lg:text-[18px] font-bold tracking-[-0.02em] flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center"><Dna size={14} /></span>
            Technical DNA
            <span className="text-[#E8E2D8] font-normal">•</span>
            <span className="font-normal text-[#8E8E93] text-[14px]">{stats.total} competências • 6 anos de evolução</span>
            <span className="hidden sm:inline-flex items-center gap-2 ml-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white bg-[#111] px-2.5 py-1 rounded-full flex items-center gap-1"><ShieldCheck size={12} /> Verified {stats.pct}%</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8E8E93] bg-[#F6F2EB] border border-[#F0EDE8] px-2.5 py-1 rounded-full">{stats.verified} Verified • {stats.evidenced} Evidenced</span>
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={handleVerifyAll} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[12px] font-semibold flex items-center gap-1.5 hover:border-[#111]"><GitBranch size={14} /> Simular verificação</button>
            <button onClick={() => pushToast("Exportar competências PDF")} className="h-9 px-4 rounded-full bg-[#111] text-white text-[12px] font-semibold flex items-center gap-1.5"><Download size={14} /> Exportar competências</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_240px] gap-8 items-start">
          <div className="flex flex-col items-center"><RadarChart hoveredIdx={hoveredRadar} setHoveredIdx={setHoveredRadar} /><div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]"><span className="w-2 h-2 rounded-full bg-[#111]" /> Radar de proficiência<span className="w-[1px] h-3 bg-[#E8E2D8]" /><span>6 eixos • média de 69%</span></div></div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Principais competências • Experiência</span><span className="text-[11px] font-semibold text-[#8E8E93] flex items-center gap-1"><Clock size={12} /> Anos de experiência</span></div>
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
              <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-3 flex items-center gap-1.5"><ShieldCheck size={12} /> Evidências • Legenda</div>
              <div className="flex flex-col gap-2.5">
                {[{ dot: "bg-[#C9C5BE]", label: "Declared", desc: "Declarado, ainda sem comprovação", count: `${stats.total - stats.verified - stats.evidenced} skills` }, { dot: "bg-[#E8C86A]", label: "Evidenced", desc: "Ligado a projeto, commit ou certificado", count: `${stats.evidenced} skills` }, { dot: "bg-[#111]", label: "Verified", desc: "Exemplo de verificação por GitHub e pares", count: `${stats.verified} skills` }].map((l) => (
                  <div key={l.label} className="flex gap-2.5"><div className={`mt-1 w-2.5 h-2.5 rounded-full ${l.dot} shrink-0`} /><div><div className="text-[12px] font-bold flex items-center gap-1.5">{l.label} <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{l.count}</span></div><div className="text-[11px] text-[#8E8E93] leading-[1.3] mt-0.5">{l.desc}</div></div></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">{[{ k: `${stats.total}`, v: "Total" }, { k: `${stats.verified}`, v: "Verified" }, { k: `${stats.evidenced}`, v: "Evidenced" }, { k: `${stats.withProj}`, v: "Com projetos" }].map((m, i) => (<div key={i} className="rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] p-3"><div className="text-[16px] font-bold tracking-[-0.02em]">{m.k}</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">{m.v}</div></div>))}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-[14px] font-bold flex items-center gap-2"><Code2 size={16} className="text-[#8E8E93]" /> Competências por categoria<span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">{props.filtered.length} skills</span></h3>
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
                              <div className="flex gap-2"><button onClick={() => setLinkingFor(skill)} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-semibold flex items-center gap-1.5"><Link2 size={12} /> Vincular evidência</button><button onClick={() => handleVerify(skill.id)} disabled={skill.status === "Verified" || verifyingId === skill.id} className="h-8 px-3 rounded-full bg-[#111] text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50">{verifyingId === skill.id ? <><div className="w-3 h-3 border-[2px] border-white border-t-transparent rounded-full animate-spin" /> Verifying...</> : <><ShieldCheck size={12} /> {skill.status === "Verified" ? "Verified" : "Verify now"}</>}</button></div>
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
            <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><ShieldCheck size={16} /> Situação das evidências</h4><button className="w-7 h-7 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><MoreHorizontal size={14} /></button></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-[88px] h-[88px] shrink-0"><svg viewBox="0 0 88 88" className="w-full h-full -rotate-90"><circle cx="44" cy="44" r="36" fill="none" stroke="#F0EDE8" strokeWidth="8" /><circle cx="44" cy="44" r="36" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.68} ${2 * Math.PI * 36}`} /><circle cx="44" cy="44" r="36" fill="none" stroke="#E8C86A" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.22} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.68} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><div className="text-[20px] font-bold leading-none">{stats.pct}%</div><div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Verified</div></div></div>
              <div className="flex flex-col gap-2 text-[11px]"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#111]" /> Verified • {stats.verified}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8C86A]" /> Evidenced • {stats.evidenced}</div><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D6D0C8]" /> Declared • {stats.total - stats.verified - stats.evidenced}</div></div>
            </div>
            <button onClick={handleVerifyAll} className="w-full h-9 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[12px] font-semibold flex items-center justify-center gap-1.5"><GitBranch size={14} /> Simular verificação</button>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#9A3412]"><Lightbulb size={14} /></span>Oportunidades de desenvolvimento</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#111] text-white">Today</span></div>
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

\n