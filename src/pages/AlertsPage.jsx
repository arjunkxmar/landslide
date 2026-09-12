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
  Filter,
  Activity,
  BellRing
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function AlertsPage({ onOpenEmergencyModal, setActivePage }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = ACTIVE_ALERTS.filter(alert => {
    if (filterSeverity === 'ALL') return true;
    return alert.riskLevel === filterSeverity;
  });

  const handleNotifyAuthorities = (alert) => {
    soundManager?.playCriticalWarning?.();
    if (onOpenEmergencyModal) {
      onOpenEmergencyModal(alert);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              National Disaster Management Authority (NDMA) Dispatch
            </span>
            <span className="text-xs text-dark-muted">•</span>
            <span className="text-xs font-mono text-white">CAP-India v1.2 Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1.5 font-display">
            <BellRing className="w-7 h-7 text-rose-500 animate-pulse" />
            Early Warning Emergency Alert Console
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl">
            Live authoritative emergency bulletins, acoustic siren triggers, and automated OASIS CAP-India XML cell broadcasts.
          </p>
        </div>

        {/* Global Dispatch Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager?.playAlert?.();
              onOpenEmergencyModal(ACTIVE_ALERTS[0]);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer font-mono border border-rose-400/30"
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>TRANSMIT ALL-INDIA BROADCAST</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-dark-border">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-dark-muted mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Level:
          </span>
          {['ALL', 'CRITICAL', 'HIGH'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundManager?.playClick?.();
                setFilterSeverity(lvl);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                filterSeverity === lvl
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-dark-card text-dark-muted hover:text-white border border-dark-border'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-dark-muted flex items-center gap-3">
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
                  ? 'glass-critical-glow border border-rose-500/40' 
                  : 'glass-panel border border-orange-500/30'
              }`}
            >
              {/* Alert Header Strip */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-dark-border pb-4 mb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/30">
                      🚨 {alert.title}
                    </span>
                    <span className="text-xs font-mono text-dark-muted">ID: {alert.id}</span>
                    <span className="text-xs font-mono text-dark-muted">• {alert.status}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-display">
                    Location: {alert.location}
                  </h2>
                  <p className="text-xs font-mono text-dark-muted">
                    Coordinates: {alert.coordinates} • Commander: {alert.incidentCommander}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start lg:self-center">
                  <div className="text-right">
                    <div className="text-xs font-mono text-dark-muted uppercase">Computed Threat</div>
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
                  <div className="p-4 rounded-xl bg-dark-bg border border-dark-border">
                    <span className="text-xs font-mono uppercase text-dark-muted font-bold block mb-1">
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
                    <ul className="space-y-2 font-mono">
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
                  <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-dark-muted">
                      <span className="uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Affected Demographics
                      </span>
                      <span className="text-white font-bold">{alert.affectedEstPopulation} Residents</span>
                    </div>

                    <div className="pt-2 border-t border-dark-border space-y-1.5 text-xs">
                      <span className="text-dark-muted font-mono text-[10px] uppercase block">
                        Assigned Relief Centers:
                      </span>
                      {alert.evacuationCentres.length > 0 ? (
                        alert.evacuationCentres.map((c, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-dark-card border border-dark-border flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-200 truncate">{c.name}</span>
                            <span className="text-[10px] text-emerald-400 shrink-0 ml-2">{c.occupancy}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-dark-muted text-xs italic">Transit shelter status updating...</div>
                      )}
                    </div>
                  </div>

                  {/* SOP Status Checklist */}
                  <div className="p-3.5 rounded-xl bg-dark-bg/80 border border-dark-border text-[11px] font-mono space-y-1.5 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">District Magistrate Notified:</span>
                      <span className="text-emerald-400 font-bold">✓ ACKNOWLEDGED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">NDRF / SDRF Unit Alerted:</span>
                      <span className="text-emerald-400 font-bold">✓ EN ROUTE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">Acoustic Sirens:</span>
                      <span className={alert.authorityStatus.sirensActivated ? "text-rose-400 font-bold" : "text-dark-muted"}>
                        {alert.authorityStatus.sirensActivated ? "🔴 PULSING (120dB)" : "STANDBY"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions Banner */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-1 mb-4 font-mono">
                <span className="text-rose-400 font-bold uppercase block">
                  Recommended Action:
                </span>
                <p className="text-slate-200 font-sans font-semibold leading-relaxed">
                  Authorities should issue an early warning, activate emergency sirens, and closely monitor this location. Immediate stage-2 evacuation ordered.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-dark-border">
                <button
                  onClick={() => {
                    soundManager?.playClick?.();
                    setActivePage('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-white font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>📍 View Location on GIS</span>
                </button>

                <button
                  onClick={() => handleNotifyAuthorities(alert)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-card hover:bg-dark-hover border border-cyan-500/40 text-cyan-300 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>📱 Notify Authorities</span>
                </button>

                <button
                  onClick={() => handleNotifyAuthorities(alert)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all cursor-pointer font-mono border border-rose-400/30"
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
