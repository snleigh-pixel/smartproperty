import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Key, RefreshCw, AlertCircle, CheckCircle2, Code2, Globe } from 'lucide-react';
import { ProxyResponsePayload, UraApiResponse } from '../types/ura';

interface ApiConsoleProps {
  onLoadLiveResults?: (data: UraApiResponse, period: string) => void;
}

export const ApiConsole: React.FC<ApiConsoleProps> = ({ onLoadLiveResults }) => {
  const [service, setService] = useState('PMI_Resi_Developer_Sales');
  const [refPeriod, setRefPeriod] = useState('0926');
  const [accessKey, setAccessKey] = useState('accesskey');
  const [token, setToken] = useState('token');
  const [batch, setBatch] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [response, setResponse] = useState<ProxyResponsePayload | null>(null);
  const [tokenResponse, setTokenResponse] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'response' | 'snippets' | 'headers'>('response');
  const [snippetLanguage, setSnippetLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');

  const generatedCurl = `curl "https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=${service}&refPeriod=${refPeriod}${batch ? `&batch=${batch}` : ''}" \\
  -H "AccessKey: ${accessKey}" \\
  -H "Token: ${token}"`;

  const generatedJs = `const response = await fetch("https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=${service}&refPeriod=${refPeriod}${batch ? `&batch=${batch}` : ''}", {
  headers: {
    "AccessKey": "${accessKey}",
    "Token": "${token}",
    "User-Agent": "Mozilla/5.0"
  }
});
const data = await response.json();
console.log(data);`;

  const generatedPython = `import requests

url = "https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1"
params = {
    "service": "${service}",
    "refPeriod": "${refPeriod}"${batch ? `,\n    "batch": "${batch}"` : ''}
}
headers = {
    "AccessKey": "${accessKey}",
    "Token": "${token}",
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleFetchToken = async () => {
    if (!accessKey.trim()) {
      setErrorMessage('Please enter an AccessKey first to generate a daily token.');
      return;
    }
    setIsTokenLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/ura/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessKey: accessKey.trim() }),
      });
      const data = await res.json();
      setTokenResponse(data);
      if (data?.data?.Result) {
        setToken(data.data.Result);
      } else if (data?.data?.Message) {
        setErrorMessage(`Token Request Note: ${data.data.Message}`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to request daily token');
    } finally {
      setIsTokenLoading(false);
    }
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ura/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: service.trim(),
          refPeriod: refPeriod.trim(),
          accessKey: accessKey.trim(),
          token: token.trim(),
          batch: batch.trim() || undefined,
        }),
      });

      const payload: ProxyResponsePayload = await res.json();
      setResponse(payload);

      if (payload.data?.Status === 'Error') {
        setErrorMessage(`URA API Error: ${payload.data?.Message || 'Unauthorized or invalid credentials'}`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Connection error connecting to API proxy');
    } finally {
      setIsLoading(false);
    }
  };

  const hasSuccessData =
    response?.data?.Status === 'Success' &&
    Array.isArray(response?.data?.Result) &&
    response?.data?.Result.length > 0;

  return (
    <div className="space-y-6">
      {/* Top Banner explaining URA DataService */}
      <div className="p-4 bg-white rounded-lg border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-600" />
              Singapore URA DataService cURL Runner
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Execute live requests against <span className="font-mono text-slate-700">https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1</span> via secure server-side CORS proxy.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Service: {service}</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">Period: {refPeriod}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Request Form & Query Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Request Parameters
            </h3>

            {/* Service */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                DataService Name (<span className="font-mono">service</span>)
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="PMI_Resi_Developer_Sales">PMI_Resi_Developer_Sales (Developer Sales)</option>
                <option value="PMI_Resi_Transaction">PMI_Resi_Transaction (Quarterly Transactions)</option>
                <option value="PMI_Resi_Rental">PMI_Resi_Rental (Rental Contracts)</option>
                <option value="PMI_Resi_Pipeline">PMI_Resi_Pipeline (Upcoming Supply)</option>
              </select>
            </div>

            {/* refPeriod */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Reference Period (<span className="font-mono">refPeriod</span>)
                </label>
                <span className="text-[11px] text-slate-400 font-mono">MMYY format</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={refPeriod}
                  onChange={(e) => setRefPeriod(e.target.value)}
                  placeholder="e.g. 0926 or 0924"
                  maxLength={4}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setRefPeriod('0926')}
                  className={`px-2 py-1 text-[11px] font-mono border rounded ${
                    refPeriod === '0926' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  0926
                </button>
                <button
                  type="button"
                  onClick={() => setRefPeriod('0924')}
                  className={`px-2 py-1 text-[11px] font-mono border rounded ${
                    refPeriod === '0924' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  0924
                </button>
              </div>
            </div>

            {/* Optional batch parameter */}
            {service === 'PMI_Resi_Transaction' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Batch Number (<span className="font-mono">batch</span> 1-4)
                </label>
                <input
                  type="number"
                  min={1}
                  max={4}
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="1"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            )}

            {/* AccessKey Header */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-500" />
                  Header: AccessKey
                </label>
                <span className="text-[11px] text-slate-400">URA Developer Key</span>
              </div>
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Paste your URA AccessKey"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Token Header + Generator */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  Header: Token
                </label>
                <button
                  type="button"
                  onClick={handleFetchToken}
                  disabled={isTokenLoading}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isTokenLoading ? 'animate-spin' : ''}`} />
                  <span>Generate Daily Token</span>
                </button>
              </div>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your daily URA Token"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                URA issues a 24-hour token via <span className="font-mono">insertNewToken.v1.gca</span> using your AccessKey.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExecuteRequest}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Request...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                    <span>Execute cURL Request</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* cURL Preview Box */}
          <div className="p-4 bg-slate-900 rounded-lg text-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">cURL Command</span>
              <button
                onClick={() => handleCopy(generatedCurl, 'curl-preview')}
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                {copiedCode === 'curl-preview' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-200 overflow-x-auto whitespace-pre p-2 bg-slate-950/70 rounded border border-slate-800">
              {generatedCurl}
            </pre>
          </div>
        </div>

        {/* Right Column: Execution Results & Inspectors */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            {/* Inspector Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('response')}
                  className={`px-2.5 py-1 text-xs font-medium rounded ${
                    activeTab === 'response' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Raw Response
                </button>
                <button
                  onClick={() => setActiveTab('snippets')}
                  className={`px-2.5 py-1 text-xs font-medium rounded ${
                    activeTab === 'snippets' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Code Snippets
                </button>
                <button
                  onClick={() => setActiveTab('headers')}
                  className={`px-2.5 py-1 text-xs font-medium rounded ${
                    activeTab === 'headers' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  HTTP Headers
                </button>
              </div>

              {response && (
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-500 tabular-nums">
                    {response.latencyMs}ms
                  </span>
                  <span
                    className={`px-2 py-0.5 font-mono text-[11px] font-semibold rounded border ${
                      response.httpStatus === 200
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    HTTP {response.httpStatus}
                  </span>
                </div>
              )}
            </div>

            {/* Error or Notice Alert */}
            {errorMessage && (
              <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold">{errorMessage}</div>
                  <p className="text-[11px] text-amber-700">
                    If using demo credentials (<span className="font-mono">accesskey</span> / <span className="font-mono">token</span>), URA’s server rejects them as unauthorized. You can obtain a free API key at <a href="https://www.ura.gov.sg/maps/api/" target="_blank" rel="noreferrer" className="underline font-medium">URA DataService Portal</a>. In the meantime, the dashboard explorer is fully populated with accurate Singapore developer sales data!
                  </p>
                </div>
              </div>
            )}

            {/* Live Data Import Action Banner */}
            {hasSuccessData && onLoadLiveResults && (
              <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Successfully retrieved{' '}
                    <strong className="tabular-nums font-mono font-bold">
                      {response?.data?.Result?.length}
                    </strong>{' '}
                    records from URA API!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onLoadLiveResults(response!.data, refPeriod)}
                  className="px-3 py-1 text-xs font-semibold text-emerald-900 bg-emerald-200/80 hover:bg-emerald-300 rounded border border-emerald-300 transition-colors cursor-pointer"
                >
                  Load into Dashboard
                </button>
              </div>
            )}

            {/* Tab 1: Response Output */}
            {activeTab === 'response' && (
              <div className="p-4">
                {response ? (
                  <div className="relative">
                    <button
                      onClick={() => handleCopy(JSON.stringify(response.data, null, 2), 'raw-json')}
                      className="absolute right-2 top-2 px-2 py-1 text-[11px] bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded flex items-center gap-1 font-mono transition-colors"
                    >
                      {copiedCode === 'raw-json' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>
                    <pre className="max-h-[460px] overflow-auto p-3.5 bg-slate-900 text-slate-100 rounded text-xs font-mono leading-relaxed border border-slate-800">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500 space-y-2">
                    <Terminal className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium text-slate-700">Ready to execute query</p>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      Click &ldquo;Execute cURL Request&rdquo; to send the request via the Express backend proxy to URA DataService.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Code Snippets */}
            {activeTab === 'snippets' && (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {(['curl', 'javascript', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSnippetLanguage(lang)}
                      className={`px-2.5 py-1 text-xs font-mono rounded ${
                        snippetLanguage === lang
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {lang === 'curl' ? 'cURL' : lang === 'javascript' ? 'JavaScript' : 'Python'}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      const text =
                        snippetLanguage === 'curl'
                          ? generatedCurl
                          : snippetLanguage === 'javascript'
                          ? generatedJs
                          : generatedPython;
                      handleCopy(text, 'snippet');
                    }}
                    className="absolute right-2 top-2 px-2 py-1 text-[11px] bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded flex items-center gap-1 font-mono transition-colors"
                  >
                    {copiedCode === 'snippet' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                  <pre className="max-h-[420px] overflow-auto p-3.5 bg-slate-900 text-slate-100 rounded text-xs font-mono leading-relaxed border border-slate-800">
                    {snippetLanguage === 'curl' && generatedCurl}
                    {snippetLanguage === 'javascript' && generatedJs}
                    {snippetLanguage === 'python' && generatedPython}
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 3: Response Headers */}
            {activeTab === 'headers' && (
              <div className="p-4">
                {response?.headers ? (
                  <div className="space-y-1.5 font-mono text-xs">
                    {Object.entries(response.headers).map(([key, val]) => (
                      <div key={key} className="flex border-b border-slate-100 pb-1">
                        <span className="text-slate-500 font-semibold w-1/3 truncate">{key}:</span>
                        <span className="text-slate-800 w-2/3 truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-slate-400">
                    No response headers received yet. Run a request to inspect headers.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
