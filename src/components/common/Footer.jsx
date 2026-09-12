import React from 'react';
import { ShieldCheck, Satellite, Award, HeartHandshake, ExternalLink, Activity, Radio, PhoneCall } from 'lucide-react';

export default function Footer({ setActivePage, currentLang = 'en' }) {
  return (
    <footer className="border-t border-[#1c1c1c] bg-[#050505] text-[#A1A1AA] text-xs mt-24 relative overflow-hidden">
      {/* Subtle glowing ambient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Core Mission */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏔️</span>
              <span className="text-base font-black tracking-tight text-white font-sans">
                LandslideGuard <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm">
              AI-powered landslide risk monitoring and early warning. Delivering real-time geotechnical intelligence, multi-modal alerts, and 3D geospatial hazard analysis across vulnerable mountain corridors.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111111] border border-[#222222] text-[11px] font-mono text-cyan-300">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Live Telemetry Synced
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111111] border border-[#222222] text-[11px] font-mono text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                NDMA Protocol Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3.5">
              System Modules
            </h5>
            <ul className="space-y-2.5 font-mono text-xs">
              {[
                { id: 'home', label: 'Command Overview' },
                { id: 'dashboard', label: 'Telemetry Dashboard' },
                { id: 'map', label: 'Interactive GIS Map' },
                { id: 'prediction', label: 'AI Risk Simulator' },
                { id: 'alerts', label: 'Disaster Alert Console' },
                { id: 'roads', label: 'Mountain Corridors (BRO)' },
                { id: 'report', label: 'Citizen Incident Reports' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#A1A1AA] hover:text-cyan-400 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Telemetry Integrations */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3.5">
              Telemetry Feeds
            </h5>
            <ul className="space-y-2.5 text-[#71717A] font-mono text-[11px]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open-Meteo Atmospheric Satellites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>IMD Doppler Weather Radar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Borehole MEMS Inclinometers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ISRO Bhuvan DEM Cartography</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>CAP-India NDMA Siren Protocol</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Hotlines */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3.5">
              Emergency Hotlines
            </h5>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#111111] border border-[#222222]">
                <span className="text-[10px] text-[#71717A] uppercase font-mono block">National Emergency</span>
                <p className="text-white font-bold font-mono text-base flex items-center gap-1.5 mt-0.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" /> 112
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#111111] border border-[#222222]">
                <span className="text-[10px] text-[#71717A] uppercase font-mono block">NDMA Disaster Helpline</span>
                <p className="text-white font-bold font-mono text-base flex items-center gap-1.5 mt-0.5">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> 1070 / 1077
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1c1c1c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A] font-mono">
          <div>
            © 2026 LandslideGuard AI • Early Warning & Risk Management. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Activity className="w-3.5 h-3.5" /> All Systems Operational
            </span>
            <span className="text-[#52525B]">•</span>
            <span className="text-[#A1A1AA]">v2.4.0-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

