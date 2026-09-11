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
      title: 'Interactive Live Map',
      badge: 'Visual Map',
      description: 'View mountains across India with clear color pins: Green for safe areas and Red for high danger zones.',
      icon: Compass,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      actionText: 'Open Live Map'
    },
    {
      page: 'prediction',
      title: 'AI Risk Simulator',
      badge: 'Try Sliders',
      description: 'Test what happens during heavy rain: adjust the rainfall and hill angle sliders to calculate the risk score.',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50',
      actionText: 'Test Simulator'
    },
    {
      page: 'dashboard',
      title: 'Sensor Dashboard',
      badge: 'Live Data',
      description: 'Check live numbers from mountain stations: see current rainfall, temperature, soil moisture, and ground stability.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50',
      actionText: 'View Stations'
    },
    {
      page: 'alerts',
      title: 'Disaster Alerts',
      badge: 'Early Warnings',
      description: 'Sends fast siren alerts and evacuation notices to villagers and authorities before soil starts sliding.',
      icon: AlertTriangle,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-400',
      borderColor: 'hover:border-rose-500/50',
      actionText: 'Check Alerts'
    },
    {
      page: 'report',
      title: 'Citizen Photo Report',
      badge: 'Community Help',
      description: 'Anyone can snap a photo of a road crack or fallen rock to instantly report it with GPS location.',
      icon: Camera,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      actionText: 'Submit Report'
    },
    {
      page: 'roads',
      title: 'Mountain Road Status',
      badge: 'Highway Watch',
      description: 'Check whether ghat mountain highways are open, slow, or blocked by mudslides with safe bypass routes.',
      icon: Route,
      color: 'from-sky-500 to-cyan-600',
      textColor: 'text-sky-400',
      borderColor: 'hover:border-sky-500/50',
      actionText: 'Check Roads'
    }
  ];

  return (
    <section className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>PROJECT FEATURES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How LandslideGuard AI Protects People
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Everything you need to predict, monitor, and prevent landslide disasters in simple, easy-to-use tools.
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
