import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { BENGALURU_PRESET_SIMULATION } from './src/data/presets.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 3000) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client for server-side operations
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey && apiKey.length > 5),
    engine: 'ECHO-SIM-V3.8',
  });
});

// Primary simulation generator endpoint
app.post('/api/simulate', async (req: Request, res: Response) => {
  try {
    const { premise, domain, horizon, volatility, initialConstraints } = req.body;

    if (!premise || typeof premise !== 'string') {
      return res.status(400).json({ error: 'Premise is required to run simulation' });
    }

    // Check if the query is the Bengaluru example and if no API key is configured
    const isBengaluru = premise.toLowerCase().includes('bengaluru') && premise.toLowerCase().includes('rainfall');
    
    if (!apiKey) {
      if (isBengaluru) {
        return res.json(BENGALURU_PRESET_SIMULATION);
      }
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured in environment secrets.',
      });
    }

    const systemPrompt = `You are ECHO, an elite virtual world simulation engine.
Unlike conversational chatbots, you run rigorous predictive multi-horizon simulations of complex systems.
When given a "What-If" situation, you simulate:
1. The Initial State Vector and latent vulnerabilities.
2. 4 Chronological Timeline Phases showing minute-by-minute or phase-by-phase progression with concrete metrics (disruption level 0-100, infrastructure strain 0-100, economic drain rate, and human safety alert).
3. A 3-tier Causal Consequence Graph:
   - 1st Order (immediate, direct physical consequences)
   - 2nd Order (systemic reactions, secondary feedback loops, operational ripples)
   - 3rd Order (long-term, emergent institutional, cultural, and structural consequences)
4. 3 Probabilistic Future Branches:
   - Baseline (most likely status-quo trajectory)
   - Worst-Case / Critical Failure (compound shocks)
   - Resilient Mitigation (proactive countermeasures)
5. Domain Impact Matrix evaluating 5 sector domains (e.g. Roads, Power, Commerce, Health, Ecology) with impact scores (0-100), trends, and primary risks.
6. 3 Critical Intervention Windows: Specific moments where counteraction yields maximum divergence from failure.
7. 3 Irreversible Tipping Points / Thresholds.

You must output ONLY valid, parseable JSON matching the requested structure without markdown fences or backticks.`;

    const userPrompt = `Run a complete predictive future simulation for the following scenario:
Premise: "${premise}"
Domain: "${domain || 'Urban & Infrastructure'}"
Time Horizon: "${horizon || 'Adaptive'}"
Volatility Mode: "${volatility || 'Severe / Black Swan'}"
${initialConstraints ? `Initial Constraints & Context: "${initialConstraints}"` : ''}

Respond with pure JSON with this exact schema:
{
  "title": "Concise Descriptive Title of Simulation",
  "summary": "Executive summary of how events unfold and peak consequences (2-3 sentences)",
  "initialState": {
    "triggerVector": "Description of the initial shock/catalyst",
    "vulnerabilities": ["Vulnerability 1", "Vulnerability 2", "Vulnerability 3", "Vulnerability 4"],
    "systemResilienceScore": 35
  },
  "timelinePhases": [
    {
      "phaseIndex": 0,
      "timeOffset": "Time identifier (e.g. Hour 0-1 or Day 1)",
      "title": "Phase title",
      "statusSummary": "What happens during this phase",
      "criticalEvents": ["Event 1", "Event 2", "Event 3", "Event 4"],
      "metrics": {
        "disruptionLevel": 30,
        "infrastructureStrain": 45,
        "economicDrainRate": "$1.5M / hr",
        "humanSafetyAlert": "Elevated"
      },
      "causalCatalyst": "The key causal factor leading directly into next phase"
    }
  ],
  "consequenceGraph": {
    "firstOrder": [
      {
        "id": "c1-1",
        "order": 1,
        "category": "Domain",
        "title": "Direct impact title",
        "description": "Concrete mechanism",
        "severity": "critical",
        "affectedParties": "Groups affected"
      }
    ],
    "secondOrder": [
      {
        "id": "c2-1",
        "order": 2,
        "parentIds": ["c1-1"],
        "category": "Domain",
        "title": "Secondary ripple title",
        "description": "Concrete mechanism",
        "severity": "high",
        "affectedParties": "Groups affected"
      }
    ],
    "thirdOrder": [
      {
        "id": "c3-1",
        "order": 3,
        "parentIds": ["c2-1"],
        "category": "Domain",
        "title": "Emergent 3rd order title",
        "description": "Concrete mechanism",
        "severity": "medium",
        "affectedParties": "Groups affected"
      }
    ]
  },
  "probabilisticBranches": [
    {
      "id": "branch-alpha",
      "type": "baseline",
      "name": "Branch Name",
      "probability": 60,
      "trajectorySummary": "Summary",
      "peakDisruption": 88,
      "estimatedRecoveryTime": "48 Hours",
      "keyDivergencePoint": "What causes this branch"
    },
    {
      "id": "branch-beta",
      "type": "critical_failure",
      "name": "Branch Name",
      "probability": 20,
      "trajectorySummary": "Summary",
      "peakDisruption": 98,
      "estimatedRecoveryTime": "7 Days",
      "keyDivergencePoint": "What causes this branch"
    },
    {
      "id": "branch-gamma",
      "type": "resilient_mitigation",
      "name": "Branch Name",
      "probability": 20,
      "trajectorySummary": "Summary",
      "peakDisruption": 50,
      "estimatedRecoveryTime": "16 Hours",
      "keyDivergencePoint": "What causes this branch"
    }
  ],
  "domainImpactMatrix": [
    {
      "name": "Sector Name",
      "impactScore": 92,
      "trend": "catastrophic",
      "details": "Specific sector disruption detail",
      "primaryRisk": "Primary risk statement"
    }
  ],
  "criticalInterventionWindows": [
    {
      "id": "int-1",
      "timeWindow": "Time mark",
      "interventionTitle": "Intervention Name",
      "recommendedAction": "Actionable policy or operational step",
      "expectedDivergenceImpact": "Quantified delta or qualitative improvement",
      "feasibility": "high"
    }
  ],
  "tippingPoints": [
    "Threshold 1 description",
    "Threshold 2 description",
    "Threshold 3 description"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(textOutput);
    } catch {
      // Strip any backticks or extraneous formatting if present
      const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    const simulationResult = {
      id: `sim-${Date.now()}`,
      createdAt: new Date().toISOString(),
      premise,
      domain: domain || 'Urban & Infrastructure',
      horizon: horizon || 'Adaptive',
      volatility: volatility || 'Severe / Black Swan',
      ...parsedData,
      activeForks: [],
    };

    return res.json(simulationResult);
  } catch (error: any) {
    console.error('Simulation error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to execute virtual simulation',
    });
  }
});

// Interactive Intervention Forking: simulates alternate reality branch from a decision injection
app.post('/api/fork-simulation', async (req: Request, res: Response) => {
  try {
    const { simulation, forkTimestamp, interventionPrompt } = req.body;

    if (!simulation || !interventionPrompt) {
      return res.status(400).json({ error: 'Simulation state and interventionPrompt are required' });
    }

    if (!apiKey) {
      // Generate realistic deterministic fork for demonstration
      const simulatedFork = {
        id: `fork-${Date.now()}`,
        forkTimestamp: forkTimestamp || 'Mid-Horizon',
        intervention: interventionPrompt,
        forkTitle: `Intervention Branch: ${interventionPrompt.slice(0, 40)}...`,
        divergenceSummary: `Injecting countermeasure "${interventionPrompt}" alters the trajectory, containing downstream propagation by roughly 52%.`,
        timelineDelta: (simulation.timelinePhases || []).map((phase: any, index: number) => ({
          ...phase,
          title: `${phase.title} [Mitigated Branch]`,
          statusSummary: `Modified course: Early action dampened disruption. Events redirected away from catastrophic peak.`,
          metrics: {
            ...phase.metrics,
            disruptionLevel: Math.max(15, Math.round(phase.metrics.disruptionLevel * (0.55 - index * 0.05))),
            infrastructureStrain: Math.max(20, Math.round(phase.metrics.infrastructureStrain * 0.6)),
            humanSafetyAlert: index > 1 ? 'Elevated' : 'Normal',
          },
          criticalEvents: [
            `Countermeasure deployed: "${interventionPrompt}"`,
            ...phase.criticalEvents.slice(0, 2),
            `Downstream cascading failure averted at node T+${index}`,
          ],
        })),
        preventedConsequences: [
          'Averted catastrophic 3rd-order systemic network collapse',
          'Prevented uncontained basement electrical flooding in 9 core hubs',
          'Reduced emergency response backlog by 68%',
        ],
        newTradeoffs: [
          'Immediate resource diversion from routine operations',
          'Emergency capital expenditure required upfront',
        ],
        updatedMetricsDelta: {
          disruptionReduction: 48,
          economicSavings: 'Estimated ₹140 Cr ($17M) preserved',
          recoveryAcceleratedBy: '32 Hours sooner',
        },
      };
      return res.json(simulatedFork);
    }

    const forkInstruction = `You are ECHO's Countermeasure Branching Engine.
Given a baseline simulation and an intentional user decision/intervention at timestamp "${forkTimestamp}", simulate how the future diverges.
Intervention: "${interventionPrompt}"
Original Scenario Premise: "${simulation.premise}"

Calculate:
1. divergenceSummary: A concise explanation of how the world shifts.
2. preventedConsequences: List of 3 specific consequences from the original simulation that are now avoided.
3. newTradeoffs: List of 2 new complications, costs, or tradeoffs created by this decision.
4. timelineDelta: Re-simulate the timeline phases from ${forkTimestamp} onward with reduced disruption scores and updated critical events.
5. updatedMetricsDelta: disruptionReduction (number in percentage points), economicSavings (string), recoveryAcceleratedBy (string).

Output pure JSON matching this structure:
{
  "forkTitle": "Name of this Alternative Reality Branch",
  "divergenceSummary": "...",
  "timelineDelta": [
    {
      "phaseIndex": 0,
      "timeOffset": "...",
      "title": "...",
      "statusSummary": "...",
      "criticalEvents": ["...", "..."],
      "metrics": {
        "disruptionLevel": 40,
        "infrastructureStrain": 45,
        "economicDrainRate": "...",
        "humanSafetyAlert": "Elevated"
      },
      "causalCatalyst": "..."
    }
  ],
  "preventedConsequences": ["...", "...", "..."],
  "newTradeoffs": ["...", "..."],
  "updatedMetricsDelta": {
    "disruptionReduction": 45,
    "economicSavings": "...",
    "recoveryAcceleratedBy": "..."
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: forkInstruction,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const forkResult = {
      id: `fork-${Date.now()}`,
      forkTimestamp: forkTimestamp || 'Active Step',
      intervention: interventionPrompt,
      ...parsed,
    };

    return res.json(forkResult);
  } catch (error: any) {
    console.error('Forking error:', error);
    return res.status(500).json({ error: error.message || 'Failed to simulate branch' });
  }
});

// Development vs Production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ECHO Engine] Online and listening on port ${PORT}`);
  });
}

startServer();
