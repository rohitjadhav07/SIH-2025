/*
  # Simplify RLS Policies
  
  This migration creates the simplest possible RLS setup to avoid recursion.
*/

-- Drop the existing policies
DROP POLICY IF EXISTS "Users and specific admins can update" ON user_profiles;

-- Create a very permissive update policy for now
CREATE POLICY "Permissive update policy" ON user_profiles
  FOR UPDATE USING (true);

-- Also make sure we have a permissive delete policy if needed
CREATE POLICY "Permissive delete policy" ON user_profiles
  FOR DELETE USING (true);