/*
  # Fix Admin Permissions for User Management
  
  This migration adds RLS policies to allow admins to manage other users.
*/

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

-- Add policy to allow admins to read all profiles (in addition to existing public read)
CREATE POLICY "Admins can read all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin_profile
      WHERE admin_profile.auth_user_id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.is_active = true
    )
  );