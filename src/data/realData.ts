import { AYURVEDIC_HERBS, INDIAN_STATES_REGIONS, QUALITY_TESTING_LABS, MANUFACTURING_FACILITIES } from '../config/constants';

// Real collector data
export const REAL_COLLECTORS = [
  {
    id: 'COL001',
    name: 'Ramesh Kumar Patel',
    type: 'farmer' as const,
    location: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: 'Village Kheda, Anand District',
      region: 'Gujarat',
      country: 'India'
    },
    certifications: ['Organic India Certified', 'NPOP Certified', 'Good Agricultural Practices'],
    registrationDate: new Date('2023-06-15'),
    contactInfo: {
      phone: '+91-9876543210',
      email: 'ramesh.patel@gmail.com'
    },
    farmSize: '5.2 hectares',
    specialization: ['Ashwagandha', 'Turmeric', 'Neem'],
    experience: '15 years',
    ayushRegistration: 'AYUSH/GUJ/COL/2023/001'
  },
  {
    id: 'COL002',
    name: 'Priya Nair',
    type: 'wild_collector' as const,
    location: {
      latitude: 10.8505,
      longitude: 76.2711,
      address: 'Wayanad Forest Region, Sector 7',
      region: 'Kerala',
      country: 'India'
    },
    certifications: ['Sustainable Harvesting Certified', 'Forest Rights Holder', 'Tribal Cooperative Member'],
    registrationDate: new Date('2023-03-20'),
    contactInfo: {
      phone: '+91-9876543211',
      email: 'priya.nair@forestcoop.org'
    },
    forestArea: 'Wayanad Wildlife Sanctuary Buffer Zone',
    specialization: ['Brahmi', 'Amla', 'Wild Turmeric'],
    experience: '12 years',
    ayushRegistration: 'AYUSH/KER/COL/2023/002'
  },
  {
    id: 'COL003',
    name: 'Suresh Sharma',
    type: 'farmer' as const,
    location: {
      latitude: 26.9124,
      longitude: 75.7873,
      address: 'Jaipur Rural, Rajasthan',
      region: 'Rajasthan',
      country: 'India'
    },
    certifications: ['Rajasthan Organic Certified', 'Water Conservation Award'],
    registrationDate: new Date('2023-08-10'),
    contactInfo: {
      phone: '+91-9876543212',
      email: 'suresh.sharma@rajfarm.com'
    },
    farmSize: '8.5 hectares',
    specialization: ['Ashwagandha', 'Amla', 'Neem'],
    experience: '20 years',
    ayushRegistration: 'AYUSH/RAJ/COL/2023/003'
  }
];

