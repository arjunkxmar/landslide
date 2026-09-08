/**
 * Active Emergency Landslide Alerts
 * Formatted following NDMA & Common Alerting Protocol (CAP-India) standard
 */

export const ACTIVE_ALERTS = [
  {
    id: 'ALT-2026-CRIT-001',
    title: 'CRITICAL LANDSLIDE WARNING & EVACUATION ORDER',
    location: 'Wayanad Meppadi Ridge (Sector 4), Kerala',
    coordinates: '11.5543° N, 76.1264° E',
    riskLevel: 'CRITICAL',
    riskScore: 92,
    severity: 'Extreme',
    urgency: 'Immediate',
    status: 'ACTIVE - STAGE 2 RED ALERT',
    issuedAt: '2026-09-08 00:05 IST',
    validUntil: '2026-09-08 12:00 IST',
    affectedEstPopulation: 3400,
    headline: 'High probability of deep-seated debris avalanche within next 3–6 hours.',
    reasons: [
      'Extremely heavy rainfall: 184 mm recorded over past 24 hours (Surpassing threshold of 120 mm)',
      'Subsoil pore water pressure critical: 142 kPa causing hydraulic soil liquefaction',
      'Steep slope gradient: 48° tea-estate escarpment with sheared crown tension cracks',
      'Inclinometer recorded 14.8 mm subsurface lateral shift over previous 4 hours'
    ],
    recommendedActions: [
      'Trigger Stage-2 mandatory evacuation for downstream Meppadi and Chooralmala hamlets.',
      'Sound municipal disaster siren clusters (120dB pulses) across Sector 4.',
      'Deploy NDRF 4th Battalion and SDRF search & rescue units to Base Camp Kalpetta.',
      'Impose immediate vehicle ban on Meppadi-Vaduvanchal Ghat Road.'
    ],
    authorityStatus: {
      collectorNotified: true,
      ndrfDispatched: true,
      sirensActivated: true,
      smsBroadcastSent: true
    },
    evacuationCentres: [
      { name: 'St. Joseph Higher Secondary Relief Camp, Meppadi', capacity: '850 persons', occupancy: '62%' },
      { name: 'Kalpetta Municipal Community Hall', capacity: '1,200 persons', occupancy: '35%' }
    ],
    incidentCommander: 'District Disaster Management Officer (DDMO) Wayanad'
  },
  {
    id: 'ALT-2026-CRIT-002',
    title: 'CRITICAL SLOPE SUBSIDENCE & FOUNDATION COMPROMISE ALERT',
    location: 'Joshimath Marwari Ward 3, Chamoli, Uttarakhand',
    coordinates: '30.5574° N, 79.5658° E',
    riskLevel: 'CRITICAL',
    riskScore: 88,
    severity: 'Severe',
    urgency: 'Immediate',
    status: 'ACTIVE - RED ALERT',
    issuedAt: '2026-09-07 23:30 IST',
    validUntil: '2026-09-08 18:00 IST',
    affectedEstPopulation: 1800,
    headline: 'Creep velocity acceleration detected on fractured moraine slope.',
    reasons: [
      'Persistent moderate rainfall (126 mm) saturating loose glacial moraine deposits',
      'Borehole tiltmeter showing accelerated displacement of 19.2 mm along fault plane',
      'Subsurface drainage choke causing sudden hydrostatic uplift in retaining walls',
      'Historical toe erosion along Alaknanda riverbed destabilizing the upper terrace'
    ],
    recommendedActions: [
      'Evacuate 42 identified residential units in Ward 3 to temporary prefabricated transit shelters.',
      'Halt all non-emergency vehicular traffic on Joshimath-Auli Road.',
      'Deploy Border Roads Organisation (BRO) earthmovers on standby at Marwari bridge.'
    ],
    authorityStatus: {
      collectorNotified: true,
      ndrfDispatched: true,
      sirensActivated: false,
      smsBroadcastSent: true
    },
    evacuationCentres: [
      { name: 'Govt. Inter College Shelter Camp, Joshimath', capacity: '600 persons', occupancy: '48%' }
    ],
    incidentCommander: 'Sub-Divisional Magistrate (SDM) Joshimath'
  },
  {
    id: 'ALT-2026-HIGH-003',
    title: 'HIGH RISK LANDSLIDE & DEBRIS FLOW ADVISORY',
    location: 'Shimla Summer Hill Slope B, Himachal Pradesh',
    coordinates: '31.1048° N, 77.1332° E',
    riskLevel: 'HIGH',
    riskScore: 74,
    severity: 'Moderate-High',
    urgency: 'Expected within 12h',
    status: 'ORANGE ADVISORY',
    issuedAt: '2026-09-07 22:45 IST',
    validUntil: '2026-09-08 14:00 IST',
    affectedEstPopulation: 950,
    headline: 'Continuous precipitation destabilizing road embankment near university campus.',
    reasons: [
      'Cumulative rainfall 96 mm with sustained high soil saturation (76%)',
      'Steep urban slope cutting without engineered drainage interceptor trenches',
      'Acoustic emission sensors detecting high frequency micro-fracture noise'
    ],
    recommendedActions: [
      'Pre-position local police patrol at Summer Hill junction to divert heavy commercial buses.',
      'Alert residents in lower hillside tenements to prepare emergency bug-out kits.',
      'Clear municipal storm sewers to prevent overland water ponding.'
    ],
    authorityStatus: {
      collectorNotified: true,
      ndrfDispatched: false,
      sirensActivated: false,
      smsBroadcastSent: true
    },
    evacuationCentres: [
      { name: 'HP University Auditorium Transit Hall', capacity: '450 persons', occupancy: '10%' }
    ],
    incidentCommander: 'Shimla Municipal Disaster Liaison'
  },
  {
    id: 'ALT-2026-HIGH-004',
    title: 'HIGH ROCKFALL & ROAD BREACH ADVISORY',
    location: 'Munnar Gap Road Stretch (km 12 to 18), Kerala',
    coordinates: '10.0489° N, 77.1128° E',
    riskLevel: 'HIGH',
    riskScore: 71,
    severity: 'Moderate',
    urgency: 'Immediate Transit Warning',
    status: 'YELLOW-ORANGE CAUTION',
    issuedAt: '2026-09-07 21:15 IST',
    validUntil: '2026-09-08 10:00 IST',
    affectedEstPopulation: 600,
    headline: 'Spalling boulders and mud slip along steep road excavation cuts.',
    reasons: [
      'Intense cloud bursts over tea ridge (92 mm/24h)',
      'Rockfall radar monitoring stations triggered multiple minor trajectory alerts',
      'Slope angle exceeds 45° with loose overburden boulders'
    ],
    recommendedActions: [
      'Enforce single-lane regulated convoy movement during daylight hours.',
      'Complete overnight transit shutdown between 19:00 and 06:00 IST.',
      'Deploy JCB earthmovers at Devikulam checkpoint for immediate clearing.'
    ],
    authorityStatus: {
      collectorNotified: true,
      ndrfDispatched: false,
      sirensActivated: false,
      smsBroadcastSent: false
    },
    evacuationCentres: [],
    incidentCommander: 'PWD Highway Engineer, Idukki District'
  }
];
