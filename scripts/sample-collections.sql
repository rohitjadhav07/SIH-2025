-- Sample Collection Data for SwasthyaChain
-- Run this in Supabase SQL Editor to add sample collections

-- First, let's create some collectors if they don't exist
INSERT INTO collectors (
  id,
  user_id,
  collector_type,
  location,
  location_address,
  region,
  country,
  specialization,
  experience_years,
  ayush_registration
) VALUES 
(
  gen_random_uuid(),
  (SELECT id FROM user_profiles WHERE email = 'ramesh.patel@gmail.com' LIMIT 1),
  'farmer',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Village Kheda, Anand District, Gujarat - 388001',
  'Gujarat',
  'India',
  ARRAY['Ashwagandha', 'Brahmi', 'Tulsi', 'Neem'],
  15,
  'AYUSH-FARM-GUJ-2024-001'
),
(
  gen_random_uuid(),
  (SELECT id FROM user_profiles WHERE email = 'priya.nair@forestcoop.org' LIMIT 1),
  'wild_collector',
  ST_GeomFromText('POINT(76.1319 11.6854)', 4326),
  'Wayanad Forest Division, Kerala - 673121',
  'Kerala',
  'India',
  ARRAY['Cardamom', 'Black Pepper', 'Turmeric', 'Ginger'],
  12,
  'AYUSH-WC-KER-2024-001'
)
ON CONFLICT (id) DO NOTHING;

-- Add sample herb collections
INSERT INTO herb_collections (
  id,
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
-- Ashwagandha Collection
(
  gen_random_uuid(),
  'COL-2024-001',
  (SELECT id FROM collectors WHERE collector_type = 'farmer' LIMIT 1),
  'Ashwagandha',
  'Withania somnifera',
  50.0,
  'kg',
  '2024-09-15 06:00:00+00',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Field No. 3, Patel Organic Farms, Gujarat',
  'Hand harvesting',
  'A',
  '{"temperature": "28°C", "humidity": "65%", "rainfall": "0mm"}',
  'Red laterite soil',
  true,
  ARRAY['photo1.jpg', 'photo2.jpg'],
  ARRAY['organic_cert.pdf', 'quality_test.pdf'],
  '0x1234567890abcdef1234567890abcdef12345678',
  'QmXoYpVyKxQy8VpnRsmjbmGqadWMZoqxqsehQcpAjBiVdC'
),

-- Cardamom Collection
(
  gen_random_uuid(),
  'COL-2024-002',
  (SELECT id FROM collectors WHERE collector_type = 'wild_collector' LIMIT 1),
  'Cardamom',
  'Elettaria cardamomum',
  25.0,
  'kg',
  '2024-09-10 05:30:00+00',
  ST_GeomFromText('POINT(76.1319 11.6854)', 4326),
  'Western Ghats, Wayanad Forest Division',
  'Sustainable wild harvesting',
  'A',
  '{"temperature": "22°C", "humidity": "85%", "rainfall": "5mm"}',
  'Forest soil with high organic content',
  true,
  ARRAY['cardamom1.jpg', 'cardamom2.jpg'],
  ARRAY['forest_permit.pdf', 'sustainability_cert.pdf'],
  '0xabcdef1234567890abcdef1234567890abcdef12',
  'QmYpVyKxQy8VpnRsmjbmGqadWMZoqxqsehQcpAjBiVdD'
),

-- Turmeric Collection
(
  gen_random_uuid(),
  'COL-2024-003',
  (SELECT id FROM collectors WHERE collector_type = 'farmer' LIMIT 1),
  'Turmeric',
  'Curcuma longa',
  75.0,
  'kg',
  '2024-09-12 07:00:00+00',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Field No. 5, Patel Organic Farms, Gujarat',
  'Machine harvesting',
  'A',
  '{"temperature": "30°C", "humidity": "70%", "rainfall": "2mm"}',
  'Alluvial soil',
  true,
  ARRAY['turmeric1.jpg'],
  ARRAY['organic_cert.pdf'],
  '0x567890abcdef1234567890abcdef1234567890ab',
  'QmZpVyKxQy8VpnRsmjbmGqadWMZoqxqsehQcpAjBiVdE'
),

-- Brahmi Collection
(
  gen_random_uuid(),
  'COL-2024-004',
  (SELECT id FROM collectors WHERE collector_type = 'farmer' LIMIT 1),
  'Brahmi',
  'Bacopa monnieri',
  30.0,
  'kg',
  '2024-09-08 08:00:00+00',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326),
  'Wetland Area, Patel Organic Farms, Gujarat',
  'Hand harvesting',
  'A',
  '{"temperature": "26°C", "humidity": "80%", "rainfall": "0mm"}',
  'Clay soil with high moisture',
  true,
  ARRAY['brahmi1.jpg', 'brahmi2.jpg'],
  ARRAY['organic_cert.pdf', 'ayush_cert.pdf'],
  '0x789abcdef1234567890abcdef1234567890abcd',
  'QmBpVyKxQy8VpnRsmjbmGqadWMZoqxqsehQcpAjBiVdF'
),

-- Neem Collection
(
  gen_random_uuid(),
  'COL-2024-005',
  (SELECT id FROM collectors WHERE collector_type = 'wild_collector' LIMIT 1),
  'Neem',
  'Azadirachta indica',
  40.0,
  'kg',
  '2024-09-05 06:30:00+00',
  ST_GeomFromText('POINT(76.1319 11.6854)', 4326),
  'Natural Forest, Wayanad, Kerala',
  'Sustainable wild harvesting',
  'B',
  '{"temperature": "24°C", "humidity": "75%", "rainfall": "3mm"}',
  'Forest soil',
  false,
  ARRAY['neem1.jpg'],
  ARRAY['collection_permit.pdf'],
  '0x9abcdef1234567890abcdef1234567890abcdef',
  'QmCpVyKxQy8VpnRsmjbmGqadWMZoqxqsehQcpAjBiVdG'
)
ON CONFLICT (collection_id) DO NOTHING;

-- Add some blockchain transactions
INSERT INTO blockchain_transactions (
  id,
  tx_id,
  block_number,
  transaction_hash,
  previous_hash,
  merkle_root,
  validator,
  gas_used,
  status,
  entity_type,
  entity_id
) VALUES 
(
  gen_random_uuid(),
  'tx_collection_001',
  1001,
  '0x1234567890abcdef1234567890abcdef12345678',
  '0x0000000000000000000000000000000000000000',
  '0xabcdef1234567890abcdef1234567890abcdef12',
  'peer0.collector.ayurvedic.com',
  21000,
  'confirmed',
  'herb_collection',
  'COL-2024-001'
),
(
  gen_random_uuid(),
  'tx_collection_002',
  1002,
  '0xabcdef1234567890abcdef1234567890abcdef12',
  '0x1234567890abcdef1234567890abcdef12345678',
  '0xbcdef1234567890abcdef1234567890abcdef123',
  'peer0.collector.ayurvedic.com',
  21000,
  'confirmed',
  'herb_collection',
  'COL-2024-002'
)
ON CONFLICT (tx_id) DO NOTHING;

-- Display the collections
SELECT 
  hc.collection_id,
  hc.herb_name,
  hc.botanical_name,
  hc.quantity,
  hc.unit,
  hc.quality_grade,
  hc.collection_date,
  c.collector_type,
  up.name as collector_name
FROM herb_collections hc
JOIN collectors c ON hc.collector_id = c.id
JOIN user_profiles up ON c.user_id = up.id
ORDER BY hc.collection_date DESC;