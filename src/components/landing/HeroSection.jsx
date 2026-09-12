import React from 'react';
import { 
  Compass, 
  BarChart3, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight,
  CloudRain,
  Mountain,
  Droplets,
  AlertTriangle,
  Radio,
  Activity,
  ChevronRight
} from 'lucide-react';
import HeroTerrainScene from '../3d/HeroTerrainScene';

export default function HeroSection({ setActivePage, onOpenEmergencyModal }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-4 pb-14">
      {/* 1. Interactive 3D Mountain Terrain Background Scene */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-85">
        <HeroTerrainScene className="w-full h-full" />
        {/* Soft gradient masks for cinematic depth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/80" />
      </div>

      {/* Floating Radar Grid Rings & Sweeper Line (Decorative Cybernetic Accent) */}
      <div className="absolute -top-24 -right-16 sm:right-10 w-[480px] h-[480px] rounded-full border border-cyan-500/10 pointer-events-none flex items-center justify-center animate-pulse-slow">
        <div className="w-[340px] h-[340px] rounded-full border border-cyan-500/15 flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/20" />
        </div>
        <div className="absolute w-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400 origin-left animate-radar-sweep left-1/2 top-1/2" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Mission Intelligence */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Operational Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111111]/90 border border-[#222222] text-[#E4E4E7] text-xs font-mono shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-bold text-emerald-400">● SYSTEM OPERATIONAL</span>
              <span className="text-[#52525B]">•</span>
              <span className="text-[#A1A1AA]">Geotechnical Threat Ingestion Active</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                LandslideGuard <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400">AI</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#E4E4E7] tracking-tight">
                AI-Powered Landslide Risk Monitoring & Early Warning
              </p>
            </div>

            {/* Short Project Description */}
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
              Real-time geotechnical intelligence platform combining live atmospheric satellite feeds with ground inclinometers, pore piezometers, and AI slope physics to predict hazardous mountain landslides hours before failure.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* Primary CTA */}
              <button
                onClick={() => {
                  setActivePage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-slate-950" />
                <span>Open Risk Dashboard</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  setActivePage('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#111111] hover:bg-[#161616] border border-[#262626] hover:border-cyan-500/50 text-[#E4E4E7] hover:text-white font-mono font-bold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Explore Risk Map</span>
              </button>

              {/* Alerts Button */}
              <button
                onClick={() => {
                  setActivePage('alerts');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono font-semibold text-xs transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>Active Alerts (2)</span>
              </button>
            </div>

            {/* Risk Classification Legend */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase text-[#71717A] tracking-wider block mb-2 font-bold">
                Standard Hazard Classification Scale:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-[#0f1914] border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-[11px]">0-30% LOW</strong>
                    <span className="text-[10px] text-[#71717A]">Normal conditions</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#19150a] border border-amber-500/30 text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-[11px]">31-50% MODERATE</strong>
                    <span className="text-[10px] text-[#71717A]">Pore watch</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#19100a] border border-orange-500/30 text-orange-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <div>
                    <strong className="block text-[11px]">51-75% HIGH</strong>
                    <span className="text-[10px] text-[#71717A]">Soil strain creep</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-[#1c0c0e] border border-rose-500/40 text-rose-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping shrink-0" />
                  <div>
                    <strong className="block text-[11px]">76-100% CRITICAL</strong>
                    <span className="text-[10px] text-[#71717A]">Evacuate sector</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Telemetry HUD Station Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0d0d0d]/95 backdrop-blur-2xl p-5 sm:p-6 space-y-4 border border-[#222222] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.1)]">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Critical Monitoring Station Feed
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Ingestion
                </span>
              </div>

              {/* Active Station Summary */}
              <div className="p-3.5 rounded-xl bg-[#141414] border border-rose-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Wayanad Meppadi Ridge (Sector 4)</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-sm">
                    CRITICAL: 92%
                  </span>
                </div>
                <p className="text-xs text-rose-300 leading-normal">
                  ⚠️ Rainfall exceeds critical slip threshold. Overburden colluvium has reached saturated yield point.
                </p>
              </div>

              {/* 4 Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* 1. Rainfall */}
                <div className="p-3 rounded-xl bg-[#111111] border border-[#1f1f1f]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#71717A] font-mono text-[11px] flex items-center gap-1">
                      <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                      24h Rain
                    </span>
                    <span className="text-rose-400 font-bold font-mono">184 mm</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[88%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Cloudburst Exceeded</span>
                </div>

                {/* 2. Soil Wetness */}
                <div className="p-3 rounded-xl bg-[#111111] border border-[#1f1f1f]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#71717A] font-mono text-[11px] flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      Soil Moisture
                    </span>
                    <span className="text-rose-400 font-bold font-mono">94%</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[94%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Full Liquefaction</span>
                </div>

                {/* 3. Mountain Slope */}
                <div className="p-3 rounded-xl bg-[#111111] border border-[#1f1f1f]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#71717A] font-mono text-[11px] flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5 text-amber-400" />
                      Slope Incline
                    </span>
                    <span className="text-amber-400 font-bold font-mono">48°</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[70%]" />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono mt-1 block">Steep Escarpment</span>
                </div>

                {/* 4. Ground Displacement */}
                <div className="p-3 rounded-xl bg-[#111111] border border-[#1f1f1f]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#71717A] font-mono text-[11px] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Inclinometer
                    </span>
                    <span className="text-rose-400 font-bold font-mono">14.8 mm</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[80%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Lateral Shear Creep</span>
                </div>

              </div>

              {/* Action Box */}
              <div className="p-3 rounded-xl bg-[#190c0e] border border-rose-500/30 text-xs text-rose-200 font-mono">
                <strong className="text-white block font-bold mb-0.5">📢 CIVIL DEFENSE ACTION:</strong>
                Evacuate downstream settlements along Chooralmala drainage line.
              </div>

              {/* Dispatch Button */}
              <button
                onClick={onOpenEmergencyModal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-rose-950/60 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>INITIATE EMERGENCY DISPATCH NOTIFICATION</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


