import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  BarChart3, 
  Camera, 
  Compass, 
  Home, 
  Info, 
  Route, 
  ShieldAlert, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  X,
  Languages,
  ChevronRight,
  Activity,
  Layers,
  CheckCircle2,
  Cpu,
  Menu,
  Satellite,
  Radio,
  Sliders,
  TrendingUp,
  MapPin,
  ChevronLeft
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { TRANSLATIONS } from '../../utils/translations';

export default function Navbar({ activePage, setActivePage, onOpenEmergencyModal, currentLang = 'en', onToggleLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navGroups = [
    {
      groupTitle: 'MISSION COMMAND',
      items: [
        { 
          id: 'home', 
          label: t.home || 'Overview', 
          icon: Home,
          badge: null,
          desc: '3D Terrain & Mission Intel',
          color: 'text-cyan-400'
        },
        { 
          id: 'dashboard', 
          label: t.dashboard || 'Dashboard', 
          icon: BarChart3,
          badge: 'Live Stream',
          badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          desc: '148 IoT Sensors & Trajectory',
          color: 'text-emerald-400'
        },
        { 
          id: 'map', 
          label: t.map || 'Risk Map', 
          icon: Compass, 
          badge: 'GIS 3D', 
          badgeColor: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
          desc: 'Satellite & Topo Corridors',
          color: 'text-sky-400'
        },
        { 
          id: 'prediction', 
          label: t.prediction || 'AI Simulator', 
          icon: Sparkles,
          badge: 'ML Engine',
          badgeColor: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
          desc: 'Geotechnical Stress Testing',
          color: 'text-purple-400'
        }
      ]
    },
    {
      groupTitle: 'DISASTER PROTOCOLS',
      items: [
        { 
          id: 'alerts', 
          label: t.alerts || 'Alerts Console', 
          icon: AlertTriangle, 
          badge: '2 Critical', 
          badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse',
          desc: 'NDMA CAP-India Broadcasts',
          color: 'text-rose-400'
        },
        { 
          id: 'roads', 
          label: t.roads || 'Road Status', 
          icon: Route,
          badge: 'BRO Feed',
          badgeColor: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
          desc: 'Passability & Detour Routes',
          color: 'text-yellow-400'
        },
        { 
          id: 'report', 
          label: t.report || 'Citizen Report', 
          icon: Camera,
          badge: null,
          desc: 'Crowdsourced Field Geotags',
          color: 'text-amber-400'
        }
      ]
    },
    {
      groupTitle: 'INTELLIGENCE & SPECS',
      items: [
        { 
          id: 'analytics', 
          label: t.analytics || 'Analytics', 
          icon: TrendingUp,
          badge: null,
          desc: '10-Year GSI Benchmark Trends',
          color: 'text-cyan-400'
        },
        { 
          id: 'about', 
          label: t.about || 'System Info', 
          icon: Info, 
          badge: 'Presentation',
          badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
          desc: 'Architecture & Equations',
          color: 'text-slate-400'
        }
      ]
    }
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleToggleSiren = () => {
    const isNowPlaying = soundManager.toggleSiren();
    setSirenActive(isNowPlaying);
  };

  const handleNavClick = (id) => {
    soundManager?.playClick?.();
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* MOBILE TOP BAR (Only visible on screens smaller than lg) */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-xl border-b border-dark-border px-4 py-3 flex items-center justify-between shadow-2xl">
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Activity className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white font-display">LandslideGuard</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[9px] font-mono font-bold">
                AI
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPERATIONAL</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenEmergencyModal}
            className="px-2.5 py-1.5 rounded-lg bg-risk-critical text-white font-mono font-bold text-[10px] flex items-center gap-1 border border-rose-500/40"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-dark-card border border-dark-border text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* DESKTOP VERTICAL SIDEBAR NAVIGATION */}
      <aside 
        className={`hidden lg:flex flex-col flex-shrink-0 sticky top-0 h-screen bg-[#080808] border-r border-dark-border z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Sidebar Header Brand Area */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.35)] shrink-0 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-slate-950" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base text-white tracking-tight font-display truncate">
                    LandslideGuard
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                    AI 3D
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM OPERATIONAL</span>
                </div>
              </div>
            )}
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-dark-muted hover:text-white hover:bg-dark-card transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Vertical Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-mono uppercase font-bold text-dark-muted tracking-wider">
                  {group.groupTitle}
                </div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group relative ${
                        isActive
                          ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-white font-bold shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
                          : 'text-dark-muted hover:text-white hover:bg-dark-card/70 border-l-2 border-transparent'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-300' 
                          : 'bg-dark-bg text-dark-muted group-hover:text-cyan-400 group-hover:bg-dark-bg/80'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <div className="truncate">
                            <div className="text-xs font-semibold leading-tight">{item.label}</div>
                            <div className="text-[10px] text-dark-muted truncate mt-0.5">{item.desc}</div>
                          </div>

                          {item.badge && (
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ml-2 ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Active indicator dot when collapsed */}
                      {isCollapsed && isActive && (
                        <div className="absolute right-1 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Controls Area */}
        <div className="p-3 border-t border-dark-border bg-[#050505] space-y-2">
          {/* Siren Audio Toggle */}
          <button
            onClick={handleToggleSiren}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
              sirenActive
                ? 'bg-rose-500/15 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse'
                : 'bg-dark-card/60 border-dark-border text-dark-muted hover:text-white hover:bg-dark-card'
            }`}
            title="Toggle Evacuation Siren Sound"
          >
            {sirenActive ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
                {!isCollapsed && <span>SIREN ACTIVE</span>}
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-dark-muted shrink-0" />
                {!isCollapsed && <span>SIREN AUDIO MUTED</span>}
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-dark-card/60 border border-dark-border text-dark-muted hover:text-white text-xs font-mono transition-colors cursor-pointer"
            title="Toggle Language"
          >
            <Languages className="w-4 h-4 text-cyan-400 shrink-0" />
            {!isCollapsed && (
              <span className="flex-1 text-left flex items-center justify-between">
                <span>Language:</span>
                <span className="text-cyan-300 font-bold">{currentLang === 'en' ? 'English (EN)' : 'हिंदी (HI)'}</span>
              </span>
            )}
          </button>

          {/* Quick SOS Trigger Button */}
          <button
            onClick={() => {
              soundManager?.playAlert?.();
              onOpenEmergencyModal();
            }}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-rose-950/50 border border-rose-400/40 transition-all cursor-pointer ${
              isCollapsed ? 'p-2' : ''
            }`}
            title="Transmit Emergency CAP Broadcast"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>DISPATCH CAP ALERT</span>}
          </button>

          {!isCollapsed && (
            <div className="px-2 pt-1 text-[10px] font-mono text-dark-muted text-center flex items-center justify-center gap-2">
              <span className="flex items-center gap-1">
                <Satellite className="w-3 h-3 text-cyan-400" />
                <span>INSAT-3DR</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400">148 Nodes Synced</span>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE SLIDE-OUT VERTICAL DRAWER (Overlay on screens < lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fadeIn">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-out Vertical Drawer */}
          <div className="relative w-4/5 max-w-sm h-full bg-[#080808] border-r border-dark-border flex flex-col z-10 shadow-2xl animate-slideRight">
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                  <Activity className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white font-display">LandslideGuard AI</div>
                  <div className="text-[10px] text-emerald-400 font-mono">● LIVE MONITORING</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-dark-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Vertical Menu */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {navGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-2 pb-1 text-[10px] font-mono uppercase font-bold text-dark-muted tracking-wider">
                    {group.groupTitle}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                            isActive
                              ? 'bg-cyan-500/15 border-l-2 border-cyan-400 text-white font-bold'
                              : 'text-dark-muted hover:text-white hover:bg-dark-card'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-dark-muted'}`} />
                            <div>
                              <div className="text-xs font-semibold">{item.label}</div>
                              <div className="text-[10px] text-dark-muted">{item.desc}</div>
                            </div>
                          </div>

                          {item.badge && (
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-dark-border bg-[#050505] space-y-2.5">
              <button
                onClick={handleToggleSiren}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold border ${
                  sirenActive ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-dark-card border-dark-border text-dark-muted'
                }`}
              >
                {sirenActive ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4" />}
                <span>{sirenActive ? 'SIREN ACTIVE' : 'SIREN MUTED'}</span>
              </button>

              <button
                onClick={onToggleLang}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border text-xs font-mono text-slate-300"
              >
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>Language: {currentLang === 'en' ? 'English' : 'हिंदी'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmergencyModal();
                }}
                className="w-full py-2.5 rounded-xl bg-risk-critical text-white font-mono font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>DISPATCH CAP ALERT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
