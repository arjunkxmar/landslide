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
  Satellite
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import RiskGauge from '../components/common/RiskGauge';
import { ACTIVE_ALERTS } from '../data/alertData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { soundManager } from '../utils/soundEffects';
import { useLandslideContext } from '../context/LandslideContext';

export default function DashboardPage({ onOpenEmergencyModal, setActivePage }) {
  const { updateDashboardTelemetry } = useLandslideContext();
  // Live Streaming state
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [pulseTick, setPulseTick] = useState(0);
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'lora_mesh'

  // Telemetry metrics
  const [telemetry, setTelemetry] = useState({
    rainfall: 142,
    soilMoisture: 78,
    temperature: 22,
    humidity: 89,
    slopeStability: 'Critical Strain (4.8mm)',
    shearDisplacement: 4.8,
    riskScore: 87,
    porePressure: '138 kPa',
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
        const rainDelta = (Math.random() * 1.6 - 0.6);
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
          shearDisplacement: Math.round((prev.shearDisplacement + 0.02) * 100) / 100,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              National Disaster Operations Center
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              148 IoT Nodes Synced
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1">
            <Activity className="w-7 h-7 text-cyan-400" />
            Real-Time Monitoring Dashboard 📊
          </h1>
        </div>

        {/* Live Streaming Toggle Controller */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {isLiveStreaming ? (
              <>
                <Radio className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>LIVE STREAM ACTIVE</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 text-amber-400" />
                <span>STREAM PAUSED</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>DISPATCH CAP</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher: Sensor Telemetry vs LoRaWAN Mesh Network Health */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`pb-2 font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === 'telemetry'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Sensor Telemetry Stream
        </button>
        <button
          onClick={() => setActiveTab('lora_mesh')}
          className={`pb-2 font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'lora_mesh'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>LoRaWAN Mesh Network Diagnostics</span>
        </button>
      </div>

      {activeTab === 'telemetry' ? (
        <>
          {/* Primary Key Statistic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Rainfall */}
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <CloudRain className="w-4 h-4" />
                  RAINFALL (24H)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  HEAVY
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {telemetry.rainfall} <span className="text-base text-cyan-400 font-sans">mm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (telemetry.rainfall / 160) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>Threshold: 100 mm</span>
                <span className="text-rose-400 font-bold">+18 mm past 4h</span>
              </div>
            </div>

            {/* 2. Soil Moisture */}
            <div className="p-4 rounded-2xl glass-panel border border-blue-500/30 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Droplets className="w-4 h-4" />
                  SOIL MOISTURE
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  SATURATED
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {telemetry.soilMoisture} <span className="text-base text-blue-400 font-sans">%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${telemetry.soilMoisture}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>Pore Limit: 75%</span>
                <span className="text-rose-400 font-bold">Pore pressure surge</span>
              </div>
            </div>

            {/* 3. Temperature */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <Thermometer className="w-4 h-4" />
                  TEMPERATURE
                </span>
                <span className="text-[10px] font-mono text-slate-400">AMB</span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {telemetry.temperature} <span className="text-base text-slate-400 font-sans">°C</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-rose-400 h-full" style={{ width: '48%' }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>Mountain Ambient</span>
                <span className="text-slate-300">Stable</span>
              </div>
            </div>

            {/* 4. Humidity */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Wind className="w-4 h-4" />
                  HUMIDITY
                </span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono">
                  HIGH
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {telemetry.humidity} <span className="text-base text-cyan-300 font-sans">%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${telemetry.humidity}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>RH Sensor</span>
                <span className="text-cyan-400">Dew Point: 20.8°C</span>
              </div>
            </div>

            {/* 5. Slope Stability / Inclinometer */}
            <div className="p-4 rounded-2xl glass-panel border border-rose-500/40 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <Mountain className="w-4 h-4" />
                  INCLINOMETER
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold animate-pulse">
                  CREEP
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-rose-400 tracking-tight">
                {telemetry.shearDisplacement} <span className="text-base text-slate-300 font-sans">mm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-rose-500 h-full" style={{ width: '82%' }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-rose-400 font-mono mt-2">
                <span>Borehole Tilt 42m</span>
                <span>Lateral Shear</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Big Risk Meter + 24h Timeline Chart + Regional Station Ranking */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Overall Regional Risk Meter */}
            <div className="lg:col-span-4 p-6 rounded-2xl glass-critical-glow border border-rose-500/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Composite Threat Index
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Regional Hazard Rating
                    </h3>
                  </div>
                  <RiskBadge level="CRITICAL" score={telemetry.riskScore} size="md" />
                </div>

                <div className="my-4 flex justify-center">
                  <RiskGauge score={telemetry.riskScore} size={250} />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/30 text-xs space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Target Corridor:</span>
                    <span className="text-white font-bold">Wayanad Meppadi Ridge</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Hydraulic Pressure:</span>
                    <span className="text-rose-400 font-bold">{telemetry.porePressure}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Pore Failure Probability:</span>
                    <span className="text-rose-400 font-bold">92.4%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenEmergencyModal}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>SOUND LOCAL EVACUATION SIRENS</span>
                </button>
              </div>
            </div>

            {/* Right Column: 24h Timeline Chart & Multi-Station Comparison */}
            <div className="lg:col-span-8 space-y-6">
              {/* 24-Hour Telemetry Timeline Chart (Custom SVG Data Visualization) */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>24-Hour Rainfall vs. Soil Moisture & Risk Trajectory</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Real-time telemetry showing inflection points where rainfall crosses safe geotechnical thresholds
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Rain (mm)
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Moisture (%)
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Risk Score
                    </span>
                  </div>
                </div>

                {/* Visual SVG Timeline Chart */}
                <div className="relative h-64 w-full pt-4">
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
                    <line x1="50" y1="30" x2="680" y2="30" stroke="#1e293b" strokeDasharray="4" />
                    <line x1="50" y1="80" x2="680" y2="80" stroke="#1e293b" strokeDasharray="4" />
                    <line x1="50" y1="130" x2="680" y2="130" stroke="#1e293b" strokeDasharray="4" />
                    <line x1="50" y1="180" x2="680" y2="180" stroke="#334155" />

                    {/* Evacuation Danger Threshold Line */}
                    <line x1="50" y1="65" x2="680" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6" opacity="0.6" />
                    <text x="590" y="60" fill="#ef4444" fontSize="10" fontFamily="monospace">DANGER THRESHOLD (75%)</text>

                    {/* Y-Axis Labels */}
                    <text x="25" y="34" fill="#64748b" fontSize="10" fontFamily="monospace">150</text>
                    <text x="25" y="84" fill="#64748b" fontSize="10" fontFamily="monospace">100</text>
                    <text x="25" y="134" fill="#64748b" fontSize="10" fontFamily="monospace">50</text>
                    <text x="25" y="184" fill="#64748b" fontSize="10" fontFamily="monospace">0</text>

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
                          <text x={x} y="202" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                            {d.time}
                          </text>
                          <circle cx={x} cy={180 - (d.rain / 160) * 150} r="4" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
                          <circle cx={x} cy={180 - (d.risk / 100) * 150} r="4" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Regional Risk Bar Comparison */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Active Regional Stations Risk Comparison</span>
                  </h3>
                  <button
                    onClick={() => setActivePage('map')}
                    className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View on Map</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {LOCATIONS_DATA.slice(0, 5).map((station) => (
                    <div key={station.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 font-sans font-semibold truncate max-w-[200px] sm:max-w-none">
                          {station.name} ({station.state})
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{station.rainfall24h}mm rain</span>
                          <span className="font-bold font-mono text-white">{station.riskScore}%</span>
                          <RiskBadge level={station.riskLevel} size="sm" />
                        </div>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full transition-all duration-500 ${
                            station.riskLevel === 'CRITICAL' ? 'bg-rose-500' :
                            station.riskLevel === 'HIGH' ? 'bg-orange-500' :
                            station.riskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
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
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Mountain Valley LoRaWAN Mesh Architecture (865-867 MHz Band)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ultra-low power telemetry propagation in GPS-denied and cellular dead zones
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                Mesh Connectivity: 99.8% Healthy
              </span>
            </div>

            {/* Diagnostic Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Signal Strength (RSSI)</span>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-1">-82 dBm</div>
                <span className="text-[10px] text-emerald-400 font-mono">Optimal Propagation</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Signal-to-Noise (SNR)</span>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">+9.4 dB</div>
                <span className="text-[10px] text-slate-400 font-mono">Low Rain Attenuation</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Solar LiFePO4 Voltage</span>
                <div className="text-xl font-bold font-mono text-amber-400 mt-1">3.64 V</div>
                <span className="text-[10px] text-emerald-400 font-mono">Trickle Charging</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Packet Latency</span>
                <div className="text-xl font-bold font-mono text-purple-400 mt-1">140 ms</div>
                <span className="text-[10px] text-cyan-400 font-mono">Fallback Iridium Ping</span>
              </div>
            </div>

            {/* Mesh Node Telemetry Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Node ID</th>
                    <th className="py-2.5 px-3">Sector Location</th>
                    <th className="py-2.5 px-3">Gateway Node</th>
                    <th className="py-2.5 px-3">Battery</th>
                    <th className="py-2.5 px-3">Sensors Active</th>
                    <th className="py-2.5 px-3 text-right">Uplink Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white">NODE-WY-01</td>
                    <td className="py-3 px-3">Wayanad Meppadi Ridge</td>
                    <td className="py-3 px-3 text-cyan-400">GW-Vellarimala-01</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">96% (Solar)</td>
                    <td className="py-3 px-3">TDR + Piezo + Inclinometer</td>
                    <td className="py-3 px-3 text-right"><span className="text-rose-400 font-bold">🔴 ALERT STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white">NODE-JM-02</td>
                    <td className="py-3 px-3">Joshimath Marwari Slope</td>
                    <td className="py-3 px-3 text-cyan-400">GW-Chamoli-04</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">92% (Solar)</td>
                    <td className="py-3 px-3">Borehole Tilt + ARG</td>
                    <td className="py-3 px-3 text-right"><span className="text-rose-400 font-bold">🔴 ALERT STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white">NODE-SH-03</td>
                    <td className="py-3 px-3">Shimla Summer Hill</td>
                    <td className="py-3 px-3 text-cyan-400">GW-Kalka-Shimla-02</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">88% (Solar)</td>
                    <td className="py-3 px-3">Acoustic + Tipping Bucket</td>
                    <td className="py-3 px-3 text-right"><span className="text-orange-400 font-bold">🟠 HIGH STREAM</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white">NODE-NL-10</td>
                    <td className="py-3 px-3">Nilgiris Coonoor Tea Flank</td>
                    <td className="py-3 px-3 text-cyan-400">GW-Ooty-Ghat-01</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">99% (Solar)</td>
                    <td className="py-3 px-3">Smart Weather Node</td>
                    <td className="py-3 px-3 text-right"><span className="text-emerald-400 font-bold">🟢 NOMINAL</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Alerts Feed Table */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Recent Disaster Early Warning Alerts</h3>
          </div>
          <button
            onClick={() => setActivePage('alerts')}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Alerts Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-800">
          {ACTIVE_ALERTS.map((alert) => (
            <div key={alert.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${alert.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{alert.id}</span>
                    <RiskBadge level={alert.riskLevel} score={alert.riskScore} size="sm" />
                    <span className="text-xs font-mono text-slate-500">• {alert.issuedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{alert.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{alert.headline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={onOpenEmergencyModal}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Broadcast
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
