export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  region: string;
  country: string;
}

export interface Collector {
  id: string;
  name: string;
  type: 'farmer' | 'wild_collector';
  location: Location;
  certifications: string[];
  registrationDate: Date;
  contactInfo: {
    phone: string;
    email: string;
  };
}

export interface HerbCollection {
  id: string;
  collectorId: string;
  herbName: string;
  botanicalName: string;
  quantity: number;
  unit: 'kg' | 'grams' | 'tons';
  collectionDate: Date;
  location: Location;
  harvestMethod: string;
  qualityGrade: 'A' | 'B' | 'C';
  photos: string[];
  blockchainHash: string;
  timestamp: Date;
}

export interface ProcessingStage {
  id: string;
  collectionId: string;
  stage: 'drying' | 'cleaning' | 'testing' | 'storage' | 'manufacturing';
  processorName: string;
  location: Location;
  startDate: Date;
  endDate?: Date;
  parameters: Record<string, any>;
  qualityTests?: QualityTest[];
  blockchainHash: string;
}

export interface QualityTest {
  id: string;
  testType: string;
  testDate: Date;
  results: Record<string, any>;
  passed: boolean;
  certificationBody: string;
  certificateNumber?: string;
}

export interface Formulation {
  id: string;
  productName: string;
  batchNumber: string;
  ingredients: {
    collectionId: string;
    herbName: string;
    percentage: number;
    quantity: number;
  }[];
  manufacturingDate: Date;
  expiryDate: Date;
  manufacturer: string;
  location: Location;
  qrCode: string;
  blockchainHash: string;
}

export interface TraceabilityRecord {
  productId: string;
  chain: {
    collection: HerbCollection;
    processing: ProcessingStage[];
    formulation: Formulation;
  }[];
}