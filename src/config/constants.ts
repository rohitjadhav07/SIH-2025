export const AYURVEDIC_HERBS = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    commonNames: ['Indian Winter Cherry', 'Poison Gooseberry'],
    family: 'Solanaceae',
    parts: ['Root', 'Leaves'],
    activeCompounds: ['Withanolides', 'Alkaloids', 'Saponins'],
    therapeuticUses: ['Stress relief', 'Immunity booster', 'Energy enhancement'],
    harvestSeason: 'October-December',
    dryingMethod: 'Shade drying at 45-50°C',
    storageConditions: 'Cool, dry place, <12% moisture',
    shelfLife: '24 months',
    qualityParameters: {
      moisture: '<12%',
      totalAsh: '<10%',
      withanolides: '>0.3%'
    }
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    botanicalName: 'Bacopa monnieri',
    commonNames: ['Water Hyssop', 'Thyme-leafed Gratiola'],
    family: 'Plantaginaceae',
    parts: ['Whole plant', 'Leaves'],
    activeCompounds: ['Bacosides', 'Alkaloids', 'Saponins'],
    therapeuticUses: ['Memory enhancement', 'Cognitive function', 'Stress reduction'],
    harvestSeason: 'Year-round',
    dryingMethod: 'Shade drying at 40-45°C',
    storageConditions: 'Airtight containers, <10% moisture',
    shelfLife: '18 months',
    qualityParameters: {
      moisture: '<10%',
      totalAsh: '<15%',
      bacosides: '>10%'
    }
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    botanicalName: 'Curcuma longa',
    commonNames: ['Haldi', 'Indian Saffron'],
    family: 'Zingiberaceae',
    parts: ['Rhizome'],
    activeCompounds: ['Curcumin', 'Volatile oils', 'Turmerones'],
    therapeuticUses: ['Anti-inflammatory', 'Antioxidant', 'Digestive health'],
    harvestSeason: 'January-March',
    dryingMethod: 'Sun drying or mechanical drying at 60°C',
    storageConditions: 'Dry place, <8% moisture',
    shelfLife: '36 months',
    qualityParameters: {
      moisture: '<8%',
      curcumin: '>3%',
      volatileOil: '>4%'
    }
  },
  {
    id: 'neem',
    name: 'Neem',
    botanicalName: 'Azadirachta indica',
    commonNames: ['Margosa', 'Indian Lilac'],
    family: 'Meliaceae',
    parts: ['Leaves', 'Bark', 'Seeds'],
    activeCompounds: ['Azadirachtin', 'Nimbin', 'Quercetin'],
    therapeuticUses: ['Antimicrobial', 'Skin health', 'Blood purification'],
    harvestSeason: 'Year-round',
    dryingMethod: 'Shade drying at room temperature',
    storageConditions: 'Dry, ventilated area',
    shelfLife: '12 months',
    qualityParameters: {
      moisture: '<10%',
      totalAsh: '<12%',
      azadirachtin: '>0.3%'
    }
  },
  {
    id: 'amla',
    name: 'Amla',
    botanicalName: 'Phyllanthus emblica',
    commonNames: ['Indian Gooseberry', 'Amalaki'],
    family: 'Phyllanthaceae',
    parts: ['Fruit', 'Leaves'],
    activeCompounds: ['Vitamin C', 'Tannins', 'Gallic acid'],
    therapeuticUses: ['Immunity', 'Hair health', 'Digestive health'],
    harvestSeason: 'November-February',
    dryingMethod: 'Sun drying or dehydration at 55°C',
    storageConditions: 'Cool, dry place',
    shelfLife: '24 months',
    qualityParameters: {
      moisture: '<12%',
      vitaminC: '>400mg/100g',
      tannins: '>10%'
    }
  }
];

