import React from 'react';
import { Activity, Compass, Play, Download, Sparkles, AlertTriangle } from 'lucide-react';
import { PresetScenario } from '../types/simulation';

interface HeaderProps {
  onNewSimulation: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
  presets: PresetScenario[];
  activePremiseTitle?: string;
  onExport: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewSimulation,
  onSelectPreset,
  presets,
  activePremiseTitle,
  onExport,
  hasApiKey,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-lg text-white font-mono">ECHO</span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                SIMULATION ORACLE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Virtual World Future Trajectory & Consequence Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Presets Dropdown */}
          <div className="relative group hidden md:block">
            <button className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 px-3 py-1.5 rounded-lg transition-colors">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explore Scenarios</span>
            </button>
            <div className="absolute right-0 mt-1 w-72 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block transition-all z-50">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Curated Virtual Scenarios
              </div>
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors group/item"
                >
                  <div className="text-xs font-semibold text-slate-200 group-hover/item:text-cyan-300 flex items-center justify-between">
                    <span>{preset.title}</span>
                    <span className="text-[10px] text-slate-500">{preset.horizon}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {preset.shortDesc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* New Simulation Launcher Button */}
          <button
            onClick={onNewSimulation}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>New Simulation</span>
          </button>

          {/* Export Dossier */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Export Simulation Dossier"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export Dossier</span>
          </button>
        </div>
      </div>
    </header>
  );
};
