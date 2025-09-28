export interface BlockchainTransaction {
  txId: string;
  blockNumber: number;
  timestamp: Date;
  hash: string;
  previousHash: string;
  merkleRoot: string;
  validator: string;
  gasUsed?: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface IPFSDocument {
  cid: string; // Content Identifier
  filename: string;
  size: number;
  mimeType: string;
  uploadDate: Date;
  pinned: boolean;
  gateway: string;
}

export interface DigitalSignature {
  signature: string;
  publicKey: string;
  algorithm: 'RSA-SHA256' | 'ECDSA-SHA256';
  timestamp: Date;
  verified: boolean;
}

export interface CollectionEvent {
  collectionID: string;
  cropSpeciesID: string;
  geoLat: number;
  geoLon: number;
  timestamp: Date;
  quantity: number;
  unit: 'kg' | 'grams' | 'tons';
  collectorID: string;
  photoCID: string; // IPFS Content ID
  certificateCID?: string;
  digitalSignature: DigitalSignature;
  blockchainTx: BlockchainTransaction;
  qualityGrade: 'A' | 'B' | 'C';
  harvestMethod: string;
  weatherConditions?: {
    temperature: number;
    humidity: number;
    rainfall: number;
  };
}

export interface AggregateLot {
  lotID: string;
  collectionIDs: string[];
  aggregatorID: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  photoCID: string;
  totalQuantity: number;
  averageQuality: string;
  blockchainTx: BlockchainTransaction;
  qrCode: string;
}

export interface ProcessingEvent {
  processID: string;
  lotID: string;
  manufacturerID: string;
  processType: 'drying' | 'cleaning' | 'testing' | 'storage' | 'manufacturing';
  timestamp: Date;
  parameters: Record<string, any>;
  testReportCID?: string;
  blockchainTx: BlockchainTransaction;
  certificationBody?: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';
}

export interface TestReport {
  reportID: string;
  labID: string;
  lotID: string;
  reportCID: string; // IPFS hash of full report
  resultSummary: {
    moistureContent: number;
    heavyMetals: 'pass' | 'fail';
    pesticideResidue: 'pass' | 'fail';
    microbialCount: number;
    activeCompounds: Record<string, number>;
  };
  certificationNumber: string;
  blockchainTx: BlockchainTransaction;
  accreditation: string;
}

export interface TransportEvent {
  transportID: string;
  from: string;
  to: string;
  carrierID: string;
  timestamp: Date;
  locationProofCID: string;
  temperature?: number;
  humidity?: number;
  blockchainTx: BlockchainTransaction;
  vehicleDetails: {
    licensePlate: string;
    driverID: string;
    gpsTrackingID: string;
  };
}

export interface FormulationEvent {
  batchID: string;
  finalProductID: string;
  inputLotIDs: string[];
  manufacturerID: string;
  timestamp: Date;
  batchQuantity: number;
  formulationRecipe: {
    ingredients: Array<{
      lotID: string;
      percentage: number;
      quantity: number;
    }>;
  };
  blockchainTx: BlockchainTransaction;
  ayushLicense: string;
  gmpCertification: string;
}

export interface LabelMint {
  finalProductID: string;
  batchID: string;
  qrHash: string;
  labelURI: string;
  mintTimestamp: Date;
  blockchainTx: BlockchainTransaction;
  regulatoryApproval: {
    ayushApprovalNumber: string;
    approvalDate: Date;
    expiryDate: Date;
  };
}

export interface IdentityCertificate {
  certificateID: string;
  subjectDN: string;
  issuerDN: string;
  publicKey: string;
  validFrom: Date;
  validTo: Date;
  serialNumber: string;
  fingerprint: string;
  status: 'active' | 'revoked' | 'expired';
  organizationUnit: string;
  role: 'collector' | 'aggregator' | 'manufacturer' | 'lab' | 'regulator';
}

export interface AuditTrail {
  eventID: string;
  entityType: string;
  entityID: string;
  action: 'create' | 'update' | 'delete' | 'view';
  userID: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  blockchainTx?: BlockchainTransaction;
  dataHash: string;
  previousDataHash?: string;
}