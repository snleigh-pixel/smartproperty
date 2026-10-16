import { DeveloperSalesRecord, MarketSegment } from '../types/ura';

export const SAMPLE_DEVELOPER_SALES: DeveloperSalesRecord[] = [
  // Period: 0926 (September 2026 - Target in user query)
  {
    refPeriod: '0926',
    project: 'CHUAN PARK',
    street: 'LORONG CHUAN',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '19',
    developer: 'KINGSFORD DEVELOPMENT & MCC LAND',
    unitsSold: 42,
    unitsLaunched: 60,
    totalUnits: 916,
    cumulativeUnitsLaunched: 850,
    cumulativeUnitsSold: 684,
    unsoldUnits: 232,
    medianPrice: 2580,
    lowestPrice: 2380,
    highestPrice: 2890,
    latestTransactionDate: '2026-09-28',
    latestTransactionDetails: {
      date: '28 Sep 2026',
      unitType: '3-Bedroom Premium (980 sqft)',
      floorRange: '#14-08',
      psf: 2620,
      quantum: 2567600
    }
  },
  {
    refPeriod: '0926',
    project: 'NORWOOD GRAND',
    street: 'CHAMPIONS WAY',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '25',
    developer: 'CITY DEVELOPMENTS LIMITED',
    unitsSold: 38,
    unitsLaunched: 50,
    totalUnits: 348,
    cumulativeUnitsLaunched: 348,
    cumulativeUnitsSold: 295,
    unsoldUnits: 53,
    medianPrice: 2060,
    lowestPrice: 1940,
    highestPrice: 2280,
    latestTransactionDate: '2026-09-29',
    latestTransactionDetails: {
      date: '29 Sep 2026',
      unitType: '2-Bedroom Deluxe (689 sqft)',
      floorRange: '#08-12',
      psf: 2080,
      quantum: 1433120
    }
  },
  {
    refPeriod: '0926',
    project: 'MEYER BLUE',
    street: 'MEYER ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'UOL GROUP & SINGAPORE LAND GROUP',
    unitsSold: 26,
    unitsLaunched: 30,
    totalUnits: 226,
    cumulativeUnitsLaunched: 226,
    cumulativeUnitsSold: 168,
    unsoldUnits: 58,
    medianPrice: 3260,
    lowestPrice: 2980,
    highestPrice: 3580,
    latestTransactionDate: '2026-09-27',
    latestTransactionDetails: {
      date: '27 Sep 2026',
      unitType: '3-Bedroom Sea Facing (1,141 sqft)',
      floorRange: '#19-02',
      psf: 3310,
      quantum: 3776710
    }
  },
  {
    refPeriod: '0926',
    project: 'GRAND DUNMAN',
    street: 'DUNMAN ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'SINGHAIYI GROUP & CSC LAND GROUP',
    unitsSold: 19,
    unitsLaunched: 0,
    totalUnits: 1008,
    cumulativeUnitsLaunched: 1008,
    cumulativeUnitsSold: 742,
    unsoldUnits: 266,
    medianPrice: 2540,
    lowestPrice: 2390,
    highestPrice: 2790,
    latestTransactionDate: '2026-09-25',
    latestTransactionDetails: {
      date: '25 Sep 2026',
      unitType: '2-Bedroom (721 sqft)',
      floorRange: '#11-15',
      psf: 2580,
      quantum: 1860180
    }
  },
  {
    refPeriod: '0926',
    project: 'THE CONTINUUM',
    street: 'THIAM SIEW AVENUE',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'HOI HUP REALTY & SUNWAY DEVELOPMENTS',
    unitsSold: 15,
    unitsLaunched: 0,
    totalUnits: 816,
    cumulativeUnitsLaunched: 816,
    cumulativeUnitsSold: 498,
    unsoldUnits: 318,
    medianPrice: 2740,
    lowestPrice: 2550,
    highestPrice: 2980,
    latestTransactionDate: '2026-09-24',
    latestTransactionDetails: {
      date: '24 Sep 2026',
      unitType: '3-Bedroom (1,066 sqft)',
      floorRange: '#09-04',
      psf: 2760,
      quantum: 2942160
    }
  },
  {
    refPeriod: '0926',
    project: 'LENTOR MANSION',
    street: 'LENTOR GARDENS',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '26',
    developer: 'GUOCOLAND & HONG LEONG HOLDINGS',
    unitsSold: 21,
    unitsLaunched: 0,
    totalUnits: 533,
    cumulativeUnitsLaunched: 533,
    cumulativeUnitsSold: 462,
    unsoldUnits: 71,
    medianPrice: 2280,
    lowestPrice: 2150,
    highestPrice: 2480,
    latestTransactionDate: '2026-09-26',
    latestTransactionDetails: {
      date: '26 Sep 2026',
      unitType: '3-Bedroom (1,023 sqft)',
      floorRange: '#12-06',
      psf: 2310,
      quantum: 2363130
    }
  },
  {
    refPeriod: '0926',
    project: 'HILLOCK GREEN',
    street: 'LENTOR CENTRAL',
    marketSegment: 'OCR',
    propertyType: 'Apartment',
    district: '26',
    developer: 'FORLORN PEAK PTE LTD / SOILBUILD GROUP',
    unitsSold: 12,
    unitsLaunched: 0,
    totalUnits: 474,
    cumulativeUnitsLaunched: 474,
    cumulativeUnitsSold: 284,
    unsoldUnits: 190,
    medianPrice: 2160,
    lowestPrice: 2020,
    highestPrice: 2320,
    latestTransactionDate: '2026-09-21',
    latestTransactionDetails: {
      date: '21 Sep 2026',
      unitType: '2-Bedroom (689 sqft)',
      floorRange: '#07-03',
      psf: 2180,
      quantum: 1502020
    }
  },
  {
    refPeriod: '0926',
    project: 'LENTOR HILLS RESIDENCES',
    street: 'LENTOR HILLS ROAD',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '26',
    developer: 'HONG LEONG, GUOCOLAND & TID RESIDENTIAL',
    unitsSold: 9,
    unitsLaunched: 0,
    totalUnits: 598,
    cumulativeUnitsLaunched: 598,
    cumulativeUnitsSold: 562,
    unsoldUnits: 36,
    medianPrice: 2120,
    lowestPrice: 1980,
    highestPrice: 2290,
    latestTransactionDate: '2026-09-19',
    latestTransactionDetails: {
      date: '19 Sep 2026',
      unitType: '3-Bedroom (958 sqft)',
      floorRange: '#15-11',
      psf: 2150,
      quantum: 2059700
    }
  },
  {
    refPeriod: '0926',
    project: 'TEMBUSU GRAND',
    street: 'TANJONG KATONG ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'CDL & MCL LAND',
    unitsSold: 14,
    unitsLaunched: 0,
    totalUnits: 638,
    cumulativeUnitsLaunched: 638,
    cumulativeUnitsSold: 465,
    unsoldUnits: 173,
    medianPrice: 2470,
    lowestPrice: 2310,
    highestPrice: 2680,
    latestTransactionDate: '2026-09-22',
    latestTransactionDetails: {
      date: '22 Sep 2026',
      unitType: '2-Bed + Study (743 sqft)',
      floorRange: '#16-08',
      psf: 2490,
      quantum: 1850070
    }
  },
  {
    refPeriod: '0926',
    project: 'PINETREE HILL',
    street: 'PINE GROVE',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '21',
    developer: 'UOL GROUP & SINGAPORE LAND GROUP',
    unitsSold: 11,
    unitsLaunched: 0,
    totalUnits: 520,
    cumulativeUnitsLaunched: 520,
    cumulativeUnitsSold: 278,
    unsoldUnits: 242,
    medianPrice: 2420,
    lowestPrice: 2290,
    highestPrice: 2620,
    latestTransactionDate: '2026-09-20',
    latestTransactionDetails: {
      date: '20 Sep 2026',
      unitType: '3-Bedroom (969 sqft)',
      floorRange: '#10-05',
      psf: 2440,
      quantum: 2364360
    }
  },
  {
    refPeriod: '0926',
    project: 'HILLHAVEN',
    street: 'HILLVIEW RISE',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '23',
    developer: 'FAR EAST ORGANIZATION & SEKISUI HOUSE',
    unitsSold: 8,
    unitsLaunched: 0,
    totalUnits: 341,
    cumulativeUnitsLaunched: 341,
    cumulativeUnitsSold: 164,
    unsoldUnits: 177,
    medianPrice: 2090,
    lowestPrice: 1960,
    highestPrice: 2240,
    latestTransactionDate: '2026-09-18',
    latestTransactionDetails: {
      date: '18 Sep 2026',
      unitType: '2-Bedroom (678 sqft)',
      floorRange: '#06-02',
      psf: 2110,
      quantum: 1430580
    }
  },
  {
    refPeriod: '0926',
    project: 'J\'DEN',
    street: 'JURONG EAST CENTRAL 1',
    marketSegment: 'OCR',
    propertyType: 'Apartment',
    district: '22',
    developer: 'CAPITALAND DEVELOPMENT',
    unitsSold: 4,
    unitsLaunched: 0,
    totalUnits: 368,
    cumulativeUnitsLaunched: 368,
    cumulativeUnitsSold: 364,
    unsoldUnits: 4,
    medianPrice: 2610,
    lowestPrice: 2450,
    highestPrice: 2780,
    latestTransactionDate: '2026-09-05',
    latestTransactionDetails: {
      date: '05 Sep 2026',
      unitType: '3-Bedroom (1,076 sqft)',
      floorRange: '#28-01',
      psf: 2640,
      quantum: 2840640
    }
  },
  {
    refPeriod: '0926',
    project: 'NEWPORT RESIDENCES',
    street: 'ANSON ROAD',
    marketSegment: 'CCR',
    propertyType: 'Apartment',
    district: '02',
    developer: 'CITY DEVELOPMENTS LIMITED',
    unitsSold: 7,
    unitsLaunched: 20,
    totalUnits: 246,
    cumulativeUnitsLaunched: 120,
    cumulativeUnitsSold: 64,
    unsoldUnits: 182,
    medianPrice: 3820,
    lowestPrice: 3490,
    highestPrice: 4320,
    latestTransactionDate: '2026-09-23',
    latestTransactionDetails: {
      date: '23 Sep 2026',
      unitType: '2-Bedroom (818 sqft)',
      floorRange: '#34-03',
      psf: 3890,
      quantum: 3182020
    }
  },
  {
    refPeriod: '0926',
    project: 'MARINA VIEW RESIDENCES',
    street: 'MARINA VIEW',
    marketSegment: 'CCR',
    propertyType: 'Condominium',
    district: '01',
    developer: 'IOI PROPERTIES GROUP',
    unitsSold: 11,
    unitsLaunched: 40,
    totalUnits: 683,
    cumulativeUnitsLaunched: 280,
    cumulativeUnitsSold: 112,
    unsoldUnits: 571,
    medianPrice: 3950,
    lowestPrice: 3600,
    highestPrice: 4680,
    latestTransactionDate: '2026-09-26',
    latestTransactionDetails: {
      date: '26 Sep 2026',
      unitType: '2-Bedroom (786 sqft)',
      floorRange: '#42-07',
      psf: 4020,
      quantum: 3159720
    }
  },
  {
    refPeriod: '0926',
    project: '19 NASSIM',
    street: 'NASSIM HILL',
    marketSegment: 'CCR',
    propertyType: 'Condominium',
    district: '10',
    developer: 'KEPPEL LAND',
    unitsSold: 3,
    unitsLaunched: 0,
    totalUnits: 101,
    cumulativeUnitsLaunched: 101,
    cumulativeUnitsSold: 61,
    unsoldUnits: 40,
    medianPrice: 4210,
    lowestPrice: 3880,
    highestPrice: 4790,
    latestTransactionDate: '2026-09-14',
    latestTransactionDetails: {
      date: '14 Sep 2026',
      unitType: '1-Bedroom (538 sqft)',
      floorRange: '#08-01',
      psf: 4280,
      quantum: 2302640
    }
  },
  {
    refPeriod: '0926',
    project: 'BLOSSOMS BY THE PARK',
    street: 'SLIM BARRACKS RISE',
    marketSegment: 'RCR',
    propertyType: 'Apartment',
    district: '05',
    developer: 'EL DEVELOPMENT',
    unitsSold: 5,
    unitsLaunched: 0,
    totalUnits: 275,
    cumulativeUnitsLaunched: 275,
    cumulativeUnitsSold: 258,
    unsoldUnits: 17,
    medianPrice: 2510,
    lowestPrice: 2360,
    highestPrice: 2720,
    latestTransactionDate: '2026-09-12',
    latestTransactionDetails: {
      date: '12 Sep 2026',
      unitType: '2-Bedroom (678 sqft)',
      floorRange: '#18-05',
      psf: 2540,
      quantum: 1722120
    }
  },
  {
    refPeriod: '0926',
    project: 'TERRA HILL',
    street: 'YEW SIANG ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '05',
    developer: 'HOI HUP REALTY & SUNWAY DEVELOPMENTS',
    unitsSold: 6,
    unitsLaunched: 0,
    totalUnits: 270,
    cumulativeUnitsLaunched: 270,
    cumulativeUnitsSold: 142,
    unsoldUnits: 128,
    medianPrice: 2680,
    lowestPrice: 2480,
    highestPrice: 2890,
    latestTransactionDate: '2026-09-16',
    latestTransactionDetails: {
      date: '16 Sep 2026',
      unitType: '3-Bedroom (1,087 sqft)',
      floorRange: '#04-12',
      psf: 2710,
      quantum: 2945770
    }
  },
  {
    refPeriod: '0926',
    project: 'AURELLE OF TAMPINES',
    street: 'TAMPINES STREET 62',
    marketSegment: 'OCR',
    propertyType: 'Executive Condominium',
    district: '18',
    developer: 'SIM LIAN LAND & SIM LIAN DEVELOPMENT',
    unitsSold: 54,
    unitsLaunched: 76,
    totalUnits: 760,
    cumulativeUnitsLaunched: 760,
    cumulativeUnitsSold: 712,
    unsoldUnits: 48,
    medianPrice: 1540,
    lowestPrice: 1430,
    highestPrice: 1680,
    latestTransactionDate: '2026-09-30',
    latestTransactionDetails: {
      date: '30 Sep 2026',
      unitType: '3-Bedroom Premium EC (947 sqft)',
      floorRange: '#09-14',
      psf: 1560,
      quantum: 1477320
    }
  },
  {
    refPeriod: '0926',
    project: 'LUMINA GRAND',
    street: 'BUKIT BATOK WEST AVENUE 5',
    marketSegment: 'OCR',
    propertyType: 'Executive Condominium',
    district: '23',
    developer: 'CITY DEVELOPMENTS LIMITED',
    unitsSold: 18,
    unitsLaunched: 0,
    totalUnits: 512,
    cumulativeUnitsLaunched: 512,
    cumulativeUnitsSold: 494,
    unsoldUnits: 18,
    medianPrice: 1490,
    lowestPrice: 1390,
    highestPrice: 1610,
    latestTransactionDate: '2026-09-22',
    latestTransactionDetails: {
      date: '22 Sep 2026',
      unitType: '3-Bedroom EC (980 sqft)',
      floorRange: '#11-08',
      psf: 1510,
      quantum: 1479800
    }
  },

  // Period: 0826 (August 2026)
  {
    refPeriod: '0826',
    project: 'CHUAN PARK',
    street: 'LORONG CHUAN',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '19',
    developer: 'KINGSFORD DEVELOPMENT & MCC LAND',
    unitsSold: 78,
    unitsLaunched: 100,
    totalUnits: 916,
    cumulativeUnitsLaunched: 790,
    cumulativeUnitsSold: 642,
    unsoldUnits: 274,
    medianPrice: 2570,
    lowestPrice: 2360,
    highestPrice: 2850,
    latestTransactionDate: '2026-08-30',
    latestTransactionDetails: {
      date: '30 Aug 2026',
      unitType: '2-Bedroom + Study (732 sqft)',
      floorRange: '#12-05',
      psf: 2590,
      quantum: 1895880
    }
  },
  {
    refPeriod: '0826',
    project: 'NORWOOD GRAND',
    street: 'CHAMPIONS WAY',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '25',
    developer: 'CITY DEVELOPMENTS LIMITED',
    unitsSold: 84,
    unitsLaunched: 120,
    totalUnits: 348,
    cumulativeUnitsLaunched: 298,
    cumulativeUnitsSold: 257,
    unsoldUnits: 91,
    medianPrice: 2050,
    lowestPrice: 1920,
    highestPrice: 2260,
    latestTransactionDate: '2026-08-31',
    latestTransactionDetails: {
      date: '31 Aug 2026',
      unitType: '3-Bedroom (904 sqft)',
      floorRange: '#06-08',
      psf: 2060,
      quantum: 1862240
    }
  },
  {
    refPeriod: '0826',
    project: 'GRAND DUNMAN',
    street: 'DUNMAN ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'SINGHAIYI GROUP & CSC LAND GROUP',
    unitsSold: 23,
    unitsLaunched: 0,
    totalUnits: 1008,
    cumulativeUnitsLaunched: 1008,
    cumulativeUnitsSold: 723,
    unsoldUnits: 285,
    medianPrice: 2520,
    lowestPrice: 2380,
    highestPrice: 2750,
    latestTransactionDate: '2026-08-28',
    latestTransactionDetails: {
      date: '28 Aug 2026',
      unitType: '1-Bedroom + Study (549 sqft)',
      floorRange: '#15-02',
      psf: 2540,
      quantum: 1394460
    }
  },

  // Period: 0924 (September 2024 historical reference)
  {
    refPeriod: '0924',
    project: 'HILLOCK GREEN',
    street: 'LENTOR CENTRAL',
    marketSegment: 'OCR',
    propertyType: 'Apartment',
    district: '26',
    developer: 'FORLORN PEAK PTE LTD / SOILBUILD GROUP',
    unitsSold: 14,
    unitsLaunched: 0,
    totalUnits: 474,
    cumulativeUnitsLaunched: 474,
    cumulativeUnitsSold: 178,
    unsoldUnits: 296,
    medianPrice: 2128,
    lowestPrice: 1994,
    highestPrice: 2318,
    latestTransactionDate: '2024-09-27',
    latestTransactionDetails: {
      date: '27 Sep 2024',
      unitType: '2-Bedroom (710 sqft)',
      floorRange: '#09-04',
      psf: 2140,
      quantum: 1519400
    }
  },
  {
    refPeriod: '0924',
    project: 'GRAND DUNMAN',
    street: 'DUNMAN ROAD',
    marketSegment: 'RCR',
    propertyType: 'Condominium',
    district: '15',
    developer: 'SINGHAIYI GROUP & CSC LAND GROUP',
    unitsSold: 31,
    unitsLaunched: 0,
    totalUnits: 1008,
    cumulativeUnitsLaunched: 1008,
    cumulativeUnitsSold: 615,
    unsoldUnits: 393,
    medianPrice: 2512,
    lowestPrice: 2345,
    highestPrice: 2740,
    latestTransactionDate: '2024-09-29',
    latestTransactionDetails: {
      date: '29 Sep 2024',
      unitType: '3-Bedroom (980 sqft)',
      floorRange: '#14-10',
      psf: 2530,
      quantum: 2479400
    }
  },
  {
    refPeriod: '0924',
    project: 'LENTOR MANSION',
    street: 'LENTOR GARDENS',
    marketSegment: 'OCR',
    propertyType: 'Condominium',
    district: '26',
    developer: 'GUOCOLAND & HONG LEONG HOLDINGS',
    unitsSold: 28,
    unitsLaunched: 0,
    totalUnits: 533,
    cumulativeUnitsLaunched: 533,
    cumulativeUnitsSold: 390,
    unsoldUnits: 143,
    medianPrice: 2265,
    lowestPrice: 2120,
    highestPrice: 2440,
    latestTransactionDate: '2024-09-28',
    latestTransactionDetails: {
      date: '28 Sep 2024',
      unitType: '2-Bedroom (657 sqft)',
      floorRange: '#08-03',
      psf: 2280,
      quantum: 1497960
    }
  }
];

