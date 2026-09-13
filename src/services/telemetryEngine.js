/**
 * Geotechnical Telemetry Intelligence Engine
 * Provides context-aware hazard analysis and fallback responses grounded in live sensor data.
 */

export function generateContextualFallback({ message, context = {} }) {
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
    `• **Slope Angle**: ${slope}\n` +
    `• **Inclinometer Shear**: ${shear} mm\n\n` +
    `Feel free to ask about risk factors, rainfall thresholds, slope stability, or disaster preparedness.`;
}
