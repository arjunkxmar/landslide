import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import StatsTicker from '../components/landing/StatsTicker';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import { ACTIVE_ALERTS } from '../data/alertData';
import { AlertTriangle, ArrowRight, ShieldCheck, Zap, Compass, Sparkles } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';

export default function LandingPage({ setActivePage, onOpenEmergencyModal }) {
  const criticalAlerts = ACTIVE_ALERTS.filter(a => a.riskLevel === 'CRITICAL');

  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <HeroSection 
        setActivePage={setActivePage} 
        onOpenEmergencyModal={onOpenEmergencyModal} 
      />

      {/* 2. Key Statistics Ticker */}
      <StatsTicker />

      {/* 3. Live Critical Danger Bulletin Bar */}
      {criticalAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-5 rounded-2xl glass-critical-glow border border-rose-500/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-rose-400">
                      HIGH URGENCY ACTION NOTICE
                    </span>
                    <RiskBadge level="CRITICAL" score={92} size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {criticalAlerts[0].title} — {criticalAlerts[0].location}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {criticalAlerts[0].headline} Pore pressure critical at 142 kPa.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setActivePage('alerts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View All Alerts ({ACTIVE_ALERTS.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenEmergencyModal}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                >
                  Dispatch CAP Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Platform Capabilities Grid */}
      <FeaturesGrid setActivePage={setActivePage} />

      {/* 5. SIH 2026 Presentation Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl glass-panel-glow p-8 sm:p-12 relative overflow-hidden border border-cyan-500/30">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>SMART INDIA HACKATHON 2026 PITCH READY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Designed for Disaster Management Authorities & Village Panchayats
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                LandslideGuard AI bridges the critical gap between high-level meteorological forecasts and localized, ground-truth geotechnical slope stability. With real-time sensor analytics, automated citizen verification, and road blockage routing, our platform saves lives when minutes count.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setActivePage('prediction');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test Live AI Prediction Engine</span>
                </button>
                <button
                  onClick={() => {
                    setActivePage('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Launch Live Risk Map</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3 w-full max-w-sm">
                <div className="text-4xl">🇮🇳</div>
                <h4 className="text-white font-bold text-base">Make In India Geotech AI</h4>
                <p className="text-xs text-slate-400">
                  Developed for deployment in Uttarakhand, Himachal Pradesh, Kerala, Sikkim, and the Western Ghats.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sendai Target G Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
