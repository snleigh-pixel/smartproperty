export type MarketSegment = 'CCR' | 'RCR' | 'OCR';
export type PropertyType = 'Apartment' | 'Condominium' | 'Executive Condominium';

export interface DeveloperSalesRecord {
  refPeriod: string; // MMYY, e.g. "0926" or "0924"
  project: string;
  street: string;
  marketSegment: MarketSegment;
  propertyType: PropertyType;
  district: string;
  developer: string;
  unitsSold: number;
  unitsLaunched: number;
  totalUnits: number;
  cumulativeUnitsLaunched: number;
  cumulativeUnitsSold: number;
  unsoldUnits: number;
  medianPrice: number; // PSF in SGD
  lowestPrice: number; // PSF in SGD
  highestPrice: number; // PSF in SGD
  estimatedMonthlySalesValue?: number; // Calculated: unitsSold * avg area * medianPrice
  latestTransactionDate?: string; // e.g. "2026-09-28" or "28 Sep 2026"
  latestTransactionDetails?: {
    date: string;
    unitType?: string;
    floorRange?: string;
    psf?: number;
    quantum?: number;
  };
}

export interface UraRawRecord {
  refPeriod?: string;
  project?: string;
  street?: string;
  marketSegment?: string;
  propertyType?: string;
  district?: string;
  developer?: string;
  unitsSold?: string | number;
  unitsLaunched?: string | number;
  totalUnits?: string | number;
  cumulativeUnitsLaunched?: string | number;
  cumulativeUnitsSold?: string | number;
  unsoldUnits?: string | number;
  medianPrice?: string | number;
  lowestPrice?: string | number;
  highestPrice?: string | number;
  latestTransactionDate?: string;
  contractDate?: string;
}

export interface UraApiResponse {
  Status: string;
  Message?: string;
  Result?: UraRawRecord[];
}

export interface ProxyResponsePayload {
  httpStatus: number;
  headers: Record<string, string>;
  data: UraApiResponse | any;
  latencyMs: number;
  targetUrl: string;
}

export interface PeriodSummary {
  refPeriod: string;
  label: string;
  totalUnitsLaunched: number;
  totalUnitsSold: number;
  medianPsf: number;
  totalEstimatedSalesValueM: number;
  activeProjects: number;
  takeUpRate: number;
}

export interface SegmentAnalysis {
  segment: MarketSegment;
  name: string;
  totalSold: number;
  totalLaunched: number;
  medianPsf: number;
  minPsf: number;
  maxPsf: number;
  projectCount: number;
  unsoldUnits: number;
}
