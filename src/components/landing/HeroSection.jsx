import React from 'react';
import { Compass, BarChart3, ShieldAlert, Sparkles, Activity, CloudRain, Mountain, Radio, ArrowRight } from 'lucide-react';

export default function HeroSection({ setActivePage, onOpenEmergencyModal }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-8 pb-16">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mountain Silhouette SVG Background */}
        <div className="absolute bottom-0 inset-x-0 h-96 opacity-25">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full object-cover preserve-3d"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,224L60,197.3C120,171,240,117,360,122.7C480,128,600,192,720,202.7C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="#0e1b33"
              fillOpacity="0.8"
            />
            <path
              d="M0,288L80,266.7C160,245,320,203,480,197.3C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="#091124"
            />
          </svg>
        </div>

        {/* Floating Radar Grid Rings */}
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] rounded-full border border-cyan-500/15 pointer-events-none flex items-center justify-center animate-pulse-slow">
          <div className="w-[400px] h-[400px] rounded-full border border-cyan-500/20 flex items-center justify-center">
            <div className="w-[250px] h-[250px] rounded-full border border-cyan-500/30"></div>
          </div>
          {/* Sweeper Line */}
          <div className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400 origin-left animate-radar-sweep left-1/2 top-1/2"></div>
        </div>

        {/* Ambient colored lighting glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Hackathon Header Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>SMART INDIA HACKATHON (SIH 2026) PROTOTYPE</span>
              <span className="text-slate-400">|</span>
              <span className="text-white">Govt. Disaster AI Initiative</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans">
              AI-Powered Landslide <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400">
                Early Warning System
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl font-bold tracking-wide text-cyan-200/90 font-mono">
              Predict. Monitor. Alert. Protect Lives.
            </p>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              LandslideGuard AI uses environmental data, artificial intelligence, and real-time monitoring to identify landslide risks and provide early warnings to communities and authorities across vulnerable mountainous terrains.
            </p>

            {/* Two Primary CTAs + Emergency Button */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActivePage('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-slate-950" />
                <span>🚨 View Risk Map</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>📊 Explore Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('prediction');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>AI Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Risk Classification Legend Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-sans text-xs">Hazard Classification:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                🟢 LOW RISK (0–30)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
                🟡 MODERATE (31–50)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400">
                🟠 HIGH (51–75)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/40 text-rose-400 animate-pulse">
                🔴 CRITICAL (76–100)
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Telemetry HUD Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel-glow p-6 space-y-5 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)]">
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Live Geotechnical Telemetry
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  REAL-TIME STREAM
                </span>
              </div>

              {/* Station Highlight */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">PRIMARY CORRIDOR</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold animate-pulse">
                    🔴 CRITICAL (92%)
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Wayanad Meppadi Ridge (Sector 4)</h4>
                <p className="text-xs text-slate-400">
                  Subsurface pore saturation surpassed 94%. Immediate debris flow risk within 3h.
                </p>
              </div>

              {/* Quick Sensor Gauges Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>🌧️ Rainfall 24h</span>
                    <span className="text-rose-400 font-bold font-mono">184 mm</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-rose-500 h-full w-[85%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Threshold Exceeded</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>💧 Soil Moisture</span>
                    <span className="text-rose-400 font-bold font-mono">94%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-rose-500 h-full w-[94%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Pore Water Liquefaction</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>⛰️ Slope Incline</span>
                    <span className="text-orange-400 font-bold font-mono">48°</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[72%]" />
                  </div>
                  <span className="text-[10px] text-orange-400 font-mono mt-1 block">Steep Precipitous</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>⚡ Shear Shift</span>
                    <span className="text-rose-400 font-bold font-mono">14.8 mm</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[90%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-1 block">Accelerated Lateral Creep</span>
                </div>
              </div>

              {/* HUD Action buttons */}
              <div className="pt-1 flex gap-2">
                <button
                  onClick={onOpenEmergencyModal}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>TRIGGER STAGE-2 EVACUATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
