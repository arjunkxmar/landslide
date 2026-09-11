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
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { TRANSLATIONS } from '../../utils/translations';

export default function Navbar({ activePage, setActivePage, onOpenEmergencyModal, currentLang = 'en', onToggleLang }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navItems = [
    { 
      id: 'home', 
      label: t.home, 
      icon: Home,
      desc: currentLang === 'hi' ? 'मुख्य अवलोकन और वास्तविक समय की स्थिति' : 'Mission control overview & threat summary',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    { 
      id: 'map', 
      label: t.map, 
      icon: Compass, 
      badge: 'Live GIS', 
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      desc: currentLang === 'hi' ? 'भू-स्थानिक जोखिम मानचित्र व सैटेलाइट डेटा' : 'Interactive GIS risk map with satellite layers',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    },
    { 
      id: 'prediction', 
      label: t.prediction, 
      icon: Sparkles,
      badge: 'Simulator',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      desc: currentLang === 'hi' ? 'सुरक्षा कारक (Fs) और संवेदनशीलता सिमुलेटर' : 'Geotechnical Factor of Safety & stress testing',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    },
    { 
      id: 'dashboard', 
      label: t.dashboard, 
      icon: BarChart3,
      badge: '148 Stations',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      desc: currentLang === 'hi' ? 'लाइव बोरहोल और मौसम टेलीमेट्री फीड' : 'Real-time IoT telemetry & sensor health',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    { 
      id: 'alerts', 
      label: t.alerts, 
      icon: AlertTriangle, 
      badge: '2 Critical', 
      badgeColor: 'bg-rose-500 text-white animate-pulse',
      desc: currentLang === 'hi' ? 'एनडीएमए और प्रारंभिक चेतावनी प्रोटोकॉल' : 'NDMA / Sendai framework early warnings & sirens',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    },
    { 
      id: 'report', 
      label: t.report, 
      icon: Camera,
      desc: currentLang === 'hi' ? 'नागरिक घटना रिपोर्टिंग और फोटो अपलोड' : 'Crowdsourced citizen incident reporting portal',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    { 
      id: 'roads', 
      label: t.roads, 
      icon: Route,
      badge: 'NH Watch',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      desc: currentLang === 'hi' ? 'पहाड़ी मार्ग अवरोध और डायवर्जन स्थिति' : 'Mountain corridor passability & bypass routes',
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    },
    { 
      id: 'analytics', 
      label: t.analytics, 
      icon: BarChart3,
      desc: currentLang === 'hi' ? 'ऐतिहासिक रुझान और बारिश-विस्थापन विश्लेषण' : 'Historical trends and seasonal risk correlation',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    { 
      id: 'about', 
      label: t.about, 
      icon: Info, 
      desc: currentLang === 'hi' ? 'भौतिकी सूत्र, पद्धति और वास्तुकला' : 'Geotechnical equations, system architecture & team',
      color: 'text-slate-400 bg-slate-800 border-slate-700'
    }
  ];

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const handleToggleSiren = () => {
    const isNowPlaying = soundManager.toggleSiren();
    setSirenActive(isNowPlaying);
  };

  const handleNavClick = (id) => {
    setActivePage(id);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentItem = navItems.find(item => item.id === activePage) || navItems[0];
  const CurrentIcon = currentItem.icon;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-xl transition-all">
        {/* Top Banner: Emergency Ticker */}
        <div className="w-full bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/60 border-b border-rose-500/20 px-4 py-1 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-mono font-bold text-rose-400 uppercase tracking-wider text-[11px]">
              {currentLang === 'hi' ? 'आपदा अलर्ट:' : 'Active Geo-Alert:'}
            </span>
            <span className="text-slate-300 text-[11px] truncate">
              {t.emergencyNotice}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] font-mono shrink-0 pl-4">
            <span className="text-cyan-400">● 148 IoT Stations Online</span>
            <span className="text-emerald-400">Active Warning Network</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Side: "Three -" Menu Button & Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Three Horizontal Lines ("Three -") Features Menu Trigger Button */}
              <button
                id="three-lines-menu-button"
                onClick={() => setDrawerOpen(true)}
                className="relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.35)] text-white transition-all duration-200 cursor-pointer group shrink-0"
                title={t.exploreFeatures || 'Explore Features'}
                aria-label="Open Features Menu"
              >
                {/* Visual "Three -" Lines (3 horizontal bars) */}
                <div className="flex flex-col justify-center gap-[4px] w-4 sm:w-5 py-0.5" aria-hidden="true">
                  <span className="w-full h-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 group-hover:bg-cyan-300"></span>
                  <span className="w-3/4 h-[2.5px] bg-slate-300 rounded-full transition-all duration-200 group-hover:w-full group-hover:bg-cyan-300"></span>
                  <span className="w-full h-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 group-hover:bg-cyan-300"></span>
                </div>

                <span className="text-xs font-bold tracking-wide text-slate-100 group-hover:text-cyan-300 hidden xs:inline">
                  {currentLang === 'hi' ? 'सुविधाएं' : 'Features'}
                </span>

                {/* Pulsing alert indicator badge */}
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>

              {/* Brand Logo & Tagline */}
              <div 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
              >
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-rose-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
                  <span className="text-xl sm:text-2xl transform group-hover:scale-110 transition-transform duration-300">🌄</span>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070b14]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors font-sans">
                      {t.brandName} <span className="text-cyan-400 font-mono">AI</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                    {t.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Active Section Indicator Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-inner">
              <span className="text-slate-500 text-[11px] font-mono uppercase tracking-wider">
                {t.activeSection || 'Section'}:
              </span>
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <CurrentIcon className="w-3.5 h-3.5" />
                <span>{currentItem.label}</span>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={onToggleLang}
                title="Toggle English / Hindi language"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold">{currentLang === 'en' ? 'हिन्दी' : 'EN'}</span>
              </button>

              {/* Siren Toggle */}
              <button
                onClick={handleToggleSiren}
                title={sirenActive ? 'Silence Emergency Siren' : 'Test Emergency Siren Warning'}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                  sirenActive
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-[0_0_18px_rgba(239,68,68,0.7)]'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                {sirenActive ? (
                  <>
                    <div className="flex items-end gap-0.5 h-3 w-3">
                      <span className="w-0.5 bg-white h-2 animate-pulse" />
                      <span className="w-0.5 bg-white h-3 animate-bounce" />
                      <span className="w-0.5 bg-white h-1.5 animate-pulse" />
                    </div>
                    <span>{t.sirenOn}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden lg:inline">{t.testSiren}</span>
                  </>
                )}
              </button>

              {/* Emergency Dispatch Button */}
              <button
                onClick={onOpenEmergencyModal}
                title="Open Emergency Command Dispatch"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.dispatch}</span>
                <span className="sm:hidden">SOS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Vertical Features Drawer (Slides in from Left) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          />

          {/* Left-Side Vertical Slide-in Panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-6 sm:pr-10">
            <aside className="w-screen max-w-md bg-[#080d19]/98 border-r border-slate-800 shadow-2xl flex flex-col backdrop-blur-2xl transition-transform duration-300">
              
              {/* Drawer Top Header */}
              <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-rose-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                    <Layers className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <span>{t.featuresMenu || 'Features & Navigation'}</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {currentLang === 'hi' ? 'भूस्खलन निगरानी व आपदा नियंत्रण' : 'Geotechnical Risk Intelligence'}
                    </p>
                  </div>
                </div>

                {/* Close Button (X) */}
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
                  title={t.closeMenu || 'Close Menu'}
                  aria-label="Close features drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Telemetry Status Strip */}
              <div className="px-5 py-2 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-900/40 border-b border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  148 IoT Stations Active
                </span>
                <span className="text-slate-400">Scroll to view all</span>
              </div>

              {/* Scrollable Vertical Features Container */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full group text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-950/50 to-slate-900/90 border-cyan-500/50 shadow-[0_0_18px_rgba(6,182,212,0.18)]'
                          : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                      }`}
                    >
                      {/* Active indicator accent bar */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_10px_#06b6d4]" />
                      )}

                      {/* Feature Icon box */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        isActive 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                          : item.color
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Feature Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold tracking-tight truncate ${
                            isActive ? 'text-white' : 'text-slate-200 group-hover:text-cyan-300'
                          }`}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                              item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>

                      {/* Right Indicator / Chevron */}
                      <div className="shrink-0 pl-1">
                        {isActive ? (
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Bottom Action Controls */}
              <div className="p-4 border-t border-slate-800/90 bg-slate-900/80 space-y-2.5">
                <div className="flex gap-2">
                  {/* Test Siren Button in Drawer */}
                  <button
                    onClick={handleToggleSiren}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      sirenActive
                        ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    {sirenActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                    <span>{sirenActive ? t.sirenOn : t.testSiren}</span>
                  </button>

                  {/* Language Switcher in Drawer */}
                  <button
                    onClick={onToggleLang}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
                  >
                    <Languages className="w-4 h-4 text-cyan-400" />
                    <span>{currentLang === 'en' ? 'हिन्दी' : 'English'}</span>
                  </button>
                </div>

                {/* Emergency Dispatch Button in Drawer */}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenEmergencyModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-[0_0_18px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>EMERGENCY DISPATCH PROTOCOL</span>
                </button>
              </div>

            </aside>
          </div>
        </div>
      )}
    </>
  );
}

