import React, { useMemo } from 'react';
import { DeveloperSalesRecord, MarketSegment } from '../types/ura';
import { DISTRICT_MAP, formatDisplayDate } from '../data/sampleDeveloperSales';
import { Building2, Compass, Layers, PieChart } from 'lucide-react';

interface PriceAnalyticsProps {
  records: DeveloperSalesRecord[];
  onSelectProject: (project: DeveloperSalesRecord) => void;
}

export const PriceAnalytics: React.FC<PriceAnalyticsProps> = ({ records, onSelectProject }) => {
  // Segment Stats (CCR, RCR, OCR)
  const segmentStats = useMemo(() => {
    const segments: MarketSegment[] = ['CCR', 'RCR', 'OCR'];
    return segments.map((seg) => {
      const segRecords = records.filter((r) => r.marketSegment === seg);
      const totalSold = segRecords.reduce((sum, r) => sum + r.unitsSold, 0);
      const totalLaunched = segRecords.reduce((sum, r) => sum + r.unitsLaunched, 0);
      const unsold = segRecords.reduce((sum, r) => sum + r.unsoldUnits, 0);

      const psfs = segRecords.map((r) => r.medianPrice).filter((p) => p > 0).sort((a, b) => a - b);
      const medianPsf = psfs.length > 0 ? psfs[Math.floor(psfs.length / 2)] : 0;
      const minPsf = psfs.length > 0 ? psfs[0] : 0;
      const maxPsf = psfs.length > 0 ? psfs[psfs.length - 1] : 0;

      const fullNames: Record<MarketSegment, string> = {
        CCR: 'Core Central Region (Downtown, Orchard, Sentosa)',
        RCR: 'Rest of Central Region (City Fringe)',
        OCR: 'Outside Central Region (Suburbs)'
      };

      return {
        segment: seg,
        name: fullNames[seg],
        totalSold,
        totalLaunched,
        unsold,
        medianPsf,
        minPsf,
        maxPsf,
        projectCount: segRecords.length,
      };
    });
  }, [records]);

  // Top 10 Selling Projects
  const topSellingProjects = useMemo(() => {
    return [...records]
      .filter((r) => r.unitsSold > 0)
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 10);
  }, [records]);

  // District Summary
  const districtStats = useMemo(() => {
    const map = new Map<string, { count: number; sold: number; psfSum: number; psfCount: number }>();
    records.forEach((r) => {
      const cur = map.get(r.district) || { count: 0, sold: 0, psfSum: 0, psfCount: 0 };
      cur.count += 1;
      cur.sold += r.unitsSold;
      if (r.medianPrice > 0) {
        cur.psfSum += r.medianPrice;
        cur.psfCount += 1;
      }
      map.set(r.district, cur);
    });

    const list = Array.from(map.entries()).map(([district, data]) => ({
      district,
      name: DISTRICT_MAP[district] || `District ${district}`,
      count: data.count,
      sold: data.sold,
      avgPsf: data.psfCount > 0 ? Math.round(data.psfSum / data.psfCount) : 0,
    }));

    return list.sort((a, b) => b.sold - a.sold);
  }, [records]);

  const maxSoldInTop = topSellingProjects.length > 0 ? topSellingProjects[0].unitsSold : 1;

  return (
    <div className="space-y-6">
      {/* 1. Market Segment Breakdown (CCR vs RCR vs OCR) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Singapore Market Segment Pricing & Velocity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison between Core Central Region (CCR), Rest of Central Region (RCR), and Outside Central Region (OCR)
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {records.length} projects analyzed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {segmentStats.map((seg) => (
            <div
              key={seg.segment}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900">{seg.segment}</span>
                  <div className="text-[11px] text-slate-500">{seg.name}</div>
                </div>
                <span className="text-xs font-mono text-slate-500">{seg.projectCount} sites</span>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Median PSF</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ${seg.medianPsf.toLocaleString()} psf
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">PSF Range</span>
                  <span className="text-slate-700 tabular-nums">
                    ${seg.minPsf.toLocaleString()} - ${seg.maxPsf.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Monthly Units Sold</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {seg.totalSold.toLocaleString()} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Unsold Balance</span>
                  <span className="text-slate-600 tabular-nums">
                    {seg.unsold.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Top Selling Developments & District Leaderboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Bestselling Launches */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Top Bestselling Projects
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Highest transaction volume recorded this month
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">By Units Sold</span>
          </div>

          <div className="space-y-3">
            {topSellingProjects.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No sales recorded for this period.</p>
            ) : (
              topSellingProjects.map((p, idx) => {
                const barWidth = Math.max(8, Math.round((p.unitsSold / maxSoldInTop) * 100));
                return (
                  <div
                    key={p.project}
                    onClick={() => onSelectProject(p)}
                    className="p-2.5 rounded border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-slate-400 font-mono w-4">{idx + 1}.</span>
                        <span className="font-semibold text-slate-900 group-hover:text-rose-600 truncate">
                          {p.project}
                        </span>
                        <span className="text-[11px] text-slate-500 shrink-0">
                          (D{p.district} · {p.marketSegment})
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900 tabular-nums">{p.unitsSold}</span>
                        <span className="text-slate-500 text-[11px] ml-1">sold</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-slate-800 h-1.5 rounded-full transition-all"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                      <span className="tabular-nums font-mono">${p.medianPrice.toLocaleString()} psf</span>
                      <span className="tabular-nums text-slate-700 font-medium">
                        Latest: {p.latestTransactionDetails?.date || formatDisplayDate(p.latestTransactionDate)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* District Activity & Average PSF */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                District Activity Leaderboard
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sales volume and average price PSF across Singapore postal districts
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">D01 - D28</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2 px-2">District</th>
                  <th className="py-2 px-2">Location</th>
                  <th className="py-2 px-2 text-right">Sold</th>
                  <th className="py-2 px-2 text-right">Avg PSF</th>
                  <th className="py-2 px-2 text-right">Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {districtStats.map((d) => (
                  <tr key={d.district} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 font-mono font-semibold text-slate-800">
                      D{d.district}
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 truncate max-w-[140px]" title={d.name}>
                      {d.name}
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 tabular-nums">
                      {d.sold}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-700 tabular-nums font-medium">
                      {d.avgPsf > 0 ? `$${d.avgPsf.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500 tabular-nums">
                      {d.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
