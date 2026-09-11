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

      {/* 3. "How LandslideGuard AI Works in 3 Simple Steps" (Student-friendly explainer) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            How The System Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-lg font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🌧️ Track Weather & Soil</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sensors on the hill measure how much rain has fallen and how wet the soil has become.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-lg font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🤖 AI Computes Risk (0-100%)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our safety algorithm checks if the hill is too steep and saturated. If risk is high, it flags danger.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-lg font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📢 Send Early Warning</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sends instant siren alerts and road closures 3+ hours in advance so villagers can move to safety.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Live Critical Danger Bulletin Bar */}
      {criticalAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase text-rose-400 tracking-wider">
                      ACTIVE EMERGENCY WARNING
                    </span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      HIGH RISK (92%)
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {criticalAlerts[0].title} — {criticalAlerts[0].location}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Continuous heavy rain detected. Soil is dangerously saturated on steep mountain slope.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActivePage('alerts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View All Alerts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenEmergencyModal}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Trigger Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Platform Capabilities Grid */}
      <FeaturesGrid setActivePage={setActivePage} />

      {/* 6. SIH 2026 Presentation Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0c182b] p-6 sm:p-10 border border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>National Early Warning Initiative</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Simple Technology Protecting Mountain Communities
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                LandslideGuard AI connects real-time weather forecasts with ground mountain sensors to detect danger before mudslides occur, helping save lives and keep mountain roads safe.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActivePage('prediction');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try AI Simulator</span>
                </button>
                <button
                  onClick={() => {
                    setActivePage('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Open Risk Map</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-2 w-full max-w-xs">
                <div className="text-3xl">🇮🇳</div>
                <h4 className="text-white font-bold text-sm">Made for Indian Mountains</h4>
                <p className="text-xs text-slate-400">
                  Ready for Western Ghats (Kerala), Uttarakhand, and Himachal Pradesh.
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Early Disaster Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
