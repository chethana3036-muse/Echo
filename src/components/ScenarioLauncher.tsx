import React, { useState } from 'react';
import { Play, Sparkles, Sliders, Globe, Clock, ShieldAlert, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';
import { DomainCategory, VolatilityLevel, PresetScenario } from '../types/simulation';

interface ScenarioLauncherProps {
  onRunSimulation: (params: {
    premise: string;
    domain: DomainCategory;
    horizon: string;
    volatility: VolatilityLevel;
    initialConstraints?: string;
  }) => void;
  isLoading: boolean;
  presets: PresetScenario[];
  onSelectPreset: (preset: PresetScenario) => void;
}

const DOMAINS: DomainCategory[] = [
  'Urban & Infrastructure',
  'Business & Economy',
  'Technology & Systems',
  'Environment & Climate',
  'Society & Public Health',
  'Geopolitics & Supply Chain',
];

const HORIZONS = [
  '6 Hours',
  '24 Hours',
  '7 Days',
  '30 Days',
  '6 Months',
  '1 Year',
  '5 Years',
];

const VOLATILITY_MODES: { level: VolatilityLevel; desc: string }[] = [
  { level: 'Moderate', desc: 'Predictable historical elasticity & standard response' },
  { level: 'Severe / Black Swan', desc: 'Systemic compounding stress & failure cascades' },
  { level: 'Chaotic', desc: 'Non-linear tipping points & cascading feedback loops' },
];

export const ScenarioLauncher: React.FC<ScenarioLauncherProps> = ({
  onRunSimulation,
  isLoading,
  presets,
  onSelectPreset,
}) => {
  const [premise, setPremise] = useState(
    'What would happen if Bengaluru experienced extremely heavy rainfall for six hours?'
  );
  const [domain, setDomain] = useState<DomainCategory>('Urban & Infrastructure');
  const [horizon, setHorizon] = useState('6 Hours');
  const [volatility, setVolatility] = useState<VolatilityLevel>('Severe / Black Swan');
  const [initialConstraints, setInitialConstraints] = useState(
    'Peak monsoon season, Bellandur lake inlets near capacity, peak 5 PM evening commute start.'
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!premise.trim() || isLoading) return;
    onRunSimulation({
      premise: premise.trim(),
      domain,
      horizon,
      volatility,
      initialConstraints: initialConstraints.trim() || undefined,
    });
  };

  const sampleQuestions = [
    {
      label: 'Bengaluru 6-Hour Cloudburst',
      query: 'What would happen if Bengaluru experienced extremely heavy rainfall of 180mm for six hours straight?',
      domain: 'Urban & Infrastructure' as DomainCategory,
      horizon: '6 Hours',
    },
    {
      label: 'Autonomous Agent Disruption',
      query: 'What would happen if 80% of enterprise SaaS licenses were replaced by autonomous AI software agents within 12 months?',
      domain: 'Business & Economy' as DomainCategory,
      horizon: '1 Year',
    },
    {
      label: 'Mandatory 4-Day Workweek',
      query: 'What would happen if tech hubs legally mandated a 32-hour 4-day workweek with zero pay reduction?',
      domain: 'Society & Public Health' as DomainCategory,
      horizon: '6 Months',
    },
    {
      label: 'Maritime Chokepoint Gridlock',
      query: 'What would happen if commercial transit through the Strait of Malacca was suspended for 10 consecutive days?',
      domain: 'Geopolitics & Supply Chain' as DomainCategory,
      horizon: '30 Days',
    },
  ];

  return (
    <div className="relative z-10 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>CAUSAL WORLD SIMULATION ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Test the Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Before It Happens</span>
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Instead of standard chat answers, ECHO spins up a virtual simulation matrix to forecast domino consequences, multi-tier systemic ripples, and critical intervention windows.
          </p>
        </div>

        {/* Simulation Configuration Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

          {/* Premise Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                SIMULATION HYPOTHESIS / PREMISE
              </span>
              <span className="text-slate-500 lowercase font-sans">Natural Language &ldquo;What If&rdquo;</span>
            </div>

            <div className="relative">
              <textarea
                value={premise}
                onChange={(e) => setPremise(e.target.value)}
                rows={3}
                placeholder="What would happen if..."
                className="w-full bg-[#080D17] border border-slate-700/80 rounded-xl p-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none font-sans"
              />
            </div>
          </div>

          {/* Prompt quick starters */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Test Scenarios:</span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPremise(q.query);
                  setDomain(q.domain);
                  setHorizon(q.horizon);
                }}
                className="text-xs text-slate-400 hover:text-cyan-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 px-2.5 py-1 rounded-md transition-all text-left"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Core Simulation Parameters */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            {/* Domain */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5 font-mono">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                SYSTEMIC DOMAIN
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as DomainCategory)}
                className="w-full bg-[#080D17] border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Horizon */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                PROJECTION HORIZON
              </label>
              <select
                value={horizon}
                onChange={(e) => setHorizon(e.target.value)}
                className="w-full bg-[#080D17] border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
              >
                {HORIZONS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            {/* Volatility */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5 font-mono">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                VOLATILITY MODEL
              </label>
              <select
                value={volatility}
                onChange={(e) => setVolatility(e.target.value as VolatilityLevel)}
                className="w-full bg-[#080D17] border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
              >
                {VOLATILITY_MODES.map((v) => (
                  <option key={v.level} value={v.level}>
                    {v.level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced toggle */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors font-mono"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Hide Initial Constraints' : 'Tune Initial Boundary Constraints'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-2 p-3 bg-[#080D17] border border-slate-800 rounded-xl space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-400 block">
                  Initial Boundary Conditions & Vulnerabilities
                </label>
                <input
                  type="text"
                  value={initialConstraints}
                  onChange={(e) => setInitialConstraints(e.target.value)}
                  placeholder="e.g. Existing drain blockage, regulatory freeze, holiday weekend"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Multi-order ripple simulation & intervention branching</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !premise.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Computing Virtual Simulation...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Virtual Simulation</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Curated Presets Grid */}
        <div className="mt-8">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Or Explore Real-World Benchmark Cases</span>
            <span className="text-[11px] text-slate-500 font-sans">Pre-computed causal vectors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(p)}
                className="bg-[#0F172A]/70 hover:bg-[#1E293B]/80 border border-slate-800 hover:border-slate-700 text-left p-3.5 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {p.tag}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {p.shortDesc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{p.horizon}</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    Simulate &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
