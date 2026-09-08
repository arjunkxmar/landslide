import React from 'react';
import { 
  Compass, 
  Sparkles, 
  BarChart3, 
  AlertTriangle, 
  Camera, 
  Route, 
  Layers, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function FeaturesGrid({ setActivePage }) {
  const features = [
    {
      page: 'map',
      title: 'Interactive GIS Risk Map',
      badge: 'Live Geospatial Engine',
      description: 'Explore multi-layer interactive maps with real-time hazard markers, station telemetries, and danger zones across Himalayan and Western Ghats corridors.',
      icon: Compass,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      actionText: 'Explore GIS Map'
    },
    {
      page: 'prediction',
      title: 'AI Risk Prediction Engine',
      badge: 'Interactive Simulator',
      description: 'Run environmental simulations with rainfall intensity, slope angles, soil saturation %, and historical landslide baselines to compute real-time hazard scores.',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50',
      actionText: 'Test AI Simulator'
    },
    {
      page: 'dashboard',
      title: 'Real-Time Telemetry Dashboard',
      badge: 'IoT Sensor Mesh',
      description: 'Continuous monitoring of pore water pressure, soil volumetric water content, acoustic rockfall emissions, and tipping bucket precipitation counters.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50',
      actionText: 'View Telemetry Feeds'
    },
    {
      page: 'alerts',
      title: 'Early Warning & CAP Dispatch',
      badge: 'Emergency Command',
      description: 'Standardized Common Alerting Protocol (CAP-India) broadcast dispatch to District Emergency Operation Centers, NDRF battalions, and municipal sirens.',
      icon: AlertTriangle,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-400',
      borderColor: 'hover:border-rose-500/50',
      actionText: 'Open Alert Center'
    },
    {
      page: 'report',
      title: 'Citizen Incident Reporting',
      badge: 'Crowdsourced Intelligence',
      description: 'Empowers field rangers and residents to submit ground crack sightings, falling rock notices, and road slips with auto-GPS coordinates and photo verification.',
      icon: Camera,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      actionText: 'Report an Incident'
    },
    {
      page: 'roads',
      title: 'Mountain Road Transit Monitor',
      badge: 'Smart Arterial Routing',
      description: 'Monitors vital ghat highways (NH-10, NH-58, SH-4), flags road collapses, and provides dynamic alternative bypass routes with travel time penalties.',
      icon: Route,
      color: 'from-sky-500 to-cyan-600',
      textColor: 'text-sky-400',
      borderColor: 'hover:border-sky-500/50',
      actionText: 'Check Road Status'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTEGRATED DISASTER MITIGATION ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            End-to-End Early Warning Architecture
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered to fulfill Smart India Hackathon (SIH 2026) objectives: turning raw geotechnical and meteorological sensor data into actionable, life-saving community advisories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl glass-panel p-6 border border-slate-800/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${feat.borderColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} p-0.5 shadow-lg flex items-center justify-center`}>
                      <div className="w-full h-full bg-slate-950/70 rounded-[10px] flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${feat.textColor}`} />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => {
                      setActivePage(feat.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wide ${feat.textColor} group-hover:underline cursor-pointer`}
                  >
                    <span>{feat.actionText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
