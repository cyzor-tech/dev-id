import { Download, Verified, GitBranch, ExternalLink, Star, Award, GitCommit, Package, Globe2, LinkIcon, Palette } from "lucide-react";
const Github = Globe2;
const Linkedin = LinkIcon;
const Figma = Palette;
import { TriangleIcon } from "./TriangleIcon";

export function IntegrationsPage({ connected, setConnected, pushToast }: any) {
  const integrations = [
    { id: "github", name: "GitHub", desc: "342 contributions • 12 repos linked", icon: Github, status: "Connected", color: "#111", stats: "Última sincronização 2h ago • sincronização automática ativa" },
    { id: "linkedin", name: "LinkedIn", desc: "500+ connections • Verified", icon: Linkedin, status: "Connected", color: "#0A66C2", stats: "Última sincronização 1d ago • Profile verified" },
    { id: "gitlab", name: "GitLab", desc: "Self-hosted • Em breve", icon: GitBranch, status: "Coming Soon", color: "#FC6D26", stats: "Waitlist • Q2 2024" },
    { id: "credly", name: "Credly / Acclaim", desc: "2 certs • AWS + Meta", icon: Award, status: "Connected", color: "#FF6B00", stats: "2 badges synced • Verified" },
    { id: "vercel", name: "Vercel", desc: "3 deployments • Edge", icon: TriangleIcon, status: "Connected", color: "#111", stats: "Last deploy 3h ago • Orbit UI" },
    { id: "figma", name: "Figma", desc: "Tokens pipeline • Style Dictionary", icon: Figma, status: "Connected", color: "#F24E1E", stats: "Design tokens sync • 47 components" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((int) => {
          const isConnected = connected[int.id];
          const isComing = int.status === "Coming Soon";
          return (
            <div key={int.id} className={`rounded-[28px] bg-white border shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[22px] transition-all ${isComing ? "border-[#F0EDE8] opacity-70" : "border-[#F0EDE8] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-[14px] bg-[#F8F5F1] border border-[#F0EDE8] flex items-center justify-center" style={{ color: int.color }}><int.icon size={18} /></div><div><div className="text-[14px] font-bold">{int.name}</div><div className="text-[11px] text-[#8E8E93]">{int.desc}</div></div></div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isComing ? "bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93]" : isConnected ? "bg-[#111] text-white" : "bg-white border border-[#F0EDE8] text-[#8E8E93]"}`}>{isComing ? "Soon" : isConnected ? "Connected" : "Disconnected"}</span>
              </div>
              <div className="mt-4 p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8] text-[11px] text-[#8E8E93] flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#1BC47D] animate-pulse" : "bg-[#D6D0C8]"}`} />{int.stats}</div>
              <div className="mt-4 flex gap-2">
                <button disabled={isComing} onClick={() => { if (!isComing) { setConnected((prev: any) => ({ ...prev, [int.id]: !prev[int.id] })); pushToast(`${int.name} ${!isConnected ? "connected" : "disconnected"}`); } }} className={`flex-1 h-9 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${isComing ? "bg-[#F6F2EB] border border-[#F0EDE8] text-[#8E8E93] cursor-not-allowed" : isConnected ? "bg-white border border-[#F0EDE8] hover:border-[#111]" : "bg-[#111] text-white hover:bg-black"}`}>{isComing ? "Entrar na lista de espera" : isConnected ? "Disconnect" : "Connect"}</button>
                <button onClick={() => pushToast(`${int.name} • View details`)} className="w-9 h-9 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center text-[#8E8E93]"><ExternalLink size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[24px]">
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-5"><GitCommit size={16} /> GitHub • Contribuições</h3>
          <div className="grid grid-cols-[repeat(20,1fr)] gap-1.5 mb-4">
            {Array.from({ length: 120 }).map((_, i) => {
              const intensity = Math.random();
              return <div key={i} className="aspect-square rounded-[3px]" style={{ background: intensity > 0.8 ? "#111" : intensity > 0.5 ? "#8E8E93" : intensity > 0.2 ? "#E8E2D8" : "#F0EDE8" }} />;
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8E8E93]"><span>342 contribuições no último ano</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-[2px] bg-[#F0EDE8]" /> Less <span className="w-2 h-2 rounded-[2px] bg-[#111]" /> More</span></div>
          <div className="mt-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#8E8E93] mb-2">Principais repositórios</div>
            <div className="flex flex-col gap-2">
              {[{ name: "orbit-design-system", stars: "2.3k", lang: "TypeScript" }, { name: "linear-sync-engine", stars: "840", lang: "Go" }, { name: "api-gateway", stars: "420", lang: "Node" }].map((r) => (
                <div key={r.name} className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F5F1] border border-[#F0EDE8]"><span className="text-[12px] font-semibold">{r.name}</span><span className="flex items-center gap-2 text-[11px] text-[#8E8E93]"><span className="flex items-center gap-1"><Star size={10} />{r.stars}</span><span className="w-2 h-2 rounded-full bg-[#111]" />{r.lang}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3 flex items-center gap-2"><Package size={16} /> Importar dados</h4>
            <div onClick={() => pushToast("Drop files to import • JSON, CSV supported")} className="rounded-[16px] border-2 border-dashed border-[#E8E2D8] bg-[#FDFCFA] p-6 flex flex-col items-center gap-2 text-center cursor-pointer hover:bg-white hover:border-[#111] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] flex items-center justify-center"><Download size={16} className="text-[#8E8E93]" /></div>
              <div className="text-[12px] font-bold">Arraste arquivos aqui</div>
              <div className="text-[11px] text-[#8E8E93]">JSON, CSV, GitHub export</div>
            </div>
          </div>
          <div className="rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-[20px]">
            <h4 className="text-[13px] font-bold mb-3">Estado da sincronização • 98%</h4>
            <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden"><div className="h-full bg-[#1BC47D] rounded-full" style={{ width: "98%" }} /></div>
            <div className="mt-3 flex flex-col gap-2 text-[11px]">
              <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>GitHub • Success</span><span className="font-bold text-[#065F46]">2h ago</span></div>
              <div className="flex justify-between p-2 rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]"><span>LinkedIn • Success</span><span className="font-bold text-[#065F46]">1d ago</span></div>
              <div className="flex justify-between p-2 rounded-[10px] bg-[#FFF7ED] border border-[#FFEDD5]"><span>Figma • Warning</span><span className="font-bold text-[#9A3412]">Token limit</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

\n