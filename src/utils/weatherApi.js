/**
 * Open-Meteo Weather API Integration Service
 * Fetches real-time atmospheric and soil telemetry for any latitude & longitude
 * Endpoint: https://api.open-meteo.com/v1/forecast
 * 
 * Required parameters:
 * - precipitation (mm)
 * - rain (mm)
 * - relative_humidity_2m (%)
 * - surface_pressure (hPa)
 * - soil_moisture_0_to_1cm (m³/m³)
 */

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches live weather and soil moisture data from Open-Meteo API
 * @param {number} latitude - Target location latitude
 * @param {number} longitude - Target location longitude
 * @param {number} timeoutMs - Timeout in milliseconds (default 10000)
 * @returns {Promise<Object>} Normalized live weather telemetry
 */
export async function fetchLiveWeatherData(latitude, longitude, timeoutMs = 10000) {
  if (latitude === undefined || longitude === undefined || isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Valid latitude and longitude coordinates are required');
  }

  // Build query parameters according to requirements
  const params = new URLSearchParams({
    latitude: Number(latitude).toFixed(4),
    longitude: Number(longitude).toFixed(4),
    current: 'precipitation,rain,relative_humidity_2m,surface_pressure,temperature_2m',
    hourly: 'soil_moisture_0_to_1cm',
    daily: 'precipitation_sum,rain_sum',
    timezone: 'auto'
  });

  const url = `${OPEN_METEO_BASE_URL}?${params.toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Open-Meteo API returned HTTP ${response.status} (${response.statusText})`;
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.reason) {
          errorMessage = `Open-Meteo Error: ${errorBody.reason}`;
        }
      } catch {
        // use default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Extract current metrics
    const current = data.current || {};
    const precipitation = typeof current.precipitation === 'number' ? current.precipitation : 0;
    const rain = typeof current.rain === 'number' ? current.rain : 0;
    const relativeHumidity = typeof current.relative_humidity_2m === 'number' ? current.relative_humidity_2m : 60;
    const surfacePressure = typeof current.surface_pressure === 'number' ? current.surface_pressure : 1013.25;
    const temperature = typeof current.temperature_2m === 'number' ? current.temperature_2m : 22;

    // Daily rainfall total (crucial for 24h landslide threshold estimation)
    const dailyRainfall = typeof data.daily?.precipitation_sum?.[0] === 'number'
      ? data.daily.precipitation_sum[0]
      : (typeof data.daily?.rain_sum?.[0] === 'number' ? data.daily.rain_sum[0] : rain);

    // Extract soil moisture 0-1cm from hourly array for the current hour
    let soilMoistureRaw = 0.25; // default fallback in m³/m³
    if (data.hourly && Array.isArray(data.hourly.time) && Array.isArray(data.hourly.soil_moisture_0_to_1cm)) {
      const times = data.hourly.time;
      const values = data.hourly.soil_moisture_0_to_1cm;

      // Find current hour index
      let targetIndex = 0;
      if (current.time) {
        const hourPrefix = current.time.slice(0, 13); // "YYYY-MM-DDTHH"
        const found = times.findIndex(t => t.startsWith(hourPrefix));
        if (found !== -1) targetIndex = found;
      }

      if (typeof values[targetIndex] === 'number') {
        soilMoistureRaw = values[targetIndex];
      }
    }

    // In soil physics, full saturation porosity for typical hill slope laterite/clay is ~0.48-0.50 m³/m³
    // Convert to percentage (0 - 100%) for standard landslide threshold models
    const soilMoisturePercent = Math.min(100, Math.max(5, Math.round((soilMoistureRaw / 0.50) * 100)));

    return {
      success: true,
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation ?? null,
      timezone: data.timezone || 'UTC',
      current: {
        precipitation, // instantaneous / 15-min rate (mm)
        rain, // mm
        relative_humidity_2m: relativeHumidity, // %
        surface_pressure: surfacePressure, // hPa
        temperature_2m: temperature, // °C
        time: current.time || new Date().toISOString()
      },
      hourly: {
        soil_moisture_0_to_1cm: soilMoistureRaw // m³/m³
      },
      derived: {
        dailyRainfall, // mm (estimated 24h precipitation load)
        effectiveRainfall: Math.max(dailyRainfall, rain * 6, precipitation * 6), // mm
        soilMoisturePercent, // % saturation for risk modeling
        soilMoistureVwc: soilMoistureRaw // m³/m³ raw volumetric water content
      },
      source: 'Open-Meteo Global Numerical Weather Prediction API',
      apiEndpoint: url,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestamp: Date.now()
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Connection to Open-Meteo API timed out after 10 seconds. Please check your internet connection.');
    }
    throw error;
  }
}
