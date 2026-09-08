import React from 'react';
import { getRiskLevelInfo } from '../../utils/riskEngine';

export default function RiskGauge({ score = 0, size = 260, showDetails = true }) {
  const riskInfo = getRiskLevelInfo(score);
  
  // Angle calculations for 180-degree arch (from -90 deg to +90 deg)
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = -90 + (clampedScore / 100) * 180;
  
  // Circumference for semi-circle
  const radius = 90;
  const cx = 130;
  const cy = 130;
  const semiCircumference = Math.PI * radius;
  const strokeDashoffset = semiCircumference * (1 - clampedScore / 100);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: size, height: size * 0.65 }}>
        <svg
          viewBox="0 0 260 160"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d="M 40,130 A 90,90 0 0,1 220,130"
            fill="none"
            stroke="#1e293b"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Value Arc */}
          <path
            d="M 40,130 A 90,90 0 0,1 220,130"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={semiCircumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            filter="url(#gaugeGlow)"
          />

          {/* Threshold markers */}
          <line x1="75" y1="65" x2="68" y2="55" stroke="#64748b" strokeWidth="2" />
          <line x1="130" y1="40" x2="130" y2="28" stroke="#64748b" strokeWidth="2" />
          <line x1="185" y1="65" x2="192" y2="55" stroke="#64748b" strokeWidth="2" />

          {/* Center Hub */}
          <circle cx="130" cy="130" r="12" fill="#0f172a" stroke={riskInfo.hex} strokeWidth="3" />

          {/* Needle Indicator */}
          <g
            style={{
              transformOrigin: '130px 130px',
              transform: `rotate(${angle}deg)`,
              transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <line
              x1="130"
              y1="130"
              x2="130"
              y2="50"
              stroke={riskInfo.hex}
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_currentColor]"
            />
            <circle cx="130" cy="50" r="3" fill="#ffffff" />
          </g>
        </svg>

        {/* Numeric Display Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center -translate-y-2">
          <div className="text-4xl font-extrabold tracking-tight font-mono text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {Math.round(clampedScore)}
            <span className="text-xl text-slate-400 font-sans">%</span>
          </div>
          <div
            className="text-xs font-bold tracking-widest uppercase mt-0.5 px-3 py-0.5 rounded-full border transition-colors duration-500"
            style={{
              color: riskInfo.hex,
              backgroundColor: `${riskInfo.hex}18`,
              borderColor: `${riskInfo.hex}44`
            }}
          >
            {riskInfo.label}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="w-full mt-2 flex justify-between text-[11px] text-slate-400 font-mono px-6">
          <span className="text-emerald-400">0% LOW</span>
          <span className="text-amber-400">30% MOD</span>
          <span className="text-orange-400">50% HIGH</span>
          <span className="text-rose-400">75% CRIT</span>
          <span className="text-rose-500">100%</span>
        </div>
      )}
    </div>
  );
}
