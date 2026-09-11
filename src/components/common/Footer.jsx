import React from 'react';
import { ShieldCheck, Satellite, Award, HeartHandshake, ExternalLink, Activity } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-slate-800 bg-[#050811] text-slate-400 text-xs mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & SIH */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌄</span>
              <span className="text-base font-black tracking-tight text-white font-sans">
                LANDSLIDEGUARD <span className="text-cyan-400 font-mono">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AI-powered Landslide Early Warning and Risk Monitoring Platform. Delivering real-time geotechnical intelligence and multi-modal early alerts across vulnerable Indian mountain corridors.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Disaster Safety Platform
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NDMA Protocol Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold mb-3">
              Platform Modules
            </h5>
            <ul className="space-y-2">
              {[
                { id: 'map', label: 'Interactive GIS Map' },
                { id: 'prediction', label: 'AI Risk Prediction Engine' },
                { id: 'dashboard', label: 'Real-Time Telemetry' },
                { id: 'alerts', label: 'Disaster Alerts & Dispatch' },
                { id: 'report', label: 'Citizen Incident Reporting' },
                { id: 'roads', label: 'Mountain Road Connectivity' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors text-left text-xs"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Data Feeds & Integrations */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold mb-3">
              Telemetry Ingestion
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>IMD Automated Rain Gauges (ARG)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>GSI Geotechnical Sensors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ISRO Bhuvan Satellite DEM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Central Water Commission (CWC)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>CAP-India NDMA Broadcast</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold mb-3">
              Disaster Response Lines
            </h5>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">National Emergency</span>
                <p className="text-white font-bold font-mono text-sm">112</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Disaster Management Helpline</span>
                <p className="text-white font-bold font-mono text-sm">1070 / 1077</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & status line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 LandslideGuard AI • Early Warning & Risk Management. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" /> All Systems Operational
            </span>
            <span className="text-slate-400">Sendai Framework Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
