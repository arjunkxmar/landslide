import React, { useState, useMemo, useEffect, useCallback } from 'react';
import RiskMap from '../components/map/RiskMap';
import { LOCATIONS_DATA, REGIONAL_STATS } from '../data/locationsData';
import RiskBadge from '../components/common/RiskBadge';
import LiveWeatherCard from '../components/common/LiveWeatherCard';
import { fetchLiveWeatherData } from '../utils/weatherApi';
import { calculateLandslideRisk } from '../utils/riskEngine';
import { 
  Search, 
  Filter, 
  Layers, 
  Compass, 
  AlertTriangle, 
  Maximize2, 
  Minimize2, 
  Radio, 
  ShieldAlert, 
  RefreshCw, 
  ExternalLink, 
  SlidersHorizontal, 
  Mountain, 
  Eye, 
  X, 
  TrendingDown,
  CloudRain,
  Droplets,
  Gauge
} from 'lucide-react';

export default function MapPage({ onOpenEmergencyModal }) {
  const [locations, setLocations] = useState(LOCATIONS_DATA);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [activeLayer, setActiveLayer] = useState('dark'); // 'dark' | 'satellite' | 'terrain'
  const [slopeProfileModalOpen, setSlopeProfileModalOpen] = useState(false);

  // Live Open-Meteo Weather state for selected station
  const [liveWeather, setLiveWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Fetch live weather from Open-Meteo for the active station
  const loadStationWeather = useCallback(async (loc) => {
    if (!loc || loc.lat === undefined || loc.lng === undefined) return;
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const res = await fetchLiveWeatherData(loc.lat, loc.lng);
      setLiveWeather(res);
    } catch (err) {
      console.error('MapPage live weather fetch error:', err);
      setWeatherError(err.message || 'Failed to fetch live weather from Open-Meteo.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      loadStationWeather(selectedLocation);
    }
  }, [selectedLocation, loadStationWeather]);

  // Dynamically calculate landslide risk using live Open-Meteo weather parameters
  const liveRisk = useMemo(() => {
    if (!selectedLocation || !liveWeather) return null;
    const effectiveRain = Math.max(
      liveWeather.derived?.dailyRainfall ?? 0,
      (liveWeather.current?.rain ?? 0) * 6,
      (liveWeather.current?.precipitation ?? 0) * 6
    );
    return calculateLandslideRisk({
      rainfall: effectiveRain,
      precipitation: liveWeather.current?.precipitation ?? 0,
      soilMoisture: liveWeather.derived?.soilMoisturePercent ?? selectedLocation.soilMoisture,
      slopeAngle: selectedLocation.slopeAngle,
      temperature: liveWeather.current?.temperature_2m ?? 22,
      humidity: liveWeather.current?.relative_humidity_2m ?? 60,
      surfacePressure: liveWeather.current?.surface_pressure ?? 1013,
      history: selectedLocation.riskLevel === 'CRITICAL' ? 'high' : (selectedLocation.riskLevel === 'HIGH' ? 'moderate' : 'low')
    });
  }, [selectedLocation, liveWeather]);

  // Computed counts
  const riskCounts = useMemo(() => {
    return {
      total: locations.length,
      critical: locations.filter(l => l.riskLevel === 'CRITICAL').length,
      high: locations.filter(l => l.riskLevel === 'HIGH').length,
      moderate: locations.filter(l => l.riskLevel === 'MODERATE').length,
      low: locations.filter(l => l.riskLevel === 'LOW').length
    };
  }, [locations]);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesRisk = selectedRiskFilter === 'ALL' || loc.riskLevel === selectedRiskFilter;
      const matchesSearch = 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRisk && matchesSearch;
    });
  }, [locations, selectedRiskFilter, searchQuery]);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
  };

  const handleTriggerAlert = (loc) => {
    if (onOpenEmergencyModal) {
      onOpenEmergencyModal(loc);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Geospatial Hazard Intelligence
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400">100% GIS Synchronized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1">
            <Compass className="w-7 h-7 text-cyan-400" />
            Live Landslide Risk Map 🗺️
          </h1>
        </div>

        {/* Layer Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <Layers className="w-4 h-4 text-slate-400 ml-1.5" />
          <span className="text-xs font-mono text-slate-400 mr-1">Layer:</span>
          {[
            { id: 'dark', label: 'Dark GIS' },
            { id: 'satellite', label: 'Satellite' },
            { id: 'terrain', label: 'Topography' }
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${
                activeLayer === layer.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Risk Status Overview & Monitored Locations List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Current Risk Status Box */}
          <div className="p-5 rounded-2xl glass-panel space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200">
                Current Risk Status
              </h3>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Network
              </span>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-2 gap-2.5">
              <div 
                onClick={() => setSelectedRiskFilter('ALL')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRiskFilter === 'ALL'
                    ? 'bg-cyan-500/15 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 uppercase">Monitored</div>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  {riskCounts.total}
                </div>
                <div className="text-[10px] text-cyan-400">View All Stations</div>
              </div>

              <div 
                onClick={() => setSelectedRiskFilter('CRITICAL')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRiskFilter === 'CRITICAL'
                    ? 'bg-rose-500/20 border-rose-500/60 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-rose-900/50'
                }`}
              >
                <div className="text-[11px] font-mono text-rose-400 uppercase font-semibold flex items-center justify-between">
                  <span>Critical</span>
                  <span>🔴</span>
                </div>
                <div className="text-2xl font-black font-mono text-rose-400 mt-0.5 animate-pulse">
                  {riskCounts.critical}
                </div>
                <div className="text-[10px] text-rose-400/80">Immediate Danger</div>
              </div>

              <div 
                onClick={() => setSelectedRiskFilter('HIGH')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRiskFilter === 'HIGH'
                    ? 'bg-orange-500/20 border-orange-500/60 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-orange-900/50'
                }`}
              >
                <div className="text-[11px] font-mono text-orange-400 uppercase font-semibold flex items-center justify-between">
                  <span>High Risk</span>
                  <span>🟠</span>
                </div>
                <div className="text-2xl font-black font-mono text-orange-400 mt-0.5">
                  {riskCounts.high}
                </div>
                <div className="text-[10px] text-orange-400/80">Orange Advisory</div>
              </div>

              <div 
                onClick={() => setSelectedRiskFilter('MODERATE')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRiskFilter === 'MODERATE'
                    ? 'bg-amber-500/20 border-amber-500/60 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-amber-900/50'
                }`}
              >
                <div className="text-[11px] font-mono text-amber-400 uppercase font-semibold flex items-center justify-between">
                  <span>Moderate</span>
                  <span>🟡</span>
                </div>
                <div className="text-2xl font-black font-mono text-amber-400 mt-0.5">
                  {riskCounts.moderate}
                </div>
                <div className="text-[10px] text-amber-400/80">Cautious Watch</div>
              </div>

              <div 
                onClick={() => setSelectedRiskFilter('LOW')}
                className={`col-span-2 p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedRiskFilter === 'LOW'
                    ? 'bg-emerald-500/20 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-emerald-900/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>🟢</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    Low Risk Stable Stations
                  </span>
                </div>
                <div className="text-lg font-black font-mono text-emerald-400">
                  {riskCounts.low} Stations
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar & Filter Controls */}
          <div className="p-4 rounded-2xl glass-panel space-y-3 border border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search station, district, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedRiskFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    selectedRiskFilter === lvl
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Station Cards List */}
          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
              <span>Matching Stations ({filteredLocations.length})</span>
              <span className="text-[10px]">Click to inspect</span>
            </div>

            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">{loc.id} • {loc.state}</div>
                      <h4 className="text-sm font-bold text-white mt-0.5">{loc.name}</h4>
                    </div>
                    <RiskBadge level={loc.riskLevel} score={loc.riskScore} size="sm" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 mt-2.5 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-[9px] text-slate-500 block">Rain 24h</span>
                      <span>{loc.rainfall24h} mm</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Moisture</span>
                      <span>{loc.soilMoisture}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Slope</span>
                      <span>{loc.slopeAngle}°</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredLocations.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-xs font-mono">
                No monitored stations match your filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Map Canvas + Selected Station Telemetry Strip */}
        <div className="lg:col-span-8 space-y-4">
          {/* Map Viewport Container */}
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-slate-800 h-[620px]">
            <RiskMap
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              activeLayer={activeLayer}
              onTriggerAlert={handleTriggerAlert}
              liveWeather={liveWeather}
            />

            {/* Quick Map Legend Overlay */}
            <div className="absolute top-4 right-4 z-[500] p-3 rounded-xl glass-panel border border-slate-700/80 text-xs font-mono space-y-1.5 shadow-2xl backdrop-blur-md hidden sm:block">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
                Risk Classification Legend
              </div>
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Critical Risk (76 - 100%)</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>High Risk (51 - 75%)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Moderate Risk (31 - 50%)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Low Risk (0 - 30%)</span>
              </div>
            </div>

            {/* Bottom Status Ticker on Map */}
            <div className="absolute bottom-4 left-4 z-[500] px-3 py-1.5 rounded-lg glass-panel border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Real-Time Open-Meteo Weather Feed Synced with GIS Map</span>
            </div>
          </div>

          {/* Live Open-Meteo Weather Telemetry for Selected Station */}
          {selectedLocation && (
            <LiveWeatherCard
              weatherData={liveWeather}
              loading={weatherLoading}
              error={weatherError}
              onRefresh={() => loadStationWeather(selectedLocation)}
              locationName={selectedLocation.name}
              coordinates={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            />
          )}

          {/* Detailed Selected Station Telemetry Strip */}
          {selectedLocation && (
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      Target Station Inspection
                    </span>
                    <span className="text-xs font-mono text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400">{selectedLocation.id}</span>
                    {liveWeather && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Calibrated
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedLocation.name} ({selectedLocation.state})
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <RiskBadge 
                    level={liveRisk ? liveRisk.riskInfo.level : selectedLocation.riskLevel} 
                    score={liveRisk ? liveRisk.score : selectedLocation.riskScore} 
                    size="lg" 
                  />
                  
                  {/* Button to open Slope Cross Section */}
                  <button
                    onClick={() => setSlopeProfileModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono text-xs font-bold transition-all cursor-pointer"
                  >
                    <Mountain className="w-3.5 h-3.5" />
                    <span>3D Slope Profile</span>
                  </button>

                  <button
                    onClick={() => handleTriggerAlert({
                      ...selectedLocation,
                      riskScore: liveRisk ? liveRisk.score : selectedLocation.riskScore,
                      riskLevel: liveRisk ? liveRisk.riskInfo.level : selectedLocation.riskLevel
                    })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Trigger Alert</span>
                  </button>
                </div>
              </div>

              {/* 5-Metrics Grid Powered by Live Telemetry & Field Sensors */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">24h Rainfall</span>
                    <CloudRain className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {liveWeather ? liveWeather.derived.dailyRainfall : selectedLocation.rainfall24h} <span className="text-xs text-slate-400">mm</span>
                  </div>
                  <span className="text-[9px] text-cyan-400 font-mono block mt-0.5">
                    {liveWeather ? '● Open-Meteo Live' : 'Baseline Archive'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Soil Moisture</span>
                    <Droplets className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {liveWeather ? liveWeather.derived.soilMoisturePercent : selectedLocation.soilMoisture} <span className="text-xs text-slate-400">%</span>
                  </div>
                  <span className="text-[9px] text-blue-400 font-mono block mt-0.5">
                    {liveWeather ? `VWC: ${liveWeather.hourly.soil_moisture_0_to_1cm} m³/m³` : 'Topsoil Sensor'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Slope Angle</span>
                    <Mountain className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {selectedLocation.slopeAngle} <span className="text-xs text-slate-400">deg</span>
                  </div>
                  <span className="text-[9px] text-amber-400 font-mono block mt-0.5">
                    DEM Incline
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Shear Shift</span>
                    <TrendingDown className="w-3 h-3 text-rose-400" />
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {selectedLocation.inclinometerDisplacement} <span className="text-xs text-slate-400">mm</span>
                  </div>
                  <span className="text-[9px] text-rose-400 font-mono block mt-0.5">
                    MEMS Inclinometer
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Pressure / Baro</span>
                    <Gauge className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">
                    {liveWeather ? Math.round(liveWeather.current.surface_pressure) : 1013} <span className="text-xs text-slate-400">hPa</span>
                  </div>
                  <span className="text-[9px] text-amber-400 font-mono block mt-0.5">
                    {liveWeather && liveWeather.current.surface_pressure < 1000 ? '⚠️ Low Depression' : 'Normal Head'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                <div>
                  <span className="font-bold text-slate-400 font-mono">Geological Assessment: </span>
                  {selectedLocation.details}
                </div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 flex items-start gap-1.5 font-mono leading-relaxed">
                  <span className="text-cyan-400 shrink-0 mt-0.5">ℹ️</span>
                  <span>
                    <strong>Telemetry Pipeline: </strong>
                    Atmospheric precipitation, rain, relative humidity, barometric surface pressure, and 0-1cm soil moisture are streamed live from the <strong>Open-Meteo Global Forecast API</strong>. Landslide hazard probability ({liveRisk ? liveRisk.score : selectedLocation.riskScore}%) is calculated independently by <strong>LandslideGuard AI's geotechnical risk engine</strong>.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Geotechnical Slope Cross-Section Profile Modal */}
      {slopeProfileModalOpen && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-panel border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  Borehole Geotechnical Cross-Section
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedLocation.name} — Slope Gradient {selectedLocation.slopeAngle}°
                </h3>
              </div>
              <button
                onClick={() => setSlopeProfileModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SVG Geological Cross-Section Diagram */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <svg viewBox="0 0 600 240" className="w-full h-56">
                <defs>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#854d0e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#713f12" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="waterTableGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Sky / Air Background */}
                <rect x="0" y="0" width="600" height="240" fill="#070b14" />

                {/* Bedrock Polygon (solid gneiss / charnockite) */}
                <polygon points="120,70 560,180 560,230 40,230 40,110" fill="#1e293b" />
                <text x="320" y="215" fill="#64748b" fontSize="11" fontFamily="monospace">STABLE BEDROCK (Gneiss / Charnockite Series)</text>

                {/* Topsoil Overburden Layer (Laterite / Colluvium) */}
                <polygon points="100,50 540,160 560,180 120,70" fill="url(#soilGrad)" />
                <text x="360" y="145" fill="#fef08a" fontSize="10" fontFamily="monospace">OVERBURDEN COLLUVIUM (Thickness: 4.8m)</text>

                {/* Potential Shear Slip Surface (Red dashed line) */}
                <path d="M 120,70 Q 320,130 560,180" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 3" />
                <text x="180" y="115" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">CRITICAL FAILURE SLIP PLANE</text>

                {/* Water Table Saturated Zone (Blue gradient overlay) */}
                <polygon points="200,98 550,175 560,180 200,105" fill="url(#waterTableGrad)" />
                <text x="240" y="180" fill="#38bdf8" fontSize="10" fontFamily="monospace">PHREATIC WATER TABLE (Pore Pressure: {selectedLocation.porePressure})</text>

                {/* Inclinometer Sensor Borehole Pipe */}
                <line x1="280" y1="30" x2="280" y2="190" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="280" cy="120" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="290" y="45" fill="#06b6d4" fontSize="9" fontFamily="monospace">MEMS Inclinometer Rig</text>
                <text x="290" y="125" fill="#f43f5e" fontSize="9" fontFamily="monospace">Shear Shift: {selectedLocation.inclinometerDisplacement}mm</text>

                {/* Slope Angle Indicator Arc */}
                <path d="M 140,65 A 35,35 0 0,0 170,75" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <text x="175" y="68" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">θ = {selectedLocation.slopeAngle}°</text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Overburden Shear Strength</span>
                <span className="text-rose-400 font-bold">Degraded (14.2 kPa)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Factor of Safety (FoS)</span>
                <span className="text-rose-400 font-bold">0.86 (Unstable FoS &lt; 1.0)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Piezometer Hydraulic Head</span>
                <span className="text-cyan-400 font-bold">12.4 meters head</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSlopeProfileModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
              >
                Close Cross-Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
