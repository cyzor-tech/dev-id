import { Share2, Check, Download, Copy, Paintbrush, LayoutTemplate, RotateCcw } from "lucide-react";
import type { CvVersion } from "../model";

export function CvPage({ versions, selectedId, setSelectedId, sections, setSections, template, setTemplate, accent, setAccent, pushToast, setVersions }: any) {
  const selected = versions.find((v: any) => v.id === selectedId);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-5 items-start">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between"><h3 className="text-[13px] font-bold">Versões do currículo • {versions.length}</h3><button onClick={() => { const nv = { id: Math.random().toString(36).slice(2, 5), name: `CV - New ${versions.length + 1}`, updated: "now", match: 80, ats: 88, template: "Modern" }; setVersions((prev: any) => [nv, ...prev]); pushToast("Duplicated CV version"); }} className="w-8 h-8 rounded-full bg-white border border-[#F0EDE8] flex items-center justify-center"><Copy size={14} /></button></div>
        <div className="flex flex-col gap-2.5">
          {versions.map((cv: CvVersion) => (
            <button key={cv.id} onClick={() => setSelectedId(cv.id)} className={`text-left rounded-[20px] border p-4 transition-all ${selectedId === cv.id ? "bg-[#111] text-white border-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.15)]" : "bg-white border-[#F0EDE8] hover:border-[#E8E2D8]"}`}>
              <div className="flex items-start justify-between gap-2">
                <div><div className="text-[13px] font-bold">{cv.name}</div><div className={`text-[11px] mt-1 ${selectedId === cv.id ? "text-white/60" : "text-[#8E8E93]"}`}>{cv.updated} • {cv.match}% match • {cv.template}</div></div>
                {cv.isDefault && <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${selectedId === cv.id ? "bg-white text-[#111]" : "bg-[#111] text-white"}`}>Padrão</span>}
              </div>
              <div className="mt-3 flex items-center gap-2"><div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden"><div className="h-full bg-[#1BC47D] rounded-full" style={{ width: `${cv.ats}%` }} /></div><span className="text-[10px] font-bold">ATS {cv.ats}</span></div>
            </button>
          ))}
        </div>
        <div className="rounded-[20px] bg-white border border-[#F0EDE8] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">ATS Score</div>
          <div className="text-[22px] font-bold">{selected?.ats}/100</div>
          <div className="text-[11px] text-[#8E8E93] mt-1">Otimizado para leitura por recrutadores</div>
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
          {sections.summary && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Resumo</div><p className="text-[12px] leading-[1.6] text-[#444]">Engenheiro frontend staff com 6 anos de experiência em sistemas de design e colaboração em tempo real. Especialista em React, TypeScript e desempenho.</p></div>}
          {sections.experience && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Experiência</div><div className="flex flex-col gap-3">{["Linear • Staff Frontend • 2022→Now • Led Orbit DS • 40% faster", "Nubank • Senior Frontend • 2020→2022 • Fintech Dashboard • R$40M"].map((e, i) => <div key={i} className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#111] mt-1.5" /><div className="text-[12px] font-medium">{e}</div></div>)}</div></div>}
          {sections.skills && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Skills</div><div className="flex flex-wrap gap-1.5">{["React", "TypeScript", "Next.js", "Node.js", "Design Systems", "PostgreSQL", "AWS"].map(s => <span key={s} className="text-[10px] font-bold px-2 py-1 rounded-full border" style={{ background: `${accent}10`, borderColor: `${accent}20`, color: accent }}>{s}</span>)}</div></div>}
          {sections.projects && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Projetos em destaque</div><div className="grid grid-cols-2 gap-2">{["Orbit DS • 2.3k stars • 45 PRs", "API Gateway • 2M req/day • 99.99%"].map((p, i) => <div key={i} className="p-2.5 rounded-[10px] bg-[#F8F5F1] border border-[#F0EDE8] text-[11px] font-medium">{p}</div>)}</div></div>}
          {sections.education && <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Formação</div><div className="text-[12px] font-medium">USP • Ciência da Computação • 2015-2019 • GPA 8.9 • Top 5%</div></div>}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => pushToast("Sync with profile • Updated")} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><RotateCcw size={12} /> Sincronizar perfil</button>
          <button onClick={() => pushToast("Version history • 12 versions")} className="h-9 px-4 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[11px] font-bold">Histórico</button>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><Paintbrush size={14} /> Personalização</h4>
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

\n