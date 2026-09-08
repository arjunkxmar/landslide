import React from 'react';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Gauge, 
  Thermometer, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Radio,
  Zap,
  Info
} from 'lucide-react';

export default function LiveWeatherCard({
  weatherData,
  loading = false,
  error = null,
  onRefresh,
  locationName = 'Selected Station',
  coordinates = null,
  compact = false
}) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      error 
        ? 'bg-rose-950/30 border-rose-500/40 p-5' 
        : 'glass-panel border-cyan-500/30 p-5 shadow-lg shadow-cyan-950/20'
    }`}>
      {/* Header: Title, Live Beacon, and Refresh Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIVE OPEN-METEO TELEMETRY
            </span>
            {coordinates && (
              <span className="text-[11px] font-mono text-slate-400">
                ({Number(coordinates.lat).toFixed(3)}°N, {Number(coordinates.lng).toFixed(3)}°E)
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
            <span>Atmospheric & Soil Data: {locationName}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {weatherData?.fetchedAt && (
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              Updated: {weatherData.fetchedAt}
            </span>
          )}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono transition-all disabled:opacity-50 cursor-pointer"
            title="Refresh Live Data from Open-Meteo"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Fetching...' : 'Sync Live'}</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <Radio className="w-4 h-4 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-mono font-bold text-cyan-300">
              Querying Open-Meteo Weather API...
            </div>
            <div className="text-[11px] text-slate-400">
              Retrieving live precipitation, soil moisture (0-1cm), and surface pressure telemetry
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="py-4 space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold font-mono">Live Weather Fetch Failed</div>
              <p className="text-[11px] text-rose-200/90">{error}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRefresh}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Loaded Content: 5 Live Parameters Grid */}
      {!loading && !error && weatherData && (
        <div className="space-y-4 pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* 1. Precipitation & Rain */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase mb-1">
                <span>Rainfall / Rain</span>
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-lg font-black font-mono text-white">
                {weatherData.current.rain} <span className="text-xs text-cyan-400">mm</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
                <span>Precip: {weatherData.current.precipitation} mm</span>
              </div>
              {weatherData.derived?.dailyRainfall !== undefined && (
                <div className="text-[9px] font-mono text-cyan-400/80 mt-0.5">
                  24h Sum: {weatherData.derived.dailyRainfall} mm
                </div>
              )}
            </div>

            {/* 2. Soil Moisture 0-1cm */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase mb-1">
                <span>Soil Moisture</span>
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-lg font-black font-mono text-white">
                {weatherData.derived?.soilMoisturePercent ?? 50} <span className="text-xs text-blue-400">%</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Raw VWC: {weatherData.hourly.soil_moisture_0_to_1cm} m³/m³
              </div>
              <div className="text-[9px] font-mono text-blue-300/80 mt-0.5">
                Topsoil depth: 0-1 cm
              </div>
            </div>

            {/* 3. Relative Humidity */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase mb-1">
                <span>Humidity (2m)</span>
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-lg font-black font-mono text-white">
                {weatherData.current.relative_humidity_2m} <span className="text-xs text-emerald-400">%</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Atmospheric vapor
              </div>
              <div className="text-[9px] font-mono text-emerald-300/80 mt-0.5">
                {weatherData.current.relative_humidity_2m > 85 ? 'Saturated mist' : 'Normal range'}
              </div>
            </div>

            {/* 4. Surface Pressure */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase mb-1">
                <span>Surface Pressure</span>
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-lg font-black font-mono text-white">
                {Math.round(weatherData.current.surface_pressure)} <span className="text-xs text-amber-400">hPa</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Barometric head
              </div>
              <div className="text-[9px] font-mono text-amber-300/80 mt-0.5">
                {weatherData.current.surface_pressure < 1000 ? '⚠️ Low depression' : 'Stable barometric'}
              </div>
            </div>

            {/* 5. Temperature */}
            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-colors">
              <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase mb-1">
                <span>Temperature</span>
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-lg font-black font-mono text-white">
                {weatherData.current.temperature_2m} <span className="text-xs text-rose-400">°C</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Elevation: {weatherData.elevation ? `${weatherData.elevation}m` : 'Hill station'}
              </div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                Timezone: {weatherData.timezone}
              </div>
            </div>
          </div>

          {/* Separation Notice */}
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-200">Data Architecture Separation: </strong>
              <span>
                Atmospheric and topsoil parameters are fetched live via <strong>Open-Meteo Global Forecast API</strong>. Landslide hazard classification, Factor of Safety (FoS), and emergency alerts are calculated independently by <strong>LandslideGuard AI's geotechnical risk engine</strong>.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
