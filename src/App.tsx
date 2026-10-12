/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScenarioLauncher } from './components/ScenarioLauncher';
import { TimelineScrubber } from './components/TimelineScrubber';
import { OutcomeVisualizer } from './components/OutcomeVisualizer';
import { InterventionStudio } from './components/InterventionStudio';
import { ExportModal } from './components/ExportModal';
import { SimulationResult, PresetScenario, ForkResult, DomainCategory, VolatilityLevel } from './types/simulation';
import { PRESET_SCENARIOS, BENGALURU_PRESET_SIMULATION } from './data/presets';
import { Activity, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [simulation, setSimulation] = useState<SimulationResult>(BENGALURU_PRESET_SIMULATION);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);
  const [showLauncher, setShowLauncher] = useState<boolean>(false);
  const [isForkModalOpen, setIsForkModalOpen] = useState<boolean>(false);
  const [targetForkTimestamp, setTargetForkTimestamp] = useState<string | undefined>(undefined);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Check backend health on initial mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasApiKey === 'boolean') {
          setHasApiKey(data.hasApiKey);
        }
      })
      .catch((err) => {
        console.warn('API health check error:', err);
      });
  }, []);

  const handleRunSimulation = async (params: {
    premise: string;
    domain: DomainCategory;
    horizon: string;
    volatility: VolatilityLevel;
    initialConstraints?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Simulation execution failed');
      }

      setSimulation(data);
      setActivePhaseIndex(0);
      setShowLauncher(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Run simulation error:', err);
      alert(err.message || 'Error executing simulation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    if (preset.id === 'bengaluru-rainfall') {
      setSimulation(BENGALURU_PRESET_SIMULATION);
      setActivePhaseIndex(0);
      setShowLauncher(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    handleRunSimulation({
      premise: preset.premise,
      domain: preset.domain,
      horizon: preset.horizon,
      volatility: preset.volatility,
    });
  };

  const handleOpenForkModal = (timestamp?: string) => {
    setTargetForkTimestamp(timestamp || simulation.timelinePhases[activePhaseIndex]?.timeOffset);
    setIsForkModalOpen(true);
  };

  const handleForkCreated = (fork: ForkResult) => {
    setSimulation((prev) => ({
      ...prev,
      activeForks: [...(prev.activeForks || []), fork],
    }));
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 sim-grid-bg relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Ambient Glow */}
      <div className="radial-glow pointer-events-none fixed top-0 left-0 right-0 h-96 z-0" />

      {/* Navigation Header */}
      <Header
        onNewSimulation={() => setShowLauncher(!showLauncher)}
        onSelectPreset={handleSelectPreset}
        presets={PRESET_SCENARIOS}
        activePremiseTitle={simulation.title}
        onExport={() => setIsExportModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Launcher Dropdown or Hero section when expanded */}
        {showLauncher && (
          <div className="mb-6 animate-fadeIn">
            <ScenarioLauncher
              onRunSimulation={handleRunSimulation}
              isLoading={isLoading}
              presets={PRESET_SCENARIOS}
              onSelectPreset={handleSelectPreset}
            />
          </div>
        )}

        {/* Global Timeline Scrubber Controller */}
        <TimelineScrubber
          phases={simulation.timelinePhases}
          activePhaseIndex={activePhaseIndex}
          onSelectPhase={setActivePhaseIndex}
          onOpenForkModal={() => handleOpenForkModal()}
          horizon={simulation.horizon}
        />

        {/* Master Outcome Visualizer Component */}
        <OutcomeVisualizer
          simulation={simulation}
          activePhaseIndex={activePhaseIndex}
          onSelectPhase={setActivePhaseIndex}
          onOpenForkModal={handleOpenForkModal}
        />

        {/* Quick Launch Drawer trigger if launcher is hidden */}
        {!showLauncher && (
          <div className="pt-6 pb-12 text-center">
            <button
              onClick={() => setShowLauncher(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-lg hover:shadow-cyan-950/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explore or Formulate Another Scenario</span>
            </button>
          </div>
        )}
      </main>

      {/* Decision Countermeasure Forking Modal */}
      <InterventionStudio
        simulation={simulation}
        isOpen={isForkModalOpen}
        onClose={() => setIsForkModalOpen(false)}
        onForkCreated={handleForkCreated}
        initialTimestamp={targetForkTimestamp}
      />

      {/* Export Dossier Modal */}
      <ExportModal
        simulation={simulation}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
