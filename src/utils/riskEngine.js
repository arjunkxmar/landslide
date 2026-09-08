/**
 * LandslideGuard AI - Prototype Risk Calculation Engine
 * Designed for SIH 2026 early warning modeling
 * Note: Clearly labeled as a prototype/demo risk engine until validated ML models and real telemetry datasets are connected.
 */

export const RISK_LEVELS = {
  LOW: {
    label: 'LOW RISK',
    level: 'LOW',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    hex: '#10b981',
    icon: '🟢',
    scoreRange: '0 - 30',
    defaultAction: 'Normal monitoring. Continue routine geotechnical scans and weather observation.'
  },
  MODERATE: {
    label: 'MODERATE RISK',
    level: 'MODERATE',
    color: 'amber',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    hex: '#f59e0b',
    icon: '🟡',
    scoreRange: '31 - 50',
    defaultAction: 'Advisory watch. Alert local village disaster officers and restrict heavy transit on unpaved ghat routes.'
  },
  HIGH: {
    label: 'HIGH RISK',
    level: 'HIGH',
    color: 'orange',
    badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    hex: '#f97316',
    icon: '🟠',
    scoreRange: '51 - 75',
    defaultAction: 'Stage 1 Orange Alert. Pre-position State Disaster Response Force (SDRF) teams, initiate preventive traffic diversion, and notify downslope residents.'
  },
  CRITICAL: {
    label: 'CRITICAL RISK',
    level: 'CRITICAL',
    color: 'rose',
    badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
    hex: '#ef4444',
    icon: '🔴',
    scoreRange: '76 - 100',
    defaultAction: 'Stage 2 Red Alert & Evacuation. Authorities should issue immediate emergency warnings, activate sirens, block all affected mountain corridors, and evacuate high-risk settlements.'
  }
};

export function getRiskLevelInfo(score) {
  if (score <= 30) return RISK_LEVELS.LOW;
  if (score <= 50) return RISK_LEVELS.MODERATE;
  if (score <= 75) return RISK_LEVELS.HIGH;
  return RISK_LEVELS.CRITICAL;
}

/**
 * Calculates risk score from environmental inputs
 * @param {Object} inputs
 * @param {number} inputs.rainfall - mm (0 to 300+)
 * @param {number} inputs.soilMoisture - percentage (0 to 100)
 * @param {number} inputs.slopeAngle - degrees (0 to 75)
 * @param {number} inputs.temperature - celsius (-10 to 50)
 * @param {number} inputs.humidity - percentage (0 to 100)
 * @param {string} inputs.history - 'none' | 'low' | 'moderate' | 'high'
 * @returns {Object} detailed risk assessment
 */
