import React, { useState } from 'react';
import { ACTIVE_ALERTS } from '../data/alertData';
import RiskBadge from '../components/common/RiskBadge';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Radio, 
  Send, 
  Compass, 
  PhoneCall, 
  Clock, 
  Users, 
  Building2, 
  CheckCircle2, 
  Volume2, 
  ExternalLink,
  Filter
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function AlertsPage({ onOpenEmergencyModal, setActivePage }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'sop' | 'shelters'

  const filteredAlerts = ACTIVE_ALERTS.filter(alert => {
    if (filterSeverity === 'ALL') return true;
    return alert.riskLevel === filterSeverity;
  });

  const handleNotifyAuthorities = (alert) => {
    soundManager.playCriticalWarning();
    if (onOpenEmergencyModal) {
      onOpenEmergencyModal(alert);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              National Disaster Management Authority (NDMA) Dispatch
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-white">CAP-India v1.2 Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1">
            <ShieldAlert className="w-7 h-7 text-rose-500 animate-pulse" />
            Early Warning Alert System 🚨
          </h1>
        </div>

        {/* Global Dispatch Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenEmergencyModal(ACTIVE_ALERTS[0])}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>TRANSMIT ALL-INDIA BROADCAST</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-slate-400 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter Level:
          </span>
          {['ALL', 'CRITICAL', 'HIGH'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterSeverity(lvl)}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                filterSeverity === lvl
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
          <span className="text-rose-400 font-bold">2 Critical Alerts Active</span>
          <span>•</span>
          <span className="text-cyan-400">4,350 Downstream Residents Warned</span>
        </div>
      </div>

      {/* Alerts Cards List */}
      <div className="space-y-6">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.riskLevel === 'CRITICAL';
          return (
            <div
              key={alert.id}
              className={`rounded-2xl p-6 transition-all duration-300 ${
                isCritical 
                  ? 'glass-critical-glow border border-rose-500/50' 
                  : 'glass-panel border border-orange-500/30'
              }`}
            >
              {/* Alert Header Strip */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/30">
                      🚨 {alert.title}
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {alert.id}</span>
                    <span className="text-xs font-mono text-slate-500">• {alert.status}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Location: {alert.location}
                  </h2>
                  <p className="text-xs font-mono text-slate-400">
                    Coordinates: {alert.coordinates} • Commander: {alert.incidentCommander}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-center">
                  <div className="text-right">
                    <div className="text-xs font-mono text-slate-400 uppercase">Computed Threat</div>
                    <div className="text-2xl font-black font-mono text-rose-400">
                      {alert.riskScore}%
                    </div>
                  </div>
                  <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="lg" />
                </div>
              </div>

              {/* Headline & Reasons */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
                {/* Left: Headline & Key Geological Reasons */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      Event Summary:
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {alert.headline}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-300 mb-2 tracking-wider">
                      Critical Trigger Factors:
                    </h4>
                    <ul className="space-y-1.5">
                      {alert.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-rose-400 shrink-0 font-bold">⚠️</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Evacuation Protocols & Relief Camps */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Affected Demographics
                      </span>
                      <span className="text-white font-bold">{alert.affectedEstPopulation} Residents</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                      <span className="text-slate-400 font-mono text-[10px] uppercase block">
                        Assigned Relief Centers:
                      </span>
                      {alert.evacuationCentres.length > 0 ? (
                        alert.evacuationCentres.map((c, i) => (
                          <div key={i} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                            <span className="text-slate-200 truncate">{c.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2">{c.occupancy}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-500 text-xs italic">Transit shelter status updating...</div>
                      )}
                    </div>
                  </div>

                  {/* SOP Status Checklist */}
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>District Magistrate Notified:</span>
                      <span className="text-emerald-400 font-bold">✓ ACKNOWLEDGED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>NDRF / SDRF Unit Alerted:</span>
                      <span className="text-emerald-400 font-bold">✓ EN ROUTE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Acoustic Sirens:</span>
                      <span className={alert.authorityStatus.sirensActivated ? "text-rose-400 font-bold" : "text-slate-400"}>
                        {alert.authorityStatus.sirensActivated ? "🔴 PULSING (120dB)" : "STANDBY"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions Banner */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-1 mb-4">
                <span className="text-rose-400 font-mono font-bold uppercase block">
                  Recommended Action:
                </span>
                <p className="text-slate-200 font-semibold leading-relaxed">
                  Authorities should issue an early warning, activate emergency sirens, and closely monitor this location. Immediate stage-2 evacuation ordered.
                </p>
              </div>

              {/* Action Buttons: Send Emergency Alert, Notify Authorities, View Location */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActivePage('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>📍 View Location on GIS</span>
                </button>

                <button
                  onClick={() => handleNotifyAuthorities(alert)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>📱 Notify Authorities</span>
                </button>

                <button
                  onClick={() => handleNotifyAuthorities(alert)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>📢 Send Emergency Alert</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
