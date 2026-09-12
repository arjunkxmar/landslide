import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle,
  RotateCcw,
  Info
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickQuestions from './QuickQuestions';
import TypingIndicator from './TypingIndicator';
import { sendChatMessage } from '../../services/chatbotService';
import { useLandslideContext } from '../../context/LandslideContext';

export default function AIChatbot() {
  const { getChatbotContext, activeLocation } = useLandslideContext();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input when panel opens
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle keyboard shortcuts (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Welcome message when chat is opened for the first time
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!hasOpenedOnce && messages.length === 0) {
      setHasOpenedOnce(true);
      const locName = activeLocation?.name || 'Monitored Corridors';
      const initialGreeting = {
        id: 'welcome-1',
        sender: 'ai',
        text: `**Welcome to LandslideGuard AI Assistant!** 🏔️\n\nI am connected to your live landslide telemetry network. Currently analyzing telemetry for **${locName}**.\n\nYou can ask me questions in **English**, **Hindi**, or **Hinglish** about current risk scores, rainfall intensity, slope stability, pore pressure, or disaster safety precautions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialGreeting]);
    }
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = typeof textToSend === 'string' ? textToSend : inputMessage;
    if (!query || query.trim() === '' || isLoading) return;

    const userText = query.trim();
    setInputMessage('');

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update conversation state with user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Get live application telemetry context
      const currentContext = getChatbotContext();

      // Format previous history for Gemini (send user and model turns)
      const historyPayload = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await sendChatMessage({
        message: userText,
        context: currentContext,
        history: historyPayload
      });

      if (res.success && res.reply) {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...updatedMessages, aiMessage]);
      } else {
        const errorMessage = {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          isError: true,
          text: res.error || 'Sorry, I couldn\'t connect to the AI service right now. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...updatedMessages, errorMessage]);
      }
    } catch (err) {
      const errorMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        isError: true,
        text: 'Sorry, I couldn\'t connect to the AI service right now. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    const locName = activeLocation?.name || 'Monitored Corridors';
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat cleared. Ready for your questions about **${locName}** or general landslide safety.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const currentContext = getChatbotContext();

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING ACTION BUTTON (Bottom Right)                                  */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          {/* Subtle Attention Tooltip (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e172a]/95 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LandslideGuard AI Assistant</span>
          </div>

          {/* Circular Button */}
          <button
            onClick={handleOpenChat}
            aria-label="Open LandslideGuard AI Assistant"
            className="relative group p-4 sm:p-4.5 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#070b14]"
          >
            {/* Pulsing Radar Ring */}
            <span className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-sm group-hover:bg-cyan-400/50 transition-all animate-pulse-slow pointer-events-none" />

            <div className="relative flex items-center justify-center">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              <Sparkles className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-amber-300 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CHAT PANEL (Floating Window / Sheet on Mobile)                        */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="LandslideGuard AI Assistant Dialog"
          aria-modal="true"
          className="fixed z-50 transition-all duration-300 inset-x-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[430px] h-[580px] max-h-[90vh] sm:max-h-[640px] flex flex-col rounded-2xl bg-[#070b14]/95 border border-cyan-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl overflow-hidden animate-fadeIn"
        >
          {/* ----------------- Panel Header ----------------- */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0c1527] via-[#0e1a33] to-[#0c1527] border-b border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Bot Avatar Icon */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>

              {/* Title & Subtitle */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate tracking-tight">
                    LandslideGuard AI
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-semibold border border-cyan-500/30 flex-shrink-0">
                    AI ASSISTANT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  Your Landslide Risk Assistant
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Clear Chat Button */}
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                aria-label="Clear chat history"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat (Esc)"
                aria-label="Close AI Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ----------------- Context Status Banner ----------------- */}
          <div className="px-3.5 py-2 bg-[#090f1d] border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-300 flex-shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="truncate text-slate-300 font-medium">
                {currentContext.locationName || 'Station Monitoring'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 pl-2">
              <span className={`w-2 h-2 rounded-full ${
                currentContext.riskLevel === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
                currentContext.riskLevel === 'HIGH' ? 'bg-orange-500' :
                currentContext.riskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
              <span className="font-bold text-cyan-400">
                Score: {currentContext.riskScore}
              </span>
            </div>
          </div>

          {/* ----------------- Chat Messages Body ----------------- */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Quick Questions (rendered below greeting or when message count is low) */}
            {messages.length <= 2 && (
              <div className="pt-2 pb-1">
                <QuickQuestions 
                  onSelectQuestion={(q) => handleSendMessage(q)} 
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* ----------------- Chat Input Bar ----------------- */}
          <div className="p-3 sm:p-3.5 bg-[#090f1d] border-t border-slate-800 flex-shrink-0">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask in English, Hindi, or Hinglish..."
                disabled={isLoading}
                className="w-full pl-3.5 pr-12 py-2.5 rounded-xl bg-[#0e172a] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all disabled:opacity-50"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-1.5 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cyan-500 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Footer Disclaimer */}
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="w-2.5 h-2.5 text-slate-500" />
                AI decision-support • Press Enter to send
              </span>
              <span className="font-mono">SIH 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
