import React, { useState } from 'react';
import { Bot, User, Copy, Check, AlertCircle } from 'lucide-react';

/**
 * Lightweight text renderer that nicely formats markdown bold, bullets, and line breaks
 */
function FormattedMessageText({ text }) {
  if (!text) return null;

  // Split text by lines
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed break-words">
      {lines.map((line, lineIndex) => {
        const trimmed = line.trim();

        // Empty lines as vertical spacers
        if (!trimmed) {
          return <div key={lineIndex} className="h-1" />;
        }

        // Bullet point lines (- , * , • )
        const isBullet = /^[•\-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed);
        const cleanContent = isBullet ? trimmed.replace(/^[•\-*]\s+/, '').replace(/^\d+\.\s+/, '') : trimmed;

        // Parse bold **text**
        const parts = cleanContent.split(/(\*\*.*?\*\*)/g);
        const renderedParts = parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIndex} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={lineIndex} className="flex items-start gap-2 pl-1">
              <span className="text-cyan-400 mt-1 select-none text-xs flex-shrink-0">•</span>
              <span className="flex-1 text-slate-200">{renderedParts}</span>
            </div>
          );
        }

        // Section header lines (starts with # or === or ends with :)
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <div key={lineIndex} className="font-bold text-cyan-300 pt-1 text-sm">
              {trimmed.replace(/^#+\s*/, '')}
            </div>
          );
        }

        return (
          <p key={lineIndex} className="text-slate-200">
            {renderedParts}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const isError = message.isError;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!message.text) return;
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div 
      className={`group flex items-start gap-2.5 transition-all duration-200 animate-fadeIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Icon */}
      <div 
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
          isUser 
            ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
            : isError
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : isError ? (
          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : (
          <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
      </div>

      {/* Message Content Container */}
      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-md text-left ${
            isUser
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm selection:bg-white selection:text-blue-900'
              : isError
                ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200 rounded-tl-sm'
                : 'bg-[#0e172a] border border-slate-800 text-slate-100 rounded-tl-sm hover:border-cyan-500/30 transition-colors'
          }`}
        >
          {isUser ? (
            <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap break-words font-medium">
              {message.text}
            </p>
          ) : (
            <FormattedMessageText text={message.text} />
          )}

          {/* Copy button (shows on hover for AI responses) */}
          {!isUser && !isError && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 text-xs"
              title="Copy response"
              aria-label="Copy response"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <span className="text-[10px] font-mono text-slate-500 mt-1 px-1 select-none">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
