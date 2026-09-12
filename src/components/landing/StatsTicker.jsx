import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Clock, Users, Cpu, Radio } from 'lucide-react';

export default function StatsTicker() {
  const [counts, setCounts] = useState({
    stations: 0,
    accuracy: 0,
    leadTime: 0,
    protectedPeople: 0,
    warnings: 0,
    compliance: 0
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCounts({
        stations: Math.round(148 * ease),
        accuracy: Math.round(95 * ease),
        leadTime: (3.5 * ease).toFixed(1),
        protectedPeople: Math.round(45000 * ease),
        warnings: Math.round(18 * ease),
        compliance: Math.round(100 * ease)
      });

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Cpu,
      value: `${counts.stations}`,
      label: 'IoT Stations',
      subtext: 'Borehole & rain sensors',
      color: 'text-cyan-400'
    },
    {
      icon: Activity,
      value: `${counts.accuracy}%`,
      label: 'AI Model Accuracy',
      subtext: 'FoS calibration index',
      color: 'text-emerald-400'
    },
    {
      icon: Clock,
      value: `${counts.leadTime}h`,
      label: 'Advance Warning',
      subtext: 'Safe evacuation window',
      color: 'text-amber-400'
    },
    {
      icon: Users,
      value: `${counts.protectedPeople.toLocaleString()}+`,
      label: 'Residents Covered',
      subtext: 'Western Ghats & Himalayas',
      color: 'text-sky-400'
    },
    {
      icon: Radio,
      value: `${counts.warnings}`,
      label: 'CAP Siren Sirens',
      subtext: 'Active monsoon events',
      color: 'text-rose-400'
    },
    {
      icon: ShieldCheck,
      value: `${counts.compliance}%`,
      label: 'Sendai Standards',
      subtext: 'NDMA protocol certified',
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="py-8 border-y border-[#1c1c1c] bg-[#080808]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#111111] border border-[#1f1f1f] hover:border-[#2a2a2a] transition-all duration-300 group text-center sm:text-left shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1.5">
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-[10px] font-mono uppercase text-[#71717A] font-bold truncate">
                    {stat.label}
                  </span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-[#A1A1AA] mt-1 truncate">
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

