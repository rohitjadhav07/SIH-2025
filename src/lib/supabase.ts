import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          email: string;
          name: string;
          role: string;
          organization: string;
          phone: string;
          address: string;
          license_number?: string;
          certifications: string[];
          is_verified: boolean;
          is_active: boolean;
          profile_image?: string;
          created_at: string;
          updated_at: string;
          last_login?: string;
        };
        Insert: {
          auth_user_id: string;
          email: string;
          name: string;
          role: string;
          organization: string;
          phone: string;
          address: string;
          license_number?: string;
          certifications?: string[];
          is_verified?: boolean;
          is_active?: boolean;
          profile_image?: string;
        };
        Update: {
          name?: string;
          phone?: string;
          address?: string;
          organization?: string;
          license_number?: string;
          certifications?: string[];
          profile_image?: string;
          last_login?: string;
        };
      };
      collectors: {
        Row: {
          id: string;
          user_id: string;
          collector_type: string;
          location: any; // PostGIS geometry
          location_address: string;
          region: string;
          country: string;
          specialization: string[];
          experience_years: number;
          farm_size_hectares?: number;
          forest_area?: string;
          ayush_registration?: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          collector_type: string;
          location: any;
          location_address: string;
          region: string;
          country?: string;
          specialization?: string[];
          experience_years?: number;
          farm_size_hectares?: number;
          forest_area?: string;
          ayush_registration?: string;
        };
      };
      herb_collections: {
        Row: {
          id: string;
          collection_id: string;
          collector_id: string;
          herb_name: string;
          botanical_name: string;
          quantity: number;
          unit: string;
          collection_date: string;
          location: any;
          location_address: string;
          harvest_method: string;
          quality_grade: string;
          weather_conditions?: any;
          soil_type?: string;
          organic_certified: boolean;
          photos: string[];
          certificates: string[];
          blockchain_hash: string;
          ipfs_hash?: string;
          created_at: string;
        };
        Insert: {
          collection_id: string;
          collector_id: string;
          herb_name: string;
          botanical_name: string;
          quantity: number;
          unit: string;
          collection_date: string;
          location: any;
          location_address: string;
          harvest_method: string;
          quality_grade: string;
          weather_conditions?: any;
          soil_type?: string;
          organic_certified?: boolean;
          photos?: string[];
          certificates?: string[];
          blockchain_hash: string;
          ipfs_hash?: string;
        };
      };
      processing_stages: {
        Row: {
          id: string;
          processing_id: string;
          collection_id: string;
          stage: string;
          processor_name: string;
          processor_id: string;
          location: any;
          location_address: string;
          start_date: string;
          end_date?: string;
          parameters: any;
          gmp_compliant: boolean;
          processing_license?: string;
          blockchain_hash: string;
          ipfs_hash?: string;
          created_at: string;
        };
        Insert: {
          processing_id: string;
          collection_id: string;
          stage: string;
          processor_name: string;
          processor_id: string;
          location: any;
          location_address: string;
          start_date: string;
          end_date?: string;
          parameters: any;
          gmp_compliant?: boolean;
          processing_license?: string;
          blockchain_hash: string;
          ipfs_hash?: string;
        };
      };
      formulations: {
        Row: {
          id: string;
          formulation_id: string;
          product_name: string;
          batch_number: string;
          manufacturing_date: string;
          expiry_date: string;
          manufacturer: string;
          manufacturer_id: string;
          location: any;
          location_address: string;
          ingredients: any;
          batch_size: number;
          unit_size: string;
          qr_code: string;
          ayush_license: string;
          gmp_certification: string;
          fssai_license?: string;
          packaging_date?: string;
          storage_conditions?: string;
          dosage?: string;
          contraindications?: string;
          blockchain_hash: string;
          ipfs_hash?: string;
          created_at: string;
        };
        Insert: {
          formulation_id: string;
          product_name: string;
          batch_number: string;
          manufacturing_date: string;
          expiry_date: string;
          manufacturer: string;
          manufacturer_id: string;
          location: any;
          location_address: string;
          ingredients: any;
          batch_size: number;
          unit_size: string;
          qr_code: string;
          ayush_license: string;
          gmp_certification: string;
          fssai_license?: string;
          packaging_date?: string;
          storage_conditions?: string;
          dosage?: string;
          contraindications?: string;
          blockchain_hash: string;
          ipfs_hash?: string;
        };
      };
    };
  };
}