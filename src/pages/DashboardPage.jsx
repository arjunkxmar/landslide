import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Droplets, 
  Thermometer, 
  Wind, 
  Mountain, 
  Activity, 
  Radio, 
  AlertTriangle, 
  Play, 
  Pause, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  ShieldAlert,
  Layers,
  Sparkles,
  Cpu,
  BatteryCharging,
  Wifi,
  Satellite,
  Download,
  RefreshCw,
  BellRing,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  Sliders
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import RiskGauge from '../components/common/RiskGauge';
import { ACTIVE_ALERTS } from '../data/alertData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { soundManager } from '../utils/soundEffects';
import { useLandslideContext } from '../context/LandslideContext';

export default function DashboardPage({ onOpenEmergencyModal, setActivePage }) {
  const { updateDashboardTelemetry } = useLandslideContext();
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [pulseTick, setPulseTick] = useState(0);
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'lora_mesh'
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [recalibrateNotice, setRecalibrateNotice] = useState(null);

  // Telemetry metrics
  const [telemetry, setTelemetry] = useState({
    rainfall: 142,
    soilMoisture: 78,
    temperature: 22.4,
    humidity: 89,
    slopeStability: 'Critical Strain (4.8mm)',
    shearDisplacement: 4.8,
    riskScore: 87,
    porePressure: '138 kPa',
    activeZones: 6,
    alertsDetected: 4,
    lastPacketTime: 'Just now'
  });

  // Simulated 24h timeline data
  const [timelineData, setTimelineData] = useState([
    { time: '00:00', rain: 45, moisture: 52, risk: 42 },
    { time: '04:00', rain: 60, moisture: 58, risk: 51 },
    { time: '08:00', rain: 88, moisture: 66, risk: 64 },
    { time: '12:00', rain: 110, moisture: 72, risk: 74 },
    { time: '16:00', rain: 128, moisture: 75, risk: 81 },
    { time: '20:00', rain: 142, moisture: 78, risk: 87 }
  ]);

  // Live IoT telemetry tick simulator
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setPulseTick(prev => prev + 1);

      setTelemetry(prev => {
        const rainDelta = (Math.random() * 1.4 - 0.5);
        const moistureDelta = (Math.random() * 0.8 - 0.3);
        const tempDelta = (Math.random() * 0.4 - 0.2);
        const newRain = Math.max(10, Math.min(220, Math.round((prev.rainfall + rainDelta) * 10) / 10));
        const newMoisture = Math.max(20, Math.min(99, Math.round((prev.soilMoisture + moistureDelta) * 10) / 10));
        const newTemp = Math.round((prev.temperature + tempDelta) * 10) / 10;
        const newRisk = Math.min(98, Math.max(70, Math.round(newRain * 0.35 + newMoisture * 0.45 + 18)));

        return {
          ...prev,
          rainfall: newRain,
          soilMoisture: newMoisture,
          temperature: newTemp,
          riskScore: newRisk,
          shearDisplacement: Math.round((prev.shearDisplacement + 0.015) * 100) / 100,
          lastPacketTime: 'Just now'
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Synchronize telemetry with LandslideContext
  useEffect(() => {
    if (telemetry) {
      updateDashboardTelemetry(telemetry);
    }
  }, [telemetry, updateDashboardTelemetry]);

  // Handle sensor recalibration trigger
  const handleRecalibrate = () => {
    setIsRecalibrating(true);
    soundManager?.playClick?.();
    setTimeout(() => {
      setIsRecalibrating(false);
      setRecalibrateNotice('148 IoT Borehole & Piezometer Sensors Zero-Offset Recalibrated.');
      setTimeout(() => setRecalibrateNotice(null), 4000);
    }, 1800);
  };

  // Export audit report CSV
  const handleExportReport = () => {
    soundManager?.playClick?.();
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,Rainfall_mm,Soil_Moisture_Pct,Temperature_C,Shear_Displacement_mm,Risk_Score,Status\n" +
      timelineData.map(e => `${e.time},${e.rain},${e.moisture},22.4,4.8,${e.risk},CRITICAL`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LandslideGuard_Telemetry_Audit_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Recalibration Notice Banner */}
      {recalibrateNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between animate-slideUp">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{recalibrateNotice}</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">LATENCY 28ms</span>
        </div>
      )}

      {/* Top Header & Mission Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-dark-border pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              National Disaster Operations Center
            </span>
            <span className="text-xs text-dark-muted">•</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5" />
              INSAT-3DR Geostationary Active
            </span>
            <span className="text-xs text-dark-muted">•</span>
            <span className="text-xs font-mono text-dark-muted">
              Sync: {telemetry.lastPacketTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mt-1.5 font-display">
            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
            Real-Time Mission Monitoring Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl">
            Live geotechnical telemetry, pore-water pressure tracking, and AI-driven early slope rupture detection across 148 mountain monitoring stations.
          </p>
        </div>

        {/* Live Controller Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setIsLiveStreaming(!isLiveStreaming);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-dark-card border-dark-border text-dark-muted hover:text-white'
            }`}
          >
            {isLiveStreaming ? (
              <>
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>LIVE STREAM ACTIVE</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>STREAM PAUSED</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundManager?.playAlert?.();
              onOpenEmergencyModal();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-risk-critical hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 border border-rose-500/40 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>DISPATCH CAP</span>
          </button>
        </div>
      </div>

      {/* System Health Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl glass-panel border border-dark-border/80 text-xs font-mono">
        <div className="flex items-center gap-2.5 px-3 py-1.5 border-r border-dark-border/60">
          <Wifi className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-[10px] text-dark-muted uppercase">IoT Mesh Uplink</div>
            <div className="text-white font-bold">148 / 148 Online (99.8%)</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5 sm:border-r border-dark-border/60">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-[10px] text-dark-muted uppercase">Satellite Latency</div>
            <div className="text-white font-bold">42 ms (Iridium Failover)</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5 border-r border-dark-border/60">
          <BatteryCharging className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-[10px] text-dark-muted uppercase">Solar Cell Array</div>
            <div className="text-white font-bold">3.84 V (LiFePO4 Peak)</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5">
          <Cpu className="w-4 h-4 text-purple-400" />
          <div>
            <div className="text-[10px] text-dark-muted uppercase">Risk Engine Core</div>
            <div className="text-purple-300 font-bold">Edge ML v3.2 Active</div>
          </div>
        </div>
      </div>

      {/* Primary Key Statistic Counters Grid (6 Animated Metric HUD Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* 1. Current Risk Level */}
        <div className="p-4 rounded-2xl glass-panel border border-rose-500/40 relative overflow-hidden group hover:border-rose-500/70 transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              RISK INDEX
            </span>
            <RiskBadge level="CRITICAL" score={telemetry.riskScore} size="sm" />
          </div>
          <div className="text-3xl font-black font-mono text-white tracking-tight flex items-baseline gap-1">
            <span>{telemetry.riskScore}</span>
            <span className="text-sm text-rose-400 font-normal">/ 100</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div 
              className="bg-risk-critical h-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.6)]" 
              style={{ width: `${telemetry.riskScore}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-dark-muted font-mono mt-2">
            <span>Critical Tier</span>
            <span className="text-rose-400 font-bold">Siren Alert</span>
          </div>
        </div>

        {/* 2. Active Hazard Zones */}
        <div className="p-4 rounded-2xl glass-panel border border-orange-500/30 relative overflow-hidden group hover:border-orange-500/60 transition-all">
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              <Layers className="w-4 h-4" />
              ACTIVE ZONES
            </span>
            <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-mono font-bold">
              WATCH
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-white tracking-tight flex items-baseline gap-1">
            <span>{telemetry.activeZones}</span>
            <span className="text-xs text-dark-muted font-sans">Corridors</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div className="bg-orange-400 h-full transition-all duration-700" style={{ width: '60%' }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-dark-muted font-mono mt-2">
            <span>3 High / 3 Critical</span>
            <span className="text-orange-400 font-bold">Wayanad/Shimla</span>
          </div>
        </div>

        {/* 3. Rainfall (24H) */}
        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-500/60 transition-all">
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <CloudRain className="w-4 h-4" />
              RAINFALL (24H)
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold">
              HEAVY
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {telemetry.rainfall} <span className="text-base text-cyan-400 font-sans font-normal">mm</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-rose-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
              style={{ width: `${Math.min(100, (telemetry.rainfall / 160) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-dark-muted font-mono mt-2">
            <span>Threshold: 100mm</span>
            <span className="text-rose-400 font-bold">+18mm / 4h</span>
          </div>
        </div>

        {/* 4. Soil Moisture */}
        <div className="p-4 rounded-2xl glass-panel border border-blue-500/30 relative overflow-hidden group hover:border-blue-500/60 transition-all">
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Droplets className="w-4 h-4" />
              SOIL MOISTURE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold">
              SATURATED
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {telemetry.soilMoisture} <span className="text-base text-blue-400 font-sans font-normal">%</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div 
              className="bg-gradient-to-r from-blue-400 to-rose-500 h-full transition-all duration-500" 
              style={{ width: `${telemetry.soilMoisture}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-dark-muted font-mono mt-2">
            <span>Pore Limit: 75%</span>
            <span className="text-rose-400 font-bold">Surge Active</span>
          </div>
        </div>

        {/* 5. Ground Stability / Inclinometer */}
        <div className="p-4 rounded-2xl glass-panel border border-rose-500/30 relative overflow-hidden group hover:border-rose-500/60 transition-all">
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Mountain className="w-4 h-4" />
              DISPLACEMENT
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold animate-pulse">
              CREEP
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-rose-400 tracking-tight">
            {telemetry.shearDisplacement} <span className="text-base text-dark-muted font-sans font-normal">mm</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: '82%' }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-rose-400 font-mono mt-2">
            <span>Borehole Tilt 42m</span>
            <span>Lateral Shear</span>
          </div>
        </div>

        {/* 6. Alerts Detected */}
        <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 relative overflow-hidden group hover:border-purple-500/60 transition-all">
          <div className="flex items-center justify-between text-xs text-dark-muted font-mono mb-2">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <BellRing className="w-4 h-4" />
              ALERTS ACTIVE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
              PRIORITY
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-white tracking-tight flex items-baseline gap-1">
            <span>{telemetry.alertsDetected}</span>
            <span className="text-xs text-dark-muted font-sans">NDMA CAP</span>
          </div>
          <div className="w-full bg-dark-bg h-1.5 rounded-full mt-3 overflow-hidden border border-dark-border/60">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: '70%' }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-dark-muted font-mono mt-2">
            <span>2 Red / 2 Orange</span>
            <span className="text-purple-300 font-bold">Multi-State</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="p-4 rounded-2xl glass-panel border border-dark-border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Emergency Operations Quick Actions</h4>
            <p className="text-xs text-dark-muted">Immediate commands for ground stations and district emergency coordinators.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              soundManager?.playSiren?.();
            }}
            className="px-3.5 py-2 rounded-xl bg-dark-card hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <BellRing className="w-3.5 h-3.5 text-rose-400" />
            <span>TRIGGER LOCAL SIREN</span>
          </button>

          <button
            onClick={onOpenEmergencyModal}
            className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>EMERGENCY BROADCAST</span>
          </button>

          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-slate-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXPORT CSV AUDIT</span>
          </button>

          <button
            onClick={handleRecalibrate}
            disabled={isRecalibrating}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRecalibrating ? 'animate-spin' : ''}`} />
            <span>{isRecalibrating ? 'CALIBRATING...' : 'RECALIBRATE NODES'}</span>
          </button>
        </div>
      </div>

      {/* AI RISK INTELLIGENCE SECTION (Requested Feature) */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* AI Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-display">AI Risk Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                  GEMINI + GEOTECH ENGINE
                </span>
              </div>
              <p className="text-xs text-dark-muted mt-0.5">
                Automated multi-sensor synthesis & geotechnical slip-surface failure probability assessment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-dark-bg border border-dark-border text-slate-300 flex items-center gap-2">
              <span className="text-dark-muted">Confidence Rating:</span>
              <span className="text-emerald-400 font-bold">96.4%</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
              <span className="text-dark-muted">Lead Time:</span>
              <span className="font-bold text-white">3.5 Hours</span>
            </div>
          </div>
        </div>

        {/* AI Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current Risk Assessment */}
          <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>CURRENT ASSESSMENT</span>
            </div>
            <div className="text-sm font-semibold text-white leading-relaxed">
              Imminent deep-seated translational slope failure detected along the upper Meppadi escarpment.
            </div>
            <p className="text-xs text-dark-muted leading-relaxed">
              Pore-water pressure has surpassed the critical threshold of 135 kPa, reducing effective shear strength by 68%.
            </p>
          </div>

          {/* Main Risk Factors */}
          <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>MAIN RISK FACTORS</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">•</span>
                <span>Cumulative 24h rain: 142mm (&gt;100mm threshold)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">•</span>
                <span>Soil moisture: 78% (full saturation regime)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">•</span>
                <span>Slope angle: 34° weathered gneiss overburden</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400">•</span>
                <span>Inclinometer creep: 4.8mm shear displacement</span>
              </li>
            </ul>
          </div>

          {/* Environmental Conditions */}
          <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
              <CloudRain className="w-4 h-4" />
              <span>ENVIRONMENTAL CONDITIONS</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-dark-card border border-dark-border">
                <span className="text-[10px] text-dark-muted block">PRECIP RATE</span>
                <span className="text-white font-bold">14.2 mm/hr</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-card border border-dark-border">
                <span className="text-[10px] text-dark-muted block">AMBIENT TEMP</span>
                <span className="text-white font-bold">{telemetry.temperature}°C</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-card border border-dark-border">
                <span className="text-[10px] text-dark-muted block">REL HUMIDITY</span>
                <span className="text-white font-bold">{telemetry.humidity}%</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-card border border-dark-border">
                <span className="text-[10px] text-dark-muted block">HYDRAULIC POISE</span>
                <span className="text-rose-400 font-bold">{telemetry.porePressure}</span>
              </div>
            </div>
          </div>

          {/* Recommended Precautions */}
          <div className="p-4 rounded-xl bg-dark-bg/80 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>RECOMMENDED PRECAUTIONS</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">1.</span>
                <span>Immediate Stage-3 evacuation of 450 households within 1.2km runout cone.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400 font-bold">2.</span>
                <span>Enforce complete vehicular closure on SH-59 mountain ghat pass.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Alert NDRF 4th Battalion for rapid search & rescue staging.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Sensor Telemetry vs LoRaWAN Mesh Network Health */}
      <div className="flex items-center gap-4 border-b border-dark-border pb-2 text-xs font-mono">
        <button
          onClick={() => {
            soundManager?.playClick?.();
            setActiveTab('telemetry');
          }}
          className={`pb-2 font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'telemetry'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-dark-muted hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Sensor Telemetry Stream & 24h Trajectory</span>
        </button>
        <button
          onClick={() => {
            soundManager?.playClick?.();
            setActiveTab('lora_mesh');
          }}
          className={`pb-2 font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'lora_mesh'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-dark-muted hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>LoRaWAN Mesh Network Diagnostics</span>
        </button>
      </div>

      {activeTab === 'telemetry' ? (
        <>
          {/* Middle Section: Composite Threat Index + 24h Timeline Chart + Regional Station Ranking */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Composite Threat Index Gauge Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl glass-critical-glow border border-rose-500/30 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-dark-muted tracking-wider">
                      Composite Threat Index
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Regional Hazard Rating
                    </h3>
                  </div>
                  <RiskBadge level="CRITICAL" score={telemetry.riskScore} size="md" />
                </div>

                <div className="my-6 flex justify-center">
                  <RiskGauge score={telemetry.riskScore} size={250} />
                </div>

                <div className="p-4 rounded-xl bg-dark-bg/90 border border-rose-500/30 text-xs space-y-2">
                  <div className="flex justify-between font-mono">
                    <span className="text-dark-muted">Target Sector:</span>
                    <span className="text-white font-bold">Wayanad Meppadi Ridge</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-dark-muted">Hydraulic Head:</span>
                    <span className="text-rose-400 font-bold">{telemetry.porePressure}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-dark-muted">Slip Probability:</span>
                    <span className="text-rose-400 font-bold">92.4%</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-dark-muted">Factor of Safety:</span>
                    <span className="text-rose-400 font-bold">0.86 (Unstable)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    soundManager?.playAlert?.();
                    onOpenEmergencyModal();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all border border-rose-400/30"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>SOUND LOCAL EVACUATION SIRENS</span>
                </button>
              </div>
            </div>

            {/* Right Column: 24h Timeline Chart & Multi-Station Comparison */}
            <div className="lg:col-span-8 space-y-6">
              {/* 24-Hour Telemetry Timeline Chart (Custom SVG Data Visualization) */}
              <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-border pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>24-Hour Rainfall vs. Soil Moisture & Risk Trajectory</span>
                    </h3>
                    <p className="text-xs text-dark-muted mt-0.5">
                      Live sensor inflection points where rainfall and pore saturation cross geotechnical thresholds
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> Rain (mm)
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Moisture (%)
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> Risk Score
                    </span>
                  </div>
                </div>

                {/* Visual SVG Timeline Chart */}
                <div className="relative h-64 w-full pt-2">
                  <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Guide Lines */}
                    <line x1="50" y1="30" x2="680" y2="30" stroke="#1A1A1A" strokeDasharray="4" />
                    <line x1="50" y1="80" x2="680" y2="80" stroke="#1A1A1A" strokeDasharray="4" />
                    <line x1="50" y1="130" x2="680" y2="130" stroke="#1A1A1A" strokeDasharray="4" />
                    <line x1="50" y1="180" x2="680" y2="180" stroke="#262626" />

                    {/* Evacuation Danger Threshold Line */}
                    <line x1="50" y1="65" x2="680" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6" opacity="0.7" />
                    <text x="540" y="60" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">DANGER THRESHOLD (75%)</text>

                    {/* Y-Axis Labels */}
                    <text x="25" y="34" fill="#71717A" fontSize="10" fontFamily="monospace">150</text>
                    <text x="25" y="84" fill="#71717A" fontSize="10" fontFamily="monospace">100</text>
                    <text x="25" y="134" fill="#71717A" fontSize="10" fontFamily="monospace">50</text>
                    <text x="25" y="184" fill="#71717A" fontSize="10" fontFamily="monospace">0</text>

                    {/* Rainfall Area & Line (Cyan) */}
                    <path
                      d="M 80,140 L 190,120 L 300,90 L 410,65 L 520,48 L 630,35 L 630,180 L 80,180 Z"
                      fill="url(#rainFill)"
                    />
                    <polyline
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      points="80,140 190,120 300,90 410,65 520,48 630,35"
                    />

                    {/* Soil Moisture Line (Blue) */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      points="80,132 190,122 300,108 410,95 520,88 630,82"
                    />

                    {/* Risk Score Line (Rose) */}
                    <polyline
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      points="80,145 190,130 300,105 410,82 520,68 630,48"
                    />

                    {/* Data Points */}
                    {timelineData.map((d, i) => {
                      const x = 80 + i * 110;
                      return (
                        <g key={i}>
                          <text x={x} y="202" fill="#A1A1AA" fontSize="10" fontFamily="monospace" textAnchor="middle">
                            {d.time}
                          </text>
                          <circle cx={x} cy={180 - (d.rain / 160) * 150} r="4" fill="#06b6d4" stroke="#050505" strokeWidth="2" />
                          <circle cx={x} cy={180 - (d.risk / 100) * 150} r="4.5" fill="#ef4444" stroke="#050505" strokeWidth="2" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Regional Risk Bar Comparison */}
              <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-4">
                <div className="flex items-center justify-between border-b border-dark-border pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Active Regional Stations Risk Comparison</span>
                  </h3>
                  <button
                    onClick={() => {
                      soundManager?.playClick?.();
                      setActivePage('map');
                    }}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View on Full Map</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  {LOCATIONS_DATA.slice(0, 5).map((station) => (
                    <div key={station.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-sans font-semibold truncate max-w-[200px] sm:max-w-none">
                          {station.name} ({station.state})
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-dark-muted">{station.rainfall24h}mm rain</span>
                          <span className="font-bold font-mono text-white">{station.riskScore}%</span>
                          <RiskBadge level={station.riskLevel} size="sm" />
                        </div>
                      </div>
                      <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border">
                        <div
                          className={`h-full transition-all duration-500 ${
                            station.riskLevel === 'CRITICAL' ? 'bg-risk-critical shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                            station.riskLevel === 'HIGH' ? 'bg-risk-high' :
                            station.riskLevel === 'MODERATE' ? 'bg-risk-moderate' : 'bg-risk-low'
                          }`}
                          style={{ width: `${station.riskScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* TAB 2: LoRaWAN Hardware Mesh Network Diagnostics */
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-border pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Mountain Valley LoRaWAN Mesh Architecture (865-867 MHz Band)</span>
                </h3>
                <p className="text-xs text-dark-muted mt-0.5">
                  Ultra-low power telemetry propagation in GPS-denied valleys and cellular dead zones
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                Mesh Connectivity: 99.8% Healthy
              </span>
            </div>

            {/* Diagnostic Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border">
                <span className="text-[10px] font-mono text-dark-muted block uppercase">Signal Strength (RSSI)</span>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-1">-82 dBm</div>
                <span className="text-[10px] text-emerald-400 font-mono">Optimal Propagation</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border">
                <span className="text-[10px] font-mono text-dark-muted block uppercase">Signal-to-Noise (SNR)</span>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">+9.4 dB</div>
                <span className="text-[10px] text-dark-muted font-mono">Low Rain Attenuation</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border">
                <span className="text-[10px] font-mono text-dark-muted block uppercase">Solar LiFePO4 Voltage</span>
                <div className="text-xl font-bold font-mono text-amber-400 mt-1">3.64 V</div>
                <span className="text-[10px] text-emerald-400 font-mono">Trickle Charging</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border">
                <span className="text-[10px] font-mono text-dark-muted block uppercase">Packet Latency</span>
                <div className="text-xl font-bold font-mono text-purple-400 mt-1">140 ms</div>
                <span className="text-[10px] text-cyan-400 font-mono">Fallback Iridium Ping</span>
              </div>
            </div>

            {/* Mesh Node Telemetry Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-dark-border text-dark-muted uppercase text-[10px]">
                    <th className="py-2.5 px-3">Node ID</th>
                    <th className="py-2.5 px-3">Sector Location</th>
                    <th className="py-2.5 px-3">Gateway Node</th>
                    <th className="py-2.5 px-3">Battery</th>
                    <th className="py-2.5 px-3">Sensors Active</th>
                    <th className="py-2.5 px-3 text-right">Uplink Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/60 text-slate-300">
                  <tr className="hover:bg-dark-card/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white">NODE-WY-01</td>
                    <td className="py-3.5 px-3">Wayanad Meppadi Ridge</td>
                    <td className="py-3.5 px-3 text-cyan-400">GW-Vellarimala-01</td>
                    <td className="py-3.5 px-3 text-emerald-400 font-bold">96% (Solar)</td>
                    <td className="py-3.5 px-3">TDR + Piezo + Inclinometer</td>
                    <td className="py-3.5 px-3 text-right"><span className="text-rose-400 font-bold">🔴 ALERT STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-dark-card/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white">NODE-JM-02</td>
                    <td className="py-3.5 px-3">Joshimath Marwari Slope</td>
                    <td className="py-3.5 px-3 text-cyan-400">GW-Chamoli-04</td>
                    <td className="py-3.5 px-3 text-emerald-400 font-bold">92% (Solar)</td>
                    <td className="py-3.5 px-3">Borehole Tilt + ARG</td>
                    <td className="py-3.5 px-3 text-right"><span className="text-rose-400 font-bold">🔴 ALERT STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-dark-card/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white">NODE-SH-03</td>
                    <td className="py-3.5 px-3">Shimla Summer Hill</td>
                    <td className="py-3.5 px-3 text-cyan-400">GW-Kalka-Shimla-02</td>
                    <td className="py-3.5 px-3 text-emerald-400 font-bold">88% (Solar)</td>
                    <td className="py-3.5 px-3">Acoustic + Tipping Bucket</td>
                    <td className="py-3.5 px-3 text-right"><span className="text-orange-400 font-bold">🟠 HIGH STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-dark-card/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white">NODE-NL-10</td>
                    <td className="py-3.5 px-3">Nilgiris Coonoor Tea Flank</td>
                    <td className="py-3.5 px-3 text-cyan-400">GW-Ooty-Ghat-01</td>
                    <td className="py-3.5 px-3 text-emerald-400 font-bold">99% (Solar)</td>
                    <td className="py-3.5 px-3">Smart Weather Node</td>
                    <td className="py-3.5 px-3 text-right"><span className="text-emerald-400 font-bold">🟢 NOMINAL</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Alerts Feed Table */}
      <div className="p-6 rounded-2xl glass-panel border border-dark-border space-y-4">
        <div className="flex items-center justify-between border-b border-dark-border pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white font-display">Recent Disaster Early Warning Alerts</h3>
          </div>
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setActivePage('alerts');
            }}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Alerts Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-dark-border/60">
          {ACTIVE_ALERTS.map((alert) => (
            <div key={alert.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${alert.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-dark-muted">{alert.id}</span>
                    <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="sm" />
                    <span className="text-xs font-mono text-dark-muted">• {alert.issuedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{alert.title}</h4>
                  <p className="text-xs text-dark-muted line-clamp-1 mt-0.5">{alert.headline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => {
                    soundManager?.playAlert?.();
                    onOpenEmergencyModal();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono transition-colors cursor-pointer shadow-sm"
                >
                  Broadcast CAP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