export const INDIAN_STATES_REGIONS = [
  { state: 'Andhra Pradesh', regions: ['Chittoor', 'Kadapa', 'Anantapur', 'Kurnool'] },
  { state: 'Assam', regions: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat'] },
  { state: 'Bihar', regions: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'] },
  { state: 'Gujarat', regions: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Anand', 'Kheda'] },
  { state: 'Haryana', regions: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'] },
  { state: 'Himachal Pradesh', regions: ['Shimla', 'Manali', 'Dharamshala', 'Kullu'] },
  { state: 'Karnataka', regions: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
  { state: 'Kerala', regions: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Wayanad'] },
  { state: 'Madhya Pradesh', regions: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'] },
  { state: 'Maharashtra', regions: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
  { state: 'Odisha', regions: ['Bhubaneswar', 'Cuttack', 'Berhampur', 'Rourkela'] },
  { state: 'Punjab', regions: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'] },
  { state: 'Rajasthan', regions: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] },
  { state: 'Tamil Nadu', regions: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
  { state: 'Telangana', regions: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'] },
  { state: 'Uttar Pradesh', regions: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'] },
  { state: 'Uttarakhand', regions: ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh'] },
  { state: 'West Bengal', regions: ['Kolkata', 'Darjeeling', 'Siliguri', 'Durgapur'] }
];

export const QUALITY_TESTING_LABS = [
  {
    id: 'lab001',
    name: 'Central Drug Research Institute',
    location: 'Lucknow, Uttar Pradesh',
    accreditation: 'NABL Accredited',
    specialization: ['Phytochemical Analysis', 'Heavy Metal Testing', 'Microbial Testing'],
    certificationNumber: 'NABL-T-2024-001'
  },
  {
    id: 'lab002',
    name: 'Indian Institute of Integrative Medicine',
    location: 'Jammu, Jammu & Kashmir',
    accreditation: 'ISO 17025',
    specialization: ['Alkaloid Analysis', 'Pesticide Residue', 'Authenticity Testing'],
    certificationNumber: 'ISO-17025-2024-002'
  },
  {
    id: 'lab003',
    name: 'National Institute of Pharmaceutical Education',
    location: 'Mohali, Punjab',
    accreditation: 'AYUSH Approved',
    specialization: ['Quality Control', 'Standardization', 'Stability Testing'],
    certificationNumber: 'AYUSH-QC-2024-003'
  }
];

export const MANUFACTURING_FACILITIES = [
  {
    id: 'mfg001',
    name: 'Himalaya Drug Company',
    location: 'Bangalore, Karnataka',
    ayushLicense: 'AYUSH/KA/MFG/2024/001',
    gmpCertification: 'GMP-KA-2024-001',
    capacity: '1000 tons/month',
    specialization: ['Tablets', 'Capsules', 'Powders', 'Syrups']
  },
  {
    id: 'mfg002',
    name: 'Dabur India Limited',
    location: 'Ghaziabad, Uttar Pradesh',
    ayushLicense: 'AYUSH/UP/MFG/2024/002',
    gmpCertification: 'GMP-UP-2024-002',
    capacity: '2000 tons/month',
    specialization: ['Chyawanprash', 'Oils', 'Tonics', 'Tablets']
  },
  {
    id: 'mfg003',
    name: 'Patanjali Ayurved Limited',
    location: 'Haridwar, Uttarakhand',
    ayushLicense: 'AYUSH/UK/MFG/2024/003',
    gmpCertification: 'GMP-UK-2024-003',
    capacity: '1500 tons/month',
    specialization: ['Powders', 'Capsules', 'Oils', 'Cosmetics']
  }
];

export const BLOCKCHAIN_CONFIG = {
  networkUrl: process.env.REACT_APP_BLOCKCHAIN_URL || 'https://polygon-mumbai.g.alchemy.com/v2/demo',
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e9e0',
  chainId: 80001, // Polygon Mumbai Testnet
  gasLimit: 300000
};

export const IPFS_CONFIG = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: process.env.REACT_APP_IPFS_AUTH || 'Basic ' + btoa('2QJ8QjXXXXXXXXXX:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  }
};