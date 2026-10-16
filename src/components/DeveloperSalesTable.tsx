import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronUp, ChevronDown, ChevronRight, Filter, Calendar } from 'lucide-react';
import { DeveloperSalesRecord, MarketSegment } from '../types/ura';
import { DISTRICT_MAP, formatDisplayDate } from '../data/sampleDeveloperSales';

interface DeveloperSalesTableProps {
  records: DeveloperSalesRecord[];
  onSelectProject: (project: DeveloperSalesRecord) => void;
  selectedSegment: MarketSegment | 'ALL';
  setSelectedSegment: (seg: MarketSegment | 'ALL') => void;
}

type SortField = 'project' | 'district' | 'unitsSold' | 'unitsLaunched' | 'medianPrice' | 'takeUp' | 'unsoldUnits' | 'latestTransactionDate';
type SortDirection = 'asc' | 'desc';

export const DeveloperSalesTable: React.FC<DeveloperSalesTableProps> = ({
  records,
  onSelectProject,
  selectedSegment,
  setSelectedSegment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('unitsSold');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Market segment filter
      if (selectedSegment !== 'ALL' && r.marketSegment !== selectedSegment) {
        return false;
      }
      // Property type filter
      if (selectedPropertyType !== 'ALL' && r.propertyType !== selectedPropertyType) {
        return false;
      }
      // District filter
      if (selectedDistrict !== 'ALL' && r.district !== selectedDistrict) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesProject = r.project.toLowerCase().includes(query);
        const matchesStreet = r.street.toLowerCase().includes(query);
        const matchesDev = r.developer.toLowerCase().includes(query);
        const matchesDist = r.district.includes(query);
        if (!matchesProject && !matchesStreet && !matchesDev && !matchesDist) {
          return false;
        }
      }
      return true;
    });
  }, [records, selectedSegment, selectedPropertyType, selectedDistrict, searchQuery]);

  // Sort records
  const sortedRecords = useMemo(() => {
    const list = [...filteredRecords];
    list.sort((a, b) => {
      let valA: any = 0;
      let valB: any = 0;

      switch (sortField) {
        case 'project':
          return sortDirection === 'asc'
            ? a.project.localeCompare(b.project)
            : b.project.localeCompare(a.project);
        case 'district':
          return sortDirection === 'asc'
            ? a.district.localeCompare(b.district)
            : b.district.localeCompare(a.district);
        case 'unitsSold':
          valA = a.unitsSold;
          valB = b.unitsSold;
          break;
        case 'unitsLaunched':
          valA = a.unitsLaunched;
          valB = b.unitsLaunched;
          break;
        case 'medianPrice':
          valA = a.medianPrice;
          valB = b.medianPrice;
          break;
        case 'unsoldUnits':
          valA = a.unsoldUnits;
          valB = b.unsoldUnits;
          break;
        case 'latestTransactionDate':
          valA = a.latestTransactionDate || a.refPeriod || '';
          valB = b.latestTransactionDate || b.refPeriod || '';
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case 'takeUp':
          valA = a.totalUnits > 0 ? (a.cumulativeUnitsSold / a.totalUnits) : 0;
          valB = b.totalUnits > 0 ? (b.cumulativeUnitsSold / b.totalUnits) : 0;
          break;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredRecords, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const uniqueDistricts = useMemo(() => {
    const dists = Array.from(new Set(records.map(r => r.district))).sort();
    return dists;
  }, [records]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by project name, street, developer..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          {/* Segment Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-md shrink-0">
            {(['ALL', 'CCR', 'RCR', 'OCR'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => {
                  setSelectedSegment(seg);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSegment === seg
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {seg === 'ALL' ? 'All Segments' : seg}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by:</span>
          </div>

          {/* Property Type Dropdown */}
          <select
            value={selectedPropertyType}
            onChange={(e) => {
              setSelectedPropertyType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Property Types</option>
            <option value="Condominium">Condominium</option>
            <option value="Apartment">Apartment</option>
            <option value="Executive Condominium">Executive Condominium (EC)</option>
          </select>

          {/* District Dropdown */}
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="ALL">All Districts ({uniqueDistricts.length})</option>
            {uniqueDistricts.map((d) => (
              <option key={d} value={d}>
                District {d} - {DISTRICT_MAP[d] ? DISTRICT_MAP[d].slice(0, 24) + '...' : ''}
              </option>
            ))}
          </select>

          {(selectedSegment !== 'ALL' || selectedPropertyType !== 'ALL' || selectedDistrict !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSegment('ALL');
                setSelectedPropertyType('ALL');
                setSelectedDistrict('ALL');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Table Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 font-semibold select-none">
              <th
                onClick={() => handleSort('project')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Project & Street</span>
                  {sortField === 'project' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('district')}
                className="py-3 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>District / Region</span>
                  {sortField === 'district' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('latestTransactionDate')}
                className="py-3 px-3 cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Latest Transaction</span>
                  {sortField === 'latestTransactionDate' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('unitsSold')}
                className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Sold (Mth)</span>
                  {sortField === 'unitsSold' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('unitsLaunched')}
                className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Launched (Mth)</span>
                  {sortField === 'unitsLaunched' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('medianPrice')}
                className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Median PSF</span>
                  {sortField === 'medianPrice' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th className="py-3 px-3 text-right">
                <span>Price Range PSF</span>
              </th>
              <th
                onClick={() => handleSort('takeUp')}
                className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Project Take-Up</span>
                  {sortField === 'takeUp' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('unsoldUnits')}
                className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Unsold</span>
                  {sortField === 'unsoldUnits' ? (
                    sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </th>
              <th className="py-3 px-3 text-center">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="font-medium text-slate-700">No developer sales found</p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search terms or clearing the current segment/district filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r, idx) => {
                const takeUpPct = r.totalUnits > 0
                  ? Math.round((r.cumulativeUnitsSold / r.totalUnits) * 100)
                  : 0;

                const hasSales = r.unitsSold > 0;
                const formattedDate = r.latestTransactionDetails?.date || formatDisplayDate(r.latestTransactionDate);

                return (
                  <tr
                    key={`${r.project}-${r.refPeriod}-${idx}`}
                    onClick={() => onSelectProject(r)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Project and Street */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {r.project}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs flex items-center gap-1.5 mt-0.5">
                        <span>{r.street}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{r.developer}</span>
                      </div>
                    </td>

                    {/* District & Region */}
                    <td className="py-3 px-3">
                      <div className="font-mono text-slate-800">
                        District {r.district}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <span className="font-semibold text-slate-700">{r.marketSegment}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{r.propertyType}</span>
                      </div>
                    </td>

                    {/* Latest Transaction Date */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-medium text-slate-900 tabular-nums flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hasSales ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className="font-semibold">{formattedDate}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px] pl-3">
                        {r.latestTransactionDetails?.unitType ? (
                          <span title={r.latestTransactionDetails.unitType}>
                            {r.latestTransactionDetails.floorRange ? `${r.latestTransactionDetails.floorRange} ` : ''}
                            {r.latestTransactionDetails.unitType.split('(')[0].trim()}
                          </span>
                        ) : (
                          <span>Return Period {r.refPeriod}</span>
                        )}
                      </div>
                    </td>

                    {/* Units Sold */}
                    <td className="py-3 px-3 text-right">
                      <span className={`tabular-nums font-semibold ${r.unitsSold > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                        {r.unitsSold.toLocaleString()}
                      </span>
                    </td>

                    {/* Units Launched */}
                    <td className="py-3 px-3 text-right">
                      <span className={`tabular-nums ${r.unitsLaunched > 0 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                        {r.unitsLaunched > 0 ? r.unitsLaunched.toLocaleString() : '-'}
                      </span>
                    </td>

                    {/* Median PSF */}
                    <td className="py-3 px-4 text-right">
                      <div className="font-bold text-slate-900 tabular-nums">
                        {r.medianPrice > 0 ? `$${r.medianPrice.toLocaleString()}` : '-'}
                      </div>
                    </td>

                    {/* Lowest - Highest PSF */}
                    <td className="py-3 px-3 text-right text-slate-500 tabular-nums">
                      {r.lowestPrice > 0 && r.highestPrice > 0 ? (
                        <span>
                          ${r.lowestPrice.toLocaleString()} - ${r.highestPrice.toLocaleString()}
                        </span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>

                    {/* Take-Up Bar & % */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-slate-800 h-1.5 rounded-full transition-all"
                            style={{ width: `${Math.min(100, takeUpPct)}%` }}
                          />
                        </div>
                        <span className="tabular-nums font-medium text-slate-700 w-9 text-right">
                          {takeUpPct}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 tabular-nums mt-0.5">
                        {r.cumulativeUnitsSold}/{r.totalUnits}
                      </div>
                    </td>

                    {/* Unsold Units */}
                    <td className="py-3 px-3 text-right">
                      <span className="tabular-nums text-slate-600">
                        {r.unsoldUnits.toLocaleString()}
                      </span>
                    </td>

                    {/* Chevron */}
                    <td className="py-3 px-3 text-center text-slate-400 group-hover:text-slate-700 transition-colors">
                      <ChevronRight className="w-4 h-4 inline" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-medium text-slate-700 tabular-nums">
            {sortedRecords.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium text-slate-700 tabular-nums">
            {Math.min(currentPage * pageSize, sortedRecords.length)}
          </span>{' '}
          of{' '}
          <span className="font-medium text-slate-700 tabular-nums">
            {sortedRecords.length}
          </span>{' '}
          developments
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          <span className="px-2 font-medium text-slate-700 tabular-nums">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
