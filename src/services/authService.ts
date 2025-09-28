import { supabase } from '../lib/supabase';
import { User, LoginCredentials, RegisterData, UserRole } from '../types/auth';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (!data.user) throw new Error('No user data returned');

      // Get user profile by email (more reliable)
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', data.user.email)
        .single();

      if (profileError) {
        throw new Error('User profile not found. Please contact administrator.');
      }

      // Update auth_user_id if it doesn't match
      if (profile.auth_user_id !== data.user.id) {
        await supabase
          .from('user_profiles')
          .update({ auth_user_id: data.user.id })
          .eq('id', profile.id);
      }

      if (!profile.is_active) {
        throw new Error('Account is deactivated. Please contact administrator.');
      }

      // Allow login even if not verified - verification check is handled in App.tsx
      // if (!profile.is_verified) {
      //   throw new Error('Account is not verified. Please wait for AYUSH regulator approval.');
      // }

      // Update last login
      await supabase
        .from('user_profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', profile.id);

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        profileImage: profile.profile_image,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          auth_user_id: authData.user.id,
          email: data.email,
          name: data.name,
          role: data.role,
          organization: data.organization,
          phone: data.phone,
          address: data.address,
          license_number: data.licenseNumber,
          certifications: data.certifications || [],
          is_verified: false, // Requires admin approval
          is_active: true,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // If collector, create collector record
      if (data.role === 'farmer' || data.role === 'wild_collector') {
        await supabase.from('collectors').insert({
          user_id: profile.id,
          collector_type: data.role,
          location: `POINT(77.2090 28.6139)`, // Default to Delhi, should be updated
          location_address: data.address,
          region: 'Delhi', // Should be extracted from address
          country: 'India',
          specialization: [],
          experience_years: 0,
        });
      }

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        profileImage: profile.profile_image,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        // AuthSessionMissingError is normal when user is not logged in
        if (authError.message.includes('Auth session missing')) {
          return null;
        }
        console.error('Auth error:', authError);
        return null;
      }
      
      if (!user) {
        return null;
      }

      // Find profile by email (more reliable for demo users)
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', user.email)
        .single();

      // If profile found but auth_user_id doesn't match, update it
      if (profile && profile.auth_user_id !== user.id) {
        await supabase
          .from('user_profiles')
          .update({ auth_user_id: user.id })
          .eq('id', profile.id);
      }

      if (error || !profile) {
        return null;
      }

      // Return user even if not verified (for getCurrentUser, not login)
      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        profileImage: profile.profile_image,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<User> {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .update({
          name: updateData.name,
          phone: updateData.phone,
          address: updateData.address,
          organization: updateData.organization,
          license_number: updateData.licenseNumber,
          certifications: updateData.certifications,
          profile_image: updateData.profileImage,
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        profileImage: profile.profile_image,
      };
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return profiles.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        profileImage: profile.profile_image,
      }));
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  }

  async updateUserStatus(userId: string, isActive: boolean, isVerified?: boolean): Promise<User> {
    try {
      const updateData: any = { is_active: isActive };
      if (isVerified !== undefined) {
        updateData.is_verified = isVerified;
      }

      console.log('Attempting to update user:', { userId, updateData });

      // First, let's check if we can read the user
      const { data: existingUser, error: readError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('Existing user check:', { existingUser, readError });

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      console.log('Update result:', { profile, error });

      if (error) throw error;

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        organization: profile.organization,
        phone: profile.phone,
        address: profile.address,
        licenseNumber: profile.license_number,
        certifications: profile.certifications,
        isVerified: profile.is_verified,
        isActive: profile.is_active,
        createdAt: new Date(profile.created_at),
        lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
        profileImage: profile.profile_image,
      };
    } catch (error) {
      console.error('Update user status error:', error);
      throw error;
    }
  }

  getRoleDisplayName(role: UserRole): string {
    const roleNames: Record<UserRole, string> = {
      farmer: 'Certified Farmer',
      wild_collector: 'Wild Collector',
      aggregator: 'Aggregator/Trader',
      processor: 'Processing Unit',
      testing_lab: 'Testing Laboratory',
      manufacturer: 'Manufacturer',
      regulator: 'AYUSH Regulator',
      consumer: 'Consumer',
      admin: 'System Administrator',
    };
    return roleNames[role];
  }
}

export const authService = new AuthService();