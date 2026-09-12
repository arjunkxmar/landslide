import React from 'react';
import { getRiskLevelInfo } from '../../utils/riskEngine';

export default function RiskGauge({ score = 0, size = 260, showDetails = true }) {
  const riskInfo = getRiskLevelInfo(score);
  
  // Angle calculations for 180-degree arch (from -90 deg to +90 deg)
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = -90 + (clampedScore / 100) * 180;
  
  // Circumference for semi-circle
  const radius = 90;
  const semiCircumference = Math.PI * radius;
  const strokeDashoffset = semiCircumference * (1 - clampedScore / 100);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: size, height: size * 0.65 }}>
        <svg
          viewBox="0 0 260 160"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Arc Track */}
          <path
            d="M 40,130 A 90,90 0 0,1 220,130"
            fill="none"
            stroke="#181818"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Subtle inner track line */}
          <path
            d="M 46,130 A 84,84 0 0,1 214,130"
            fill="none"
            stroke="#222222"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          {/* Value Active Arc */}
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
          <line x1="75" y1="65" x2="68" y2="55" stroke="#52525B" strokeWidth="2" />
          <line x1="130" y1="40" x2="130" y2="28" stroke="#52525B" strokeWidth="2" />
          <line x1="185" y1="65" x2="192" y2="55" stroke="#52525B" strokeWidth="2" />

          {/* Center Hub */}
          <circle cx="130" cy="130" r="14" fill="#0A0A0A" stroke="#262626" strokeWidth="4" />
          <circle cx="130" cy="130" r="7" fill={riskInfo.hex} className="shadow-lg" />

          {/* Precision Needle Pointer */}
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
              y2="48"
              stroke={riskInfo.hex}
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_currentColor]"
            />
            <circle cx="130" cy="48" r="3.5" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Numeric Readout Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center -translate-y-2">
          <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            {Math.round(clampedScore)}
            <span className="text-xl text-[#71717A] font-sans font-normal ml-0.5">%</span>
          </div>
          <div
            className="text-xs font-mono font-bold tracking-widest uppercase mt-0.5 px-3.5 py-0.5 rounded-full border transition-colors duration-500 shadow-lg"
            style={{
              color: riskInfo.hex,
              backgroundColor: `${riskInfo.hex}18`,
              borderColor: `${riskInfo.hex}44`
            }}
          >
            {riskInfo.label} RISK
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="w-full mt-2 flex justify-between text-[10px] text-[#71717A] font-mono px-4">
          <span className="text-emerald-400">0% LOW</span>
          <span className="text-amber-400">30% MODERATE</span>
          <span className="text-orange-400">50% HIGH</span>
          <span className="text-rose-400">75% CRITICAL</span>
          <span className="text-rose-500">100%</span>
        </div>
      )}
    </div>
  );
}