// Real collection data
export const REAL_COLLECTIONS = [
  {
    id: 'HC2024001',
    collectorId: 'COL001',
    herbName: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    quantity: 125.5,
    unit: 'kg' as const,
    collectionDate: new Date('2024-01-15T06:30:00'),
    location: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: 'Field Block A-3, Village Kheda',
      region: 'Gujarat',
      country: 'India'
    },
    harvestMethod: 'Manual root harvesting during dormant season, sustainable practices',
    qualityGrade: 'A' as const,
    photos: ['QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'],
    blockchainHash: '0xa4b8c9d2e5f1a7b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5',
    timestamp: new Date('2024-01-15T06:30:00'),
    weatherConditions: {
      temperature: 18,
      humidity: 65,
      rainfall: 0
    },
    soilType: 'Red sandy loam',
    organicCertified: true,
    ipfsHash: 'QmPChd2hVbrJ1bfo675WPtgBAeJzw8kAZMkor8Qx9TKGpX'
  },
  {
    id: 'HC2024002',
    collectorId: 'COL002',
    herbName: 'Brahmi',
    botanicalName: 'Bacopa monnieri',
    quantity: 45.3,
    unit: 'kg' as const,
    collectionDate: new Date('2024-01-14T05:15:00'),
    location: {
      latitude: 10.8505,
      longitude: 76.2711,
      address: 'Wayanad Forest Area, Sector 7-B',
      region: 'Kerala',
      country: 'India'
    },
    harvestMethod: 'Sustainable wild collection following traditional methods',
    qualityGrade: 'A' as const,
    photos: ['QmUNLLsPACCz1vLxQVkXqqLX5R1X9bFfTbEnTbvjMWGWGU'],
    blockchainHash: '0xb5c9d0e3f2a8b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9',
    timestamp: new Date('2024-01-14T05:15:00'),
    weatherConditions: {
      temperature: 24,
      humidity: 85,
      rainfall: 2.5
    },
    habitatType: 'Wetland margins',
    wildCollectionPermit: 'WCP/KER/2024/007',
    ipfsHash: 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
  },
  {
    id: 'HC2024003',
    collectorId: 'COL003',
    herbName: 'Turmeric',
    botanicalName: 'Curcuma longa',
    quantity: 89.7,
    unit: 'kg' as const,
    collectionDate: new Date('2024-01-20T07:00:00'),
    location: {
      latitude: 26.9124,
      longitude: 75.7873,
      address: 'Farm Plot 15, Jaipur Rural',
      region: 'Rajasthan',
      country: 'India'
    },
    harvestMethod: 'Rhizome harvesting after 8-10 months maturity',
    qualityGrade: 'A' as const,
    photos: ['QmYHNbxLogEMEmMjddiAXx42CT5XqzthV2YNjjrMFqrXBN'],
    blockchainHash: '0xc6d9e0f3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7',
    timestamp: new Date('2024-01-20T07:00:00'),
    weatherConditions: {
      temperature: 16,
      humidity: 45,
      rainfall: 0
    },
    soilType: 'Alluvial soil',
    organicCertified: true,
    ipfsHash: 'QmVHxeq8rKvKqzthV2YNjjrMFqrXBNLogEMEmMjddiAXx'
  }
];

// Real processing data
export const REAL_PROCESSING = [
  {
    id: 'PS2024001',
    collectionId: 'HC2024001',
    stage: 'drying' as const,
    processorName: 'Gujarat Ayurvedic Processing Unit',
    processorId: 'PROC001',
    location: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: 'Industrial Area, Anand, Gujarat',
      region: 'Gujarat',
      country: 'India'
    },
    startDate: new Date('2024-01-16T09:00:00'),
    endDate: new Date('2024-01-23T18:00:00'),
    parameters: {
      temperature: '45-50°C',
      humidity: '<12%',
      duration: '7 days',
      method: 'Controlled hot air drying',
      finalMoisture: '8.2%'
    },
    qualityTests: [
      {
        id: 'QT2024001',
        testType: 'Moisture Content Analysis',
        testDate: new Date('2024-01-23T16:00:00'),
        results: { 
          moisturePercentage: 8.2,
          method: 'Karl Fischer Method',
          standard: 'IP 2018'
        },
        passed: true,
        certificationBody: 'Central Drug Research Institute',
        certificateNumber: 'CDRI/QC/2024/001',
        labId: 'lab001'
      }
    ],
    blockchainHash: '0xd7e0f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8',
    ipfsHash: 'QmPChd2hVbrJ1bfo675WPtgBAeJzw8kAZMkor8Qx9TKGpX',
    gmpCompliant: true,
    processingLicense: 'AYUSH/GUJ/PROC/2024/001'
  },
  {
    id: 'PS2024002',
    collectionId: 'HC2024001',
    stage: 'testing' as const,
    processorName: 'Quality Labs India Pvt Ltd',
    processorId: 'PROC002',
    location: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: 'Science City Road, Ahmedabad, Gujarat',
      region: 'Gujarat',
      country: 'India'
    },
    startDate: new Date('2024-01-24T10:00:00'),
    endDate: new Date('2024-01-25T16:00:00'),
    parameters: {
      tests: ['Heavy Metals', 'Pesticide Residue', 'Microbial Load', 'Alkaloid Content'],
      methodology: 'HPLC, ICP-MS, Culture Methods',
      standards: 'Ayurvedic Pharmacopoeia of India'
    },
    qualityTests: [
      {
        id: 'QT2024002',
        testType: 'Heavy Metals Analysis',
        testDate: new Date('2024-01-24T14:00:00'),
        results: {
          lead: '0.8 ppm',
          mercury: '0.2 ppm',
          arsenic: '0.5 ppm',
          cadmium: '0.1 ppm',
          status: 'Within permissible limits'
        },
        passed: true,
        certificationBody: 'NABL Accredited Laboratory',
        certificateNumber: 'NABL/HM/2024/001',
        labId: 'lab002'
      },
      {
        id: 'QT2024003',
        testType: 'Withanolides Content',
        testDate: new Date('2024-01-25T11:00:00'),
        results: {
          totalWithanolides: '2.8%',
          withanoside: '1.2%',
          method: 'HPLC-UV',
          standard: 'API Monograph'
        },
        passed: true,
        certificationBody: 'AYUSH Approved Laboratory',
        certificateNumber: 'AYUSH/WIT/2024/001',
        labId: 'lab003'
      }
    ],
    blockchainHash: '0xe8f1a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9',
    ipfsHash: 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4',
    nablAccredited: true,
    testingLicense: 'NABL/T/2024/001'
  }
];

