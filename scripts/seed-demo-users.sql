-- Demo Users Seed Script
-- Run this in your Supabase SQL editor to add demo users

-- Note: These are demo users with placeholder auth_user_ids
-- In production, these would be created through the registration process

-- Temporarily allow inserts without auth constraints for seeding
SET session_replication_role = replica;

-- Insert demo user profiles
INSERT INTO user_profiles (
  id,
  auth_user_id,
  email,
  name,
  role,
  organization,
  phone,
  address,
  license_number,
  certifications,
  is_verified,
  is_active
) VALUES 
-- Admin User
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'admin@swasthyachain.gov.in',
  'System Administrator',
  'admin',
  'SwasthyaChain Government Portal',
  '+91-9876543210',
  'Ministry of AYUSH, Shastri Bhawan, New Delhi - 110001',
  'ADMIN-2024-001',
  ARRAY['System Administrator', 'Digital Health Certificate'],
  true,
  true
),

-- Regulator User
(
  '22222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'regulator@ayush.gov.in',
  'AYUSH Regulator',
  'regulator',
  'Ministry of AYUSH',
  '+91-9876543211',
  'AYUSH Bhawan, B Block, GPO Complex, INA, New Delhi - 110023',
  'REG-AYUSH-2024-001',
  ARRAY['Regulatory Affairs', 'Quality Assurance', 'GMP Inspector'],
  true,
  true
),

-- Farmer User
(
  '33333333-3333-3333-3333-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'ramesh.patel@gmail.com',
  'Ramesh Patel',
  'farmer',
  'Patel Organic Farms',
  '+91-9876543212',
  'Village Kheda, Anand District, Gujarat - 388001',
  'FARM-GUJ-2024-001',
  ARRAY['Organic Farming Certificate', 'AYUSH Cultivation License'],
  true,
  true
),

-- Wild Collector User
(
  '44444444-4444-4444-4444-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'priya.nair@forestcoop.org',
  'Priya Nair',
  'wild_collector',
  'Kerala Forest Cooperative Society',
  '+91-9876543213',
  'Wayanad Forest Division, Kerala - 673121',
  'WC-KER-2024-001',
  ARRAY['Forest Collection Permit', 'Sustainable Harvesting Certificate'],
  true,
  true
),

-- Testing Lab User
(
  '55555555-5555-5555-5555-555555555555',
  '55555555-5555-5555-5555-555555555555',
  'lab@qualitylabs.com',
  'Quality Labs Manager',
  'testing_lab',
  'Quality Labs India Pvt Ltd',
  '+91-9876543214',
  'Industrial Area, Sector 18, Gurgaon, Haryana - 122015',
  'LAB-NABL-2024-001',
  ARRAY['NABL Accreditation', 'ISO 17025', 'Ayurvedic Testing Certification'],
  true,
  true
),

-- Manufacturer User
(
  '66666666-6666-6666-6666-666666666666',
  '66666666-6666-6666-6666-666666666666',
  'manufacturing@himalaya.com',
  'Manufacturing Manager',
  'manufacturer',
  'Himalaya Drug Company',
  '+91-9876543215',
  'Makali, Bengaluru, Karnataka - 562123',
  'MFG-KAR-2024-001',
  ARRAY['GMP Certificate', 'AYUSH Manufacturing License', 'ISO 9001'],
  true,
  true
)
ON CONFLICT (email) DO NOTHING;

-- Create demo collectors for farmer and wild collector
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
  farm_size_hectares,
  forest_area,
  ayush_registration
) VALUES 
-- Farmer Collector
(
  '77777777-7777-7777-7777-777777777777',
  '33333333-3333-3333-3333-333333333333',
  'farmer',
  ST_GeomFromText('POINT(72.9831 22.7196)', 4326), -- Anand, Gujarat coordinates
  'Village Kheda, Anand District, Gujarat - 388001',
  'Gujarat',
  'India',
  ARRAY['Ashwagandha', 'Brahmi', 'Tulsi', 'Neem'],
  15,
  25.5,
  NULL,
  'AYUSH-FARM-GUJ-2024-001'
),

-- Wild Collector
(
  '88888888-8888-8888-8888-888888888888',
  '44444444-4444-4444-4444-444444444444',
  'wild_collector',
  ST_GeomFromText('POINT(76.1319 11.6854)', 4326), -- Wayanad, Kerala coordinates
  'Wayanad Forest Division, Kerala - 673121',
  'Kerala',
  'India',
  ARRAY['Cardamom', 'Black Pepper', 'Turmeric', 'Ginger'],
  12,
  NULL,
  'Western Ghats Reserve Forest - 500 hectares',
  'AYUSH-WC-KER-2024-001'
)
ON CONFLICT (id) DO NOTHING;

-- Reset session replication role
SET session_replication_role = DEFAULT;

-- Display created users
SELECT 
  name,
  email,
  role,
  organization,
  is_verified,
  is_active
FROM user_profiles 
ORDER BY created_at DESC;