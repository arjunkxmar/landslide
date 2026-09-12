import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 animate-fadeIn">
      {/* Bot Mini Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
        <Bot className="w-4 h-4" />
      </div>

      {/* Bubble with bouncing dots */}
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#0e172a] border border-cyan-500/20 text-slate-300 shadow-md flex items-center gap-3">
        <div className="flex items-center gap-1.5 py-0.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '180ms' }} />
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '360ms' }} />
        </div>
        <span className="text-xs text-cyan-400/80 font-mono tracking-wide flex items-center gap-1">
          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
          Analyzing telemetry...
        </span>
      </div>
    </div>
  );
}
