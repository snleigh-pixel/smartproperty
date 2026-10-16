import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { DeveloperSalesTable } from './components/DeveloperSalesTable';
import { PriceAnalytics } from './components/PriceAnalytics';
import { ApiConsole } from './components/ApiConsole';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ApiDocsModal } from './components/ApiDocsModal';
import { SAMPLE_DEVELOPER_SALES, formatRefPeriod, parseRawUraRecord } from './data/sampleDeveloperSales';
import { DeveloperSalesRecord, MarketSegment, UraApiResponse } from './types/ura';
import { Calendar, ChevronRight, Download, Filter, Info, RefreshCw, Terminal } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<DeveloperSalesRecord[]>(SAMPLE_DEVELOPER_SALES);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('0926');
  const [selectedSegment, setSelectedSegment] = useState<MarketSegment | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table' | 'analytics' | 'console' | 'docs'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<DeveloperSalesRecord | null>(null);
  const [isLiveApiData, setIsLiveApiData] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Available periods in dataset
  const availablePeriods = useMemo(() => {
    const set = new Set(records.map((r) => r.refPeriod));
    return Array.from(set).sort().reverse();
  }, [records]);

  // Current period records
  const currentPeriodRecords = useMemo(() => {
    if (selectedPeriod === 'ALL') return records;
    return records.filter((r) => r.refPeriod === selectedPeriod);
  }, [records, selectedPeriod]);

  // Handle importing live data from API Console
  const handleLoadLiveResults = (apiResponse: UraApiResponse, period: string) => {
    if (!apiResponse.Result || !Array.isArray(apiResponse.Result)) return;

    const parsed = apiResponse.Result.map((raw) => parseRawUraRecord(raw, period));
    setRecords(parsed);
    setSelectedPeriod(period || (parsed[0]?.refPeriod ?? '0926'));
    setIsLiveApiData(true);
    setActiveTab('table');
    showToast(`Loaded ${parsed.length} live records from Singapore URA API`);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'RefPeriod',
      'Project',
      'Street',
      'District',
      'MarketSegment',
      'PropertyType',
      'Developer',
      'UnitsSoldThisMonth',
      'UnitsLaunchedThisMonth',
      'TotalUnits',
      'CumulativeUnitsLaunched',
      'CumulativeUnitsSold',
      'UnsoldUnits',
      'MedianPricePSF',
      'LowestPricePSF',
      'HighestPricePSF'
    ];

    const rows = currentPeriodRecords.map((r) => [
      `"${r.refPeriod}"`,
      `"${r.project.replace(/"/g, '""')}"`,
      `"${r.street.replace(/"/g, '""')}"`,
      `"${r.district}"`,
      `"${r.marketSegment}"`,
      `"${r.propertyType}"`,
      `"${r.developer.replace(/"/g, '""')}"`,
      r.unitsSold,
      r.unitsLaunched,
      r.totalUnits,
      r.cumulativeUnitsLaunched,
      r.cumulativeUnitsSold,
      r.unsoldUnits,
      r.medianPrice,
      r.lowestPrice,
      r.highestPrice
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `URA_PMI_Resi_Developer_Sales_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${currentPeriodRecords.length} records to CSV`);
  };

  // Reset to initial sample data
  const handleResetSampleData = () => {
    setRecords(SAMPLE_DEVELOPER_SALES);
    setSelectedPeriod('0926');
    setIsLiveApiData(false);
    showToast('Reset to default benchmark dataset (0926, 0826, 0924)');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConsole={() => setActiveTab('console')}
        onExportCsv={handleExportCsv}
        isLiveApiData={isLiveApiData}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl border border-slate-800 transition-all">
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sub-header / Period Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span>Urban Redevelopment Authority</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-700">PMI_Resi_Developer_Sales</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Singapore Private Residential Developer Sales
            </h1>
          </div>

          {/* Period Selector Tabs */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reference Period:</span>
            </span>
            <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-md shadow-2xs">
              {availablePeriods.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedPeriod === p
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p} ({formatRefPeriod(p).split(' ')[0]})
                </button>
              ))}
              {availablePeriods.length > 1 && (
                <button
                  onClick={() => setSelectedPeriod('ALL')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedPeriod === 'ALL'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
              )}
            </div>

            {isLiveApiData && (
              <button
                onClick={handleResetSampleData}
                title="Reset to benchmark data"
                className="p-1.5 text-xs text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Dashboard Overview (KPIs + Top table preview + Segment spread) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <MetricCards
              records={currentPeriodRecords}
              refPeriod={selectedPeriod}
            />

            {/* Price Analytics Summary Component */}
            <PriceAnalytics
              records={currentPeriodRecords}
              onSelectProject={(p) => setSelectedProject(p)}
            />

            {/* Quick table preview link */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
              <div>
                <span className="font-semibold text-xs text-slate-900 block">
                  Detailed Project Directory &amp; Full Developer Returns
                </span>
                <span className="text-xs text-slate-500">
                  Inspect all {currentPeriodRecords.length} private residential developments, sorting by PSF, units sold, or unsold balance.
                </span>
              </div>
              <button
                onClick={() => setActiveTab('table')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                <span>View Full Grid</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Full Developer Sales Grid */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            <DeveloperSalesTable
              records={currentPeriodRecords}
              onSelectProject={(p) => setSelectedProject(p)}
              selectedSegment={selectedSegment}
              setSelectedSegment={setSelectedSegment}
            />
          </div>
        )}

        {/* Tab 3: PSF & Market Spread */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <PriceAnalytics
              records={currentPeriodRecords}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          </div>
        )}

        {/* Tab 4: API Console & Live cURL Runner */}
        {activeTab === 'console' && (
          <ApiConsole onLoadLiveResults={handleLoadLiveResults} />
        )}

        {/* Tab 5: Technical Documentation & Field Specs */}
        {activeTab === 'docs' && (
          <ApiDocsModal />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Singapore URA Developer Sales Lens</span>
            <span>·</span>
            <span>Data format compliant with URA DataService API v1</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('console')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Test cURL
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              API Reference
            </button>
            <a
              href="https://www.ura.gov.sg/maps/api/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              URA Official Portal
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
