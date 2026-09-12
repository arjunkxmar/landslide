import React, { useState, useEffect, useCallback } from 'react';
import { calculateLandslideRisk, PRESET_SCENARIOS } from '../utils/riskEngine';
import { fetchLiveWeatherData } from '../utils/weatherApi';
import { LOCATIONS_DATA } from '../data/locationsData';
import RiskGauge from '../components/common/RiskGauge';
import RiskBadge from '../components/common/RiskBadge';
import LiveWeatherCard from '../components/common/LiveWeatherCard';
import { 
  Sparkles, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Info, 
  RotateCcw, 
  ShieldAlert, 
  Send,
  CloudRain,
  Droplets,
  Mountain,
  Thermometer,
  Wind,
  History,
  GitCompare,
  Printer,
  TrendingUp,
  MapPin,
  Navigation,
  RefreshCw,
  Gauge,
  Activity,
  Zap
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function PredictionPage({ onOpenEmergencyModal }) {
  // Selected Station or Custom Coordinates
  const [selectedStationId, setSelectedStationId] = useState(LOCATIONS_DATA[0].id);
  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const [customCoords, setCustomCoords] = useState({
    lat: LOCATIONS_DATA[0].lat,
    lng: LOCATIONS_DATA[0].lng,
    name: 'Custom Target Sector'
  });

  // Live Open-Meteo API state
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [autoSyncWithLive, setAutoSyncWithLive] = useState(true);

  // Environmental Input states (initialized from default station or live API)
  const [formData, setFormData] = useState({
    rainfall: 142,
    soilMoisture: 78,
    slopeAngle: 48,
    temperature: 21.4,
    humidity: 96,
    surfacePressure: 1013,
    precipitation: 0,
    history: 'high'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() => calculateLandslideRisk({
    rainfall: 142,
    soilMoisture: 78,
    slopeAngle: 48,
    temperature: 21.4,
    humidity: 96,
    surfacePressure: 1013,
    precipitation: 0,
    history: 'high'
  }));

  // Compare Scenario Mode (What-If Stress Testing)
  const [compareMode, setCompareMode] = useState(false);
  const [compareData, setCompareData] = useState({
    rainfall: 195, // +53mm storm cloudburst
    soilMoisture: 92,
    slopeAngle: 48,
    temperature: 20,
    humidity: 95,
    surfacePressure: 985,
    precipitation: 15,
    history: 'high'
  });

  const compareResult = calculateLandslideRisk(compareData);

  // Active target details
  const activeStation = LOCATIONS_DATA.find(l => l.id === selectedStationId) || LOCATIONS_DATA[0];
  const activeLat = isCustomLocation ? customCoords.lat : activeStation.lat;
  const activeLng = isCustomLocation ? customCoords.lng : activeStation.lng;
  const activeName = isCustomLocation ? customCoords.name : `${activeStation.name} (${activeStation.state})`;

  // Function to fetch live weather from Open-Meteo and sync with the model
  const loadLiveWeather = useCallback(async (lat, lng, locationLabel, autoApply = true) => {
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const result = await fetchLiveWeatherData(lat, lng);
      setWeatherData(result);

      if (autoApply) {
        const liveDailyRain = result.derived?.dailyRainfall ?? 0;
        const liveRain = result.current?.rain ?? 0;
        const livePrecip = result.current?.precipitation ?? 0;
        const effectiveRain = Math.max(liveDailyRain, liveRain * 6, livePrecip * 6);
        const liveSoilMoisture = result.derived?.soilMoisturePercent ?? 50;
        const liveHumidity = result.current?.relative_humidity_2m ?? 60;
        const liveTemp = result.current?.temperature_2m ?? 22;
        const livePressure = result.current?.surface_pressure ?? 1013;

        setFormData(prev => {
          const updated = {
            ...prev,
            rainfall: Math.round(effectiveRain > 0 ? effectiveRain : prev.rainfall),
            soilMoisture: liveSoilMoisture,
            humidity: liveHumidity,
            temperature: Math.round(liveTemp * 10) / 10,
            surfacePressure: Math.round(livePressure),
            precipitation: livePrecip
          };

          const prediction = calculateLandslideRisk(updated);
          setAnalysisResult(prediction);
          return updated;
        });
      }
    } catch (err) {
      console.error('Failed to fetch Open-Meteo weather data:', err);
      setWeatherError(err.message || 'Unable to communicate with Open-Meteo API.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  // Fetch live weather when station or coordinates change
  useEffect(() => {
    loadLiveWeather(activeLat, activeLng, activeName, autoSyncWithLive);
  }, [activeLat, activeLng, activeName, loadLiveWeather, autoSyncWithLive]);

  // Handle Station Dropdown selection
  const handleStationChange = (e) => {
    const value = e.target.value;
    soundManager?.playClick?.();
    if (value === 'CUSTOM') {
      setIsCustomLocation(true);
    } else {
      setIsCustomLocation(false);
      setSelectedStationId(value);
      const st = LOCATIONS_DATA.find(l => l.id === value);
      if (st) {
        setFormData(prev => ({
          ...prev,
          slopeAngle: st.slopeAngle,
          history: st.riskLevel === 'CRITICAL' ? 'high' : (st.riskLevel === 'HIGH' ? 'moderate' : 'low')
        }));
      }
    }
  };

  // Detect user's current GPS location
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    soundManager?.playClick?.();
    setWeatherLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setIsCustomLocation(true);
        setCustomCoords({
          lat,
          lng,
          name: `My GPS Location (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`
        });
        loadLiveWeather(lat, lng, 'My GPS Coordinates', true);
      },
      (err) => {
        setWeatherLoading(false);
        alert(`Geolocation error: ${err.message}`);
      }
    );
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePresetSelect = (preset) => {
    soundManager?.playClick?.();
    setFormData(prev => ({
      ...prev,
      ...preset.data
    }));
    setAnalysisResult(calculateLandslideRisk({
      ...formData,
      ...preset.data
    }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    soundManager?.playClick?.();

    setTimeout(() => {
      const result = calculateLandslideRisk(formData);
      setAnalysisResult(result);
      setIsAnalyzing(false);

      if (result.score >= 76) {
        soundManager?.playCriticalWarning?.();
      } else {
        soundManager?.playAlert?.();
      }
    }, 600);
  };

  const handleReset = () => {
    soundManager?.playClick?.();
    const defaultData = {
      rainfall: 25,
      soilMoisture: 35,
      slopeAngle: 25,
      temperature: 22,
      humidity: 55,
      surfacePressure: 1013,
      precipitation: 0,
      history: 'none'
    };
    setFormData(defaultData);
    setAnalysisResult(calculateLandslideRisk(defaultData));
  };

  const handlePrintDossier = () => {
    soundManager?.playClick?.();
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-border pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Geotechnical Machine Learning Simulator
            </span>
            <span className="text-xs text-dark-muted">•</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open-Meteo Global Forecast API Synced
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1.5 font-display">
            <Sparkles className="w-7 h-7 text-purple-400" />
            AI Landslide Risk Simulator & Prediction Engine
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl">
            Simulate geotechnical failure conditions, test what-if cloudburst scenarios, and compute dynamic Factor of Safety (FoS) ratings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {/* Compare Mode Toggle */}
          <button
            onClick={() => {
              soundManager?.playClick?.();
              setCompareMode(!compareMode);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
              compareMode
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                : 'bg-dark-card border-dark-border text-slate-300 hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{compareMode ? 'Exit Stress Test' : 'What-If Stress Test'}</span>
          </button>

          <button
            onClick={handlePrintDossier}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border text-slate-300 hover:text-white text-xs font-mono hover:border-dark-hover transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Dossier</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border text-dark-muted hover:text-white text-xs font-mono hover:border-dark-hover transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Dynamic Location & Coordinates Selector Bar */}
      <div className="p-5 rounded-2xl glass-panel border border-dark-border space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Select Target Location for Live Atmospheric Telemetry:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDetectLocation}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-dark-bg border border-dark-border hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
              title="Use your device GPS coordinates"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Detect My GPS Coordinates</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Station dropdown */}
          <div className="md:col-span-6">
            <select
              value={isCustomLocation ? 'CUSTOM' : selectedStationId}
              onChange={handleStationChange}
              className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <optgroup label="Monitored Landslide Hazard Stations (India)">
                {LOCATIONS_DATA.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.state} ({loc.lat}°N, {loc.lng}°E)
                  </option>
                ))}
              </optgroup>
              <option value="CUSTOM">Custom Latitude & Longitude Coordinates...</option>
            </select>
          </div>

          {/* Coordinates readout or custom inputs */}
          {isCustomLocation ? (
            <div className="md:col-span-6 flex items-center gap-2">
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={customCoords.lat}
                onChange={(e) => setCustomCoords(prev => ({ ...prev, lat: parseFloat(e.target.value) || 0 }))}
                className="w-1/2 px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs font-mono text-white"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={customCoords.lng}
                onChange={(e) => setCustomCoords(prev => ({ ...prev, lng: parseFloat(e.target.value) || 0 }))}
                className="w-1/2 px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs font-mono text-white"
              />
              <button
                type="button"
                onClick={() => {
                  soundManager?.playClick?.();
                  loadLiveWeather(customCoords.lat, customCoords.lng, customCoords.name, true);
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shrink-0 cursor-pointer transition-colors"
              >
                Fetch
              </button>
            </div>
          ) : (
            <div className="md:col-span-6 flex items-center justify-between text-xs font-mono text-dark-muted bg-dark-bg px-4 py-2.5 rounded-xl border border-dark-border">
              <span>Coordinates: {activeLat.toFixed(4)}°N, {activeLng.toFixed(4)}°E</span>
              <span className="text-cyan-400 font-semibold">{activeStation.region}</span>
            </div>
          )}
        </div>
      </div>

      {/* Live Open-Meteo Weather Telemetry Card */}
      <LiveWeatherCard
        weatherData={weatherData}
        loading={weatherLoading}
        error={weatherError}
        onRefresh={() => loadLiveWeather(activeLat, activeLng, activeName, true)}
        locationName={activeName}
        coordinates={{ lat: activeLat, lng: activeLng }}
      />

      {/* Preset Scenario Shortcuts for Stress-Testing */}
      <div className="p-5 rounded-2xl glass-panel border border-dark-border space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-dark-muted">
          <span className="uppercase font-bold tracking-wider text-slate-300">Geotechnical Stress-Testing Benchmarks:</span>
          <span>Click to simulate synthetic extreme conditions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCENARIOS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetSelect(preset)}
              className="p-3.5 rounded-xl bg-dark-bg/80 border border-dark-border hover:border-cyan-500/50 hover:bg-dark-card text-left transition-all group cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 font-display">
                {preset.name}
              </div>
              <div className="text-[11px] text-dark-muted line-clamp-1 mt-1">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* What-If Stress Testing Compare Banner */}
      {compareMode && (
        <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/40 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple-300 font-bold uppercase flex items-center gap-1.5">
              <GitCompare className="w-4 h-4 text-purple-400" />
              What-If Comparative Scenario: Baseline Telemetry vs. Severe Cloudburst (+53 mm)
            </span>
            <span className="text-purple-400 font-bold">Delta: +{compareResult.score - analysisResult.score}% Hazard Surge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-dark-muted block uppercase">Current Calibrated Score</span>
                <span className="text-2xl font-black font-mono text-white mt-0.5">{analysisResult.score}%</span>
              </div>
              <RiskBadge level={analysisResult.riskInfo.level} score={analysisResult.score} size="md" />
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-300 block uppercase">Storm Cloudburst (+53mm)</span>
                <span className="text-2xl font-black font-mono text-rose-400 mt-0.5">{compareResult.score}%</span>
              </div>
              <RiskBadge level={compareResult.riskInfo.level} score={compareResult.score} size="md" />
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Input Form + Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Environmental Factor Input Form */}
        <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border border-dark-border space-y-6">
          <div className="flex items-center justify-between border-b border-dark-border pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Multi-Factor Environmental Parameters</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Live Synchronized
            </span>
          </div>

          <div className="space-y-6">
            {/* 1. Rainfall (mm) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200 flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-cyan-400" />
                  <span>Rainfall Intensity (24h Load)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 hidden sm:inline">Open-Meteo Feed</span>
                  <div className="font-mono font-bold text-white text-sm bg-dark-bg px-2.5 py-0.5 rounded-md border border-dark-border">
                    {formData.rainfall} <span className="text-xs text-cyan-400">mm</span>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="2"
                value={formData.rainfall}
                onChange={(e) => handleInputChange('rainfall', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-dark-bg rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-dark-muted">
                <span>0 mm (Dry)</span>
                <span>80 mm (Heavy Rainfall)</span>
                <span>150+ mm (Cloudburst Warning)</span>
              </div>
            </div>

            {/* 2. Soil Moisture (%) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span>Soil Moisture Saturation (0-1cm)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-blue-400 hidden sm:inline">VWC Telemetry</span>
                  <div className="font-mono font-bold text-white text-sm bg-dark-bg px-2.5 py-0.5 rounded-md border border-dark-border">
                    {formData.soilMoisture} <span className="text-xs text-blue-400">%</span>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.soilMoisture}
                onChange={(e) => handleInputChange('soilMoisture', Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer h-2 bg-dark-bg rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-dark-muted">
                <span>0% (Bone Dry)</span>
                <span>50% (Normal Moisture)</span>
                <span>85%+ (Pore Saturation Surge)</span>
              </div>
            </div>

            {/* 3. Slope Angle (degrees) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200 flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-amber-400" />
                  <span>Slope Angle / Topographic Gradient</span>
                </label>
                <div className="font-mono font-bold text-white text-sm bg-dark-bg px-2.5 py-0.5 rounded-md border border-dark-border">
                  {formData.slopeAngle} <span className="text-xs text-amber-400">°</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="75"
                step="1"
                value={formData.slopeAngle}
                onChange={(e) => handleInputChange('slopeAngle', Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-dark-bg rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-dark-muted">
                <span>0° (Flat)</span>
                <span>30° (Moderate Incline)</span>
                <span>55°+ (Precipitous Cliff)</span>
              </div>
            </div>

            {/* 4. Temperature & Humidity in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                    <span>Temperature</span>
                  </label>
                  <div className="font-mono font-bold text-white text-xs bg-dark-bg px-2 py-0.5 rounded border border-dark-border">
                    {formData.temperature} °C
                  </div>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="45"
                  step="1"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer h-2 bg-dark-bg rounded-lg appearance-none"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Relative Humidity</span>
                  </label>
                  <div className="font-mono font-bold text-white text-xs bg-dark-bg px-2 py-0.5 rounded border border-dark-border">
                    {formData.humidity} %
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-dark-bg rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Barometric Surface Pressure Meter (from Open-Meteo) */}
            <div className="p-3.5 rounded-xl bg-dark-bg/80 border border-dark-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Surface Pressure (Barometric Head):</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400">{formData.surfacePressure} hPa</span>
                {formData.surfacePressure < 1000 && (
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                    Low Depression
                  </span>
                )}
              </div>
            </div>

            {/* 5. Previous Landslide Activity */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                <span>Historical Landslide Frequency in Sector</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'None Recorded', desc: 'Stable Bedrock' },
                  { id: 'low', label: 'Low / Minor', desc: 'Old Creep Slips' },
                  { id: 'moderate', label: 'Moderate', desc: 'Seasonal Slumps' },
                  { id: 'high', label: 'High / Severe', desc: 'Frequent Slides' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundManager?.playClick?.();
                      handleInputChange('history', item.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.history === item.id
                        ? 'bg-purple-500/20 border-purple-400 text-white shadow-sm'
                        : 'bg-dark-bg/80 border-dark-border text-dark-muted hover:border-dark-hover'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono">{item.label}</div>
                    <div className="text-[10px] opacity-75 font-mono mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Large Analyze Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleAnalyze}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-black tracking-wide text-sm shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3 font-mono"
              >
                {isAnalyzing ? (
                  <>
                    <Cpu className="w-5 h-5 animate-spin text-white" />
                    <span>SYNTHESIZING ENVIRONMENTAL VECTORS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>RUN GEOTECHNICAL RISK INFERENCE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Analysis Result & Recommended Action */}
        <div className="lg:col-span-6 space-y-6">
          {analysisResult && (
            <div className={`p-6 rounded-2xl border transition-all duration-500 ${
              analysisResult.score >= 76 
                ? 'glass-critical-glow border-rose-500/40' 
                : 'glass-panel border-dark-border'
            }`}>
              {/* Result Header */}
              <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono text-dark-muted uppercase tracking-wider">
                    Geotechnical Model Output
                  </span>
                  <div className="flex items-center gap-2.5 mt-1">
                    <h2 className="text-2xl font-black text-white font-display">
                      {analysisResult.riskInfo.icon} {analysisResult.riskInfo.label}
                    </h2>
                  </div>
                </div>

                <RiskBadge 
                  level={analysisResult.riskInfo.level} 
                  score={analysisResult.score} 
                  size="lg" 
                />
              </div>

              {/* Animated Risk Gauge */}
              <div className="flex justify-center my-2">
                <RiskGauge score={analysisResult.score} size={280} />
              </div>

              {/* Factor Breakdown Explanation Bars */}
              <div className="space-y-3 mt-6 pt-5 border-t border-dark-border">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                  Key Factor Contributions & Vulnerability:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Rainfall breakdown */}
                  <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-dark-muted">Rainfall Load</span>
                      <span className={analysisResult.breakdown.rainfall.isWarning ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        {analysisResult.breakdown.rainfall.status}
                      </span>
                    </div>
                    <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                        style={{ width: `${(analysisResult.breakdown.rainfall.score / 35) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-dark-muted font-mono mt-1.5">
                      Weight: {analysisResult.breakdown.rainfall.score} / 35 pts ({analysisResult.breakdown.rainfall.value} mm)
                    </div>
                  </div>

                  {/* Soil Moisture breakdown */}
                  <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-dark-muted">Soil Saturation</span>
                      <span className={analysisResult.breakdown.soilMoisture.isWarning ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        {analysisResult.breakdown.soilMoisture.status}
                      </span>
                    </div>
                    <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-400 h-full transition-all duration-700 shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                        style={{ width: `${(analysisResult.breakdown.soilMoisture.score / 30) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-dark-muted font-mono mt-1.5">
                      Weight: {analysisResult.breakdown.soilMoisture.score} / 30 pts ({analysisResult.breakdown.soilMoisture.value}%)
                    </div>
                  </div>

                  {/* Slope breakdown */}
                  <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-dark-muted">Slope Gradient</span>
                      <span className={analysisResult.breakdown.slopeAngle.isWarning ? 'text-orange-400 font-bold' : 'text-slate-300'}>
                        {analysisResult.breakdown.slopeAngle.status}
                      </span>
                    </div>
                    <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full transition-all duration-700" 
                        style={{ width: `${(analysisResult.breakdown.slopeAngle.score / 20) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-dark-muted font-mono mt-1.5">
                      Weight: {analysisResult.breakdown.slopeAngle.score} / 20 pts ({analysisResult.breakdown.slopeAngle.value}°)
                    </div>
                  </div>

                  {/* Historical Activity */}
                  <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-dark-muted">Historical Fault</span>
                      <span className={analysisResult.breakdown.historicalActivity.isWarning ? 'text-purple-400 font-bold' : 'text-slate-300'}>
                        {analysisResult.breakdown.historicalActivity.status}
                      </span>
                    </div>
                    <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-400 h-full transition-all duration-700" 
                        style={{ width: `${(analysisResult.breakdown.historicalActivity.score / 15) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-dark-muted font-mono mt-1.5">
                      Weight: {analysisResult.breakdown.historicalActivity.score} / 15 pts
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Action Box */}
              <div className="mt-5 p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Recommended Disaster Protocol (NDMA / SDMA):</span>
                </div>
                <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                  {analysisResult.recommendedAction}
                </p>
                <div className="text-xs text-dark-muted pt-1 font-mono">
                  {analysisResult.riskInfo.defaultAction}
                </div>
              </div>

              {/* Action Button for Emergency Simulation */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    soundManager?.playAlert?.();
                    if (onOpenEmergencyModal) {
                      onOpenEmergencyModal({
                        title: `LIVE EARLY WARNING: ${analysisResult.riskInfo.label}`,
                        location: activeName,
                        riskScore: analysisResult.score,
                        riskLevel: analysisResult.riskInfo.level,
                        details: `Telemetry synced from Open-Meteo: Rain ${formData.rainfall}mm, Topsoil Moisture ${formData.soilMoisture}%, Slope ${formData.slopeAngle}°. Immediate preventive action recommended.`
                      });
                    }
                  }}
                  className="w-full py-3.5 rounded-xl bg-risk-critical hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer border border-rose-400/30 font-mono"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH EMERGENCY ALERT FOR THIS LOCATION</span>
                </button>
              </div>

              {/* Architecture Separation Notice */}
              <div className="mt-4 p-3 rounded-xl bg-dark-bg/60 border border-dark-border text-[11px] text-dark-muted flex items-start gap-2 font-mono">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Architecture Note:</strong> Atmospheric parameters (precipitation, rain, relative humidity, surface pressure, soil moisture 0-1cm) are fetched live from the Open-Meteo API. Landslide risk index and alert recommendations are computed exclusively by LandslideGuard AI's geotechnical risk engine.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
