/*
  # Simplify Admin Permissions
  
  This migration creates a simpler admin permission system.
*/

-- Drop the existing admin policies to recreate them
DROP POLICY IF EXISTS "Admins can update any profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;

-- Create a more permissive policy for admins based on email
CREATE POLICY "Admin users can update any profile" ON user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin_check
      WHERE admin_check.email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
      AND admin_check.role = 'admin'
      AND admin_check.is_active = true
    )
  );

-- Allow admins to read all profiles
CREATE POLICY "Admin users can read all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin_check
      WHERE admin_check.email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
      AND admin_check.role = 'admin'
      AND admin_check.is_active = true
    )
  );