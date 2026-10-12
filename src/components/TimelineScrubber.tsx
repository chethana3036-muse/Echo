import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, GitFork, Clock, AlertCircle, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { TimelinePhase } from '../types/simulation';

interface TimelineScrubberProps {
  phases: TimelinePhase[];
  activePhaseIndex: number;
  onSelectPhase: (index: number) => void;
  onOpenForkModal: () => void;
  horizon: string;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  phases,
  activePhaseIndex,
  onSelectPhase,
  onOpenForkModal,
  horizon,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onSelectPhase((activePhaseIndex + 1) % phases.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activePhaseIndex, phases.length, onSelectPhase]);

  const activePhase = phases[activePhaseIndex] || phases[0];

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
      case 'Severe':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
      case 'Elevated':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800/80';
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    }
  };

  return (
    <div className="bg-[#0D131F] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
      {/* Top bar: Controls, Horizon, and Fork trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/70">
        <div className="flex items-center gap-2">
          {/* Playback Controls */}
          <button
            onClick={() => onSelectPhase(Math.max(0, activePhaseIndex - 1))}
            disabled={activePhaseIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous Phase"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-md shadow-cyan-600/30 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Simulation</span>
              </>
            )}
          </button>
          <button
            onClick={() => onSelectPhase(Math.min(phases.length - 1, activePhaseIndex + 1))}
            disabled={activePhaseIndex === phases.length - 1}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next Phase"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs text-slate-400 ml-2 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Horizon: {horizon}</span>
          </span>
        </div>

        {/* Fork Decision Button */}
        <button
          onClick={onOpenForkModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/70 text-indigo-200 text-xs font-semibold shadow-sm transition-all"
        >
          <GitFork className="w-3.5 h-3.5 text-indigo-400" />
          <span>Fork Reality at this Step</span>
        </button>
      </div>

      {/* Scrub Bar & Phase Markers */}
      <div className="py-4">
        <div className="relative">
          {/* Progress track */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-300"
              style={{
                width: `${((activePhaseIndex + 1) / phases.length) * 100}%`,
              }}
            />
          </div>

          {/* Step Nodes */}
          <div className="flex justify-between items-center -mt-2">
            {phases.map((phase, idx) => {
              const isActive = idx === activePhaseIndex;
              const isPast = idx < activePhaseIndex;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectPhase(idx)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'bg-cyan-400 border-white ring-4 ring-cyan-500/20 scale-125'
                        : isPast
                        ? 'bg-blue-600 border-blue-400'
                        : 'bg-slate-800 border-slate-600 group-hover:border-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-slate-900">
                      {idx + 1}
                    </span>
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-mono transition-colors text-center max-w-[100px] truncate ${
                      isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {phase.timeOffset.split(':')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Phase Telemetry Readout */}
      {activePhase && (
        <div className="mt-2 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Disruption Level */}
          <div className="bg-[#090D15] p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Disruption Index
              </div>
              <div className="text-sm font-bold text-slate-100 flex items-baseline gap-1 font-mono">
                <span>{activePhase.metrics.disruptionLevel}%</span>
                <span className="text-[10px] text-slate-500">severity</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Strain */}
          <div className="bg-[#090D15] p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/60 text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Grid & Infra Strain
              </div>
              <div className="text-sm font-bold text-slate-100 font-mono">
                {activePhase.metrics.infrastructureStrain}%
              </div>
            </div>
          </div>

          {/* Economic Drain Rate */}
          <div className="bg-[#090D15] p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Economic Drain
              </div>
              <div className="text-xs font-semibold text-amber-300 truncate font-mono">
                {activePhase.metrics.economicDrainRate}
              </div>
            </div>
          </div>

          {/* Human Safety Alert */}
          <div className="bg-[#090D15] p-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Civic Safety Alert
              </div>
              <div className="mt-0.5">
                <span
                  className={`text-[11px] font-semibold font-mono px-2 py-0.5 rounded border ${getAlertColor(
                    activePhase.metrics.humanSafetyAlert
                  )}`}
                >
                  {activePhase.metrics.humanSafetyAlert}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
