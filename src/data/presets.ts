import { PresetScenario, SimulationResult } from '../types/simulation';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'bengaluru-rainfall',
    title: 'Bengaluru 6-Hour Cloudburst & Deluge',
    shortDesc: '180mm extreme precipitation over 6 hours across Bengaluru tech corridor & lake catchments.',
    premise: 'What would happen if Bengaluru experienced extremely heavy rainfall of 180mm for six hours straight?',
    domain: 'Urban & Infrastructure',
    horizon: '6 Hours (and 48h ripple)',
    volatility: 'Severe / Black Swan',
    tag: 'Flagship Scenario'
  },
  {
    id: 'saas-agent-shift',
    title: 'Autonomous AI Agents Replace 80% B2B Software Seats',
    shortDesc: 'Enterprise clients cancel per-seat SaaS contracts in favor of outcome-based agentic workflows.',
    premise: 'What would happen if Fortune 500 companies transitioned from per-seat enterprise software licenses to autonomous AI agent runtimes within 9 months?',
    domain: 'Business & Economy',
    horizon: '12 Months',
    volatility: 'Severe / Black Swan',
    tag: 'Tech Market'
  },
  {
    id: 'four-day-workweek',
    title: 'Mandatory 4-Day Workweek in Global Tech Hubs',
    shortDesc: '32-hour workweek legislated across major technology sectors with no pay reductions.',
    premise: 'What would happen if a major economic hub mandated a strict 32-hour 4-day workweek for knowledge and tech workers without wage reductions?',
    domain: 'Society & Public Health',
    horizon: '6 Months',
    volatility: 'Moderate',
    tag: 'Workforce & Policy'
  },
  {
    id: 'chokepoint-malacca',
    title: 'Strait of Malacca 10-Day Shipping Blockade',
    shortDesc: 'A container vessel grounding halts 25% of global maritime commerce and energy transit.',
    premise: 'What would happen if the Strait of Malacca became completely impassable for commercial cargo vessels for 10 consecutive days?',
    domain: 'Geopolitics & Supply Chain',
    horizon: '10 Days (and 30d tail)',
    volatility: 'Severe / Black Swan',
    tag: 'Supply Chain'
  }
];

