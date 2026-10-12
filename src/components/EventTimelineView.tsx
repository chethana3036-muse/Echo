import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Flame, ArrowRight, ShieldAlert, GitFork, Filter } from 'lucide-react';
import { TimelinePhase } from '../types/simulation';

interface EventTimelineViewProps {
  phases: TimelinePhase[];
  activePhaseIndex: number;
  onSelectPhase: (index: number) => void;
  onInjectIntervention: (timestamp: string) => void;
}

export const EventTimelineView: React.FC<EventTimelineViewProps> = ({
  phases,
  activePhaseIndex,
  onSelectPhase,
  onInjectIntervention,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'severe'>('all');

  // Flatten events with phase context
  const allEvents = phases.flatMap((phase, phaseIdx) =>
    phase.criticalEvents.map((evt, evtIdx) => ({
      id: `evt-${phaseIdx}-${evtIdx}`,
      phaseIndex: phaseIdx,
      phaseTitle: phase.title,
      timeOffset: phase.timeOffset,
      description: evt,
      severity: phase.metrics.humanSafetyAlert,
      disruption: phase.metrics.disruptionLevel,
      catalyst: phase.causalCatalyst,
    }))
  );

  const filteredEvents = allEvents.filter((item) => {
    if (filterSeverity === 'critical') return item.severity === 'Critical';
    if (filterSeverity === 'severe') return item.severity === 'Critical' || item.severity === 'Severe';
    return true;
  });

  return (
    <div className="bg-[#0D131F] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Chronological Timeline of Key Simulated Events
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step unfolding of physical, systemic, and economic milestones across the simulation
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              filterSeverity === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Events ({allEvents.length})
          </button>
          <button
            onClick={() => setFilterSeverity('severe')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              filterSeverity === 'severe'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Severe & Up
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              filterSeverity === 'critical'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Critical Only
          </button>
        </div>
      </div>

      {/* Vertical Timeline Stream */}
      <div className="mt-6 relative">
        {/* Continuous central/left line */}
        <div className="absolute top-2 bottom-4 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-800" />

        <div className="space-y-6">
          {phases.map((phase, pIdx) => {
            const isPhaseActive = pIdx === activePhaseIndex;

            return (
              <div key={pIdx} className="relative pl-10 sm:pl-16">
                {/* Milestone Node on Timeline Rail */}
                <button
                  onClick={() => onSelectPhase(pIdx)}
                  className={`absolute left-2.5 sm:left-4.5 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer z-10 ${
                    isPhaseActive
                      ? 'bg-cyan-400 border-white ring-4 ring-cyan-500/25 scale-110'
                      : 'bg-slate-900 border-cyan-600 hover:border-cyan-300'
                  }`}
                  title={`Jump to Phase ${pIdx + 1}`}
                >
                  <span className="text-[10px] font-bold font-mono text-slate-950">
                    {pIdx + 1}
                  </span>
                </button>

                {/* Phase Header Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isPhaseActive
                      ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                      : 'bg-[#090E17]/70 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">
                        {phase.timeOffset}
                      </span>
                      <span className="text-slate-600">·</span>
                      <h4 className="text-sm font-bold text-white">{phase.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">
                        Disruption: <strong className="text-cyan-300">{phase.metrics.disruptionLevel}%</strong>
                      </span>
                      <button
                        onClick={() => onInjectIntervention(phase.timeOffset)}
                        className="text-[11px] font-mono text-indigo-300 hover:text-white bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                      >
                        <GitFork className="w-3 h-3 text-indigo-400" />
                        <span>Fork Here</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {phase.statusSummary}
                  </p>

                  {/* Individual Key Events inside Phase */}
                  <div className="space-y-2 mt-3 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Key Micro-Events & System Shocks:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.criticalEvents.map((evt, eIdx) => (
                        <div
                          key={eIdx}
                          className="bg-[#0B101A] border border-slate-800/80 rounded-lg p-2.5 text-xs text-slate-300 flex items-start gap-2 hover:border-slate-700 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span className="leading-snug">{evt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Causal Catalyst to Next Phase */}
                  <div className="mt-3 text-[11px] bg-slate-950/60 border border-slate-800/60 p-2 rounded-lg text-slate-400 flex items-center gap-2">
                    <span className="font-mono text-cyan-400 uppercase font-semibold shrink-0">
                      Causal Domino:
                    </span>
                    <span className="italic line-clamp-1">{phase.causalCatalyst}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
