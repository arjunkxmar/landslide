import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { LOCATIONS_DATA } from '../data/locationsData';

const LandslideContext = createContext(null);

export function LandslideProvider({ children, activePage = 'home' }) {
  // Default to the primary critical monitoring station (Wayanad Sector 4)
  const [activeLocation, setActiveLocation] = useState(LOCATIONS_DATA[0]);
  const [liveWeather, setLiveWeather] = useState(null);
  const [liveRisk, setLiveRisk] = useState(null);
  const [dashboardTelemetry, setDashboardTelemetry] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  // Sync selected location from MapPage or elsewhere
  const updateActiveLocation = useCallback((location, weather = null, risk = null) => {
    if (location) {
      setActiveLocation(location);
    }
    if (weather) {
      setLiveWeather(weather);
    }
    if (risk) {
      setLiveRisk(risk);
    }
  }, []);

  // Sync dashboard telemetry tick
  const updateDashboardTelemetry = useCallback((telemetry) => {
    if (telemetry) {
      setDashboardTelemetry(telemetry);
    }
  }, []);

  // Sync prediction simulation
  const updatePredictionData = useCallback((data) => {
    if (data) {
      setPredictionData(data);
    }
  }, []);

  /**
   * Constructs the live application context payload for LandslideGuard AI Assistant.
   * Directly pulls from currently available application state without generating fake data.
   */
  const getChatbotContext = useCallback(() => {
    const loc = activeLocation || LOCATIONS_DATA[0];

    // Effective risk score: prioritization is live calculated risk -> dashboard telemetry -> station baseline
    const score = liveRisk?.score ?? (dashboardTelemetry?.riskScore ?? loc?.riskScore);
    const level = liveRisk?.levelInfo?.level ?? loc?.riskLevel;

    // Effective rainfall: live Open-Meteo derived -> dashboard telemetry -> station baseline
    const rain = liveWeather?.derived?.dailyRainfall ?? (dashboardTelemetry?.rainfall ?? loc?.rainfall24h);
    const rainRate = liveWeather?.current?.precipitation ?? 0;

    // Effective soil moisture: live Open-Meteo saturation -> dashboard telemetry -> station baseline
    const moisture = liveWeather?.derived?.soilMoisturePercent ?? (dashboardTelemetry?.soilMoisture ?? loc?.soilMoisture);

    // Geotechnical displacement and pressure
    const shear = dashboardTelemetry?.shearDisplacement ?? loc?.inclinometerDisplacement;
    const pore = dashboardTelemetry?.porePressure ?? loc?.porePressure;

    // Atmospheric metrics
    const temp = liveWeather?.current?.temperature_2m ?? (dashboardTelemetry?.temperature ?? loc?.temperature);
    const hum = liveWeather?.current?.relative_humidity_2m ?? (dashboardTelemetry?.humidity ?? loc?.humidity);
    const pres = liveWeather?.current?.surface_pressure ?? 1013;

    return {
      locationName: loc?.name,
      state: loc?.state,
      region: loc?.region,
      lat: loc?.lat,
      lng: loc?.lng,
      elevation: loc?.elevation,
      riskScore: score,
      riskLevel: level,
      rainfall24h: rain,
      rainRate: rainRate,
      soilMoisture: moisture,
      slopeAngle: loc?.slopeAngle,
      inclinometerDisplacement: shear,
      porePressure: pore,
      temperature: temp,
      humidity: hum,
      surfacePressure: pres,
      sensorStatus: loc?.sensorStatus,
      stationType: loc?.stationType,
      details: loc?.details,
      activePage: activePage,
      predictionFactorOfSafety: predictionData?.factorOfSafety ?? null
    };
  }, [activeLocation, liveWeather, liveRisk, dashboardTelemetry, predictionData, activePage]);

  const value = useMemo(() => ({
    activeLocation,
    liveWeather,
    liveRisk,
    dashboardTelemetry,
    predictionData,
    updateActiveLocation,
    updateDashboardTelemetry,
    updatePredictionData,
    getChatbotContext
  }), [
    activeLocation,
    liveWeather,
    liveRisk,
    dashboardTelemetry,
    predictionData,
    updateActiveLocation,
    updateDashboardTelemetry,
    updatePredictionData,
    getChatbotContext
  ]);

  return (
    <LandslideContext.Provider value={value}>
      {children}
    </LandslideContext.Provider>
  );
}

export function useLandslideContext() {
  const context = useContext(LandslideContext);
  if (!context) {
    throw new Error('useLandslideContext must be used within a LandslideProvider');
  }
  return context;
}
