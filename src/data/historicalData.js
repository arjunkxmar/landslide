/**
 * Historical Landslide Records & Analytics Dataset
 * Correlating precipitation, geology, and landslide trigger thresholds
 */

export const MONTHLY_METRICS = [
  { month: 'Jan', rainfallMm: 32, landslideEvents: 1, alertsIssued: 2, avgRiskScore: 18 },
  { month: 'Feb', rainfallMm: 28, landslideEvents: 0, alertsIssued: 1, avgRiskScore: 16 },
  { month: 'Mar', rainfallMm: 45, landslideEvents: 2, alertsIssued: 3, avgRiskScore: 24 },
  { month: 'Apr', rainfallMm: 62, landslideEvents: 3, alertsIssued: 5, avgRiskScore: 31 },
  { month: 'May', rainfallMm: 110, landslideEvents: 7, alertsIssued: 12, avgRiskScore: 46 },
  { month: 'Jun', rainfallMm: 285, landslideEvents: 28, alertsIssued: 41, avgRiskScore: 78 },
  { month: 'Jul', rainfallMm: 420, landslideEvents: 46, alertsIssued: 68, avgRiskScore: 89 },
  { month: 'Aug', rainfallMm: 390, landslideEvents: 42, alertsIssued: 64, avgRiskScore: 86 },
  { month: 'Sep', rainfallMm: 240, landslideEvents: 21, alertsIssued: 35, avgRiskScore: 68 },
  { month: 'Oct', rainfallMm: 145, landslideEvents: 11, alertsIssued: 18, avgRiskScore: 52 },
  { month: 'Nov', rainfallMm: 58, landslideEvents: 4, alertsIssued: 6, avgRiskScore: 28 },
  { month: 'Dec', rainfallMm: 22, landslideEvents: 1, alertsIssued: 2, avgRiskScore: 17 }
];

export const VULNERABILITY_MATRIX = [
  {
    district: 'Wayanad',
    state: 'Kerala',
    vulnerabilityIndex: '0.94 (Extreme)',
    primaryGeology: 'Charnockite & Lateritic overburden',
    slopeAngleAvg: '44°',
    monsoonRainfallAvg: '3,200 mm',
    highRiskHamlets: 18,
    installedSensors: 24,
    status: 'RED ZONE'
  },
  {
    district: 'Chamoli (Joshimath Sector)',
    state: 'Uttarakhand',
    vulnerabilityIndex: '0.91 (Extreme)',
    primaryGeology: 'Main Central Thrust (MCT) Gneiss & Moraine',
    slopeAngleAvg: '52°',
    monsoonRainfallAvg: '1,850 mm',
    highRiskHamlets: 14,
    installedSensors: 28,
    status: 'RED ZONE'
  },
  {
    district: 'Shimla',
    state: 'Himachal Pradesh',
    vulnerabilityIndex: '0.82 (High)',
    primaryGeology: 'Jutogh Phyllites & Quartzites',
    slopeAngleAvg: '38°',
    monsoonRainfallAvg: '1,450 mm',
    highRiskHamlets: 12,
    installedSensors: 20,
    status: 'ORANGE ZONE'
  },
  {
    district: 'Idukki (Munnar)',
    state: 'Kerala',
    vulnerabilityIndex: '0.79 (High)',
    primaryGeology: 'Hornblende-Biotite Gneiss',
    slopeAngleAvg: '42°',
    monsoonRainfallAvg: '3,450 mm',
    highRiskHamlets: 15,
    installedSensors: 18,
    status: 'ORANGE ZONE'
  },
  {
    district: 'East Sikkim (Gangtok)',
    state: 'Sikkim',
    vulnerabilityIndex: '0.78 (High)',
    primaryGeology: 'Daling Schist & Colluvium',
    slopeAngleAvg: '41°',
    monsoonRainfallAvg: '2,800 mm',
    highRiskHamlets: 11,
    installedSensors: 16,
    status: 'ORANGE ZONE'
  },
  {
    district: 'Darjeeling',
    state: 'West Bengal',
    vulnerabilityIndex: '0.68 (Moderate)',
    primaryGeology: 'Darjeeling Gneiss & Phyllites',
    slopeAngleAvg: '36°',
    monsoonRainfallAvg: '2,600 mm',
    highRiskHamlets: 9,
    installedSensors: 14,
    status: 'YELLOW ZONE'
  },
  {
    district: 'Nilgiris',
    state: 'Tamil Nadu',
    vulnerabilityIndex: '0.52 (Moderate-Low)',
    primaryGeology: 'Archaean Charnockite Series',
    slopeAngleAvg: '32°',
    monsoonRainfallAvg: '1,900 mm',
    highRiskHamlets: 6,
    installedSensors: 12,
    status: 'YELLOW ZONE'
  }
];

export const HISTORICAL_DISASTER_RECORDS = [
  {
    id: 'HIST-2024-WY',
    year: 2024,
    event: 'Chooralmala-Meppadi Debris Avalanche',
    state: 'Kerala',
    cause: 'Extreme convective cloudburst (572mm in 48h) on steep saturated tea terrain',
    fatalitiesReported: 350,
    earlyWarningLeadTime: '2.5 hours (Local experimental sensor alert)',
    mitigationLessons: 'Need for dense continuous pore water pressure telemetry and automated community sirens'
  },
  {
    id: 'HIST-2023-HP',
    year: 2023,
    event: 'Himachal Monsoon Flash Slides & Road Slumps',
    state: 'Himachal Pradesh',
    cause: 'Western disturbance overlapping monsoon trough (320mm in 24h)',
    fatalitiesReported: 71,
    earlyWarningLeadTime: '1.2 hours',
    mitigationLessons: 'Real-time road transit monitoring and early closure of mountain passes'
  },
  {
    id: 'HIST-2021-CM',
    year: 2021,
    event: 'Rishi Ganga - Chamoli Rock-Ice Avalanche',
    state: 'Uttarakhand',
    cause: 'Hanging glacier rock-mass detachment from Ronti peak into steep gorge',
    fatalitiesReported: 204,
    earlyWarningLeadTime: 'None (Upstream sensor gap)',
    mitigationLessons: 'High-altitude satellite + seismic vibration early warning mesh required'
  },
  {
    id: 'HIST-2018-KL',
    year: 2018,
    event: 'Western Ghats Mega Monsoon Slips (Idukki & Wayanad)',
    state: 'Kerala',
    cause: 'Back-to-back deep depression systems saturating 100% soil pore capacity',
    fatalitiesReported: 140,
    earlyWarningLeadTime: '45 mins',
    mitigationLessons: 'AI multi-factor predictive modeling rather than simple threshold rainfall gauges'
  }
];

export const SYSTEM_METRICS_SUMMARY = {
  totalAlertsDispatched: 257,
  falsePositiveRate: '5.2%',
  leadTimeAvg: '3.4 Hours',
  citizenReportsProcessed: 1420,
  activeNdrfBrigadesNotified: 12,
  satellitePingsDaily: '1.8 Million',
  dataConfidenceScore: '96.4%'
};
