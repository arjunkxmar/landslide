import React, { useState } from 'react';
import { 
  MONTHLY_METRICS, 
  VULNERABILITY_MATRIX, 
  HISTORICAL_DISASTER_RECORDS, 
  SYSTEM_METRICS_SUMMARY 
} from '../data/historicalData';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  FileSpreadsheet, 
  Layers, 
  Search,
  Activity,
  Cpu
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [matrixSearch, setMatrixSearch] = useState('');
  const [reportDownloaded, setReportDownloaded] = useState(false);

  // Filtered vulnerability matrix
  const filteredMatrix = VULNERABILITY_MATRIX.filter(item => 
    item.district.toLowerCase().includes(matrixSearch.toLowerCase()) ||
    item.state.toLowerCase().includes(matrixSearch.toLowerCase()) ||
    item.status.toLowerCase().includes(matrixSearch.toLowerCase())
  );

  const handleExportReport = () => {
    soundManager.playBeep(880, 0.15);
    setReportDownloaded(true);
    
    // Generate simulated CSV content
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Month,Rainfall_mm,Landslide_Events,Alerts_Issued,Avg_Risk_Score\n" +
      MONTHLY_METRICS.map(m => `${m.month},${m.rainfallMm},${m.landslideEvents},${m.alertsIssued},${m.avgRiskScore}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LandslideGuard_AI_Annual_Report_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setReportDownloaded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Geotechnical Data Science & Historical Auditing
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400">10-Year GSI Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 mt-1">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            Landslide Risk Analytics & Trends 📈
          </h1>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{reportDownloaded ? 'Downloaded CSV!' : 'Export Annual Audit Report'}</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Alerts Dispatched</span>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {SYSTEM_METRICS_SUMMARY.totalAlertsDispatched}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">94.8% True Positive Verification</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Avg. Evacuation Lead Time</span>
          <div className="text-3xl font-black font-mono text-cyan-400 mt-1">
            {SYSTEM_METRICS_SUMMARY.leadTimeAvg}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Window for NDRF Mobilization</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Citizen Reports Resolved</span>
          <div className="text-3xl font-black font-mono text-amber-400 mt-1">
            {SYSTEM_METRICS_SUMMARY.citizenReportsProcessed}
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">Verified by field patrol units</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">False Positive Rate</span>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
            {SYSTEM_METRICS_SUMMARY.falsePositiveRate}
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-1 block">Minimizing alarm fatigue</span>
        </div>
      </div>

      {/* 12-Month Rainfall vs. Landslide Event Chart */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Monthly Rainfall (mm) vs. Landslide Incidence (Events)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Seasonal correlation illustrating spike during June–August southwest monsoon
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm" /> Rainfall (mm)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> Landslide Events
            </span>
          </div>
        </div>

        {/* Responsive SVG Bar + Line Chart */}
        <div className="h-72 w-full pt-4">
          <svg viewBox="0 0 840 260" className="w-full h-full overflow-visible">
            {/* Guide Lines */}
            <line x1="40" y1="30" x2="820" y2="30" stroke="#1e293b" strokeDasharray="3" />
            <line x1="40" y1="80" x2="820" y2="80" stroke="#1e293b" strokeDasharray="3" />
            <line x1="40" y1="130" x2="820" y2="130" stroke="#1e293b" strokeDasharray="3" />
            <line x1="40" y1="180" x2="820" y2="180" stroke="#1e293b" strokeDasharray="3" />
            <line x1="40" y1="220" x2="820" y2="220" stroke="#334155" />

            {/* Y-axis labels */}
            <text x="10" y="34" fill="#64748b" fontSize="10" fontFamily="monospace">400</text>
            <text x="10" y="84" fill="#64748b" fontSize="10" fontFamily="monospace">300</text>
            <text x="10" y="134" fill="#64748b" fontSize="10" fontFamily="monospace">200</text>
            <text x="10" y="184" fill="#64748b" fontSize="10" fontFamily="monospace">100</text>
            <text x="25" y="224" fill="#64748b" fontSize="10" fontFamily="monospace">0</text>

            {/* Bars for Rainfall */}
            {MONTHLY_METRICS.map((m, idx) => {
              const x = 60 + idx * 64;
              const barHeight = (m.rainfallMm / 450) * 190;
              const y = 220 - barHeight;

              return (
                <g key={idx} className="group cursor-pointer">
                  {/* Bar */}
                  <rect
                    x={x - 14}
                    y={y}
                    width="28"
                    height={barHeight}
                    rx="4"
                    fill="#06b6d4"
                    opacity="0.75"
                    className="hover:opacity-100 transition-opacity"
                  />
                  {/* Rainfall label on top of peak months */}
                  {m.rainfallMm > 200 && (
                    <text
                      x={x}
                      y={y - 6}
                      fill="#06b6d4"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {m.rainfallMm}m
                    </text>
                  )}
                  {/* X Axis Month Label */}
                  <text
                    x={x}
                    y="240"
                    fill="#94a3b8"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {m.month}
                  </text>
                </g>
              );
            })}

            {/* Line for Landslide Events (Rose) */}
            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              points={MONTHLY_METRICS.map((m, idx) => {
                const x = 60 + idx * 64;
                const y = 220 - (m.landslideEvents / 50) * 190;
                return `${x},${y}`;
              }).join(' ')}
            />

            {/* Dots on Landslide Events line */}
            {MONTHLY_METRICS.map((m, idx) => {
              const x = 60 + idx * 64;
              const y = 220 - (m.landslideEvents / 50) * 190;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#ef4444"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* District Vulnerability Matrix Table */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>High-Risk District Vulnerability Ranking Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Geotechnical slope instability index classified under National Landslide Susceptibility Mapping (NLSM)
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search district or state..."
              value={matrixSearch}
              onChange={(e) => setMatrixSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">District & State</th>
                <th className="py-2.5 px-3">Vulnerability Index</th>
                <th className="py-2.5 px-3">Primary Bedrock Geology</th>
                <th className="py-2.5 px-3">Avg Slope</th>
                <th className="py-2.5 px-3">Monsoon Avg</th>
                <th className="py-2.5 px-3">IoT Sensors</th>
                <th className="py-2.5 px-3 text-right">Hazard Zone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold text-white">
                    {row.district}
                    <span className="block text-[11px] font-mono text-slate-400 font-normal">
                      {row.state}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-rose-400 font-bold">
                    {row.vulnerabilityIndex}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {row.primaryGeology}
                  </td>
                  <td className="py-3 px-3 text-amber-400 font-bold">
                    {row.slopeAngleAvg}
                  </td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">
                    {row.monsoonRainfallAvg}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {row.installedSensors} Nodes
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === 'RED ZONE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                      row.status === 'ORANGE ZONE' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Landslide Disaster Records & Mitigation Lessons */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Historical Catastrophic Landslide Records in India (Audit Benchmark)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key disaster events that formulated LandslideGuard AI's multi-factor threshold algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HISTORICAL_DISASTER_RECORDS.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  {rec.year} • {rec.state}
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">
                  {rec.fatalitiesReported} Reported Fatalities
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{rec.event}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Trigger:</strong> {rec.cause}
              </p>
              <div className="pt-1 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                <strong>Mitigation Lesson Learned:</strong> {rec.mitigationLessons}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
