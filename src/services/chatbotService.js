/**
 * Client Chatbot Service for LandslideGuard AI Assistant
 * Communicates with backend /api/chat endpoint with client-side Gemini and telemetry fallbacks.
 */

import { generateContextualFallback } from './telemetryEngine';

const DIRECT_GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite'
];

/**
 * Direct client-side Gemini fallback when /api/chat is not available (e.g. static hosting)
 */
async function callGeminiDirect({ message, context, history, apiKey }) {
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_')) {
    return null;
  }

  const promptText = `Location: ${context.locationName || 'N/A'}, Risk Score: ${context.riskScore ?? 'N/A'}/100 (${context.riskLevel || 'UNKNOWN'}), 24h Rain: ${context.rainfall24h ?? context.rainfall ?? 'N/A'}mm, Soil Moisture: ${context.soilMoisture ?? 'N/A'}%, Slope: ${context.slopeAngle ?? 'N/A'}°, Inclinometer Shear: ${context.inclinometerDisplacement ?? 'N/A'}mm.\n\nUser Question: ${message}`;

  const contents = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h.text) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: promptText }]
  });

  for (const model of DIRECT_GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });
      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0];
        const textParts = (candidate?.content?.parts || [])
          .filter(p => p && p.text && !p.thought)
          .map(p => p.text)
          .join('');
        const reply = textParts || candidate?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch {
      // Try next model
    }
  }
  return null;
}

export async function sendChatMessage({ message, context = {}, history = [] }) {
  if (!message || message.trim() === '') {
    return {
      success: false,
      error: 'Message cannot be empty.'
    };
  }

  const directApiKey = import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY;

  // 1. Try backend /api/chat endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message.trim(),
        context,
        history
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    
    // Ensure the response is actual JSON and not an HTML SPA fallback page
    if (contentType.includes('application/json')) {
      const data = await response.json().catch(() => null);
      if (data && data.success && data.reply) {
        return {
          success: true,
          reply: data.reply
        };
      }
    }
  } catch (err) {
    // Backend fetch failed (e.g. offline, static server, or timeout)
    console.warn('/api/chat endpoint unreachable, checking client fallbacks:', err.message);
  }

  // 2. Direct client-side Gemini call if key is available in environment
  if (directApiKey) {
    try {
      const directReply = await callGeminiDirect({
        message: message.trim(),
        context,
        history,
        apiKey: directApiKey
      });
      if (directReply) {
        return {
          success: true,
          reply: directReply
        };
      }
    } catch (directErr) {
      console.warn('Direct Gemini call failed:', directErr.message);
    }
  }

  // 3. Resilient Geotechnical Telemetry Fallback (Always succeeds with real sensor data)
  const telemetryReply = generateContextualFallback({ message: message.trim(), context });
  return {
    success: true,
    reply: telemetryReply
  };
}
