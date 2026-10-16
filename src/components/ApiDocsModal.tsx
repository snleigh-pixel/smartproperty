import React from 'react';
import { BookOpen, Key, Globe, Shield, Database, ExternalLink } from 'lucide-react';

export const ApiDocsModal: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-5 bg-white rounded-lg border border-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-600" />
              Singapore URA DataService API Documentation
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              The Urban Redevelopment Authority (URA) publishes monthly statistics on private residential developer sales in Singapore. Developers are required under the Housing Developers (Control & Licensing) Act to submit monthly returns on sales and launches.
            </p>
          </div>
          <a
            href="https://www.ura.gov.sg/maps/api/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shrink-0"
          >
            <span>URA Developer Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Authentication Architecture */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-amber-600" />
          Two-Step Authentication Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Generate Daily Token</span>
            </div>
            <p className="text-slate-600">
              Each calendar day, call the URA token generation endpoint using your registered <span className="font-mono">AccessKey</span>.
            </p>
            <div className="p-2 bg-slate-900 text-slate-200 font-mono text-[11px] rounded overflow-x-auto">
              curl &quot;https://www.ura.gov.sg/uraDataService/insertNewToken.v1.gca&quot; \<br />
              &nbsp;&nbsp;-H &quot;AccessKey: your_access_key&quot;
            </div>
            <p className="text-[11px] text-slate-500">
              Response contains <span className="font-mono">&quot;Result&quot;: &quot;eyJhbGciOi...&quot;</span> valid for 24 hours.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Invoke DataService</span>
            </div>
            <p className="text-slate-600">
              Pass both <span className="font-mono">AccessKey</span> and <span className="font-mono">Token</span> headers to fetch data.
            </p>
            <div className="p-2 bg-slate-900 text-slate-200 font-mono text-[11px] rounded overflow-x-auto">
              curl &quot;https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=PMI_Resi_Developer_Sales&amp;refPeriod=0926&quot; \<br />
              &nbsp;&nbsp;-H &quot;AccessKey: your_access_key&quot; \<br />
              &nbsp;&nbsp;-H &quot;Token: your_daily_token&quot;
            </div>
            <p className="text-[11px] text-slate-500">
              Note: Direct browser calls are blocked by CORS; use this app&apos;s server-side proxy route.
            </p>
          </div>
        </div>
      </div>

      {/* Query Parameters & Schema Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          Field Specifications: PMI_Resi_Developer_Sales
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                <th className="py-2.5 px-3">Field Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Description &amp; Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">refPeriod</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String (MMYY)</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Month and Year of developer return, e.g. <span className="font-mono">0926</span> = September 2026.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">project</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Name of the private residential or executive condominium development (e.g. &ldquo;CHUAN PARK&rdquo;, &ldquo;GRAND DUNMAN&rdquo;).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">street</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Road name / street address in Singapore (e.g. &ldquo;DUNMAN ROAD&rdquo;, &ldquo;LENTOR CENTRAL&rdquo;).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">marketSegment</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String</td>
                <td className="py-2.5 px-3 text-slate-600">
                  <strong>CCR</strong> (Core Central Region), <strong>RCR</strong> (Rest of Central Region), or <strong>OCR</strong> (Outside Central Region).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">propertyType</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Condominium, Apartment, or Executive Condominium (EC).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">district</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">String (2-digit)</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Postal District 01 through 28.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">unitsSold</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Number of units sold by developer in the reference month.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">unitsLaunched</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Number of units newly released/launched for sale in the reference month.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">totalUnits</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Total residential units in the approved development plan.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">cumulativeUnitsSold</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Total units sold by developer since launch to date.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">unsoldUnits</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Remaining inventory not yet sold in the development.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">medianPrice</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Median price per square foot (SGD PSF) achieved in sales transacted during the month.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">lowestPrice / highestPrice</td>
                <td className="py-2.5 px-3 text-slate-500 font-mono">Number</td>
                <td className="py-2.5 px-3 text-slate-600">
                  Minimum and maximum transacted PSF recorded in the month.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Singapore Market Regions Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
          <span className="font-bold text-slate-900 block">CCR — Core Central Region</span>
          <p className="text-slate-600 leading-relaxed">
            Districts 09, 10, 11 (Orchard, Tanglin, Bukit Timah), Downtown Core (D01, D02 Marina Bay &amp; Tanjong Pagar), and Sentosa Cove. Premium prime luxury developments.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
          <span className="font-bold text-slate-900 block">RCR — Rest of Central Region</span>
          <p className="text-slate-600 leading-relaxed">
            City fringe areas including Districts 03 (Queenstown), 04 (Harbourfront), 05 (Buona Vista/Clementi), 07 (Bugis), 12 (Toa Payoh), 14 (Geylang/Paya Lebar), and 15 (East Coast).
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
          <span className="font-bold text-slate-900 block">OCR — Outside Central Region</span>
          <p className="text-slate-600 leading-relaxed">
            Mass market suburban areas including Districts 16-19 (Tampines, Pasir Ris, Punggol), 20-23 (Jurong, Bukit Batok, Hillview), and 25-28 (Woodlands, Lentor, Yishun).
          </p>
        </div>
      </div>
    </div>
  );
};
