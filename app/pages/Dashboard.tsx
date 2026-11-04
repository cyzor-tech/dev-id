import { Folder, Compass, Check, ArrowUpRight, Dna, Verified, Activity } from "lucide-react";
import type { Skill, Project } from "../model";
import { ProjectArt } from "../components/Visuals";

export function DashboardPage({ pushToast, skills, projects, topSkills, stats, setCurrentPage }: any) {
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
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#111] text-white">Engenheiro staff</span>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]">São Paulo • Remoto</span>
              </div>
              <p className="text-[13px] text-[#8E8E93] mt-2 leading-[1.5]">Engenheiro frontend staff focado em sistemas de design, sincronização em tempo real e desempenho. Experiência na Linear e no Nubank. Crio ferramentas para desenvolvedores.</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["React", "TypeScript", "Next.js", "Node.js", "Design Systems", "CRDT"].map(t => <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8]">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { k: "1.24k", l: "Profile Views", d: "+18%", c: "text-[#1BC47D]" },
              { k: "47", l: "Recrutador Views", d: "+12%", c: "text-[#1BC47D]" },
              { k: "12", l: "Invites", d: "3 novos", c: "text-[#FF5A2C]" },
            ].map((m, i) => (
              <div key={i} className="rounded-[16px] bg-[#F8F5F1] border border-[#F0EDE8] p-3">
                <div className="flex items-center gap-1.5"><span className="text-[18px] font-bold tracking-[-0.02em]">{m.k}</span><span className={`text-[11px] font-bold ${m.c}`}>{m.d}</span></div>
                <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px] flex flex-col gap-4">
          <div className="flex items-center justify-between"><h4 className="text-[14px] font-bold flex items-center gap-2"><Compass size={16} /> Oportunidades compatíveis</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#FF5A2C] text-white">5 novas</span></div>
          {[
            { co: "Vercel", match: "94% Compatibilidade", role: "Senior Front-end", color: "#111" },
            { co: "Linear", match: "88% Compatibilidade", role: "Staff Frontend", color: "#5A4A32" },
            { co: "Stripe", match: "91% Compatibilidade", role: "Senior Engineer", color: "#635BFF" },
          ].map((o, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] hover:bg-white transition-colors cursor-pointer" onClick={() => pushToast(`${o.co} • Open opportunity`)}>
              <div className="w-9 h-9 rounded-[12px] bg-white border border-[#F0EDE8] flex items-center justify-center font-bold text-[13px]" style={{ color: o.color }}>{o.co[0]}</div>
              <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold truncate">{o.role} @ {o.co}</div><div className="text-[11px] text-[#8E8E93]">{o.match} • Remoto • R$ 22k</div></div>
              <ArrowUpRight size={14} className="text-[#8E8E93]" />
            </div>
          ))}
          <button onClick={() => setCurrentPage("opportunities")} className="h-9 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center justify-center gap-1.5"><Compass size={14} /> Ver todas as oportunidades</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><Dna size={16} /> DNA técnico • Principais competências</h3><button onClick={() => setCurrentPage("skills")} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] hover:border-[#111]">Ver competências</button></div>
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
          <h4 className="text-[14px] font-bold flex items-center gap-2"><Activity size={16} /> Atividade de recrutadores</h4>
          {[
            { text: "Stripe visualizou seu perfil • há 2 h", dot: "bg-[#111]" },
            { text: "Recrutador da Vercel salvou API Gateway • há 5 h", dot: "bg-[#FF5A2C]" },
            { text: "Linear convidou você para uma vaga staff • há 1 dia", dot: "bg-[#1BC47D]" },
            { text: "Seu perfil apareceu em 12 buscas hoje", dot: "bg-[#E8C86A]" },
          ].map((a, i) => (
            <div key={i} className="flex gap-2.5 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8] text-[12px]">
              <span className={`mt-1 w-2 h-2 rounded-full ${a.dot} shrink-0`} /><span className="text-[#444] leading-[1.4]">{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
        <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><Folder size={16} /> Destaques do portfólio</h3><button onClick={() => setCurrentPage("portfolio")} className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#111] text-white">Ver todos {projects.length}</button></div>
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
