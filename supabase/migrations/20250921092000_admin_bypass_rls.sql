/*
  # Admin Bypass RLS for User Management
  
  This migration creates a more permissive approach for admin user management.
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin users can update any profile" ON user_profiles;

-- Create a more permissive update policy
CREATE POLICY "Users and admins can update profiles" ON user_profiles
  FOR UPDATE USING (
    -- Users can update their own profile
    auth.uid() = auth_user_id
    OR
    -- OR anyone can update if they are an admin (simplified check)
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND role = 'admin'
    )
  );