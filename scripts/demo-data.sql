-- Demo Data for SwasthyaChain
-- Run this in Supabase SQL Editor to add demo data

-- Temporarily disable RLS for data insertion
SET session_replication_role = replica;

-- Insert demo user profiles with proper verification
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
  'regulator@ayush.gov.in',
  'Dr. Rajesh Kumar',
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
  'lab@qualitylabs.com',
  'Dr. Meera Sharma',
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
  gen_random_uuid(),
  gen_random_uuid(),
  'manufacturing@himalaya.com',
  'Suresh Reddy',
  'manufacturer',
  'Himalaya Drug Company',
  '+91-9876543215',
  'Makali, Bengaluru, Karnataka - 562123',
  'MFG-KAR-2024-001',
  ARRAY['GMP Certificate', 'AYUSH Manufacturing License', 'ISO 9001'],
  true,
  true
),

-- Aggregator User
(
  gen_random_uuid(),
  gen_random_uuid(),
  'aggregator@herbs.com',
  'Vikram Singh',
  'aggregator',
  'Herbal Traders Association',
  '+91-9876543216',
  'Spice Market, Old Delhi - 110006',
  'AGG-DEL-2024-001',
  ARRAY['Trading License', 'Herbal Commerce Certificate'],
  true,
  true
),

-- Consumer User
(
  gen_random_uuid(),
  gen_random_uuid(),
  'consumer@example.com',
  'Anjali Gupta',
  'consumer',
  'Individual Consumer',
  '+91-9876543217',
  'Sector 15, Noida, UP - 201301',
  NULL,
  ARRAY[]::text[],
  true,
  true
)
ON CONFLICT (email) DO UPDATE SET
  is_verified = true,
  is_active = true;

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
WHERE email IN (
  'admin@swasthyachain.gov.in',
  'regulator@ayush.gov.in',
  'ramesh.patel@gmail.com',
  'priya.nair@forestcoop.org',
  'lab@qualitylabs.com',
  'manufacturing@himalaya.com',
  'aggregator@herbs.com',
  'consumer@example.com'
)
ORDER BY created_at;