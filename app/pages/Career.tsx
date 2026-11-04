import { Pencil, Check, Clock, TrendingUp, MapPin, CalendarDays, Award, GraduationCap, Trophy } from "lucide-react";

export function CareerPage({ pushToast }: any) {
  const experiences = [
    { company: "Linear", role: "Staff Frontend Engineer", period: "2022 → atual • 2.5y", location: "Remoto • London", desc: "Liderança de sistemas de design e sincronização em tempo real com CRDT, com atuação no nível staff.", badges: ["Staff", "Design Systems", "CRDT"], tech: ["React", "TypeScript", "Framer Motion", "Yjs"], achievements: ["Reduziu a latência da interface em 60%", "Criou o Orbit DS, usado por 40 engenheiros"] },
    { company: "Nubank", role: "Senior Frontend", period: "2020 → 2022 • 2y", location: "São Paulo • Híbrido", desc: "Escalou o painel financeiro, adequação ao Pix e fluxo de tokens de design.", badges: ["Senior", "Fintech"], tech: ["React", "GraphQL", "Tailwind"], achievements: ["R$ 40 milhões em volume acompanhado", "Migrou para Style Dictionary"] },
    { company: "Stone", role: "Mid Frontend Intern", period: "2019 → 2020 • 1y", location: "São Paulo", desc: "Primeiro cargo • criou ferramentas internas e painéis de pagamentos.", badges: ["Intern", "First"], tech: ["JavaScript", "Vue"], achievements: ["Entregou 12 ferramentas internas"] },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px] overflow-hidden">
        <div className="flex items-center justify-between mb-6"><h3 className="text-[15px] font-bold flex items-center gap-2"><CalendarDays size={16} /> Trajetória • 2019 → 2024 • 6y</h3><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">3 experiências • nível staff</span></div>
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
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Conquistas</div>
                <div className="flex flex-col gap-1.5">
                  {exp.achievements.map((a, j) => <div key={j} className="flex items-center gap-2 text-[12px]"><Check size={12} className="text-[#1BC47D]" /> {a}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><GraduationCap size={16} /> Formação</h4>
            <div className="p-3 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8]">
              <div className="text-[13px] font-bold">USP • Ciência da Computação</div>
              <div className="text-[11px] text-[#8E8E93] mt-1">2015 → 2019 • Bacharelado • GPA 8.9</div>
              <div className="flex gap-1 mt-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#F0EDE8]">Top 5%</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-[#111] text-white">Honors</span></div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Award size={16} /> Certificações • 2</h4>
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
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Trophy size={16} /> Panorama da carreira</h4>
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

\n