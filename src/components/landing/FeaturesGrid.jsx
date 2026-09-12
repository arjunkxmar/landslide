import React from 'react';
import { 
  Compass, 
  Sparkles, 
  BarChart3, 
  AlertTriangle, 
  Camera, 
  Route, 
  Cpu, 
  ArrowRight
} from 'lucide-react';

export default function FeaturesGrid({ setActivePage }) {
  const features = [
    {
      page: 'dashboard',
      title: 'Sensor Telemetry & AI Intelligence',
      badge: 'Real-Time',
      description: 'Stream continuous IoT sensor feeds from 148 mountain stations measuring rain, pore pressure, borehole tilt, and automated AI hazard inference.',
      icon: BarChart3,
      color: 'from-cyan-500/20 to-blue-600/20',
      textColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      actionText: 'Open Live Dashboard'
    },
    {
      page: 'map',
      title: 'Geospatial Command Map',
      badge: 'GIS 3D Layers',
      description: 'Interactive high-resolution cartography featuring dark matter and satellite tiles, animated radar pins, and borehole geotechnical strata.',
      icon: Compass,
      color: 'from-sky-500/20 to-blue-600/20',
      textColor: 'text-sky-400',
      borderColor: 'hover:border-sky-500/50',
      actionText: 'Launch Risk Map'
    },
    {
      page: 'prediction',
      title: 'AI Geotechnical Simulator',
      badge: 'Physics Model',
      description: 'Test geotechnical Factor of Safety (FoS) under severe cloudburst scenarios with live GPS synchronization and stress testing.',
      icon: Sparkles,
      color: 'from-purple-500/20 to-indigo-600/20',
      textColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50',
      actionText: 'Run AI Simulator'
    },
    {
      page: 'alerts',
      title: 'NDMA Disaster Alert Console',
      badge: 'CAP-India v1.2',
      description: 'Automated siren dispatch, CAP-compliant geo-targeted cell broadcast, and rapid evacuation checklists for civil defense.',
      icon: AlertTriangle,
      color: 'from-rose-500/20 to-red-600/20',
      textColor: 'text-rose-400',
      borderColor: 'hover:border-rose-500/50',
      actionText: 'View Disaster Alerts'
    },
    {
      page: 'roads',
      title: 'Mountain Corridor Status (BRO)',
      badge: 'Highway Watch',
      description: 'Live mountain highway transit monitor tracking active mud blocks, debris clearing status, and safe detour passes.',
      icon: Route,
      color: 'from-amber-500/20 to-orange-600/20',
      textColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      actionText: 'Inspect Road Status'
    },
    {
      page: 'report',
      title: 'Citizen Ground Incident Portal',
      badge: 'Community Telemetry',
      description: 'Crowdsourced citizen reporting platform for ground tension cracks, road washouts, and photo geo-verification.',
      icon: Camera,
      color: 'from-teal-500/20 to-emerald-600/20',
      textColor: 'text-teal-400',
      borderColor: 'hover:border-teal-500/50',
      actionText: 'File Incident Report'
    }
  ];

  return (
    <section className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-xs font-mono font-semibold text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>DISASTER SURVEILLANCE MODULES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Integrated Landslide Defense System
          </h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Multi-layered hazard detection infrastructure combining satellite remote sensing, ground IoT sensor arrays, and AI predictive physics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl bg-[#111111] p-6 border border-[#1f1f1f] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl ${feat.borderColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} border border-white/10 flex items-center justify-center shadow-lg`}>
                      <Icon className={`w-6 h-6 ${feat.textColor}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#71717A] px-2.5 py-1 rounded-full bg-[#0a0a0a] border border-[#1a1a1a]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#1c1c1c]">
                  <button
                    onClick={() => {
                      setActivePage(feat.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wide ${feat.textColor} group-hover:underline cursor-pointer`}
                  >
                    <span>{feat.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
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