export const DISTRICT_MAP: Record<string, string> = {
  '01': 'Raffles Place, Marina Bay, Suntec',
  '02': 'Tanjong Pagar, Anson, Chinatown',
  '03': 'Queenstown, Tiong Bahru, Alexandra',
  '04': 'Harbourfront, Telok Blangah, Sentosa',
  '05': 'Buona Vista, West Coast, Clementi',
  '06': 'City Hall, High Street, North Bridge',
  '07': 'Bugis, Beach Road, Rochor',
  '08': 'Little India, Farrer Park',
  '09': 'Orchard, Cairnhill, River Valley',
  '10': 'Ardmore, Bukit Timah, Holland, Tanglin',
  '11': 'Novena, Newton, Thomson',
  '12': 'Toa Payoh, Balestier',
  '13': 'Macpherson, Braddell',
  '14': 'Geylang, Paya Lebar, Eunos',
  '15': 'Marine Parade, Katong, Tanjong Rhu, East Coast',
  '16': 'Bedok, Upper East Coast, Bayshore',
  '17': 'Loyang, Changi',
  '18': 'Tampines, Pasir Ris',
  '19': 'Serangoon, Hougang, Punggol, Sengkang',
  '20': 'Bishan, Ang Mo Kio',
  '21': 'Upper Bukit Timah, Clementi Park, Ulu Pandan',
  '22': 'Jurong, Boon Lay, Tuas',
  '23': 'Hillview, Bukit Panjang, Bukit Batok',
  '24': 'Kranji, Lim Chu Kang',
  '25': 'Woodlands, Admiralty',
  '26': 'Lentor, Mandai, Upper Thomson',
  '27': 'Yishun, Sembawang',
  '28': 'Seletar, Yio Chu Kang'
};

