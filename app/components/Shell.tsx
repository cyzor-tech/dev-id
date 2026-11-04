import type { ComponentType, Dispatch, SetStateAction } from "react";
import { Search, X, Settings2 } from "lucide-react";

type PageId = "dashboard" | "identity" | "career" | "skills" | "portfolio" | "cv" | "integrations" | "opportunities" | "analytics" | "settings";
type NavItem = { id: PageId; icon: ComponentType<{ size?: number; strokeWidth?: number }>; label: string; count?: string };
type NavProps = { navItems: NavItem[]; currentPage: PageId; setCurrentPage: (page: PageId) => void };
export function Sidebar({navItems,currentPage,setCurrentPage}:NavProps){return (<aside className="hidden lg:flex w-[88px] shrink-0 flex-col items-center py-6 sticky top-0 h-screen z-20">
          <div className="w-[72px] flex flex-col items-center py-5 px-2 gap-5 h-[calc(100vh-48px)] rounded-[28px] bg-white border border-[#F0EDE8] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 rounded-[12px] bg-[#111] flex items-center justify-center text-white font-bold text-[16px] tracking-[-0.02em]">◈</div>
            <div className="w-full h-[1px] bg-[#F0EDE8]" />
            <nav aria-label="Navegação principal" className="flex flex-col gap-[8px] w-full items-center overflow-y-auto scrollbar-none">
              {navItems.map((it) => {
                const isActive = it.id === currentPage;
                return (
                  <button
                    key={it.id}
                    onClick={() => setCurrentPage(it.id)}
                    className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]" : "text-[#8E8E93] hover:bg-[#F6F2EB] hover:text-[#111]"}`}
                    title={it.label}
                    aria-label={it.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <it.icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                    {it.count && !isActive && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F6F2EB] border border-[#F0EDE8] text-[9px] font-bold text-[#111] flex items-center justify-center">{it.count}</span>}
                  </button>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col items-center gap-3">
              <div className="w-full h-[1px] bg-[#F0EDE8]" />
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#F0EDE8] relative">
                <div className="w-full h-full bg-gradient-to-br from-[#E8D9C5] to-[#C9B89A] flex items-center justify-center text-[13px] font-bold text-[#5A4A32]">AN</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1BC47D] rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </aside>);}
export function MobileNav({navItems,currentPage,setCurrentPage}:NavProps){return (<div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-2 bg-gradient-to-t from-[#F8F5F1] via-[#F8F5F1] to-transparent">
        <nav aria-label="Navegação móvel" className="bg-white border border-[#F0EDE8] rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.map((it) => {
            const active = it.id === currentPage;
            return (
              <button key={it.id} onClick={() => setCurrentPage(it.id)} title={it.label} aria-label={it.label} aria-current={active ? 'page' : undefined} className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${active ? "bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]" : "text-[#8E8E93]"}`}>
                <it.icon size={18} />
              </button>
            );
          })}
        </nav>
      </div>);}
type TopbarProps = { search: string; setSearch: Dispatch<SetStateAction<string>>; currentConfig: {placeholder:string;actionLabel:string;actionIcon:ComponentType<{size?:number}>};pushToast:(message:string)=>void;onAction:()=>void };
export function Topbar({search,setSearch,currentConfig,pushToast,onAction}:TopbarProps){return (<header data-safe-area-sticky-top className="sticky z-20 bg-[#F8F5F1]/85 backdrop-blur-[16px] border-b border-transparent" style={{ top: "var(--safe-area-inset-top)" }}>
            <div className="flex items-center gap-3 px-4 lg:px-8 py-4 lg:py-5">
              <div className="lg:hidden w-9 h-9 rounded-[10px] bg-[#111] flex items-center justify-center text-white font-bold">◈</div>
              <div className="flex-1 max-w-[560px] relative group">
                <div className="h-[44px] bg-white border border-[#F0EDE8] rounded-full flex items-center px-4 gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] group-focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-focus-within:border-[#E8E2D8] transition-all">
                  <Search size={18} className="text-[#8E8E93] shrink-0" />
                  <input aria-label="Buscar nesta página" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={currentConfig.placeholder} className="flex-1 bg-transparent outline-none text-[13.5px] font-medium placeholder:text-[#A8A8AD] text-[#111]" />
                  <div className="flex items-center gap-2">
                    {search && <button aria-label="Limpar busca" onClick={() => setSearch("")} className="w-6 h-6 rounded-full bg-[#F6F2EB] flex items-center justify-center text-[#8E8E93] hover:text-[#111]"><X size={12} /></button>}
                    <div className="w-[1px] h-5 bg-[#F0EDE8]" />
                    <button aria-label="Filtros" onClick={() => pushToast("Use os filtros da página abaixo")} className="w-7 h-7 rounded-full hover:bg-[#F6F2EB] flex items-center justify-center text-[#8E8E93]"><Settings2 size={16} /></button>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-9 px-3 rounded-full bg-white border border-[#F0EDE8] flex items-center gap-2 text-[11px] font-medium text-[#8E8E93]"><div className="w-2 h-2 rounded-full bg-[#1BC47D]" />Perfil de exemplo</div>
                </div>
                <button
                  onClick={onAction}
                  aria-label={currentConfig.actionLabel}
                  className="h-10 lg:h-[44px] px-5 bg-[#111] text-white rounded-full flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] hover:bg-black transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                >
                  <currentConfig.actionIcon size={16} />
                  <span className="hidden sm:inline">{currentConfig.actionLabel}</span>
                </button>
              </div>
            </div>
          </header>);}
export function Footer(){return <footer className="max-w-[1480px] mx-auto px-4 lg:px-6 xl:px-8 pb-6 text-[11px] text-[#8E8E93] flex flex-wrap justify-between gap-2"><span>DEV ID · Identidade / Evidências / Oportunidades</span><span>Prévia com dados demonstrativos</span></footer>;}
