import { useEffect, useState, useMemo } from "react";
import {
  Search, Plus, Settings2, LayoutDashboard, User, Briefcase, Layers, Folder, FileStack,
  Plug2, Compass, BarChart3, Settings, Share2, Pencil, Link2, MoreHorizontal,
  Check, Sparkles, Clock, ShieldCheck, X, Zap, ChevronDown, Download, Users, TrendingUp,
  ArrowUpRight, FileText, Building2, GripVertical, Dna, Verified, Link as LinkIcon, Lightbulb,
  GitBranch, Database, Globe, Server, Box, Wrench, Smartphone, Code2, Terminal, Cpu, Eye, ExternalLink,
  AlertTriangle, BookOpen, Flame, Star, MapPin, Mail, Phone, Globe2,
  CalendarDays, Award, GraduationCap, Trophy, BriefcaseBusiness, Rocket, Palette, Monitor, Lock,
  Bell, EyeOff, Image as ImageIcon, LayoutGrid, List, Copy, Trash2, Edit3, Save, ChevronRight, ChevronLeft,
  Filter, Heart, Bookmark, MessageSquare, DollarSign, Target, Activity, PieChart, BarChart, LineChart,
  ArrowUp, ArrowDown, Layers3, FileCheck, Paintbrush, Type, Languages, Sun, Moon, Smartphone as PhoneIcon,
  LayoutTemplate, Brush, Globe as GlobeIcon, Shield, UserCheck, Workflow, GitCommit, Package,
  Play, Pause, RotateCcw, Send, CheckCircle2, AlertCircle, Info, Crown, Gem
} from "lucide-react";

export function RadarChart({ hoveredIdx, setHoveredIdx }: { hoveredIdx: number | null; setHoveredIdx: (n: number | null) => void }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 96;
  const axes = [
    { label: "Frontend", value: 88 },
    { label: "Backend", value: 78 },
    { label: "DevOps", value: 71 },
    { label: "Data", value: 54 },
    { label: "Mobile", value: 42 },
    { label: "Tools", value: 84 },
  ];
  const angleStep = (Math.PI * 2) / axes.length;
  const points = axes.map((a, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (a.value / 100) * maxR;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, value: a.value };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(" ");
  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {[20, 40, 60, 80, 100].map((lvl) => {
          const pts = axes.map((_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const r = (lvl / 100) * maxR;
            return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
          }).join(" ");
          return <polygon key={lvl} points={pts} fill="none" stroke="#F0EDE8" strokeWidth={lvl === 100 ? 1.2 : 0.8} strokeDasharray={lvl !== 100 ? "3 4" : undefined} />;
        })}
        {axes.map((_, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const x = cx + Math.cos(angle) * maxR;
          const y = cy + Math.sin(angle) * maxR;
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#EDE8E2" strokeWidth="1" />;
        })}
        <polygon points={polygon} fill="rgba(17,17,17,0.08)" stroke="#111" strokeWidth="2.2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer">
            {hoveredIdx === i && <circle cx={p.x} cy={p.y} r="14" fill="#111" opacity={0.08} />}
            <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? 6 : 4.5} fill="#111" stroke="white" strokeWidth="2" />
          </g>
        ))}
        {axes.map((a, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const r = maxR + 22;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return <text key={a.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" letterSpacing="0.04em" fill={hoveredIdx === i ? "#111" : "#8E8E93"}>{a.label.toUpperCase()}</text>;
        })}
      </svg>
      {hoveredIdx !== null && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[68%] mt-2 bg-[#111] text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-2">
          <span>{axes[hoveredIdx].label}</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded-full">{axes[hoveredIdx].value}% • Senior</span>
        </div>
      )}
    </div>
  );
}

export function ProjectArt({ pattern, color }: { pattern: string; color: string }) {
  return (
    <div className="w-full h-[168px] rounded-[18px] overflow-hidden relative" style={{ background: color }}>
      <div className="absolute inset-0 opacity-20">
        {pattern === "orbit" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <circle cx="60" cy="40" r="28" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="60" cy="40" r="16" fill="white" />
            <path d="M100 30 L160 90 L40 90 Z" fill="none" stroke="white" strokeWidth="1.5" />
            <rect x="120" y="20" width="32" height="32" rx="6" fill="white" opacity="0.9" />
          </svg>
        )}
        {pattern === "gateway" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="20" y="20" width="160" height="8" rx="4" fill="white" />
            <rect x="20" y="40" width="120" height="8" rx="4" fill="white" opacity="0.7" />
            <rect x="20" y="60" width="100" height="8" rx="4" fill="white" opacity="0.5" />
            <circle cx="160" cy="80" r="20" fill="none" stroke="white" strokeWidth="2" />
            <path d="M150 80 L170 80 M160 70 L160 90" stroke="white" strokeWidth="2" />
          </svg>
        )}
        {pattern !== "orbit" && pattern !== "gateway" && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="12" fill="white" opacity="0.8" />
            <circle cx="130" cy="40" r="24" fill="white" opacity="0.9" />
            <path d="M20 100 L180 100" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        )}
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="h-6 px-2.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold text-[#111] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#1BC47D] animate-pulse" />Live</span>
        <span className="h-6 px-2.5 rounded-full bg-[#111]/80 backdrop-blur text-[10px] font-bold text-white flex items-center gap-1"><Star size={10} />2.3k</span>
      </div>
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><ArrowUpRight size={16} /></div>
    </div>
  );
}
