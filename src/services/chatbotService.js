/**
 * Client Chatbot Service for LandslideGuard AI Assistant
 * Communicates with the secure backend /api/chat endpoint
 */

export async function sendChatMessage({ message, context = {}, history = [] }) {
  if (!message || message.trim() === '') {
    return {
      success: false,
      error: 'Message cannot be empty.'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error || `Server returned error (${response.status})`;
      return {
        success: false,
        error: errorMsg
      };
    }

    if (data.success && data.reply) {
      return {
        success: true,
        reply: data.reply
      };
    }

    return {
      success: false,
      error: data.error || 'Received an unexpected response format from AI service.'
    };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'The AI assistant took too long to respond. Please check your internet connection and try again.'
      };
    }

    return {
      success: false,
      error: 'Sorry, I couldn\'t connect to the AI service right now. Please ensure the server is running and try again.'
    };
  }
}
