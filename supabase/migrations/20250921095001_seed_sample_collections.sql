/*
  # Seed sample herb collections
  
  This migration adds sample herb collection data for testing.
*/

-- Insert sample herb collections
INSERT INTO herb_collections (
  collection_id,
  collector_id,
  herb_name,
  botanical_name,
  quantity,
  unit,
  collection_date,
  location,
  location_address,
  harvest_method,
  quality_grade,
  weather_conditions,
  soil_type,
  organic_certified,
  photos,
  certificates,
  blockchain_hash,
  ipfs_hash
) VALUES 
(
  'HC2024001',
  '33333333-3333-3333-3333-333333333333', -- Ramesh Patel (Farmer)
  'Ashwagandha',
  'Withania somnifera',
  125.5,
  'kg',
  '2024-09-15 08:30:00+00',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Village Kheda, Anand District, Gujarat - 388001',
  'Hand harvesting',
  'A',
  '{"temperature": 28, "humidity": 65, "rainfall": 0}',
  'Red laterite soil',
  true,
  ARRAY['QmX1Y2Z3...photo1', 'QmA4B5C6...photo2'],
  ARRAY['QmD7E8F9...cert1'],
  '0x1234567890abcdef...',
  'QmP1Q2R3S4T5U6V7W8X9Y0Z...'
),
(
  'HC2024002',
  '44444444-4444-4444-4444-444444444444', -- Priya Nair (Wild Collector)
  'Cardamom',
  'Elettaria cardamomum',
  45.3,
  'kg',
  '2024-09-10 06:00:00+00',
  ST_GeomFromText('POINT(76.1319 11.6854)', 4326),
  'Wayanad Forest Division, Kerala - 673121',
  'Sustainable wild harvesting',
  'A',
  '{"temperature": 24, "humidity": 85, "rainfall": 12}',
  'Forest soil',
  false,
  ARRAY['QmY2Z3A4...photo1', 'QmB5C6D7...photo2', 'QmE8F9G0...photo3'],
  ARRAY['QmH1I2J3...permit1'],
  '0xabcdef1234567890...',
  'QmK4L5M6N7O8P9Q0R1S2T3U...'
),
(
  'HC2024003',
  '33333333-3333-3333-3333-333333333333', -- Ramesh Patel (Farmer)
  'Turmeric',
  'Curcuma longa',
  89.7,
  'kg',
  '2024-09-12 07:15:00+00',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Village Kheda, Anand District, Gujarat - 388001',
  'Machine harvesting',
  'B',
  '{"temperature": 30, "humidity": 60, "rainfall": 2}',
  'Alluvial soil',
  true,
  ARRAY['QmV4W5X6...photo1', 'QmY7Z8A9...photo2'],
  ARRAY['QmB0C1D2...cert1', 'QmE3F4G5...cert2'],
  '0x567890abcdef1234...',
  'QmH6I7J8K9L0M1N2O3P4Q5R...'
)
ON CONFLICT (collection_id) DO NOTHING;