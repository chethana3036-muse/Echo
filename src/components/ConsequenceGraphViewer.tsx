import React, { useState } from 'react';
import { GitBranch, Layers, ArrowDownRight, AlertTriangle, ShieldCheck, Users, Link2 } from 'lucide-react';
import { ConsequenceGraph, ConsequenceNode, SeverityLevel } from '../types/simulation';

interface ConsequenceGraphViewerProps {
  consequenceGraph: ConsequenceGraph;
}

export const ConsequenceGraphViewer: React.FC<ConsequenceGraphViewerProps> = ({
  consequenceGraph,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<'all' | 1 | 2 | 3>('all');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const getSeverityStyle = (severity: SeverityLevel) => {
    switch (severity) {
      case 'critical':
        return 'text-rose-400 bg-rose-950/80 border-rose-800/80';
      case 'high':
        return 'text-amber-400 bg-amber-950/80 border-amber-800/80';
      case 'medium':
        return 'text-yellow-400 bg-yellow-950/80 border-yellow-800/80';
      default:
        return 'text-blue-400 bg-blue-950/80 border-blue-800/80';
    }
  };

  const renderNodes = (nodes: ConsequenceNode[], orderLabel: string, orderNumber: 1 | 2 | 3) => {
    if (selectedOrder !== 'all' && selectedOrder !== orderNumber) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            {orderLabel} ({nodes.length})
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nodes.map((node) => {
            const isSelected = activeNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(isSelected ? null : node.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-[#090E17]/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/60">
                      {node.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getSeverityStyle(
                        node.severity
                      )}`}
                    >
                      {node.severity}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-100 mb-1.5 leading-snug">
                    {node.title}
                  </h5>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{node.affectedParties}</span>
                  </div>

                  {node.parentIds && node.parentIds.length > 0 && (
                    <div className="text-indigo-400/90 font-mono text-[10px] flex items-center gap-1">
                      <Link2 className="w-2.5 h-2.5" />
                      <span>Triggered by: {node.parentIds.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0D131F] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Causal Consequence Graph (1st, 2nd, and 3rd Order Dominoes)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Trace how immediate direct impacts ripple into secondary institutional feedback and emergent systemic shifts
          </p>
        </div>

        {/* Order Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setSelectedOrder('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              selectedOrder === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Dominoes
          </button>
          <button
            onClick={() => setSelectedOrder(1)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              selectedOrder === 1
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1st Order (Direct)
          </button>
          <button
            onClick={() => setSelectedOrder(2)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              selectedOrder === 2
                ? 'bg-blue-950 text-blue-300 border border-blue-800 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2nd Order (Systemic)
          </button>
          <button
            onClick={() => setSelectedOrder(3)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              selectedOrder === 3
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3rd Order (Emergent)
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {renderNodes(
          consequenceGraph.firstOrder,
          '1st Order: Immediate Direct Impacts (Hours 0 - 2)',
          1
        )}
        {renderNodes(
          consequenceGraph.secondOrder,
          '2nd Order: Systemic & Cross-Sectoral Feedback Loops',
          2
        )}
        {renderNodes(
          consequenceGraph.thirdOrder,
          '3rd Order: Long-Term, Regulatory & Emergent Structural Shifts',
          3
        )}
      </div>
    </div>
  );
};
