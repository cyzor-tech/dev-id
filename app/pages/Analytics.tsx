import { Search, Compass, Clock, Download, Building2, GitBranch, Eye, Star, Activity, PieChart, BarChart, LineChart, ArrowUp, ArrowDown } from "lucide-react";
import type { Project } from "../model";

export function AnalyticsPage({ period, setPeriod, projects, pushToast }: any) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Período:</span>
          <div className="flex p-1 bg-white border border-[#F0EDE8] rounded-full">
            {(["7d", "30d", "90d", "1y"] as const).map(p => <button key={p} onClick={() => setPeriod(p)} className={`h-7 px-3 rounded-full text-[11px] font-bold ${period === p ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{p}</button>)}
          </div>
        </div>
        <div className="text-[11px] text-[#8E8E93] flex items-center gap-2"><Activity size={12} /> Atualizado há 2 h • dados de exemplo</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: "1.24k", l: "Profile Views", d: "+18%", up: true },
          { k: "47", l: "Recrutador Views", d: "+12%", up: true },
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
            <div className="flex items-center justify-between mb-5"><h3 className="text-[14px] font-bold flex items-center gap-2"><LineChart size={16} /> Visualizações do perfil • Últimos {period}</h3><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">Média de 42 por dia</span></div>
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
              <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><PieChart size={16} /> Origem das visitas</h4>
              <div className="flex items-center gap-4">
                <div className="w-[96px] h-[96px] relative"><svg viewBox="0 0 96 96" className="w-full h-full -rotate-90"><circle cx="48" cy="48" r="36" fill="none" stroke="#F0EDE8" strokeWidth="10" /><circle cx="48" cy="48" r="36" fill="none" stroke="#111" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.45} ${2 * Math.PI * 36}`} /><circle cx="48" cy="48" r="36" fill="none" stroke="#8E8E93" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.25} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.45} /><circle cx="48" cy="48" r="36" fill="none" stroke="#E8C86A" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.20} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.70} /><circle cx="48" cy="48" r="36" fill="none" stroke="#D6D0C8" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 36 * 0.10} ${2 * Math.PI * 36}`} strokeDashoffset={-2 * Math.PI * 36 * 0.90} /></svg></div>
                <div className="flex flex-col gap-2 text-[11px] flex-1"><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#111]" />Search</span><span className="font-bold">45%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8E8E93]" />Direct</span><span className="font-bold">25%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E8C86A]" />Recrutador</span><span className="font-bold">20%</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D6D0C8]" />Social</span><span className="font-bold">10%</span></div></div>
              </div>
            </div>
            <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
              <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><BarChart size={16} /> Desempenho dos projetos</h4>
              <div className="flex flex-col gap-2.5">
                {projects.slice(0, 4).map((p: Project) => {
                  const v = Math.round(Math.random() * 60 + 40);
                  return <div key={p.id} className="flex items-center gap-2"><span className="text-[11px] font-bold w-[96px] truncate">{p.title}</span><div className="flex-1 h-[8px] bg-[#F0EDE8] rounded-full overflow-hidden"><div className="h-full bg-[#111] rounded-full" style={{ width: `${v}%` }} /></div><span className="text-[11px] font-bold w-8 text-right">{v * 9}</span></div>;
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><Clock size={16} /> Atividade recente</h4>
            <div className="flex flex-col gap-2">
              {[
                { icon: Eye, text: "Recrutador from Stripe visualizou seu perfil • há 2 h", color: "bg-[#111] text-white" },
                { icon: Star, text: "Orbit Design System recebeu 12 estrelas • há 5 h", color: "bg-[#FFF7ED] text-[#9A3412] border border-[#FFEDD5]" },
                { icon: GitBranch, text: "GitHub sync • 3 novos contributions • 8h ago", color: "bg-[#F6F2EB] text-[#111] border border-[#F0EDE8]" },
                { icon: Compass, text: "Seu perfil apareceu em uma busca da Vercel • há 1 dia", color: "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]" },
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
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Search size={14} /> Termos mais buscados</h4>
            <div className="flex flex-wrap gap-1.5">
              {["react design system", "staff frontend", "typescript expert", "next.js rsc", "crdt sync", "framer motion", "linear clone"].map(k => <span key={k} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F8F5F1] border border-[#F0EDE8] hover:border-[#111] cursor-pointer" onClick={() => pushToast(`Search: ${k}`)}>{k}</span>)}
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Building2 size={14} /> Empresas que visitaram</h4>
            <div className="flex flex-col gap-2">
              {[{ co: "Stripe", views: 8, logo: "S" }, { co: "Vercel", views: 5, logo: "▲" }, { co: "Linear", views: 4, logo: "L" }, { co: "Nubank", views: 3, logo: "Nu" }].map((c) => (
                <div key={c.co} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-[8px] bg-white border border-[#F0EDE8] flex items-center justify-center font-bold text-[11px]">{c.logo}</div><span className="text-[12px] font-semibold">{c.co}</span></div><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#111] text-white">{c.views} views</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3">Engajamento</h4>
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Tempo médio no perfil</span><span className="font-bold">2m 34s</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Profundidade de rolagem</span><span className="font-bold">78%</span></div>
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

\n