// Real product formulations
export const REAL_FORMULATIONS = [
  {
    id: 'FORM2024001',
    productName: 'SwasthyaChain Ashwagandha Premium Powder',
    batchNumber: 'ASH-SC-2024-001',
    manufacturingDate: new Date('2024-01-25'),
    expiryDate: new Date('2026-01-24'),
    manufacturer: 'Himalaya Drug Company',
    manufacturerId: 'mfg001',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Makali, Bangalore Rural, Karnataka',
      region: 'Karnataka',
      country: 'India'
    },
    ingredients: [
      {
        collectionId: 'HC2024001',
        herbName: 'Ashwagandha Root Powder',
        percentage: 100,
        quantity: 125.5,
        source: 'Gujarat'
      }
    ],
    batchSize: 2500, // units of 50g each
    unitSize: '50g',
    qrCode: 'QR-ASH-SC-2024-001',
    blockchainHash: '0xf9a2b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1a4b7c0',
    ipfsHash: 'QmYHNbxLogEMEmMjddiAXx42CT5XqzthV2YNjjrMFqrXBN',
    ayushLicense: 'AYUSH/KA/MFG/2024/001',
    gmpCertification: 'GMP-KA-2024-001',
    fssaiLicense: 'FSSAI/KA/2024/001',
    packagingDate: new Date('2024-01-26'),
    storageConditions: 'Store in cool, dry place below 25°C',
    dosage: '3-6g twice daily with milk or water',
    contraindications: 'Pregnancy, lactation, autoimmune conditions'
  },
  {
    id: 'FORM2024002',
    productName: 'SwasthyaChain Brahmi Memory Capsules',
    batchNumber: 'BRA-SC-2024-002',
    manufacturingDate: new Date('2024-01-28'),
    expiryDate: new Date('2026-01-27'),
    manufacturer: 'Dabur India Limited',
    manufacturerId: 'mfg002',
    location: {
      latitude: 28.6692,
      longitude: 77.4538,
      address: 'Plot 24, Sector 6, IMT Manesar, Gurgaon',
      region: 'Haryana',
      country: 'India'
    },
    ingredients: [
      {
        collectionId: 'HC2024002',
        herbName: 'Brahmi Extract',
        percentage: 80,
        quantity: 36.24,
        source: 'Kerala'
      },
      {
        collectionId: 'HC2024003',
        herbName: 'Turmeric Extract',
        percentage: 15,
        quantity: 13.45,
        source: 'Rajasthan'
      },
      {
        collectionId: 'HC2024001',
        herbName: 'Ashwagandha Extract',
        percentage: 5,
        quantity: 4.48,
        source: 'Gujarat'
      }
    ],
    batchSize: 5000, // capsules
    unitSize: '500mg capsule',
    qrCode: 'QR-BRA-SC-2024-002',
    blockchainHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
    ipfsHash: 'QmVHxeq8rKvKqzthV2YNjjrMFqrXBNLogEMEmMjddiAXx',
    ayushLicense: 'AYUSH/HR/MFG/2024/002',
    gmpCertification: 'GMP-HR-2024-002',
    fssaiLicense: 'FSSAI/HR/2024/002',
    packagingDate: new Date('2024-01-29'),
    storageConditions: 'Store in cool, dry place below 30°C',
    dosage: '1-2 capsules twice daily after meals',
    contraindications: 'Children below 12 years, pregnancy'
  }
];

