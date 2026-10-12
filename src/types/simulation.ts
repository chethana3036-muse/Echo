export type DomainCategory = 
  | 'Urban & Infrastructure'
  | 'Business & Economy'
  | 'Technology & Systems'
  | 'Environment & Climate'
  | 'Society & Public Health'
  | 'Geopolitics & Supply Chain';

export type VolatilityLevel = 'Moderate' | 'Severe / Black Swan' | 'Chaotic';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ConsequenceNode {
  id: string;
  order: 1 | 2 | 3;
  parentIds?: string[];
  category: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  affectedParties: string;
}

export interface ConsequenceGraph {
  firstOrder: ConsequenceNode[];
  secondOrder: ConsequenceNode[];
  thirdOrder: ConsequenceNode[];
}

export interface PhaseMetrics {
  disruptionLevel: number; // 0 - 100
  infrastructureStrain: number; // 0 - 100
  economicDrainRate: string; // e.g. "$14M / hr" or "Moderate"
  humanSafetyAlert: 'Normal' | 'Elevated' | 'Severe' | 'Critical';
}

export interface TimelinePhase {
  phaseIndex: number;
  timeOffset: string; // e.g. "Hour 0 - 1", "Hour 2 - 3"
  title: string;
  statusSummary: string;
  criticalEvents: string[];
  metrics: PhaseMetrics;
  causalCatalyst: string;
  interventionsAvailable?: string[];
}

export interface ProbabilisticBranch {
  id: string;
  type: 'baseline' | 'critical_failure' | 'resilient_mitigation';
  name: string;
  probability: number; // e.g. 55%
  trajectorySummary: string;
  peakDisruption: number; // 0 - 100
  estimatedRecoveryTime: string;
  keyDivergencePoint: string;
}

export interface DomainImpact {
  name: string;
  impactScore: number; // 0 - 100
  trend: 'stabilizing' | 'escalating' | 'catastrophic' | 'recovering';
  details: string;
  primaryRisk: string;
}

export interface InterventionWindow {
  id: string;
  timeWindow: string; // e.g. "Hour 1:30"
  interventionTitle: string;
  recommendedAction: string;
  expectedDivergenceImpact: string;
  feasibility: 'high' | 'medium' | 'low';
}

export interface ForkResult {
  id: string;
  forkTimestamp: string;
  intervention: string;
  forkTitle: string;
  divergenceSummary: string;
  timelineDelta: TimelinePhase[];
  preventedConsequences: string[];
  newTradeoffs: string[];
  updatedMetricsDelta: {
    disruptionReduction: number; // percentage points reduced
    economicSavings: string;
    recoveryAcceleratedBy: string;
  };
}

export interface SimulationResult {
  id: string;
  createdAt: string;
  premise: string;
  domain: DomainCategory;
  horizon: string;
  volatility: VolatilityLevel;
  title: string;
  summary: string;
  initialState: {
    triggerVector: string;
    vulnerabilities: string[];
    systemResilienceScore: number;
  };
  timelinePhases: TimelinePhase[];
  consequenceGraph: ConsequenceGraph;
  probabilisticBranches: ProbabilisticBranch[];
  domainImpactMatrix: DomainImpact[];
  criticalInterventionWindows: InterventionWindow[];
  tippingPoints: string[];
  activeForks?: ForkResult[];
}

export interface PresetScenario {
  id: string;
  title: string;
  shortDesc: string;
  premise: string;
  domain: DomainCategory;
  horizon: string;
  volatility: VolatilityLevel;
  tag: string;
}
