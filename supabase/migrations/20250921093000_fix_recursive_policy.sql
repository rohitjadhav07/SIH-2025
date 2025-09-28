/*
  # Fix Infinite Recursion in RLS Policies
  
  This migration removes the recursive policies and creates simpler ones.
*/

-- Drop all existing policies that might cause recursion
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile creation during registration" ON user_profiles;
DROP POLICY IF EXISTS "Public read access for auth" ON user_profiles;
DROP POLICY IF EXISTS "Admin users can update any profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin users can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users and admins can update profiles" ON user_profiles;

-- Create simple, non-recursive policies

-- Allow public read access (needed for auth and admin functions)
CREATE POLICY "Public read access" ON user_profiles
  FOR SELECT USING (true);

-- Allow users to update their own profiles OR allow specific admin emails
CREATE POLICY "Users and specific admins can update" ON user_profiles
  FOR UPDATE USING (
    auth.uid() = auth_user_id 
    OR 
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@swasthyachain.gov.in'
  );

-- Allow anyone to insert profiles (for registration)
CREATE POLICY "Allow profile creation" ON user_profiles
  FOR INSERT WITH CHECK (true);