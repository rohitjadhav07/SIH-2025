// Mock collection data for testing
export const MOCK_COLLECTIONS = [
  {
    collection_id: 'HC2024001',
    collector_id: '33333333-3333-3333-3333-333333333333',
    herb_name: 'Ashwagandha',
    botanical_name: 'Withania somnifera',
    quantity: 125.5,
    unit: 'kg',
    collection_date: '2024-09-15T08:30:00Z',
    location_address: 'Village Kheda, Anand District, Gujarat - 388001',
    harvest_method: 'Hand harvesting',
    quality_grade: 'A',
    weather_conditions: {
      temperature: 28,
      humidity: 65,
      rainfall: 0
    },
    soil_type: 'Red laterite soil',
    organic_certified: true,
    photos: ['QmX1Y2Z3...photo1', 'QmA4B5C6...photo2'],
    certificates: ['QmD7E8F9...cert1'],
    blockchain_hash: '0x1234567890abcdef1234567890abcdef12345678',
    ipfs_hash: 'QmP1Q2R3S4T5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J'
  },
  {
    collection_id: 'HC2024002',
    collector_id: '44444444-4444-4444-4444-444444444444',
    herb_name: 'Cardamom',
    botanical_name: 'Elettaria cardamomum',
    quantity: 45.3,
    unit: 'kg',
    collection_date: '2024-09-10T06:00:00Z',
    location_address: 'Wayanad Forest Division, Kerala - 673121',
    harvest_method: 'Sustainable wild harvesting',
    quality_grade: 'A',
    weather_conditions: {
      temperature: 24,
      humidity: 85,
      rainfall: 12
    },
    soil_type: 'Forest soil',
    organic_certified: false,
    photos: ['QmY2Z3A4...photo1', 'QmB5C6D7...photo2', 'QmE8F9G0...photo3'],
    certificates: ['QmH1I2J3...permit1'],
    blockchain_hash: '0xabcdef1234567890abcdef1234567890abcdef12',
    ipfs_hash: 'QmK4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E'
  },
  {
    collection_id: 'HC2024003',
    collector_id: '33333333-3333-3333-3333-333333333333',
    herb_name: 'Turmeric',
    botanical_name: 'Curcuma longa',
    quantity: 89.7,
    unit: 'kg',
    collection_date: '2024-09-12T07:15:00Z',
    location_address: 'Village Kheda, Anand District, Gujarat - 388001',
    harvest_method: 'Machine harvesting',
    quality_grade: 'B',
    weather_conditions: {
      temperature: 30,
      humidity: 60,
      rainfall: 2
    },
    soil_type: 'Alluvial soil',
    organic_certified: true,
    photos: ['QmV4W5X6...photo1', 'QmY7Z8A9...photo2'],
    certificates: ['QmB0C1D2...cert1', 'QmE3F4G5...cert2'],
    blockchain_hash: '0x567890abcdef1234567890abcdef1234567890ab',
    ipfs_hash: 'QmH6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B'
  }
];