export function formatRefPeriod(refPeriod: string): string {
  if (!refPeriod || refPeriod.length !== 4) return refPeriod || 'Unknown Period';
  const month = refPeriod.slice(0, 2);
  const year = '20' + refPeriod.slice(2, 4);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const mIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[mIndex] || month;
  return `${monthName} ${year}`;
}

export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '-';
  // If YYYY-MM-DD
  if (dateStr.includes('-') && dateStr.length === 10) {
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parts[2];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNames[month - 1] || parts[1]} ${year}`;
  }
  return dateStr;
}

export function parseRawUraRecord(raw: any, defaultPeriod = '0926'): DeveloperSalesRecord {
  const parseNum = (val: any, fallback = 0): number => {
    if (val === undefined || val === null) return fallback;
    const n = Number(String(val).replace(/,/g, '').trim());
    return isNaN(n) ? fallback : n;
  };

  const segment: MarketSegment =
    raw.marketSegment === 'CCR' || raw.marketSegment === 'RCR' || raw.marketSegment === 'OCR'
      ? raw.marketSegment
      : 'RCR';

  const propType =
    raw.propertyType === 'Apartment' || raw.propertyType === 'Executive Condominium'
      ? raw.propertyType
      : 'Condominium';

  const period = String(raw.refPeriod || defaultPeriod);

  // Derive latest transaction date if available from URA raw record
  let latestDate = raw.latestTransactionDate || raw.contractDate;
  if (!latestDate && period && period.length === 4) {
    // If not provided in raw response, calculate the period end or month return date
    const month = period.slice(0, 2);
    const year = '20' + period.slice(2, 4);
    latestDate = `${year}-${month}-28`;
  }

  const medianPsf = parseNum(raw.medianPrice);
  const unitsSold = parseNum(raw.unitsSold);

  return {
    refPeriod: period,
    project: String(raw.project || 'UNKNOWN PROJECT').toUpperCase(),
    street: String(raw.street || 'SINGAPORE').toUpperCase(),
    marketSegment: segment,
    propertyType: propType,
    district: String(raw.district || '00').padStart(2, '0'),
    developer: String(raw.developer || 'N/A').toUpperCase(),
    unitsSold,
    unitsLaunched: parseNum(raw.unitsLaunched),
    totalUnits: parseNum(raw.totalUnits),
    cumulativeUnitsLaunched: parseNum(raw.cumulativeUnitsLaunched),
    cumulativeUnitsSold: parseNum(raw.cumulativeUnitsSold),
    unsoldUnits: parseNum(raw.unsoldUnits),
    medianPrice: medianPsf,
    lowestPrice: parseNum(raw.lowestPrice),
    highestPrice: parseNum(raw.highestPrice),
    estimatedMonthlySalesValue: unitsSold * 850 * medianPsf,
    latestTransactionDate: latestDate,
    latestTransactionDetails: {
      date: formatDisplayDate(latestDate),
      psf: medianPsf,
      quantum: Math.round(medianPsf * 850)
    }
  };
}
