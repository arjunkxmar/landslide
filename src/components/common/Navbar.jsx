import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BarChart3, 
  Camera, 
  Compass, 
  Home, 
  Info, 
  Menu, 
  Route, 
  ShieldAlert, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  X,
  Languages,
  Radio
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { TRANSLATIONS } from '../../utils/translations';

export default function Navbar({ activePage, setActivePage, onOpenEmergencyModal, currentLang = 'en', onToggleLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'map', label: t.map, icon: Compass, badge: 'Live GIS' },
    { id: 'prediction', label: t.prediction, icon: Sparkles },
    { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
    { id: 'alerts', label: t.alerts, icon: AlertTriangle, badge: '2 Critical', badgeColor: 'bg-rose-500 text-white animate-pulse' },
    { id: 'report', label: t.report, icon: Camera },
    { id: 'roads', label: t.roads, icon: Route },
    { id: 'analytics', label: t.analytics, icon: BarChart3 },
    { id: 'about', label: t.about, icon: Info, badge: 'SIH 2026' }
  ];

  const handleToggleSiren = () => {
    const isNowPlaying = soundManager.toggleSiren();
    setSirenActive(isNowPlaying);
  };

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
          <span className="text-slate-400">SIH 2026 Edition</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-rose-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🌄</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070b14]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors font-sans">
                  {t.brandName} <span className="text-cyan-400 font-mono">AI</span>
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Toggle (EN / हिन्दी) */}
            <button
              onClick={onToggleLang}
              title="Toggle English / Hindi language"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">{currentLang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Siren Toggle with Animated Equalizer Bars */}
            <button
              onClick={handleToggleSiren}
              title={sirenActive ? 'Silence Emergency Siren' : 'Test Emergency Siren Warning'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
                sirenActive
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-[0_0_18px_rgba(239,68,68,0.7)]'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
              }`}
            >
              {sirenActive ? (
                <>
                  {/* Waveform Equalizer animation */}
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
                  <span className="hidden xl:inline">{t.testSiren}</span>
                </>
              )}
            </button>

            {/* Quick Emergency Broadcast Modal Trigger */}
            <button
              onClick={onOpenEmergencyModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.dispatch}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-cyan-400"
            >
              {currentLang === 'en' ? 'हि' : 'EN'}
            </button>
            <button
              onClick={onOpenEmergencyModal}
              className="p-2 rounded-lg bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-bold"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090f1d]/98 px-4 pt-3 pb-5 space-y-1.5 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-semibold ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={handleToggleSiren}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border ${
                sirenActive
                  ? 'bg-rose-600 text-white border-rose-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              {sirenActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{sirenActive ? 'MUTE SIREN' : 'TEST SIREN'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergencyModal();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>EMERGENCY DISPATCH</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
