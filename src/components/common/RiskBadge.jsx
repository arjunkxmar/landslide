import React from 'react';
import { getRiskLevelInfo } from '../../utils/riskEngine';

export default function RiskBadge({ level, score, size = 'md' }) {
  let info = null;
  if (score !== undefined && score !== null) {
    info = getRiskLevelInfo(score);
  } else if (level) {
    const key = level.toUpperCase();
    if (key.includes('CRIT')) info = { label: 'CRITICAL RISK', hex: '#ef4444', icon: '🔴', color: 'rose' };
    else if (key.includes('HIGH')) info = { label: 'HIGH RISK', hex: '#f97316', icon: '🟠', color: 'orange' };
    else if (key.includes('MOD')) info = { label: 'MODERATE RISK', hex: '#f59e0b', icon: '🟡', color: 'amber' };
    else info = { label: 'LOW RISK', hex: '#10b981', icon: '🟢', color: 'emerald' };
  } else {
    info = { label: 'UNKNOWN', hex: '#64748b', icon: '⚪', color: 'slate' };
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold tracking-wide'
  };

  const colorStyles = {
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(239,68,68,0.25)]',
    orange: 'bg-orange-500/15 text-orange-300 border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.2)]',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    slate: 'bg-slate-700/30 text-slate-300 border-slate-600/30'
  };

  const styleClass = colorStyles[info.color] || colorStyles.slate;

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-md transition-all duration-300 ${sizeClasses[size]} ${styleClass}`}
    >
      <span className="text-[0.9em]">{info.icon}</span>
      <span>{info.label}</span>
      {score !== undefined && (
        <span className="opacity-75 font-mono text-[0.85em]">({score}%)</span>
      )}
    </span>
  );
}
