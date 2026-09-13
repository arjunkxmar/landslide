/**
 * Secure Server-side Gemini API Handler for LandslideGuard AI
 * 
 * In accordance with strict security requirements:
 * - The Gemini API key is kept exclusively on the server side (process.env.GEMINI_API_KEY)
 * - NEVER exposed in frontend bundles or client network traces
 */

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const CANDIDATE_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash'
];

const SYSTEM_INSTRUCTION = `You are LandslideGuard AI Assistant, an AI assistant integrated into a landslide risk monitoring and geospatial intelligence application (LandslideGuard AI).

Your job is to explain landslide risk, weather conditions, geotechnical indicators, map information and general disaster preparedness in simple, professional, and clear language.

Guidelines:
1. Project Data Integration:
   - You will receive current application data such as active location name, coordinates, elevation, risk score, risk level, rainfall (24h accumulated / rain rate), soil moisture saturation, slope angle, inclinometer shear displacement, pore pressure, temperature, humidity, and atmospheric pressure.
   - Use the supplied application data when answering questions about the current situation.
   - Never invent sensor values or claim that a value is live if it was not supplied by the application.
   - If a specific sensor reading is unavailable or not provided in the current telemetry, clearly state that the reading is not currently available.
   - Clearly distinguish between application telemetry, general geotechnical knowledge, and estimates.

2. Safety & Uncertainty:
   - Do not claim that you can predict an actual landslide with certainty.
   - Risk information is decision-support information, not a guaranteed prediction.
   - For HIGH or CRITICAL risk situations, recommend following official local authority / SDRF / NDMA emergency alerts and advisories.

3. Language & Tone:
   - Helpful, professional, concise, and easy to understand for students, citizens, and disaster management officers.
   - Understand English, Hindi, and Hinglish.
   - Answer in the same language as the user whenever possible.
   - If the user speaks Hinglish (e.g. "Yaha landslide risk high kyu hai?"), respond naturally in Hinglish.
   - If the user speaks Hindi, respond in Hindi.
   - Keep answers structured, clear, and reasonably concise (use bullet points where appropriate).`;

/**
 * Formats current application context into a clear text block for Gemini
 */
export function formatApplicationContext(context = {}) {
  if (!context || Object.keys(context).length === 0) {
    return 'Current Application Telemetry: No live station selected or telemetry is initializing.';
  }

  const lines = ['=== CURRENT LANDSLIDEGUARD APPLICATION TELEMETRY ==='];

  if (context.locationName) {
    lines.push(`• Monitored Station: ${context.locationName} (${context.state || 'India'}, ${context.region || 'Mountain Sector'})`);
    if (context.lat && context.lng) lines.push(`• Coordinates: Lat ${context.lat}, Lng ${context.lng} | Elevation: ${context.elevation || 'N/A'}`);
  }

  if (context.riskScore !== undefined) {
    lines.push(`• Current Hazard Risk Score: ${context.riskScore} / 100 (${context.riskLevel || 'UNKNOWN'} RISK)`);
  }

  if (context.rainfall !== undefined || context.rainfall24h !== undefined) {
    const rain = context.rainfall24h ?? context.rainfall;
    lines.push(`• 24-Hour Accumulated Rainfall: ${rain} mm`);
  }

  if (context.rainRate !== undefined && context.rainRate > 0) {
    lines.push(`• Instantaneous Rain Rate: ${context.rainRate} mm/hr`);
  }

  if (context.soilMoisture !== undefined) {
    lines.push(`• Soil Moisture Saturation: ${context.soilMoisture}%`);
  }

  if (context.slopeAngle !== undefined) {
    lines.push(`• Mountain Slope Gradient: ${context.slopeAngle}°`);
  }

  if (context.inclinometerDisplacement !== undefined || context.shearDisplacement !== undefined) {
    const shear = context.inclinometerDisplacement ?? context.shearDisplacement;
    lines.push(`• Borehole Inclinometer / Shear Displacement: ${shear} mm`);
  }

  if (context.porePressure !== undefined) {
    lines.push(`• Piezometer Pore Water Pressure: ${context.porePressure}`);
  }

  if (context.temperature !== undefined) {
    lines.push(`• Ambient Temperature: ${context.temperature}°C`);
  }

  if (context.humidity !== undefined) {
    lines.push(`• Relative Humidity: ${context.humidity}%`);
  }

  if (context.pressure !== undefined || context.surfacePressure !== undefined) {
    lines.push(`• Atmospheric Surface Pressure: ${context.pressure || context.surfacePressure} hPa`);
  }

  if (context.sensorStatus) {
    lines.push(`• Station Sensor Status: ${context.sensorStatus}`);
  }

  if (context.stationType) {
    lines.push(`• Installed Instrumentation: ${context.stationType}`);
  }

  if (context.details) {
    lines.push(`• Geological Observation: ${context.details}`);
  }

  if (context.activePage) {
    lines.push(`• User's Current Screen in App: ${context.activePage.toUpperCase()} page`);
  }

  lines.push('=====================================================');
  return lines.join('\n');
}

