import React, { useState } from 'react';
import { ROADS_DATA } from '../data/roadData';
import { 
  Route, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Navigation, 
  ArrowRight, 
  Car, 
  Truck, 
  Compass, 
  Layers,
  Info,
  Activity,
  HardHat,
  Radio
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function RoadStatusPage({ setActivePage }) {
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'SAFE' | 'CAUTION' | 'BLOCKED'
  const [selectedRoad, setSelectedRoad] = useState(ROADS_DATA[1]); // Default to blocked NH-58 Chamoli stretch

  const filteredRoads = ROADS_DATA.filter(road => {
    if (filterStatus === 'ALL') return true;
    return road.status === filterStatus;
  });

  const statusSummary = {
    safe: ROADS_DATA.filter(r => r.status === 'SAFE').length,
    caution: ROADS_DATA.filter(r => r.status === 'CAUTION').length,
    blocked: ROADS_DATA.filter(r => r.status === 'BLOCKED').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Border Roads Organisation (BRO) & Highway Patrol
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400">Live Mountain Corridor Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1">
            <Route className="w-7 h-7 text-sky-400" />
            Road Connectivity Monitor 🛣️
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => {
              setActivePage('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Road GIS Map</span>
          </button>
        </div>
      </div>

      {/* Corridor Status Overview Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setFilterStatus('SAFE')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterStatus === 'SAFE' 
              ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
              : 'glass-panel border-slate-800 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold mb-1">
            <span>🟢 SAFE HIGHWAYS</span>
            <span>{statusSummary.safe} Routes Open</span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            Normal Transit Speed
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            All lanes clear, unhindered commercial & emergency transit.
          </p>
        </div>

        <div 
          onClick={() => setFilterStatus('CAUTION')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterStatus === 'CAUTION' 
              ? 'bg-amber-500/20 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
              : 'glass-panel border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold mb-1">
            <span>🟡 CAUTION REQUIRED</span>
            <span>{statusSummary.caution} Routes Restricted</span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            Single-Lane / Night Ban
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Rockfall netting active, alternating convoy movement.
          </p>
        </div>

        <div 
          onClick={() => setFilterStatus('BLOCKED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            filterStatus === 'BLOCKED' 
              ? 'bg-rose-500/20 border-rose-500/60 shadow-[0_0_15px_rgba(239,68,68,0.25)]' 
              : 'glass-panel border-slate-800 hover:border-rose-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold mb-1">
            <span>🔴 BLOCKED ROADS</span>
            <span>{statusSummary.blocked} Corridors Closed</span>
          </div>
          <div className="text-2xl font-black font-mono text-rose-400 animate-pulse">
            Active Debris / Slump
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Detour bypass required. Clearance earthmovers deployed.
          </p>
        </div>
      </div>

      {/* Live BRO Clearance Taskforce HUD */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <HardHat className="w-4 h-4" />
            <span>Border Roads Organisation (BRO) Live Clearance Taskforce Swastik</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Clearance Telemetry Live
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Active Taskforce</span>
            <span className="text-white font-bold">BRO Project Shivalik / 753 TF</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Machinery on Site</span>
            <span className="text-cyan-400 font-bold">5 JCBs, 3 Wheel Dozers, 4 Tippers</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Debris Removal Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[68%]" />
              </div>
              <span className="text-amber-400 font-bold">68%</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Estimated Single-Lane Opening</span>
            <span className="text-emerald-400 font-bold">14:30 IST Today (2h 15m)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-slate-400 mr-2">Filter View:</span>
        {['ALL', 'SAFE', 'CAUTION', 'BLOCKED'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Roads List */}
      <div className="space-y-5">
        {filteredRoads.map((road) => {
          const isBlocked = road.status === 'BLOCKED';
          const isCaution = road.status === 'CAUTION';
          const isSafe = road.status === 'SAFE';

          return (
            <div
              key={road.id}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isBlocked
                  ? 'glass-critical-glow border-rose-500/40'
                  : isCaution
                  ? 'glass-panel border-amber-500/40'
                  : 'glass-panel border-emerald-500/30'
              }`}
            >
              {/* Road Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{road.id} • {road.region}</span>
                    <span className="text-xs font-mono text-slate-500">• {road.lastInspected}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {road.roadNumber}: {road.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                      isBlocked ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' :
                      isCaution ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    <span>{road.icon}</span>
                    <span>{road.status}</span>
                  </span>
                </div>
              </div>

              {/* Road Status Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-6 space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      Current Corridor Condition:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                      {road.condition}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Carriageway Status</span>
                      <span className="text-white font-bold">{road.laneStatus}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Precipitation on Route</span>
                      <span className="text-cyan-400 font-bold">{road.rainfallAlongRoute}</span>
                    </div>
                  </div>

                  {road.clearanceCrewStatus && (
                    <div className="text-xs font-mono text-slate-300 flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                      <Car className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span><strong>Clearance Crew:</strong> {road.clearanceCrewStatus}</span>
                    </div>
                  )}
                </div>

                {/* Right: Suggested Alternative Detour Route */}
                <div className="lg:col-span-6">
                  {road.alternativeRoute ? (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                          <Navigation className="w-4 h-4" />
                          <span>Suggested Alternative Route</span>
                        </div>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          Extra Time: {road.alternativeRoute.extraTime}
                        </span>
                      </div>

                      {/* Schematic Turn-by-Turn Waypoint Flow */}
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          Turn-by-Turn Detour Corridor Schematic:
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            Blocked Point
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            Bypass Sector A
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            Ridge Spur B
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Main Highway Re-entry
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded bg-slate-950/50 border border-slate-800">
                          <span className="text-slate-500 block">Distance Delta:</span>
                          <span className="text-slate-200 font-bold">{road.alternativeRoute.distanceDelta}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-950/50 border border-slate-800">
                          <span className="text-slate-500 block">Transit Restriction:</span>
                          <span className="text-amber-400 font-bold truncate block">{road.alternativeRoute.vehicleRestriction}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 italic">
                        Detour Road Quality: {road.alternativeRoute.roadCondition}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="text-sm font-bold text-white">No Detour Necessary</div>
                      <p className="text-xs text-slate-400">
                        Primary highway corridor is fully clear and operating under normal transit schedules.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Strip: Patrol contact & assistance */}
              <div className="pt-3 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Highway Emergency Patrol Helpline: <strong className="text-white">{road.patrolContact}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">Live BRO / PWD Traffic Sensor Telemetry</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
