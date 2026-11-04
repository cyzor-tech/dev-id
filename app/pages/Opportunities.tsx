import { useState } from "react";
import { BarChart3, Clock, X, MapPin, Mail, Filter, Bookmark, MessageSquare, DollarSign, Target, Send, CheckCircle2, AlertCircle, Info } from "lucide-react";
import type { Opportunity } from "../model";

export function OpportunitiesPage({ opportunities, oppTab, setOppTab, filters, setFilters, kanban, setKanban, saved, setSaved, pushToast }: any) {
  const [dragOpp, setDragOpp] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[18px] flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mr-2"><Filter size={14} /> Motor de compatibilidade:</div>
        {Object.entries(filters).map(([k, v]) => (
          <span key={k} className="h-8 px-3 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center gap-1.5">{k}: {v as string} <button onClick={() => pushToast(`Edit filter ${k}`)} className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><X size={10} /></button></span>
        ))}
        <button onClick={() => pushToast("Edit matching preferences")} className="h-8 px-3 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold">+ Adicionar filtro</button>
        <div className="ml-auto text-[11px] text-[#8E8E93] hidden md:flex items-center gap-1.5"><Info size={12} /> 94% de compatibilidade = 100% stack + 90% seniority + 85% location</div>
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
                          <div className="mt-2 flex gap-1"><span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#111] text-white">{opp.match}% Compatibilidade</span><span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8]">{opp.location}</span></div>
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
                      <div className="flex items-center gap-2 flex-wrap"><span className="text-[15px] font-bold">{opp.role}</span><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FF5A2C] text-white">{opp.match}% Compatibilidade</span></div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8E8E93]"><DollarSign size={12} /> {opp.salary} • <MapPin size={12} /> {opp.location} • <Clock size={12} /> {opp.mode}</div>
                    </div>
                  </div>
                  <button onClick={() => { const ns = new Set(saved); if (ns.has(opp.id)) ns.delete(opp.id); else ns.add(opp.id); setSaved(ns); pushToast(ns.has(opp.id) ? "Saved opportunity" : "Unsaved"); }} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${saved.has(opp.id) ? "bg-[#111] text-white border-[#111]" : "bg-white border-[#F0EDE8] text-[#8E8E93] hover:border-[#111]"}`}><Bookmark size={14} fill={saved.has(opp.id) ? "white" : "none"} /></button>
                </div>
                <p className="text-[13px] text-[#444] mt-4 leading-[1.5]">{opp.desc}</p>
                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Requisitos • Compatibilidade transparente</div>
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
                  <button onClick={() => pushToast(`Applied to ${opp.company} • Pipeline updated`)} className="h-9 px-5 rounded-full bg-[#111] text-white text-[12px] font-bold flex items-center gap-1.5"><Send size={14} /> Simular candidatura • {opp.match}% match</button>
                  <button onClick={() => pushToast(`Mensagem recruiter at ${opp.company}`)} className="h-9 px-4 rounded-full bg-white border border-[#F0EDE8] text-[12px] font-bold flex items-center gap-1.5"><MessageSquare size={14} /> Mensagem</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
          {oppTab === "Invites" && (
            <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
              <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Mail size={14} /> Convites • 3 novos</h4>
              {[
                { company: "Linear", person: "Karina • Recrutador", msg: "Staff Frontend role • Would love to chat about Orbit DS...", avatar: "K" },
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
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Target size={14} /> Preferências</h4>
            <div className="flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Desired roles</span><span className="font-bold">Staff Frontend, Frontend Lead</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Not desired</span><span className="font-bold">On-site only • No relocation</span></div>
              <div className="flex justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[#8E8E93]">Salary expectation</span><span className="font-bold">R$ 22k+ • Remote</span></div>
            </div>
            <button onClick={() => pushToast("Edit preferences")} className="mt-3 w-full h-9 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold">Edit preferences</button>
          </div>
          <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
            <h4 className="text-[13px] font-bold flex items-center gap-2"><BarChart3 size={14} /> Faixas salariais</h4>
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
