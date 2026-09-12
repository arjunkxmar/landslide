import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

export const QUICK_QUESTIONS = [
  {
    id: 'risk',
    label: '📊 Explain Current Risk',
    prompt: 'Explain the current landslide hazard risk score, risk level, and contributing factors for this location.'
  },
  {
    id: 'rainfall',
    label: '🌧️ Analyze Rainfall',
    prompt: 'Analyze current rainfall and precipitation levels. How do they compare with critical landslide threshold triggers?'
  },
  {
    id: 'location',
    label: '🗺️ Explain This Location',
    prompt: 'Tell me about the currently monitored station: terrain, elevation, slope angle, and why it is vulnerable to landslides.'
  },
  {
    id: 'action',
    label: '⚠️ What Should I Do?',
    prompt: 'What emergency preparedness actions and safety measures should residents or local authorities take right now?'
  },
  {
    id: 'landslide_basics',
    label: 'What is a Landslide?',
    prompt: 'What is a landslide, what causes it, and what early warning signs should people watch out for in hilly regions?'
  }
];

export default function QuickQuestions({ onSelectQuestion, disabled = false }) {
  return (
    <div className="space-y-2.5 animate-fadeIn">
      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-1">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Suggested Queries</span>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {QUICK_QUESTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectQuestion(item.prompt)}
            disabled={disabled}
            className="text-left text-xs px-3 py-2 rounded-xl bg-[#0e172a] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-1.5"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
