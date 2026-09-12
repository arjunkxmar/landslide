import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import StatsTicker from '../components/landing/StatsTicker';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import TerrainRiskVisualization from '../components/3d/TerrainRiskVisualization';
import { ACTIVE_ALERTS } from '../data/alertData';
import { AlertTriangle, ArrowRight, ShieldCheck, Zap, Compass, Sparkles, BarChart3 } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';

export default function LandingPage({ setActivePage, onOpenEmergencyModal }) {
  const criticalAlerts = ACTIVE_ALERTS.filter(a => a.riskLevel === 'CRITICAL');

  return (
    <div className="space-y-8">
      {/* 1. Hero Section with 3D Digital Mountain Terrain Background */}
      <HeroSection 
        setActivePage={setActivePage} 
        onOpenEmergencyModal={onOpenEmergencyModal} 
      />

      {/* 2. Key Telemetry Statistics Ticker with Animated Counters */}
      <StatsTicker />

      {/* 3. Interactive 3D Landslide Risk Terrain Explorer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono font-bold text-cyan-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D DIGITAL TWIN TERRAIN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Interactive Geotechnical Risk Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
              Explore 3D mountain slope quadrants color-coded by slope incline, soil saturation, and landslide probability.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActivePage('prediction');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-xl bg-[#151515] hover:bg-[#1a1a1a] border border-[#2a2a2a] text-xs font-mono font-bold text-[#E4E4E7] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <span>Run Stress Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <TerrainRiskVisualization />
      </div>

      {/* 4. "How LandslideGuard AI Works in 3 Critical Phases" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Fail-Safe Pipeline
          </span>
          <h2 className="text-2xl font-black text-white">
            Three-Stage Early Warning Architecture
          </h2>
          <p className="text-xs text-[#A1A1AA]">
            Continuous environmental telemetry to automated civil defense siren dispatch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#1f1f1f] hover:border-cyan-500/40 transition-all space-y-3 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-lg font-mono font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🌧️ Ingest Subsurface & Satellite Telemetry</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Automated rain gauges (ARG), Open-Meteo satellite precipitation, soil TDR volumetric moisture, and MEMS borehole tiltmeters stream live readings every 4 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#1f1f1f] hover:border-purple-500/40 transition-all space-y-3 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-lg font-mono font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🤖 AI Geotechnical Risk Engine</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Physics-informed equations compute the <strong>Factor of Safety (FoS)</strong>, hydraulic pore water pressure, and slope shear strain index calibrated over decades of disaster data.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#1f1f1f] hover:border-rose-500/40 transition-all space-y-3 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-lg font-mono font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📢 Autonomous Early Warning & Sirens</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              When risk crosses critical thresholds (75%+), synchronized 120 dB acoustic sirens sound across downstream hamlets and CAP-India cell broadcasts alert authorities 3+ hours in advance.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Live Critical Danger Bulletin Bar */}
      {criticalAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="p-5 rounded-3xl bg-[#190b0e] border border-rose-500/40 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5 animate-pulse shadow-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-rose-400 tracking-wider">
                      ACTIVE EMERGENCY GEO-ALERT
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white">
                      CRITICAL RISK (92%)
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {criticalAlerts[0].title} — {criticalAlerts[0].location}
                  </h3>
                  <p className="text-xs text-[#E4E4E7] mt-0.5">
                    Torrential downpour exceeded 180 mm/24h. Slope saturated beyond shear yield limit. Evacuation active.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setActivePage('alerts');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#2a2a2a] hover:border-[#3a3a3a] text-xs font-mono font-bold text-[#E4E4E7] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>View All Alerts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenEmergencyModal(criticalAlerts[0])}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
                >
                  Trigger Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Platform Capabilities Grid */}
      <FeaturesGrid setActivePage={setActivePage} />

      {/* 7. National Disaster Defense Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#141414] p-6 sm:p-10 border border-[#222222] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Geospatial Disaster Resilience</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Engineering Zero-Casualty Mountain Corridors
              </h3>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed max-w-2xl">
                LandslideGuard AI connects real-time weather forecasts with ground geotechnical IoT arrays to flag structural soil failure before mudslides trigger, empowering first responders and civil administration to save human lives.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActivePage('prediction');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try AI Simulator</span>
                </button>
                <button
                  onClick={() => {
                    setActivePage('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#161616] border border-[#2a2a2a] hover:border-cyan-500/50 text-white font-mono font-bold text-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Open Risk Map</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-[#080808] border border-[#1f1f1f] text-center space-y-2.5 w-full max-w-xs shadow-2xl">
                <div className="text-3xl">🏔️</div>
                <h4 className="text-white font-bold text-sm">Calibrated For High-Risk Zones</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Active in Western Ghats (Kerala, Nilgiris), Uttarakhand, and Himachal Pradesh corridors.
                </p>
                <div className="pt-2 border-t border-[#1c1c1c] text-xs text-emerald-400 font-mono font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NDMA Protocol Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