/**
 * Generates an intelligent, context-aware fallback response using actual application telemetry
 * when Gemini API key is missing or when network is offline.
 */
function generateContextualFallback({ message, context }) {
  const q = (message || '').toLowerCase();
  const loc = context.locationName || 'the monitored location';
  const score = context.riskScore !== undefined ? context.riskScore : 'N/A';
  const level = context.riskLevel || 'EVALUATING';
  const rain = context.rainfall24h ?? context.rainfall ?? 'N/A';
  const soil = context.soilMoisture !== undefined ? `${context.soilMoisture}%` : 'N/A';
  const slope = context.slopeAngle !== undefined ? `${context.slopeAngle}°` : 'N/A';
  const shear = context.inclinometerDisplacement ?? context.shearDisplacement ?? 'N/A';
  const pore = context.porePressure || 'N/A';

  const isHinglish = q.includes('kyu') || q.includes('kya') || q.includes('kare') || q.includes('yaha') || q.includes('khatra') || q.includes('hai');

  // Question 1: Risk / Score Explanation
  if (q.includes('risk') || q.includes('khatra') || q.includes('score') || q.includes('explain current risk') || q.includes('contributing factors')) {
    if (isHinglish) {
      return `**${loc}** me current hazard risk score **${score}/100** (**${level} RISK**) hai.\n\n` +
        `Yaha risk isliye elevated hai kyunki:\n` +
        `• **24-Hour Rainfall**: ${rain} mm record hui hai\n` +
        `• **Soil Moisture**: ${soil} saturation tak pahunch chuki hai\n` +
        `• **Slope Angle**: ${slope} steep gradient hai\n` +
        `• **Subsurface Shear**: ${shear} mm displacement detect hui hai\n\n` +
        `Pore water pressure ${pore} hone ke karan mitti ki shear strength kam ho jati hai. Local disaster management guidelines follow karein.`;
    }
    return `The current estimated landslide risk score for **${loc}** is **${score}/100** (**${level} RISK**).\n\n` +
      `**Contributing Environmental & Geotechnical Factors:**\n` +
      `• **Rainfall Load**: ${rain} mm in the last 24 hours\n` +
      `• **Soil Saturation**: ${soil} moisture level\n` +
      `• **Slope Gradient**: ${slope} steep terrain\n` +
      `• **Inclinometer Shear**: ${shear} mm displacement\n` +
      `• **Pore Pressure**: ${pore}\n\n` +
      `When heavy precipitation saturates steep slopes, pore-water pressure increases and weakens soil cohesion. This score provides decision-support monitoring, not a guaranteed prediction.`;
  }

  // Question 2: Rainfall Analysis
  if (q.includes('rain') || q.includes('barish') || q.includes('precipitation')) {
    if (isHinglish) {
      return `**${loc}** par 24-hour rainfall **${rain} mm** record hui hai (Rain rate: ${context.rainRate || 0} mm/hr).\n\n` +
        `Monsoon aur hill slope guidelines ke hisaab se, 100mm/24h se zyada barish hone par pore pressure badhta hai aur slope failure ka hazard badh jata hai. Live dashboard par precipitation radar check karte rahein.`;
    }
    return `Current rainfall telemetry for **${loc}** shows **${rain} mm** accumulated over 24 hours with an instantaneous rate of **${context.rainRate || 0} mm/hr**.\n\n` +
      `In mountainous geotechnical analysis, cumulative rainfall exceeding regional threshold levels (typically >100mm in 24h) causes rapid topsoil saturation (${soil}) and reduces internal friction along bedding planes.`;
  }

  // Question 3: Location Explanation
  if (q.includes('location') || q.includes('where') || q.includes('station') || q.includes('kahan')) {
    return `**Monitored Station Overview: ${loc}**\n\n` +
      `• **State / Region**: ${context.state || 'India'}, ${context.region || 'Mountain Sector'}\n` +
      `• **Coordinates**: Lat ${context.lat || 'N/A'}, Lng ${context.lng || 'N/A'}\n` +
      `• **Elevation**: ${context.elevation || 'N/A'}\n` +
      `• **Installed Instrumentation**: ${context.stationType || 'MEMS Inclinometers + TDR Soil Moisture Mesh'}\n` +
      `• **Geological Observation**: ${context.details || 'Continuous telemetry monitoring for slope displacement and pore pressure.'}`;
  }

  // Question 4: Actions / Safety
  if (q.includes('what should i do') || q.includes('action') || q.includes('evacuat') || q.includes('safety') || q.includes('kya kare')) {
    if (isHinglish) {
      return `**${level} Risk Situation me Emergency Steps:**\n\n` +
        `1. **Alert Rahe**: Local SDRF/NDMA advisories aur emergency sirens par dhyan dein.\n` +
        `2. **Steep Slopes se Door Rahe**: Natural water channels, retaining walls aur kacchi pahadi sadko par transit avoid karein.\n` +
        `3. **Early Warning Signs Pehchane**: Zameen me nayi daraarein (fissures), ped ya bijli ke khambon ka jhukna, ya achanak mitti ka pani aana.\n` +
        `4. **Evacuate if Necessary**: Critical alert par turant designated shelter ya downslope safe zone me shift ho jayein.`;
    }
    return `**Safety Actions for ${level} Risk Level:**\n\n` +
      `1. **Follow Official Directives**: Adhere to instructions from the State Disaster Response Force (SDRF) and District Disaster Management Authority (DDMA).\n` +
      `2. **Avoid Vulnerable Corridors**: Stay clear of steep unpaved road cuts, natural drainage chutes, and toe-erosion zones.\n` +
      `3. **Monitor Early Warning Signs**: Watch for progressive tension cracks in soil or road surfaces, tilting trees, bulging retaining walls, or muddy runoff bursts.\n` +
      `4. **Evacuation Readiness**: Keep emergency kits ready and move to designated high-ground community shelters if an evacuation order is issued.`;
  }

  // Question 5: What is a landslide
  if (q.includes('what is a landslide') || q.includes('what is landslide') || q.includes('landslide kya')) {
    if (isHinglish) {
      return `**Landslide (भूस्खलन) kya hota hai?**\n\nA landslide is the downward and outward movement of slope-forming materials including rock, soil, artificial fill, or a combination of these under the influence of gravity.\n\n` +
        `**Mukhya Kaaran (Key Causes):**\n` +
        `• **Heavy Rainfall / Cloudbursts**: Mitti me pani bharne se weight badh jata hai aur friction ghat jata hai.\n` +
        `• **Steep Slopes**: 35° se adhik dhalan par hazard zyada hota hai.\n` +
        `• **Deforestation & Construction**: Ped katne aur unscientific slope cutting se pahad kamzor padte hain.\n` +
        `• **Seismic Activity**: Bhukamp se kamzor chattanen slide kar sakti hain.`;
    }
    return `A **landslide** is the movement of rock, debris, or earth down a slope under the influence of gravity. It occurs when shear stress on the slope exceeds the shear strength of the rock or soil.\n\n` +
      `**Primary Triggering Factors:**\n` +
      `• **Prolonged or Intense Rainfall**: Pore-water pressure build-up liquefies or lubricates failure planes.\n` +
      `• **Steep Mountain Geometry**: Gravity naturally acts more aggressively on steep angles (>35°).\n` +
      `• **Geological Weaknesses**: Fractured bedrock, clay layers, or tectonic shearing.\n` +
      `• **Anthropogenic Factors**: Road cutting, blasting, deforestation, and inadequate slope drainage.`;
  }

  // General query fallback with real telemetry
  return `I am currently analyzing live telemetry for **${loc}**:\n\n` +
    `• **Risk Score**: ${score}/100 (${level})\n` +
    `• **24h Rainfall**: ${rain} mm\n` +
    `• **Soil Moisture**: ${soil}\n` +
    `• **Slope Angle**: ${slope}\n\n` +
    `Feel free to ask about risk factors, rainfall thresholds, slope stability, or disaster preparedness. (Note: To enable arbitrary conversational Gemini AI, set \`GEMINI_API_KEY\` in your \`.env\` file).`;
}

