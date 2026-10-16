import React, { useState, useEffect } from 'react';
import { X, Building2, MapPin, Calculator, Layers, TrendingUp, ShieldCheck, Calendar } from 'lucide-react';
import { DeveloperSalesRecord } from '../types/ura';
import { DISTRICT_MAP, formatRefPeriod, formatDisplayDate } from '../data/sampleDeveloperSales';

interface ProjectDetailModalProps {
  project: DeveloperSalesRecord | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [customSqft, setCustomSqft] = useState<number>(850);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const takeUpPercent = project.totalUnits > 0
    ? Math.round((project.cumulativeUnitsSold / project.totalUnits) * 100)
    : 0;

  const districtName = DISTRICT_MAP[project.district] || `District ${project.district}`;

  const calcPrice = (sqft: number) => {
    return Math.round(sqft * project.medianPrice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{project.marketSegment}</span>
              <span aria-hidden="true">·</span>
              <span>District {project.district}</span>
              <span aria-hidden="true">·</span>
              <span>{project.propertyType}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {project.project}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{project.street}</span>
              <span className="text-slate-400 font-normal">({districtName})</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Developer & Reference Period */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-slate-500 block text-[11px]">Developer</span>
              <span className="font-semibold text-slate-800">{project.developer}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-500 block text-[11px]">Reporting Month</span>
              <span className="font-mono font-medium text-slate-800">
                {formatRefPeriod(project.refPeriod)} ({project.refPeriod})
              </span>
            </div>
          </div>

          {/* Latest Transaction Highlight Card */}
          <div className="p-4 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-slate-900 text-xs">Latest Transacted Unit</span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                {project.latestTransactionDetails?.date || formatDisplayDate(project.latestTransactionDate)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 bg-white rounded border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Contract Date</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {project.latestTransactionDetails?.date || formatDisplayDate(project.latestTransactionDate)}
                </span>
              </div>
              <div className="p-2.5 bg-white rounded border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Unit Type & Floor</span>
                <span className="font-bold text-slate-900 truncate block" title={project.latestTransactionDetails?.unitType}>
                  {project.latestTransactionDetails?.floorRange ? `${project.latestTransactionDetails.floorRange} ` : ''}
                  {project.latestTransactionDetails?.unitType || 'Standard Residential Unit'}
                </span>
              </div>
              <div className="p-2.5 bg-white rounded border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Transacted PSF</span>
                <span className="font-bold text-emerald-700 tabular-nums font-mono">
                  ${(project.latestTransactionDetails?.psf || project.medianPrice).toLocaleString()} psf
                </span>
              </div>
              <div className="p-2.5 bg-white rounded border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Approx. Deal Quantum</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {project.latestTransactionDetails?.quantum
                    ? `$${(project.latestTransactionDetails.quantum / 1_000_000).toFixed(2)}M`
                    : `$${((project.medianPrice * 850) / 1_000_000).toFixed(2)}M`}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Metrics Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
              Pricing Analysis ($ PSF)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Lowest Recorded</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  {project.lowestPrice > 0 ? `$${project.lowestPrice.toLocaleString()}` : '-'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">SGD / sqft</span>
              </div>
              <div className="p-3 bg-slate-900 text-white rounded-lg border border-slate-800">
                <span className="text-slate-300 block text-[11px]">Median PSF</span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums">
                  {project.medianPrice > 0 ? `$${project.medianPrice.toLocaleString()}` : '-'}
                </span>
                <span className="text-[10px] text-slate-300 block mt-0.5">Benchmark price</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Highest Recorded</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  {project.highestPrice > 0 ? `$${project.highestPrice.toLocaleString()}` : '-'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">SGD / sqft</span>
              </div>
            </div>
          </div>

          {/* Cumulative Sales & Take-Up Velocity */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Sales Velocity & Inventory
              </h3>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {takeUpPercent}% Sold
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-slate-900 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, takeUpPercent)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Monthly Sold</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  {project.unitsSold}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Monthly Launched</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  {project.unitsLaunched}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Cumulative Sold</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  {project.cumulativeUnitsSold} / {project.totalUnits}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Unsold Inventory</span>
                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  {project.unsoldUnits}
                </span>
              </div>
            </div>
          </div>

          {/* Estimated Unit Quantum Calculator */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Calculator className="w-4 h-4 text-slate-700" />
              <span>Estimated Unit Quantum Calculator</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Indicative purchase price calculated at ${project.medianPrice.toLocaleString()} median PSF:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">1-Bed (~480 sqft)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${(calcPrice(480) / 1_000_000).toFixed(2)}M
                </span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">2-Bed (~680 sqft)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${(calcPrice(680) / 1_000_000).toFixed(2)}M
                </span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">3-Bed (~980 sqft)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${(calcPrice(980) / 1_000_000).toFixed(2)}M
                </span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">4-Bed (~1,280 sqft)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${(calcPrice(1280) / 1_000_000).toFixed(2)}M
                </span>
              </div>
            </div>

            {/* Custom Sqft input */}
            <div className="flex items-center gap-3 pt-2">
              <label className="text-[11px] text-slate-600 font-medium">Custom Area:</label>
              <input
                type="number"
                value={customSqft}
                onChange={(e) => setCustomSqft(Number(e.target.value) || 0)}
                className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 font-mono text-xs tabular-nums"
              />
              <span className="text-slate-500 text-[11px]">sqft =</span>
              <span className="font-bold font-mono text-slate-900 tabular-nums text-sm">
                ${calcPrice(customSqft).toLocaleString()} SGD
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
