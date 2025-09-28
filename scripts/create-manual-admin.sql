-- Manual Admin Creation Script
-- Run this in Supabase SQL Editor if no admin exists

-- Step 1: Create a dummy auth user entry (this is a workaround)
-- Note: In production, you should register through the app, but this is for testing

-- First, let's create a user profile without auth constraints
-- We'll temporarily disable RLS for this insert
SET session_replication_role = replica;

-- Insert admin profile
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
  is_active,
  created_at
) VALUES (
  gen_random_uuid(),
  gen_random_uuid(), -- Dummy auth ID for now
  'admin@swasthyachain.gov.in',
  'System Administrator',
  'admin',
  'SwasthyaChain Government Portal',
  '+91-9876543210',
  'Ministry of AYUSH, Shastri Bhawan, New Delhi - 110001',
  'ADMIN-2024-001',
  ARRAY['System Administrator', 'Digital Health Certificate'],
  true,
  true,
  now()
) ON CONFLICT (email) DO UPDATE SET
  is_verified = true,
  is_active = true;

-- Reset session replication role
SET session_replication_role = DEFAULT;

-- Verify the admin was created
SELECT 
  email,
  name,
  role,
  is_verified,
  is_active
FROM user_profiles 
WHERE role = 'admin';