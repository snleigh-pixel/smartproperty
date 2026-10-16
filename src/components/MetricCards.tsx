import React from 'react';
import { TrendingUp, Layers, DollarSign, Home, CheckCircle2, BarChart2 } from 'lucide-react';
import { DeveloperSalesRecord } from '../types/ura';

interface MetricCardsProps {
  records: DeveloperSalesRecord[];
  refPeriod: string;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ records }) => {
  const totalUnitsSold = records.reduce((sum, r) => sum + r.unitsSold, 0);
  const totalUnitsLaunched = records.reduce((sum, r) => sum + r.unitsLaunched, 0);

  // Median PSF: weighted average of median prices by units sold, or standard median
  const validMedianPrices = records.filter(r => r.medianPrice > 0);
  const sortedPsf = [...validMedianPrices].map(r => r.medianPrice).sort((a, b) => a - b);
  const medianPsf =
    sortedPsf.length > 0
      ? sortedPsf[Math.floor(sortedPsf.length / 2)]
      : 0;

  // Total cumulative units launched & sold across active projects
  const totalCumulativeUnits = records.reduce((sum, r) => sum + r.totalUnits, 0);
  const totalCumulativeSold = records.reduce((sum, r) => sum + r.cumulativeUnitsSold, 0);
  const cumulativeTakeUp =
    totalCumulativeUnits > 0
      ? Math.round((totalCumulativeSold / totalCumulativeUnits) * 100)
      : 0;

  // Total estimated monthly sales value in million SGD (assuming ~850 sqft avg unit size)
  const totalSalesValueSGD = records.reduce(
    (sum, r) => sum + (r.unitsSold * 850 * r.medianPrice),
    0
  );
  const totalSalesValueM = (totalSalesValueSGD / 1_000_000).toFixed(1);

  // Unsold inventory
  const totalUnsoldInventory = records.reduce((sum, r) => sum + r.unsoldUnits, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 1. Units Sold This Month */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Units Sold</span>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {totalUnitsSold.toLocaleString()}
        </div>
        <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
          <span>Monthly developer sales</span>
        </div>
      </div>

      {/* 2. Units Launched This Month */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Units Launched</span>
          <Layers className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {totalUnitsLaunched.toLocaleString()}
        </div>
        <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
          <span>New project releases</span>
        </div>
      </div>

      {/* 3. Median PSF */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Median PSF</span>
          <DollarSign className="w-3.5 h-3.5 text-amber-600" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          ${medianPsf.toLocaleString()}
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          <span>SGD per sq ft</span>
        </div>
      </div>

      {/* 4. Est. Gross Transacted Value */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Est. Value Transacted</span>
          <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          ${totalSalesValueM}M
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          <span>Est. based on ~850 sqft</span>
        </div>
      </div>

      {/* 5. Cumulative Take-up */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Project Take-Up</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {cumulativeTakeUp}%
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          <span className="tabular-nums">{totalCumulativeSold.toLocaleString()}</span> of{' '}
          <span className="tabular-nums">{totalCumulativeUnits.toLocaleString()}</span> units
        </div>
      </div>

      {/* 6. Unsold Available Inventory */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span>Unsold Inventory</span>
          <Home className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
          {totalUnsoldInventory.toLocaleString()}
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          <span>Across {records.length} active sites</span>
        </div>
      </div>
    </div>
  );
};