// High-fidelity instant baseline for Bengaluru Deluge so users can test immediately even prior to live API calls
export const BENGALURU_PRESET_SIMULATION: SimulationResult = {
  id: 'sim-bengaluru-deluge-default',
  createdAt: new Date().toISOString(),
  premise: 'What would happen if Bengaluru experienced extremely heavy rainfall of 180mm for six hours straight?',
  domain: 'Urban & Infrastructure',
  horizon: '6 Hours (and 48h cascade)',
  volatility: 'Severe / Black Swan',
  title: 'Bengaluru 180mm Deluge & Systemic Urban Cascade Simulation',
  summary: 'Simulated 180mm rainfall over 6 hours overwhelms the Bellandur-Varthur lake cascade network, inundating the Outer Ring Road (ORR) and Silk Board transit arteries. Basement transformer floods knock out standby diesel generators at 14 major tech campuses, triggering secondary telecom fiber degradation and a multi-billion rupee disruption in global financial back-office operations.',
  initialState: {
    triggerVector: '180mm localized precipitation within 360 minutes across East and South Bengaluru catchments',
    vulnerabilities: [
      'Disjointed stormwater drains (SWD) choked with silt and construction runoff',
      'Lake interconnected rajakaluve overflow thresholds breached within 90 minutes',
      'Subterranean electrical substations and diesel gensets located in building basements',
      'Radial arterial road network with minimal lateral drainage escape routes (ORR, Sarjapur, Whitefield)'
    ],
    systemResilienceScore: 32
  },
  timelinePhases: [
    {
      phaseIndex: 0,
      timeOffset: 'Hour 0 - 1: Rapid Soil Saturation & Surface Runoff',
      title: 'Initial Hydrological Saturation',
      statusSummary: 'Topsoil absorbs first 35mm. Natural drainage absorption capacity drops to zero. Water accumulation begins in low-lying grade-separators.',
      criticalEvents: [
        'Rainfall rate hits 35mm/hr in Mahadevapura and Bellandur zones',
        'Stormwater drains exceed 60% capacity; localized pooling at Silk Board and Ecospace junctions',
        'Two-wheeler traffic slows from 35 km/h to 8 km/h; BMTC bus bunching begins',
        'BESCOM power dispatches precautionary feeder cutoffs in water-logged feeder circles'
      ],
      metrics: {
        disruptionLevel: 25,
        infrastructureStrain: 38,
        economicDrainRate: '₹4.2 Cr / hr ($500k/hr)',
        humanSafetyAlert: 'Elevated'
      },
      causalCatalyst: 'Groundwater saturation forces 100% of subsequent rainfall into overland runoff toward low-gradient lake chains.'
    },
    {
      phaseIndex: 1,
      timeOffset: 'Hour 2 - 3: Rajakaluve Breach & Lake Cascade Reversal',
      title: 'Stormwater Infrastructure Overtopping',
      statusSummary: 'Bellandur and Varthur lake inlets backflow. Arterial tech corridors become unnavigable canals up to 3.5 feet deep.',
      criticalEvents: [
        'Precipitation accumulates to 95mm. Rajakaluve feeder channels breach banks along Outer Ring Road',
        'Over 35,000 corporate employees stranded across Cessna Business Park, Ecospace, and Manyata',
        'Tractors and elevated Earth-movers deployed as impromptu emergency commuter ferries',
        'Basement parking ramps inundated; water enters lower mechanical levels containing backup generators'
      ],
      metrics: {
        disruptionLevel: 68,
        infrastructureStrain: 74,
        economicDrainRate: '₹22.5 Cr / hr ($2.7M/hr)',
        humanSafetyAlert: 'Severe'
      },
      causalCatalyst: 'Basement inundation submerges electrical switchgear before emergency seals can be deployed.'
    },
    {
      phaseIndex: 2,
      timeOffset: 'Hour 4 - 5: Power Grid Severance & Data Node Risk',
      title: 'Cascading Utility & Operations Failure',
      statusSummary: 'Substation isolation triggers rolling blackouts. Tech campuses switch to battery UPS systems as submerged diesel generators fail.',
      criticalEvents: [
        'Rainfall crosses 150mm. BESCOM shuts down 11kV feeders to prevent electrocution hazards across 6 divisions',
        'Emergency UPS battery runtime countdowns activate (typical 4 to 8 hour limits) in enterprise data hubs',
        'Ambulances rerouted away from flooded arterial junctions; emergency response times increase by 320%',
        'Food and grocery delivery platform services suspended citywide; cold storage supply chains disrupted'
      ],
      metrics: {
        disruptionLevel: 89,
        infrastructureStrain: 92,
        economicDrainRate: '₹68.0 Cr / hr ($8.1M/hr)',
        humanSafetyAlert: 'Critical'
      },
      causalCatalyst: 'UPS battery depletion approaches terminal thresholds while grid restoration is physically impossible in inundated substations.'
    },
    {
      phaseIndex: 3,
      timeOffset: 'Hour 6+: Terminal Peak & Systemic Ripple',
      title: 'Long-Tail Economic & Infrastructure Shock',
      statusSummary: 'Downpour tapers, but static floodwaters remain locked by topography. Citywide operational gridlock sets in for 48 hours.',
      criticalEvents: [
        'Total storm accumulation reaches 182mm. Floodwaters peak at 4.2 feet along Kadubeesanahalli underpass',
        'Work-from-home declarations issued for 1.2 million tech workers; telecom cellular towers degrade to 40% bandwidth',
        'BWSSB drinking water pumping station at Torekadanahalli reports turbidity surge, cutting piped supply for 48h',
        'Automobile insurance claims projected to exceed 14,000 submerged vehicles'
      ],
      metrics: {
        disruptionLevel: 94,
        infrastructureStrain: 96,
        economicDrainRate: '₹110 Cr / hr ($13.2M/hr)',
        humanSafetyAlert: 'Critical'
      },
      causalCatalyst: 'Receding floodwaters leave structural sediment, mold, and damaged subterranean electrical architecture requiring weeks of repair.'
    }
  ],
  consequenceGraph: {
    firstOrder: [
      {
        id: 'c1-1',
        order: 1,
        category: 'Urban Mobility',
        title: 'Arterial Corridor Impassability',
        description: 'Outer Ring Road (ORR) and Sarjapur Road submerged under 2-4 feet of water, halting all vehicular transit.',
        severity: 'critical',
        affectedParties: '750,000 daily commuters, BMTC public buses, freight corridors'
      },
      {
        id: 'c1-2',
        order: 1,
        category: 'Drainage & Hydrology',
        title: 'Bellandur-Varthur Lake Spillover',
        description: 'Encroached stormwater wetlands fail to buffer excess runoff, leading to lake backflows into residential layouts.',
        severity: 'critical',
        affectedParties: 'Rainbow Drive, Yemalur, Belagere residents and gated communities'
      },
      {
        id: 'c1-3',
        order: 1,
        category: 'Power Infrastructure',
        title: 'Basement Substation Flooding',
        description: 'Underground electrical switchgear and diesel generators submerged in tech park basements.',
        severity: 'high',
        affectedParties: '14 multi-tenant tech campuses, commercial data nodes'
      }
    ],
    secondOrder: [
      {
        id: 'c2-1',
        order: 2,
        parentIds: ['c1-1'],
        category: 'Emergency Services',
        title: 'Paramedic & Fire Dispatch Gridlock',
        description: 'Emergency vehicles unable to cross flooded railway underpasses and grade separators, delaying trauma care.',
        severity: 'critical',
        affectedParties: 'Hospitals along Old Airport Road, Sakra World Hospital, Manipal'
      },
      {
        id: 'c2-2',
        order: 2,
        parentIds: ['c1-3'],
        category: 'Enterprise Operations',
        title: 'Global Tech & FinTech Workload Failover',
        description: 'Submerged standby generators force emergency failover of mission-critical banking and trading workflows to Hyderabad, Chennai, and Pune hubs.',
        severity: 'high',
        affectedParties: 'Global Capability Centers (GCCs), investment banks, IT services'
      },
      {
        id: 'c2-3',
        order: 2,
        parentIds: ['c1-1', 'c1-2'],
        category: 'Urban Supply Chain',
        title: 'Quick-Commerce & Cold Chain Paralysis',
        description: 'Dark stores flooded, delivery fleets stranded, milk and perishable provisions cut off for 36 hours.',
        severity: 'medium',
        affectedParties: '4.5M urban consumers, delivery gig workers, local grocery retail'
      }
    ],
    thirdOrder: [
      {
        id: 'c3-1',
        order: 3,
        parentIds: ['c2-2'],
        category: 'Economic Competitiveness',
        title: 'Global Enterprise Re-evaluation of ORR Hubs',
        description: 'Multinational corporations mandate dual-city geographical redundancy clauses in lease renewals, accelerating secondary tech hub expansion.',
        severity: 'high',
        affectedParties: 'Commercial real estate developers, Karnataka state tax revenue'
      },
      {
        id: 'c3-2',
        order: 3,
        parentIds: ['c1-2', 'c2-1'],
        category: 'Public Health',
        title: 'Vector-Borne Disease Surge & Potable Water Contamination',
        description: 'Sewage-stormwater mixing causes localized cholera and dengue outbreak risks in peri-urban wards with damaged pipes.',
        severity: 'critical',
        affectedParties: 'Over 200,000 residents in unsewered informal settlements'
      },
      {
        id: 'c3-3',
        order: 3,
        parentIds: ['c1-3', 'c2-2'],
        category: 'Policy & Architecture',
        title: 'Strict Revision of National Building Codes for Basements',
        description: 'Municipal mandates forbid locating critical electrical switchgear and diesel gensets below ground elevation in flood zones.',
        severity: 'medium',
        affectedParties: 'Architectural firms, CRE developers, municipal BBMP town planners'
      }
    ]
  },
  probabilisticBranches: [
    {
      id: 'branch-alpha',
      type: 'baseline',
      name: 'Status-Quo Paralysis (Baseline)',
      probability: 62,
      trajectorySummary: 'Delayed municipal coordination, emergency services overwhelmed, water slowly recedes over 48 hours through passive gravity drainage.',
      peakDisruption: 94,
      estimatedRecoveryTime: '48 to 72 Hours',
      keyDivergencePoint: 'BBMP emergency de-watering delayed until Hour 4 due to impassable access roads.'
    },
    {
      id: 'branch-beta',
      type: 'critical_failure',
      name: 'Compound Lake Cascade Breach (Worst-Case)',
      probability: 18,
      trajectorySummary: 'Upstream lake bunds breach under hydraulic pressure, unleashing surge waves into residential tech corridors. Extended 5-day regional power outage.',
      peakDisruption: 99,
      estimatedRecoveryTime: '6 to 10 Days',
      keyDivergencePoint: 'Hour 3: Varthur secondary bund suffers structural rupture from unmitigated debris damming.'
    },
    {
      id: 'branch-gamma',
      type: 'resilient_mitigation',
      name: 'Proactive Decentralized Countermeasures (Resilient)',
      probability: 20,
      trajectorySummary: 'Early weather radar warning triggers mandatory remote work at Hour 1, high-capacity mobile de-watering pumps deployed to 8 choke points before flood peak.',
      peakDisruption: 54,
      estimatedRecoveryTime: '12 to 18 Hours',
      keyDivergencePoint: 'Hour 1: Citywide corporate staggered dismissal and sluice gate pre-drawdowns prevent peak congestion.'
    }
  ],
  domainImpactMatrix: [
    {
      name: 'Urban Transit & Roads',
      impactScore: 96,
      trend: 'catastrophic',
      details: 'Over 42km of arterial roads impassable. Average commuter delay exceeds 4.5 hours.',
      primaryRisk: 'Submerged grade-separators become death traps for light vehicles.'
    },
    {
      name: 'Power & Telecommunications',
      impactScore: 88,
      trend: 'escalating',
      details: '14 substations shut down. Mobile tower backup battery life exhausted after 4 hours.',
      primaryRisk: 'Loss of emergency 112 dispatch communication bandwidth.'
    },
    {
      name: 'Tech & Financial Services',
      impactScore: 78,
      trend: 'escalating',
      details: 'Global financial operations forced to execute emergency site failover. ₹2,400 Cr productivity loss.',
      primaryRisk: 'Reputational erosion for Bengaluru as reliable 24/7 global tech center.'
    },
    {
      name: 'Ecology & Lake Catchments',
      impactScore: 82,
      trend: 'catastrophic',
      details: 'Toxic foam and untreated effluent disperse into residential colonies from Bellandur outflow.',
      primaryRisk: 'Heavy metal sedimentation across agricultural and residential soils.'
    },
    {
      name: 'Public Health & Sanitation',
      impactScore: 72,
      trend: 'escalating',
      details: 'Sewage ingress into underground drinking water sumps in over 3,000 households.',
      primaryRisk: 'Acute diarrheal disease and vector-borne outbreaks within 72 hours.'
    }
  ],
  criticalInterventionWindows: [
    {
      id: 'int-1',
      timeWindow: 'Hour 0:45 (T+45m)',
      interventionTitle: 'Immediate Corporate Work-from-Home Protocol',
      recommendedAction: 'Enforce citywide emergency remote work mandate immediately via DDMA before shift departure peak at 5:00 PM.',
      expectedDivergenceImpact: 'Prevents 180,000 vehicles from entering ORR; clears roads for emergency drainage pumps and ambulances.',
      feasibility: 'high'
    },
    {
      id: 'int-2',
      timeWindow: 'Hour 2:00 (T+120m)',
      interventionTitle: 'Pre-emptive Sluice Gate Control & Earth Berm Diversion',
      recommendedAction: 'Deploy mechanized excavators to clear Bellandur choke weeds and create temporary earth diversion ditches toward open retention swales.',
      expectedDivergenceImpact: 'Reduces peak flood depth along tech park corridors by 1.4 feet (40% attenuation).',
      feasibility: 'medium'
    },
    {
      id: 'int-3',
      timeWindow: 'Hour 3:30 (T+210m)',
      interventionTitle: 'Mobile High-Output Dewatering & Temporary Coffer Dams',
      recommendedAction: 'Direct high-flow diesel pumps to protect electrical substations and hospital basements.',
      expectedDivergenceImpact: 'Saves 9 critical 11kV substations from precautionary shutdown, preserving power grid continuity.',
      feasibility: 'medium'
    }
  ],
  tippingPoints: [
    'Hour 2:30: Once basement water crosses 0.8 meters, diesel backup genset intake valves ingest water, causing permanent engine seizure.',
    'Hour 3:45: Hydraulic pressure against encroached rajakaluve retaining walls exceeds tensile tolerance, causing sudden breaches.',
    'Hour 5:00: UPS battery depletion shuts down core optical line terminals (OLT), severing internet connectivity for 600,000 connections.'
  ],
  activeForks: []
};
