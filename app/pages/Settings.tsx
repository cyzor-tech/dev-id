import { Settings2, Link2, Check, Verified, Eye, ExternalLink, Palette, Monitor, Save, Shield } from "lucide-react";

export function SettingsPage({ themeSel, setThemeSel, publicLayout, setPublicLayout, density, setDensidade, pushToast }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start">
      <div className="flex flex-col gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Palette size={16} /> Aparência • Tema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Light Beige", bg: "#F8F5F1", dot: "#111", active: true },
              { name: "Dark", bg: "#111111", dot: "#FFF", active: false },
              { name: "Meia-noite", bg: "#0F172A", dot: "#38BDF8", active: false },
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
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Monitor size={16} /> Personalização do perfil público</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Header Style</div><div className="flex gap-1.5 p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Minimal", "Bold", "Creative"].map(h => <button key={h} onClick={() => pushToast(`Header ${h}`)} className="h-8 px-4 rounded-full text-[11px] font-bold bg-white border border-[#F0EDE8] hover:border-[#111]">{h}</button>)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Layout</div><div className="flex gap-1.5 p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Timeline", "Grid", "Masonry"].map(l => <button key={l} onClick={() => setPublicLayout(l)} className={`h-8 px-4 rounded-full text-[11px] font-bold transition-all ${publicLayout === l ? "bg-[#111] text-white" : "bg-white border border-[#F0EDE8] text-[#8E8E93]"}`}>{l}</button>)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Mostrar / ocultar seções</div><div className="flex flex-col gap-1.5">{["Experiência", "Skills", "Projects", "Formação", "Contato"].map(s => (<div key={s} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[12px] font-medium">{s}</span><div className="w-[36px] h-[22px] rounded-full bg-[#111] border border-[#111] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] right-[2px] shadow" /></div></div>))}</div></div>
            </div>
            <div className="flex flex-col gap-4">
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Accent Color</div><div className="flex gap-2">{["#111111", "#2563EB", "#FF5A2C", "#1BC47D", "#8B5CF6", "#E8C86A"].map(c => <button key={c} className="w-9 h-9 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center" style={{ background: c }} onClick={() => pushToast(`Accent ${c}`)} />)}</div></div>
              <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Domain</div><div className="flex flex-col gap-2"><div className="h-[44px] flex items-center px-4 bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px]"><span className="text-[#8E8E93]">dev.id/</span><span className="font-bold ml-1">alex-nakamura</span><span className="ml-auto w-5 h-5 rounded-full bg-[#1BC47D] text-white flex items-center justify-center"><Check size={10} strokeWidth={3} /></span></div><div className="h-[44px] flex items-center px-4 bg-white border border-[#F0EDE8] rounded-[12px] text-[13px]"><span className="font-semibold">alexn.dev</span><span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-full bg-[#111] text-white">Verified</span></div></div><div className="text-[11px] text-[#8E8E93] mt-2">DNS: CNAME → cname.dev.id • SSL auto</div></div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><Settings2 size={16} /> Interface Preferências</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Densidade</div><div className="flex p-1 bg-[#F8F5F1] border border-[#F0EDE8] rounded-full w-fit">{["Comfortable", "Compact"].map(d => <button key={d} onClick={() => setDensidade(d)} className={`h-8 px-4 rounded-full text-[11px] font-bold ${density === d ? "bg-[#111] text-white" : "text-[#8E8E93]"}`}>{d}</button>)}</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Animações</div><div className="flex items-center gap-2"><div className="w-[36px] h-[22px] rounded-full bg-[#111] border border-[#111] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] right-[2px]" /></div><span className="text-[12px] font-medium">Ativadas • movimento suave</span></div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Idioma</div><div className="h-[40px] px-4 flex items-center bg-[#F8F5F1] border border-[#F0EDE8] rounded-[12px] text-[13px] font-semibold">Português do Brasil</div></div>
            <div><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Reduced Motion</div><div className="flex items-center gap-2"><div className="w-[36px] h-[22px] rounded-full bg-[#EDE8E0] border border-[#E8E2D8] relative"><div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] left-[2px] shadow" /></div><span className="text-[12px] font-medium">Off</span></div></div>
          </div>
          <button onClick={() => pushToast("Changes saved • Theme updated • Domain verified")} className="mt-6 w-full h-11 rounded-full bg-[#111] text-white text-[13px] font-bold flex items-center justify-center gap-2"><Save size={16} /> Salvar alterações</button>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
          <div className="flex items-center justify-between mb-4"><h4 className="text-[13px] font-bold flex items-center gap-2"><Eye size={16} /> Prévia • {publicLayout}</h4><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1BC47D] text-white">Live</span></div>
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
          <div className="mt-3 flex gap-2"><button onClick={() => pushToast("Opening public preview")} className="flex-1 h-9 rounded-full bg-[#111] text-white text-[11px] font-bold flex items-center justify-center gap-1.5"><ExternalLink size={12} /> Open</button><button onClick={() => pushToast("Link copied")} className="flex-1 h-9 rounded-full bg-white border border-[#F0EDE8] text-[11px] font-bold flex items-center justify-center gap-1.5"><Link2 size={12} /> Copiar link</button></div>
        </div>
        <div className="rounded-[28px] bg-[#111] text-white p-[20px]">
          <h4 className="text-[13px] font-bold flex items-center gap-2"><Shield size={14} /> Domínio • Exemplo</h4>
          <div className="mt-3 text-[12px] text-white/70 leading-[1.5]">Domínio de exemplo alexn.dev com SSL e configuração DNS ilustrativa.</div>
          <div className="mt-3 p-2.5 rounded-[12px] bg-white/10 border border-white/10 text-[11px] font-mono">CNAME alexn.dev → cname.dev.id<br />SSL • Auto • Let's Encrypt</div>
        </div>
      </div>
    </div>
  );
}