/**
 * Calls the Google Gemini API securely on the server
 */
export async function generateGeminiChatResponse({ message, context = {}, history = [], apiKey = null }) {
  const key = apiKey || process.env.GEMINI_API_KEY;

  // If no API key is provided, provide smart application telemetry response
  if (!key || key.trim() === '' || key === 'your_key_here' || key === 'your_gemini_api_key_here') {
    const fallbackReply = generateContextualFallback({ message, context });
    return {
      success: true,
      reply: fallbackReply
    };
  }

  // Format the application context
  const contextText = formatApplicationContext(context);

  // Build the message contents for Gemini REST API
  const contents = [];

  // Convert previous history to Gemini contents format
  if (Array.isArray(history)) {
    const recentHistory = history.slice(-10);
    for (const item of recentHistory) {
      if (!item.text) continue;
      const role = item.sender === 'user' ? 'user' : 'model';
      contents.push({
        role,
        parts: [{ text: item.text }]
      });
    }
  }

  // Append current user message with attached application context
  const userPromptWithContext = `${contextText}\n\nUser Question:\n${message}`;
  contents.push({
    role: 'user',
    parts: [{ text: userPromptWithContext }]
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
      topP: 0.95
    }
  };

  // Helper to call specified model
  async function callModel(modelName) {
    const url = `${GEMINI_API_BASE}/${modelName}:generateContent?key=${encodeURIComponent(key.trim())}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data.error?.message || `Gemini API returned HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      const candidate = data.candidates?.[0];
      const textParts = (candidate?.content?.parts || [])
        .filter(p => p && p.text && !p.thought)
        .map(p => p.text)
        .join('');
      const text = textParts || candidate?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Gemini API returned an empty response.');
      }

      return text;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  // Iterate candidate models until one succeeds
  for (const model of CANDIDATE_MODELS) {
    try {
      const replyText = await callModel(model);
      return {
        success: true,
        reply: replyText
      };
    } catch (modelErr) {
      console.warn(`Gemini model (${model}) failed:`, modelErr.message);
    }
  }

  // Fallback to local contextual telemetry engine if all Gemini models fail or rate limit
  console.warn('All Gemini models failed, falling back to telemetry engine.');
  const fallbackReply = generateContextualFallback({ message, context });
  return {
    success: true,
    reply: fallbackReply
  };
}
