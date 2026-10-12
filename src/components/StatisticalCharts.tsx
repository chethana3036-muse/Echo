import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, ShieldAlert, DollarSign, Activity, Info } from 'lucide-react';
import { TimelinePhase, ProbabilisticBranch, DomainImpact } from '../types/simulation';

interface StatisticalChartsProps {
  phases: TimelinePhase[];
  branches: ProbabilisticBranch[];
  domainImpacts: DomainImpact[];
  activePhaseIndex: number;
  onSelectPhase: (index: number) => void;
}

export const StatisticalCharts: React.FC<StatisticalChartsProps> = ({
  phases,
  branches,
  domainImpacts,
  activePhaseIndex,
  onSelectPhase,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // SVG Chart Dimensions
  const chartWidth = 600;
  const chartHeight = 220;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Compute coordinate points for Disruption & Infrastructure Strain over phases
  const maxVal = 100;
  const pointsDisruption = phases.map((phase, idx) => {
    const x = padding.left + (idx / Math.max(1, phases.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (phase.metrics.disruptionLevel / maxVal) * innerHeight;
    return { x, y, val: phase.metrics.disruptionLevel, label: phase.timeOffset.split(':')[0], title: phase.title };
  });

  const pointsStrain = phases.map((phase, idx) => {
    const x = padding.left + (idx / Math.max(1, phases.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (phase.metrics.infrastructureStrain / maxVal) * innerHeight;
    return { x, y, val: phase.metrics.infrastructureStrain, label: phase.timeOffset.split(':')[0] };
  });

  const disruptionPath = pointsDisruption.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  const strainPath = pointsStrain.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  const disruptionArea = `${disruptionPath} L ${pointsDisruption[pointsDisruption.length - 1]?.x} ${padding.top + innerHeight} L ${pointsDisruption[0]?.x} ${padding.top + innerHeight} Z`;

  return (
    <div className="space-y-6">
      {/* 1. Time-Series Metric Trend Chart */}
      <div className="bg-[#0D131F] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Systemic Disruption & Infrastructure Strain Trajectory
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-phase statistical progression of cascading strain across projection horizon
            </p>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" />
              <span className="text-slate-300">Disruption Index (%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-blue-500 rounded-full border-dashed" />
              <span className="text-slate-400">Infra Strain (%)</span>
            </div>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto min-w-[500px] select-none"
          >
            <defs>
              <linearGradient id="disruptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const y = padding.top + innerHeight - (tick / 100) * innerHeight;
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + innerWidth}
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 4}
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}

            {/* Area fill for disruption */}
            <path d={disruptionArea} fill="url(#disruptionGradient)" />

            {/* Strain line (dashed) */}
            <path
              d={strainPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Disruption line */}
            <path
              d={disruptionPath}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />

            {/* Interactive Data points for Disruption */}
            {pointsDisruption.map((pt, idx) => {
              const isSelected = idx === activePhaseIndex;
              const isHovered = idx === hoveredPoint;
              return (
                <g key={idx}>
                  {/* Vertical guide line on active or hover */}
                  {(isSelected || isHovered) && (
                    <line
                      x1={pt.x}
                      y1={padding.top}
                      x2={pt.x}
                      y2={padding.top + innerHeight}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.6"
                    />
                  )}

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 6 : isHovered ? 5 : 4}
                    fill={isSelected ? '#22d3ee' : '#0891b2'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 1}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onClick={() => onSelectPhase(idx)}
                  />

                  {/* Strain point */}
                  <circle
                    cx={pointsStrain[idx].x}
                    cy={pointsStrain[idx].y}
                    r={3}
                    fill="#3b82f6"
                    stroke="#1e293b"
                    strokeWidth={1}
                  />

                  {/* X Axis Time Label */}
                  <text
                    x={pt.x}
                    y={padding.top + innerHeight + 18}
                    fill={isSelected ? '#38bdf8' : '#94a3b8'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="cursor-pointer"
                    onClick={() => onSelectPhase(idx)}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active point tooltip banner */}
          {phases[activePhaseIndex] && (
            <div className="mt-2 flex items-center justify-between text-xs bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="text-slate-300 font-mono">
                Active Step: <strong className="text-cyan-300">{phases[activePhaseIndex].timeOffset}</strong>
              </span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-cyan-400">Disruption: {phases[activePhaseIndex].metrics.disruptionLevel}%</span>
                <span className="text-blue-400">Strain: {phases[activePhaseIndex].metrics.infrastructureStrain}%</span>
                <span className="text-amber-400">Drain: {phases[activePhaseIndex].metrics.economicDrainRate}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Probabilistic Future Outcomes & Statistical Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Probability Breakdown Card */}
        <div className="bg-[#0D131F] border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Branching Outcome Probabilities
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Monte Carlo likelihood distribution across diverging trajectory scenarios
          </p>

          {/* Progress Stack Bar */}
          <div className="h-4 w-full bg-slate-800 rounded-lg overflow-hidden flex mb-4">
            {branches.map((b) => {
              const bg =
                b.type === 'baseline'
                  ? 'bg-blue-500'
                  : b.type === 'critical_failure'
                  ? 'bg-rose-500'
                  : 'bg-emerald-500';
              return (
                <div
                  key={b.id}
                  style={{ width: `${b.probability}%` }}
                  className={`${bg} h-full transition-all`}
                  title={`${b.name}: ${b.probability}%`}
                />
              );
            })}
          </div>

          {/* Detailed Branch Cards */}
          <div className="space-y-3">
            {branches.map((b) => {
              const border =
                b.type === 'baseline'
                  ? 'border-blue-900/60 bg-blue-950/20'
                  : b.type === 'critical_failure'
                  ? 'border-rose-900/60 bg-rose-950/20'
                  : 'border-emerald-900/60 bg-emerald-950/20';
              const badge =
                b.type === 'baseline'
                  ? 'text-blue-400 bg-blue-950/80 border-blue-800'
                  : b.type === 'critical_failure'
                  ? 'text-rose-400 bg-rose-950/80 border-rose-800'
                  : 'text-emerald-400 bg-emerald-950/80 border-emerald-800';

              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border ${border} transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{b.name}</span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${badge}`}
                    >
                      {b.probability}% Likelihood
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                    {b.trajectorySummary}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Peak Disruption: <strong className="text-slate-300">{b.peakDisruption}%</strong></span>
                    <span>Recovery: <strong className="text-slate-300">{b.estimatedRecoveryTime}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Severity & Impact Matrix */}
        <div className="bg-[#0D131F] border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Sector Impact Breakdown (0-100)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Stress score comparison across critical societal and industrial pillars
          </p>

          <div className="space-y-3.5">
            {domainImpacts.map((sector, idx) => {
              const barColor =
                sector.impactScore >= 85
                  ? 'from-rose-500 to-amber-500'
                  : sector.impactScore >= 70
                  ? 'from-amber-500 to-yellow-500'
                  : 'from-blue-500 to-cyan-500';

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{sector.name}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[11px] text-slate-400 capitalize">
                        {sector.trend}
                      </span>
                      <span className="font-bold text-slate-100">{sector.impactScore}/100</span>
                    </div>
                  </div>

                  {/* Meter bar */}
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${sector.impactScore}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {sector.details}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
