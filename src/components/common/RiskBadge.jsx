import React from 'react';
import { getRiskLevelInfo } from '../../utils/riskEngine';

export default function RiskBadge({ level, score, size = 'md' }) {
  let info = null;
  if (score !== undefined && score !== null) {
    info = getRiskLevelInfo(score);
  } else if (level) {
    const key = level.toUpperCase();
    if (key.includes('CRIT')) info = { label: 'CRITICAL', hex: '#EF4444', icon: '🔴', color: 'rose' };
    else if (key.includes('HIGH')) info = { label: 'HIGH', hex: '#F97316', icon: '🟠', color: 'orange' };
    else if (key.includes('MOD')) info = { label: 'MODERATE', hex: '#F59E0B', icon: '🟡', color: 'amber' };
    else info = { label: 'LOW', hex: '#10B981', icon: '🟢', color: 'emerald' };
  } else {
    info = { label: 'NOMINAL', hex: '#71717A', icon: '⚪', color: 'slate' };
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-mono tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-mono font-bold tracking-wider',
    lg: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2 font-mono font-extrabold tracking-wider'
  };

  const colorStyles = {
    rose: 'bg-rose-950/40 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    orange: 'bg-orange-950/40 text-orange-300 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.25)]',
    amber: 'bg-amber-950/40 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    emerald: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    slate: 'bg-[#151515] text-[#A1A1AA] border-[#2a2a2a]'
  };

  const styleClass = colorStyles[info.color] || colorStyles.slate;

  return (
    <span
      className={`inline-flex items-center uppercase rounded-full border backdrop-blur-md transition-all duration-300 select-none ${sizeClasses[size]} ${styleClass}`}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" 
        style={{ backgroundColor: info.hex }} 
      />
      <span>{info.label}</span>
      {score !== undefined && score !== null && (
        <span className="opacity-80 font-mono">({score}%)</span>
      )}
    </span>
  );
}