export function calculateLandslideRisk({
  rainfall = 0,
  soilMoisture = 0,
  slopeAngle = 0,
  temperature = 22,
  humidity = 60,
  history = 'none',
  surfacePressure = 1013,
  precipitation = 0
}) {
  // 1. Rainfall score component (max 35 points)
  // Landslides typically trigger above 100mm/24h or extreme intensity >150mm
  // Factor in instantaneous precipitation rate if intense
  const effectiveRainfall = Math.max(rainfall, precipitation * 6);
  let rainScore = 0;
  let rainStatus = 'Normal';
  if (effectiveRainfall < 30) {
    rainScore = (effectiveRainfall / 30) * 8;
    rainStatus = 'Low';
  } else if (effectiveRainfall < 80) {
    rainScore = 8 + ((effectiveRainfall - 30) / 50) * 12;
    rainStatus = 'Moderate';
  } else if (effectiveRainfall < 140) {
    rainScore = 20 + ((effectiveRainfall - 80) / 60) * 10;
    rainStatus = 'High ⚠️';
  } else {
    rainScore = Math.min(35, 30 + ((effectiveRainfall - 140) / 100) * 5);
    rainStatus = 'Extreme / Cloudburst ⚠️';
  }

  // 2. Soil Moisture component (max 30 points)
  // >75% saturation drastically reduces pore shear strength
  let moistureScore = 0;
  let moistureStatus = 'Normal';
  if (soilMoisture < 40) {
    moistureScore = (soilMoisture / 40) * 6;
    moistureStatus = 'Dry / Safe';
  } else if (soilMoisture < 65) {
    moistureScore = 6 + ((soilMoisture - 40) / 25) * 10;
    moistureStatus = 'Moderate Saturation';
  } else if (soilMoisture < 80) {
    moistureScore = 16 + ((soilMoisture - 65) / 15) * 8;
    moistureStatus = 'High Saturation ⚠️';
  } else {
    moistureScore = 24 + ((soilMoisture - 80) / 20) * 6;
    moistureStatus = 'Critical Saturation (Pore Pressure Surge) ⚠️';
  }

  // 3. Slope Angle component (max 20 points)
  // Slopes >30° are vulnerable; >45° are high risk
  let slopeScore = 0;
  let slopeStatus = 'Gentle';
  if (slopeAngle < 20) {
    slopeScore = (slopeAngle / 20) * 4;
    slopeStatus = 'Gentle Slope';
  } else if (slopeAngle < 35) {
    slopeScore = 4 + ((slopeAngle - 20) / 15) * 7;
    slopeStatus = 'Moderate Incline';
  } else if (slopeAngle < 50) {
    slopeScore = 11 + ((slopeAngle - 35) / 15) * 6;
    slopeStatus = 'Steep Incline ⚠️';
  } else {
    slopeScore = 17 + Math.min(3, ((slopeAngle - 50) / 25) * 3);
    slopeStatus = 'Severe Precipitous Cliff ⚠️';
  }

  // 4. Historical landslide activity component (max 15 points)
  let historyScore = 0;
  let historyStatus = 'None Recorded';
  switch (history) {
    case 'none':
      historyScore = 0;
      historyStatus = 'Stable Bedrock / None';
      break;
    case 'low':
      historyScore = 5;
      historyStatus = 'Minor Historical Slips';
      break;
    case 'moderate':
      historyScore = 10;
      historyStatus = 'Frequent Slope Creep ⚠️';
      break;
    case 'high':
      historyScore = 15;
      historyStatus = 'High / Multiple Major Slides ⚠️';
      break;
    default:
      historyScore = 2;
  }

  // 5. Environmental modifiers (Humidity + Temp + Barometric Pressure) (max +/- 5 points)
  let modifier = 0;
  if (humidity > 85) modifier += 2;
  if (temperature > 30 && effectiveRainfall > 50) modifier += 2; // Tropical convective destabilization
  // Barometric drop: Low surface pressure (<1000 hPa or severe <980 hPa) indicates cyclonic storms & convective uplift
  if (surfacePressure && surfacePressure < 990) modifier += 2;
  else if (surfacePressure && surfacePressure < 1005) modifier += 1;

  let totalRawScore = rainScore + moistureScore + slopeScore + historyScore + modifier;
  let finalScore = Math.round(Math.max(0, Math.min(100, totalRawScore)));

  const riskInfo = getRiskLevelInfo(finalScore);

  // Determine specific actionable recommendation based on dominant factors
  let recommendedAction = '';
  if (finalScore >= 76) {
    recommendedAction = 'CRITICAL ALERT: Immediate evacuation of downslope settlements recommended. Alert NDRF & District Disaster Control Room. Issue immediate road closure notices on adjoining highways.';
  } else if (finalScore >= 51) {
    recommendedAction = 'HIGH ALERT: Issue early warning bulletins to local panchayats. Activate automated rain-gauge SMS alerts and inspect rockfall barrier mesh along transit corridors.';
  } else if (finalScore >= 31) {
    recommendedAction = 'MODERATE WATCH: Instruct field rangers to monitor drainage channels for mud turbidity and soil fissures. Issue travel advisories for night transit.';
  } else {
    recommendedAction = 'STABLE: Environmental parameters are within normal baseline. Maintain regular IoT sensor telemetry heartbeats.';
  }

  return {
    score: finalScore,
    riskInfo,
    breakdown: {
      rainfall: {
        value: rainfall,
        effectiveValue: Math.round(effectiveRainfall),
        score: Math.round(rainScore),
        maxScore: 35,
        status: rainStatus,
        isWarning: effectiveRainfall >= 80
      },
      precipitation: {
        value: precipitation
      },
      soilMoisture: {
        value: soilMoisture,
        score: Math.round(moistureScore),
        maxScore: 30,
        status: moistureStatus,
        isWarning: soilMoisture >= 65
      },
      slopeAngle: {
        value: slopeAngle,
        score: Math.round(slopeScore),
        maxScore: 20,
        status: slopeStatus,
        isWarning: slopeAngle >= 35
      },
      historicalActivity: {
        value: history,
        score: Math.round(historyScore),
        maxScore: 15,
        status: historyStatus,
        isWarning: history === 'moderate' || history === 'high'
      },
      humidity: {
        value: humidity,
        isWarning: humidity >= 85
      },
      temperature: {
        value: temperature
      },
      surfacePressure: {
        value: surfacePressure,
        isLowPressure: surfacePressure < 1005
      }
    },
    recommendedAction,
    timestamp: new Date().toISOString()
  };
}

export const PRESET_SCENARIOS = [
  {
    name: 'Wayanad Monsoon Cloudburst',
    description: 'Torrential downpour with saturated subsoil on steep Western Ghats tea-estate slope.',
    data: {
      rainfall: 168,
      soilMoisture: 88,
      slopeAngle: 46,
      temperature: 21,
      humidity: 94,
      history: 'high'
    }
  },
  {
    name: 'Joshimath Subsidence & Incline',
    description: 'High slope with persistent ground fissures and continuous steady precipitation.',
    data: {
      rainfall: 110,
      soilMoisture: 74,
      slopeAngle: 52,
      temperature: 15,
      humidity: 86,
      history: 'high'
    }
  },
  {
    name: 'Shimla Summer Monsoon Watch',
    description: 'Moderate rainfall with steep urbanized hillside and ongoing construction.',
    data: {
      rainfall: 65,
      soilMoisture: 58,
      slopeAngle: 36,
      temperature: 18,
      humidity: 78,
      history: 'moderate'
    }
  },
  {
    name: 'Dry Winter Baseline (Safe)',
    description: 'Dry, low-humidity conditions with minimal soil moisture and no recent precipitation.',
    data: {
      rainfall: 5,
      soilMoisture: 22,
      slopeAngle: 28,
      temperature: 24,
      humidity: 45,
      history: 'none'
    }
  }
];
