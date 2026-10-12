import React, { useState } from 'react';
import { Clock, BarChart3, BookOpen, GitBranch, GitFork, Sparkles, AlertCircle, Layers } from 'lucide-react';
import { SimulationResult, ForkResult } from '../types/simulation';
import { EventTimelineView } from './EventTimelineView';
import { StatisticalCharts } from './StatisticalCharts';
import { NarrativeSummary } from './NarrativeSummary';
import { ConsequenceGraphViewer } from './ConsequenceGraphViewer';

interface OutcomeVisualizerProps {
  simulation: SimulationResult;
  activePhaseIndex: number;
  onSelectPhase: (index: number) => void;
  onOpenForkModal: (timestamp?: string) => void;
}

export type VisualizerTab = 'timeline' | 'charts' | 'narrative' | 'consequences';

export const OutcomeVisualizer: React.FC<OutcomeVisualizerProps> = ({
  simulation,
  activePhaseIndex,
  onSelectPhase,
  onOpenForkModal,
}) => {
  const [activeTab, setActiveTab] = useState<VisualizerTab>('timeline');
  const [selectedFork, setSelectedFork] = useState<ForkResult | null>(null);

  const activeForks = simulation.activeForks || [];

  return (
    <div className="space-y-6">
      {/* Simulation Premise Banner */}
      <div className="bg-[#0B101A] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
              <span className="uppercase tracking-widest">{simulation.domain}</span>
              <span>·</span>
              <span className="text-slate-400">{simulation.horizon} Horizon</span>
              <span>·</span>
              <span className="text-amber-400">{simulation.volatility}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {simulation.title}
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl italic">
              &ldquo;{simulation.premise}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenForkModal()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Fork Reality</span>
            </button>
          </div>
        </div>

        {/* Active Forks Bar if any exist */}
        {activeForks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-mono uppercase text-indigo-400 shrink-0">
              Active Reality Branches:
            </span>
            {activeForks.map((fork) => (
              <button
                key={fork.id}
                onClick={() => setSelectedFork(selectedFork?.id === fork.id ? null : fork)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors shrink-0 flex items-center gap-1.5 ${
                  selectedFork?.id === fork.id
                    ? 'bg-indigo-900 border-indigo-400 text-white'
                    : 'bg-indigo-950/60 border-indigo-800/70 text-indigo-300 hover:bg-indigo-900/60'
                }`}
              >
                <GitFork className="w-3 h-3 text-indigo-400" />
                <span>{fork.forkTitle}</span>
              </button>
            ))}
          </div>
        )}

        {/* Selected Fork Delta Card */}
        {selectedFork && (
          <div className="mt-3 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/60 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-200">
                Intervention Delta: {selectedFork.intervention}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Disruption: -{selectedFork.updatedMetricsDelta.disruptionReduction}% pts
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">
              {selectedFork.divergenceSummary}
            </p>
          </div>
        )}
      </div>

      {/* Main Visualizer Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#090D15] border border-slate-800/90 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'timeline'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Timeline of Events</span>
        </button>

        <button
          onClick={() => setActiveTab('charts')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'charts'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Statistical Charts & Probabilities</span>
        </button>

        <button
          onClick={() => setActiveTab('narrative')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'narrative'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Narrative Summary & Briefing</span>
        </button>

        <button
          onClick={() => setActiveTab('consequences')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'consequences'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-amber-400" />
          <span>Causal Ripple Graph (1st, 2nd, 3rd Order)</span>
        </button>
      </div>

      {/* Render Active View */}
      <div>
        {activeTab === 'timeline' && (
          <EventTimelineView
            phases={simulation.timelinePhases}
            activePhaseIndex={activePhaseIndex}
            onSelectPhase={onSelectPhase}
            onInjectIntervention={(timestamp) => onOpenForkModal(timestamp)}
          />
        )}

        {activeTab === 'charts' && (
          <StatisticalCharts
            phases={simulation.timelinePhases}
            branches={simulation.probabilisticBranches}
            domainImpacts={simulation.domainImpactMatrix}
            activePhaseIndex={activePhaseIndex}
            onSelectPhase={onSelectPhase}
          />
        )}

        {activeTab === 'narrative' && (
          <NarrativeSummary
            simulation={simulation}
            onInjectIntervention={(windowTitle) => onOpenForkModal(windowTitle)}
          />
        )}

        {activeTab === 'consequences' && (
          <ConsequenceGraphViewer
            consequenceGraph={simulation.consequenceGraph}
          />
        )}
      </div>
    </div>
  );
};
