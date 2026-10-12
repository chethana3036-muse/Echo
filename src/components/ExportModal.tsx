import React, { useState } from 'react';
import { Download, Copy, Check, X, FileText } from 'lucide-react';
import { SimulationResult } from '../types/simulation';

interface ExportModalProps {
  simulation: SimulationResult;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  simulation,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    return `# ECHO SIMULATION DOSSIER: ${simulation.title.toUpperCase()}
Generated on: ${new Date(simulation.createdAt).toLocaleString()}
Simulation Engine: ECHO Virtual World Oracle (v3.8)

## 1. PREMISE & HYPOTHESIS
Hypothesis: "${simulation.premise}"
Domain: ${simulation.domain}
Time Horizon: ${simulation.horizon}
Volatility Model: ${simulation.volatility}

## 2. EXECUTIVE SUMMARY
${simulation.summary}

## 3. INITIAL STATE & VULNERABILITIES
Trigger Vector: ${simulation.initialState.triggerVector}
System Resilience Score: ${simulation.initialState.systemResilienceScore} / 100
Latent Vulnerabilities:
${simulation.initialState.vulnerabilities.map((v) => `  * ${v}`).join('\n')}

## 4. CHRONOLOGICAL TIMELINE OF KEY EVENTS
${simulation.timelinePhases
  .map(
    (p) => `### [Phase ${p.phaseIndex + 1}] ${p.timeOffset} — ${p.title}
Status: ${p.statusSummary}
Metrics: Disruption ${p.metrics.disruptionLevel}% | Infra Strain ${p.metrics.infrastructureStrain}% | Drain Rate: ${p.metrics.economicDrainRate} | Civic Alert: ${p.metrics.humanSafetyAlert}
Key Events:
${p.criticalEvents.map((e) => `  * ${e}`).join('\n')}
Causal Domino: ${p.causalCatalyst}
`
  )
  .join('\n')}

## 5. CAUSAL CONSEQUENCE GRAPH (1st, 2nd, 3rd ORDER)
### First-Order Direct Impacts:
${simulation.consequenceGraph.firstOrder.map((c) => `  * [${c.severity.toUpperCase()}] ${c.title}: ${c.description} (Affected: ${c.affectedParties})`).join('\n')}

### Second-Order Systemic Cascades:
${simulation.consequenceGraph.secondOrder.map((c) => `  * [${c.severity.toUpperCase()}] ${c.title}: ${c.description} (Affected: ${c.affectedParties})`).join('\n')}

### Third-Order Emergent Structural Shifts:
${simulation.consequenceGraph.thirdOrder.map((c) => `  * [${c.severity.toUpperCase()}] ${c.title}: ${c.description} (Affected: ${c.affectedParties})`).join('\n')}

## 6. PROBABILISTIC BRANCHING DISTRIBUTION
${simulation.probabilisticBranches.map((b) => `  * ${b.name} (${b.probability}% Likelihood): ${b.trajectorySummary} [Peak Disruption: ${b.peakDisruption}%, Est. Recovery: ${b.estimatedRecoveryTime}]`).join('\n')}

## 7. IRREVERSIBLE TIPPING POINTS
${simulation.tippingPoints.map((t) => `  * ${t}`).join('\n')}

## 8. STRATEGIC DECISION WINDOWS
${simulation.criticalInterventionWindows.map((w) => `  * [${w.timeWindow}] ${w.interventionTitle}: ${w.recommendedAction} (Impact: ${w.expectedDivergenceImpact}, Feasibility: ${w.feasibility})`).join('\n')}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ECHO-Simulation-${simulation.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              Export Complete Simulation Dossier
            </h3>
            <p className="text-xs text-slate-400">
              Export clean markdown briefing for decision analysis, leadership reviews, or risk planning
            </p>
          </div>
        </div>

        <div className="mt-4 bg-[#080D17] border border-slate-800 rounded-xl p-4 max-h-96 overflow-y-auto">
          <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
            {generateMarkdown()}
          </pre>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
