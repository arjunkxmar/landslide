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
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function HeroSection({ setActivePage, onOpenEmergencyModal }) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-6 pb-12">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mountain Silhouette SVG Background */}
        <div className="absolute bottom-0 inset-x-0 h-96 opacity-25">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full object-cover"
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

        {/* Floating Radar Grid Rings & Sweeper Line */}
        <div className="absolute -top-28 right-6 sm:right-14 w-[520px] h-[520px] rounded-full border border-cyan-500/15 pointer-events-none flex items-center justify-center animate-pulse-slow">
          <div className="w-[380px] h-[380px] rounded-full border border-cyan-500/20 flex items-center justify-center">
            <div className="w-[240px] h-[240px] rounded-full border border-cyan-500/30"></div>
          </div>
          {/* Rotating Radar Sweeper Line */}
          <div className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400 origin-left animate-radar-sweep left-1/2 top-1/2"></div>
        </div>

        {/* Ambient subtle glow lights */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Simple & Clear Problem + Solution Text */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Project Tag Badge (No SIH) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI Early Warning System</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Disaster Safety Initiative</span>
            </div>

            {/* Main Headline (Clear & Impactful) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Predicting Mountain Landslides <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400">
                Before They Happen
              </span>
            </h1>

            {/* Simple Subtitle in plain English */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              When heavy rains soak steep mountain slopes, soil becomes weak and slides down. 
              <span className="text-cyan-300 font-medium"> LandslideGuard AI</span> checks rain levels, soil wetness, and hill steepness to give early warnings so people can evacuate safely.
            </p>

            {/* 3 Simple Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActivePage('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Open Risk Map</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('prediction');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Try AI Simulator</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('alerts');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-sm transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>View Alerts (2 Active)</span>
              </button>
            </div>

            {/* Clean, Simple Risk Classification Legend */}
            <div className="pt-3">
              <span className="text-xs text-slate-400 font-medium block mb-2">
                Simple Risk Levels (0% to 100%):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <div>
                    <strong className="block text-[11px]">0 - 30% Safe</strong>
                    <span className="text-[10px] text-slate-400">Normal weather</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                  <div>
                    <strong className="block text-[11px]">31 - 50% Watch</strong>
                    <span className="text-[10px] text-slate-400">Light watch</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></span>
                  <div>
                    <strong className="block text-[11px]">51 - 75% High</strong>
                    <span className="text-[10px] text-slate-400">Drive carefully</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping shrink-0"></span>
                  <div>
                    <strong className="block text-[11px]">76 - 100% Danger</strong>
                    <span className="text-[10px] text-slate-400">Evacuate area</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Medium-Simple Live Mountain Station Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel-glow p-5 sm:p-6 space-y-4 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)]">
              
              {/* Card Header: Simple & Easy to understand */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Mountain Station Status
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Live Sensor Feed
                </span>
              </div>

              {/* Active Station Summary */}
              <div className="p-3.5 rounded-xl bg-[#0a1020] border border-rose-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Wayanad Hills (Sector 4, Kerala)</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-sm">
                    DANGER: 92%
                  </span>
                </div>
                <p className="text-xs text-rose-300/90 leading-normal">
                  ⚠️ Heavy rain has soaked the steep mountain slope. High probability of rocks and mud slipping downhill.
                </p>
              </div>

              {/* 4 Simple Sensor Readings with Easy Explanations */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* 1. Rainfall */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                      24h Rainfall
                    </span>
                    <span className="text-rose-400 font-bold font-mono">184 mm</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[85%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-medium mt-1 block">Heavy Downpour</span>
                </div>

                {/* 2. Soil Moisture */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      Soil Wetness
                    </span>
                    <span className="text-rose-400 font-bold font-mono">94%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[94%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-medium mt-1 block">Very Wet Mud</span>
                </div>

                {/* 3. Mountain Slope */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5 text-amber-400" />
                      Slope Angle
                    </span>
                    <span className="text-amber-400 font-bold font-mono">48°</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[70%]" />
                  </div>
                  <span className="text-[10px] text-amber-400 font-medium mt-1 block">Steep Hill</span>
                </div>

                {/* 4. Ground Movement */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Ground Shift
                    </span>
                    <span className="text-rose-400 font-bold font-mono">14.8 mm</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[80%]" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-medium mt-1 block">Shift Detected</span>
                </div>

              </div>

              {/* Recommended Action Box */}
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200">
                <strong className="text-white block font-bold mb-0.5">📢 Recommended Action:</strong>
                Warn residents living near lower slopes and avoid travelling on mountain roads.
              </div>

              {/* Emergency Modal Button */}
              <button
                onClick={onOpenEmergencyModal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>SEND EMERGENCY ALERT NOTICE</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

