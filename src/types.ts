export interface ArsenicRecord {
  id: string;
  name: string;
  lat: number;
  lng: number;
  concentration: number; // µg/L
  date: string;
  source: 'CGWB' | 'PHED' | 'NRDWP' | 'USER_UNVERIFIED';
  confidence: number;
  bioremediation?: {
    plantType: 'Pteris vittata' | 'Vetiveria zizanioides' | 'Hydrilla verticillata';
    distance: number; // km
  };
}

export interface DistrictData {
  name: string;
  avgConcentration: number;
  riskLevel: 'Safe' | 'Moderate' | 'High';
  populationAtRisk: number;
  center: [number, number];
}

export const WEST_BENGAL_DISTRICTS: DistrictData[] = [
  { name: "Nadia", avgConcentration: 75, riskLevel: 'High', populationAtRisk: 1200000, center: [23.4733, 88.518] },
  { name: "Murshidabad", avgConcentration: 85, riskLevel: 'High', populationAtRisk: 1500000, center: [24.175, 88.28] },
  { name: "North 24 Parganas", avgConcentration: 45, riskLevel: 'Moderate', populationAtRisk: 900000, center: [22.75, 88.5] },
  { name: "South 24 Parganas", avgConcentration: 55, riskLevel: 'High', populationAtRisk: 1100000, center: [22.0, 88.5] },
  { name: "Malda", avgConcentration: 65, riskLevel: 'High', populationAtRisk: 800000, center: [25.0108, 88.1411] },
  { name: "Bardhaman", avgConcentration: 12, riskLevel: 'Moderate', populationAtRisk: 300000, center: [23.2324, 87.8615] },
  { name: "Howrah", avgConcentration: 8, riskLevel: 'Safe', populationAtRisk: 50000, center: [22.5958, 88.2636] },
  { name: "Kolkata", avgConcentration: 5, riskLevel: 'Safe', populationAtRisk: 10000, center: [22.5726, 88.3639] }
];

export const MOCK_RECORDS: ArsenicRecord[] = [
  { 
    id: '1', 
    name: 'Beldanga Block-I', 
    lat: 23.9533, 
    lng: 88.2418, 
    concentration: 142, 
    date: '2026-04-15', 
    source: 'CGWB', 
    confidence: 0.95,
    bioremediation: { plantType: 'Pteris vittata', distance: 2.1 }
  },
  { 
    id: '2', 
    name: 'Ranaghat South', 
    lat: 23.175, 
    lng: 88.58, 
    concentration: 88, 
    date: '2026-04-20', 
    source: 'PHED', 
    confidence: 0.88,
    bioremediation: { plantType: 'Vetiveria zizanioides', distance: 1.4 }
  },
  { 
    id: '3', 
    name: 'Kalyani Tech-Park', 
    lat: 22.9726, 
    lng: 88.4339, 
    concentration: 6, 
    date: '2026-01-10', 
    source: 'NRDWP', 
    confidence: 0.92 
  },
  { 
    id: '4', 
    name: 'Malda Center', 
    lat: 25.0108, 
    lng: 88.1411, 
    concentration: 112, 
    date: '2026-03-05', 
    source: 'CGWB', 
    confidence: 0.90,
    bioremediation: { plantType: 'Hydrilla verticillata', distance: 3.8 }
  },
  {
    id: '5',
    name: 'Nabadwip Ghat',
    lat: 23.41,
    lng: 88.37,
    concentration: 165,
    date: '2026-04-22',
    source: 'PHED',
    confidence: 0.94,
    bioremediation: { plantType: 'Pteris vittata', distance: 0.8 }
  }
];
