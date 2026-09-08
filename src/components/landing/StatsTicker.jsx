import React from 'react';
import { Activity, ShieldCheck, Clock, Users, Cpu, Radio } from 'lucide-react';

export default function StatsTicker() {
  const stats = [
    {
      icon: Cpu,
      value: '148',
      label: 'IoT Stations Monitored',
      subtext: 'Borehole tiltmeters & rain gauges',
      color: 'text-cyan-400'
    },
    {
      icon: Activity,
      value: '94.8%',
      label: 'Predictive AI Accuracy',
      subtext: 'Trained on 10-year GSI records',
      color: 'text-emerald-400'
    },
    {
      icon: Clock,
      value: '3.4 Hrs',
      label: 'Avg. Evacuation Lead Time',
      subtext: 'Window for life safety action',
      color: 'text-amber-400'
    },
    {
      icon: Users,
      value: '45,000+',
      label: 'Citizens Protected',
      subtext: 'Across high-vulnerability sectors',
      color: 'text-sky-400'
    },
    {
      icon: Radio,
      value: '18',
      label: 'Active Early Warnings',
      subtext: 'Dispatched in 2026 Monsoon cycle',
      color: 'text-rose-400'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'NDMA Protocol Aligned',
      subtext: 'Common Alerting Protocol (CAP)',
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="py-8 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl glass-panel hover:border-slate-700 transition-all duration-300 group text-center sm:text-left"
              >
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold truncate">
                    {stat.label}
                  </span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
