-- Create Admin User Script
-- Run this in Supabase SQL Editor to create an admin account

-- First, create the auth user (you'll need to do this through Supabase Auth or registration)
-- Then run this script to create the profile and set as verified

-- Insert admin user profile (replace the auth_user_id with actual ID from auth.users)
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
) VALUES (
  gen_random_uuid(),
  'REPLACE_WITH_ACTUAL_AUTH_USER_ID', -- Replace this with the actual auth user ID
  'admin@swasthyachain.gov.in',
  'System Administrator',
  'admin',
  'SwasthyaChain Government Portal',
  '+91-9876543210',
  'Ministry of AYUSH, Shastri Bhawan, New Delhi - 110001',
  'ADMIN-2024-001',
  ARRAY['System Administrator', 'Digital Health Certificate'],
  true,  -- Verified
  true   -- Active
) ON CONFLICT (email) DO UPDATE SET
  is_verified = true,
  is_active = true;

-- Alternative: If you already registered an admin account, just verify it
UPDATE user_profiles 
SET is_verified = true, is_active = true 
WHERE email = 'admin@swasthyachain.gov.in';

-- Check the result
SELECT name, email, role, is_verified, is_active 
FROM user_profiles 
WHERE role = 'admin';