// Real regulatory compliance data
export const REAL_COMPLIANCE_DATA = {
  'FORM2024001': [
    {
      id: 'ayush-license-001',
      name: 'AYUSH Manufacturing License',
      status: 'compliant' as const,
      lastChecked: new Date('2024-01-15'),
      expiryDate: new Date('2025-12-31'),
      certificateNumber: 'AYUSH/KA/MFG/2024/001',
      issuingAuthority: 'Ministry of AYUSH, Government of India',
      description: 'Valid manufacturing license for Ayurvedic formulations'
    },
    {
      id: 'gmp-cert-001',
      name: 'Good Manufacturing Practices (GMP)',
      status: 'compliant' as const,
      lastChecked: new Date('2024-01-10'),
      expiryDate: new Date('2025-06-30'),
      certificateNumber: 'GMP-KA-2024-001',
      issuingAuthority: 'Drug Controller General of India',
      description: 'Compliance with GMP standards for pharmaceutical manufacturing'
    },
    {
      id: 'organic-cert-001',
      name: 'Organic Certification',
      status: 'compliant' as const,
      lastChecked: new Date('2024-01-05'),
      expiryDate: new Date('2025-03-15'),
      certificateNumber: 'NPOP/ORG/2024/001',
      issuingAuthority: 'NPOP Certification Body',
      description: 'Certified organic ingredients and processing methods'
    },
    {
      id: 'heavy-metals-001',
      name: 'Heavy Metals Testing',
      status: 'compliant' as const,
      lastChecked: new Date('2024-01-20'),
      certificateNumber: 'NABL/HM/2024/001',
      issuingAuthority: 'NABL Accredited Testing Laboratory',
      description: 'Testing for lead, mercury, arsenic, and cadmium levels - All within limits'
    },
    {
      id: 'microbial-001',
      name: 'Microbial Contamination Test',
      status: 'compliant' as const,
      lastChecked: new Date('2024-01-18'),
      certificateNumber: 'AYUSH/MIC/2024/001',
      issuingAuthority: 'AYUSH Approved Quality Control Laboratory',
      description: 'Testing for bacterial, fungal, and yeast contamination - Passed'
    }
  ]
};

export const DASHBOARD_STATS = {
  activeCollectors: 1247,
  herbsCollected: 15847, // kg
  blockchainTransactions: 45892,
  ipfsDocuments: 12456,
  monthlyGrowth: {
    collectors: 12,
    herbs: 8,
    transactions: 25,
    documents: 18
  }
};

export const RECENT_ACTIVITY = [
  {
    type: 'collection',
    herb: 'Ashwagandha',
    collector: 'Ramesh Kumar Patel',
    location: 'Gujarat',
    time: '2 hours ago',
    id: 'HC2024001'
  },
  {
    type: 'processing',
    herb: 'Brahmi',
    stage: 'Drying Complete',
    location: 'Kerala',
    time: '4 hours ago',
    id: 'PS2024001'
  },
  {
    type: 'quality',
    herb: 'Turmeric',
    result: 'Grade A Certified',
    location: 'Rajasthan',
    time: '6 hours ago',
    id: 'QT2024003'
  },
  {
    type: 'manufacturing',
    product: 'Ashwagandha Premium Powder',
    batch: 'ASH-SC-2024-001',
    location: 'Karnataka',
    time: '8 hours ago',
    id: 'FORM2024001'
  }
];