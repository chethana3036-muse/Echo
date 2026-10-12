import React, { useState } from 'react';
import { GitFork, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { SimulationResult, ForkResult } from '../types/simulation';

interface InterventionStudioProps {
  simulation: SimulationResult;
  isOpen: boolean;
  onClose: () => void;
  onForkCreated: (fork: ForkResult) => void;
  initialTimestamp?: string;
}

export const InterventionStudio: React.FC<InterventionStudioProps> = ({
  simulation,
  isOpen,
  onClose,
  onForkCreated,
  initialTimestamp,
}) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState(
    initialTimestamp || simulation.timelinePhases[1]?.timeOffset || 'Hour 1 - 2'
  );
  const [interventionPrompt, setInterventionPrompt] = useState(
    'Enforce mandatory remote work declaration at T+1 hour and deploy emergency diesel pumps to the 6 primary lake sluice gates.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeForkResult, setActiveForkResult] = useState<ForkResult | null>(null);

  if (!isOpen) return null;

  const handleRunFork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interventionPrompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/fork-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulation,
          forkTimestamp: selectedTimestamp,
          interventionPrompt: interventionPrompt.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to simulate branch');
      }

      setActiveForkResult(data);
      onForkCreated(data);
    } catch (err: any) {
      console.error('Fork error:', err);
      alert(err.message || 'Error simulating alternate branch');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleInterventions = [
    'Enforce municipal remote-work order at T+45m; clear ORR corridor for emergency transit.',
    'Pre-drain Varthur and Bellandur wetlands by 1.2m via automated sluices prior to storm peak.',
    'Deploy modular flood barriers around all subterranean electrical transformer substations.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              Test Countermeasure & Fork Virtual Reality
            </h3>
            <p className="text-xs text-slate-400">
              Inject an intentional decision at a specific moment to observe how the simulation diverges
            </p>
          </div>
        </div>

        {!activeForkResult ? (
          <form onSubmit={handleRunFork} className="mt-5 space-y-4">
            {/* Timestamp selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Target Timestamp of Intervention
              </label>
              <select
                value={selectedTimestamp}
                onChange={(e) => setSelectedTimestamp(e.target.value)}
                className="w-full bg-[#090E17] border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
              >
                {simulation.timelinePhases.map((phase) => (
                  <option key={phase.phaseIndex} value={phase.timeOffset}>
                    {phase.timeOffset} — {phase.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Decision prompt input */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Proposed Decision / Policy / Action</span>
                <span className="text-slate-500 font-sans lowercase">What action will you test?</span>
              </label>
              <textarea
                value={interventionPrompt}
                onChange={(e) => setInterventionPrompt(e.target.value)}
                rows={3}
                placeholder="Describe the countermeasure or intervention..."
                className="w-full bg-[#090E17] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Quick samples */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">
                Suggested Test Levers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleInterventions.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInterventionPrompt(s)}
                    className="text-[11px] text-slate-400 hover:text-indigo-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-left transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !interventionPrompt.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Computing Diverging Future...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Fork Simulation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Fork Results Display */
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/80">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{activeForkResult.forkTitle}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeForkResult.divergenceSummary}
              </p>
            </div>

            {/* Delta Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#090E17] border border-slate-800 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Disruption Reduction
                </span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  -{activeForkResult.updatedMetricsDelta.disruptionReduction}% pts
                </span>
              </div>

              <div className="p-3 bg-[#090E17] border border-slate-800 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Capital Preserved
                </span>
                <span className="text-xs font-bold font-mono text-cyan-300 line-clamp-1 mt-1">
                  {activeForkResult.updatedMetricsDelta.economicSavings}
                </span>
              </div>

              <div className="p-3 bg-[#090E17] border border-slate-800 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Recovery Delta
                </span>
                <span className="text-xs font-bold font-mono text-indigo-300 line-clamp-1 mt-1">
                  {activeForkResult.updatedMetricsDelta.recoveryAcceleratedBy}
                </span>
              </div>
            </div>

            {/* Avoided Consequences & New Tradeoffs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/50 rounded-xl">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Averted Disasters:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeForkResult.preventedConsequences.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">&check;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-amber-950/20 border border-amber-900/50 rounded-xl">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>New Operational Tradeoffs:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeForkResult.newTradeoffs.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">&bull;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Done button */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => setActiveForkResult(null)}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
              >
                &larr; Test Another Countermeasure
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Close & View Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
