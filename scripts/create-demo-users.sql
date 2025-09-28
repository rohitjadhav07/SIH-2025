-- Demo Users Creation Script for SwasthyaChain
-- Run this in your Supabase SQL Editor to create demo users

-- First, let's create the auth users (you'll need to do this via Supabase Auth Admin API or Dashboard)
-- Then insert the profile data

-- Insert demo user profiles
INSERT INTO user_profiles (
  auth_user_id, email, name, role, organization, phone, address, 
  license_number, certifications, is_verified, is_active
) VALUES 
-- Admin User
(
  'admin-uuid-here', -- Replace with actual auth user ID from Supabase Auth
  'admin@swasthyachain.gov.in',
  'System Administrator',
  'admin',
  'SwasthyaChain Government',
  '+91-9876543210',
  'Ministry of AYUSH, New Delhi, India',
  'ADMIN-2024-001',
  ARRAY['System Administration', 'AYUSH Compliance'],
  true,
  true
),
-- Regulator User
(
  'regulator-uuid-here', -- Replace with actual auth user ID
  'regulator@ayush.gov.in',
  'Dr. Rajesh Kumar',
  'regulator',
  'Ministry of AYUSH',
  '+91-9876543211',
  'AYUSH Bhawan, New Delhi, India',
  'REG-AYUSH-2024-001',
  ARRAY['AYUSH Regulatory Affairs', 'Quality Compliance'],
  true,
  true
),
-- Farmer User
(
  'farmer-uuid-here', -- Replace with actual auth user ID
  'ramesh.patel@gmail.com',
  'Ramesh Patel',
  'farmer',
  'Patel Organic Farms',
  '+91-9876543212',
  'Village Kheda, Gujarat, India',
  'FARM-GUJ-2024-001',
  ARRAY['Organic Farming', 'Ayurvedic Herb Cultivation'],
  true,
  true
),
-- Wild Collector User
(
  'collector-uuid-here', -- Replace with actual auth user ID
  'priya.nair@forestcoop.org',
  'Priya Nair',
  'wild_collector',
  'Kerala Forest Cooperative',
  '+91-9876543213',
  'Wayanad District, Kerala, India',
  'WC-KER-2024-001',
  ARRAY['Sustainable Wild Collection', 'Forest Conservation'],
  true,
  true
),
-- Testing Lab User
(
  'lab-uuid-here', -- Replace with actual auth user ID
  'lab@qualitylabs.com',
  'Dr. Suresh Sharma',
  'testing_lab',
  'Quality Labs India Pvt Ltd',
  '+91-9876543214',
  'Industrial Area, Ahmedabad, Gujarat, India',
  'LAB-NABL-2024-001',
  ARRAY['NABL Accreditation', 'Ayurvedic Testing Standards'],
  true,
  true
),
-- Manufacturer User
(
  'manufacturer-uuid-here', -- Replace with actual auth user ID
  'manufacturing@himalaya.com',
  'Arun Krishnan',
  'manufacturer',
  'Himalaya Drug Company',
  '+91-9876543215',
  'Makali, Bangalore, Karnataka, India',
  'MFG-AYUSH-KAR-2024-001',
  ARRAY['GMP Certification', 'AYUSH Manufacturing License'],
  true,
  true
);

-- Create collector records for farmer and wild collector
INSERT INTO collectors (
  user_id, collector_type, location, location_address, region, country, 
  specialization, experience_years
) 
SELECT 
  up.id,
  up.role,
  ST_GeomFromText('POINT(72.5714 23.0225)', 4326), -- Gujarat coordinates
  up.address,
  'Gujarat',
  'India',
  CASE 
    WHEN up.role = 'farmer' THEN ARRAY['Ashwagandha', 'Turmeric', 'Brahmi']
    ELSE ARRAY['Wild Herbs', 'Forest Products', 'Medicinal Plants']
  END,
  5
FROM user_profiles up 
WHERE up.role IN ('farmer', 'wild_collector')
AND up.email IN ('ramesh.patel@gmail.com', 'priya.nair@forestcoop.org');

-- Update wild collector location to Kerala
UPDATE collectors 
SET 
  location = ST_GeomFromText('POINT(76.2711 11.2588)', 4326),
  region = 'Kerala'
WHERE user_id IN (
  SELECT id FROM user_profiles WHERE email = 'priya.nair@forestcoop.org'
);