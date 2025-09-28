-- Setup Admin Account Script
-- Run this in your Supabase SQL Editor

-- First, let's see what users exist
SELECT 
  up.email,
  up.name,
  up.role,
  up.is_verified,
  up.is_active,
  au.email_confirmed_at,
  au.created_at
FROM user_profiles up
LEFT JOIN auth.users au ON up.auth_user_id = au.id
ORDER BY up.created_at DESC;

-- If you see an admin user above, verify them with this:
UPDATE user_profiles 
SET is_verified = true, is_active = true 
WHERE role = 'admin';

-- If you need to create a completely new admin (without going through registration):
-- First create the auth user manually, then create profile
-- Note: This is a workaround - normally you'd register through the app

-- Check if we have any admin users after the update
SELECT 
  email,
  name,
  role,
  is_verified,
  is_active
FROM user_profiles 
WHERE role = 'admin';