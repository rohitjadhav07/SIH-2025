-- Fix Admin Permissions for User Management
-- Run this in Supabase SQL Editor to allow admins to manage users

-- Add policy to allow admins to update any user profile
CREATE POLICY "Admins can update any profile" ON user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin_profile
      WHERE admin_profile.auth_user_id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.is_active = true
    )
  );

-- Add policy to allow admins to read all profiles  
CREATE POLICY "Admins can read all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin_profile
      WHERE admin_profile.auth_user_id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.is_active = true
    )
  );

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user_profiles';