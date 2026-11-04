import { Plus, User, Pencil, Check, X, Eye, ExternalLink, AlertTriangle, MapPin, Globe2, BriefcaseBusiness, Lock, Languages, LinkIcon } from "lucide-react";
const Github = Globe2;
const Linkedin = LinkIcon;

export function IdentityPage({ pushToast }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
      <div className="flex flex-col gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><User size={16} /> Foto e apresentação</h3>
          <div className="flex gap-5">
            <div className="w-[88px] h-[88px] rounded-[22px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center text-[24px] font-bold text-[#5A4A32] shrink-0">AN</div>
            <div className="flex-1">
              <div className="text-[18px] font-bold">Alex Nakamura — Engenheiro frontend staff</div>
              <div className="text-[13px] text-[#8E8E93] mt-1">Crio interfaces para produtos digitais • sistemas de design • sincronização em tempo real • 6 anos de experiência • São Paulo/remoto</div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => pushToast("Edição de foto indisponível nesta prévia")} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center gap-1.5"><Pencil size={12} /> Editar</button>
                <button onClick={() => pushToast("Recorte de foto indisponível nesta prévia")} className="h-8 px-3 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[11px] font-bold"> Recortar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[26px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><BriefcaseBusiness size={16} /> Posição profissional</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Cargo atual</label>
              <div className="h-[44px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">Engenheiro frontend staff</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93]">Empresa</label>
              <div className="h-[44px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">Linear • ex-Nubank</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Especialização</div>
            <div className="flex flex-wrap gap-2">
              {["Sistemas de design", "Sincronização em tempo real", "Desempenho", "Arquitetura frontend"].map(s => <span key={s} className="px-3 py-1.5 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center gap-1.5">{s} <X size={12} className="opacity-60" /></span>)}
              <button onClick={() => pushToast("Inclusão de especialização indisponível nesta prévia")} className="px-3 py-1.5 rounded-full bg-white border border-dashed border-[#E8E2D8] text-[11px] font-bold text-[#8E8E93] flex items-center gap-1"><Plus size={12} /> Adicionar</button>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Nível de senioridade</div>
            <div className="flex p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">
              {["Pleno", "Sênior", "Staff", "Principal"].map(l => <span key={l} className={`h-8 px-4 rounded-full text-[12px] font-bold flex items-center ${l === "Staff" ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{l}</span>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><MapPin size={14} /> Localização e trabalho</h4>
            <div className="flex flex-col gap-2 text-[12px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Localização</span><span className="font-semibold">São Paulo, BR • Remoto</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Modelo de trabalho</span><span className="font-semibold">Remoto • híbrido possível</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Mudança de país</span><span className="font-semibold">Aberto a UE/EUA</span></div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2 mb-3"><Languages size={14} /> Idiomas e links</h4>
            <div className="flex flex-col gap-2">
              {[
                { icon: Github, label: "github.com/alexnakamura", verified: true },
                { icon: Linkedin, label: "linkedin.com/in/alexn", verified: true },
                { icon: Globe2, label: "alexn.dev • Site pessoal", verified: false },
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
          <div className="flex items-center justify-between mb-4"><h4 className="text-[14px] font-bold flex items-center gap-2"><Eye size={16} /> Prévia pública</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1BC47D] text-white">Exemplo</span></div>
          <div className="rounded-[16px] border border-[#F0EDE8] overflow-hidden bg-[#F8F5F1]">
            <div className="h-8 bg-white border-b border-[#F0EDE8] flex items-center px-3 gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5A2C]" /><div className="w-2.5 h-2.5 rounded-full bg-[#E8C86A]" /><div className="w-2.5 h-2.5 rounded-full bg-[#1BC47D]" /><div className="ml-3 flex-1 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center px-2 text-[10px] text-[#8E8E93]">dev.id/alex-nakamura</div></div>
            <div className="p-4 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center font-bold text-[#5A4A32]">AN</div>
              <div className="text-[14px] font-bold">Alex Nakamura</div>
              <div className="text-[11px] text-[#8E8E93]">Frontend staff • sistemas de design</div>
              <div className="h-2 bg-white rounded-full w-3/4" />
              <div className="h-2 bg-white rounded-full w-1/2" />
            </div>
          </div>
          <button onClick={() => pushToast("Perfil público indisponível nesta prévia")} className="mt-3 w-full h-9 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center justify-center gap-2"><ExternalLink size={14} /> Abrir perfil público</button>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <h4 className="text-[13px] font-bold mb-3">Perfil completo • 87%</h4>
          <div className="relative w-[88px] h-[88px] mx-auto">
            <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90"><circle cx="44" cy="44" r="36" fill="none" stroke="#F0EDE8" strokeWidth="8" /><circle cx="44" cy="44" r="36" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 36 * 0.87} ${2 * Math.PI * 36}`} /></svg>
            <div className="absolute inset-0 flex items-center justify-center text-[18px] font-bold">87%</div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-[11px]">
            <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>Foto e apresentação</span><Check size={12} className="text-[#065F46]" /></div>
            <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>Experiência • 3 cargos</span><Check size={12} className="text-[#065F46]" /></div>
            <div className="flex justify-between p-2 rounded-[10px] bg-[#FFF7ED] border border-[#FFEDD5]"><span>Adicione mais um projeto</span><AlertTriangle size={12} className="text-[#9A3412]" /></div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
          <h4 className="text-[13px] font-bold flex items-center gap-2"><Lock size={14} /> Privacidade</h4>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { label: "Exibir pretensão salarial", on: true },
              { label: "Exibir e-mail de contato", on: false },
              { label: "Permitir mensagens de recrutadores", on: true },
              { label: "Portfólio público", on: true },
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

\n