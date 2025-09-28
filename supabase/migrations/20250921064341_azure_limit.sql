/*
  # SwasthyaChain Database Schema

  1. New Tables
    - `user_profiles` - Extended user information
    - `collectors` - Farmer and wild collector details
    - `herb_collections` - Collection events with geo-tagging
    - `processing_stages` - Processing and testing records
    - `formulations` - Final product formulations
    - `blockchain_transactions` - Blockchain transaction records
    - `ipfs_documents` - IPFS document storage
    - `quality_tests` - Quality testing results
    - `regulatory_compliance` - Compliance tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure sensitive data

  3. Indexes
    - Performance optimization for queries
    - Geo-spatial indexing for location data
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('farmer', 'wild_collector', 'aggregator', 'processor', 'testing_lab', 'manufacturer', 'regulator', 'consumer', 'admin')),
  organization text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  license_number text,
  certifications text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  profile_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Collectors Table
CREATE TABLE IF NOT EXISTS collectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  collector_type text NOT NULL CHECK (collector_type IN ('farmer', 'wild_collector')),
  location geometry(POINT, 4326) NOT NULL,
  location_address text NOT NULL,
  region text NOT NULL,
  country text DEFAULT 'India',
  specialization text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  farm_size_hectares decimal,
  forest_area text,
  ayush_registration text,
  created_at timestamptz DEFAULT now()
);

-- Herb Collections Table
CREATE TABLE IF NOT EXISTS herb_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id text UNIQUE NOT NULL,
  collector_id uuid REFERENCES collectors(id) ON DELETE CASCADE,
  herb_name text NOT NULL,
  botanical_name text NOT NULL,
  quantity decimal NOT NULL,
  unit text NOT NULL CHECK (unit IN ('kg', 'grams', 'tons')),
  collection_date timestamptz NOT NULL,
  location geometry(POINT, 4326) NOT NULL,
  location_address text NOT NULL,
  harvest_method text NOT NULL,
  quality_grade text NOT NULL CHECK (quality_grade IN ('A', 'B', 'C')),
  weather_conditions jsonb,
  soil_type text,
  organic_certified boolean DEFAULT false,
  photos text[] DEFAULT '{}',
  certificates text[] DEFAULT '{}',
  blockchain_hash text NOT NULL,
  ipfs_hash text,
  created_at timestamptz DEFAULT now()
);

-- Processing Stages Table
CREATE TABLE IF NOT EXISTS processing_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  processing_id text UNIQUE NOT NULL,
  collection_id uuid REFERENCES herb_collections(id) ON DELETE CASCADE,
  stage text NOT NULL CHECK (stage IN ('drying', 'cleaning', 'testing', 'storage', 'manufacturing')),
  processor_name text NOT NULL,
  processor_id text NOT NULL,
  location geometry(POINT, 4326) NOT NULL,
  location_address text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  parameters jsonb NOT NULL,
  gmp_compliant boolean DEFAULT false,
  processing_license text,
  blockchain_hash text NOT NULL,
  ipfs_hash text,
  created_at timestamptz DEFAULT now()
);

-- Quality Tests Table
CREATE TABLE IF NOT EXISTS quality_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id text UNIQUE NOT NULL,
  processing_stage_id uuid REFERENCES processing_stages(id) ON DELETE CASCADE,
  test_type text NOT NULL,
  test_date timestamptz NOT NULL,
  results jsonb NOT NULL,
  passed boolean NOT NULL,
  certification_body text NOT NULL,
  certificate_number text,
  lab_id text NOT NULL,
  nabl_accredited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Formulations Table
CREATE TABLE IF NOT EXISTS formulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  formulation_id text UNIQUE NOT NULL,
  product_name text NOT NULL,
  batch_number text UNIQUE NOT NULL,
  manufacturing_date date NOT NULL,
  expiry_date date NOT NULL,
  manufacturer text NOT NULL,
  manufacturer_id text NOT NULL,
  location geometry(POINT, 4326) NOT NULL,
  location_address text NOT NULL,
  ingredients jsonb NOT NULL,
  batch_size integer NOT NULL,
  unit_size text NOT NULL,
  qr_code text UNIQUE NOT NULL,
  ayush_license text NOT NULL,
  gmp_certification text NOT NULL,
  fssai_license text,
  packaging_date date,
  storage_conditions text,
  dosage text,
  contraindications text,
  blockchain_hash text NOT NULL,
  ipfs_hash text,
  created_at timestamptz DEFAULT now()
);

-- Blockchain Transactions Table
CREATE TABLE IF NOT EXISTS blockchain_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_id text UNIQUE NOT NULL,
  block_number bigint NOT NULL,
  transaction_hash text UNIQUE NOT NULL,
  previous_hash text,
  merkle_root text,
  validator text,
  gas_used bigint,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'failed')),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- IPFS Documents Table
CREATE TABLE IF NOT EXISTS ipfs_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cid text UNIQUE NOT NULL,
  filename text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  upload_date timestamptz DEFAULT now(),
  pinned boolean DEFAULT true,
  gateway_url text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  uploaded_by uuid REFERENCES user_profiles(id)
);

-- Regulatory Compliance Table
CREATE TABLE IF NOT EXISTS regulatory_compliance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  compliance_id text UNIQUE NOT NULL,
  product_id text NOT NULL,
  compliance_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('compliant', 'non-compliant', 'pending', 'expired')),
  last_checked timestamptz NOT NULL,
  expiry_date date,
  certificate_number text,
  issuing_authority text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE herb_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipfs_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_compliance ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- Allow anyone to insert profiles (for registration)
CREATE POLICY "Allow profile creation during registration" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Allow public read access for authentication purposes
CREATE POLICY "Public read access for auth" ON user_profiles
  FOR SELECT USING (true);

-- RLS Policies for collectors
CREATE POLICY "Collectors can manage own data" ON collectors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = collectors.user_id 
      AND auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can read collector data" ON collectors
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for herb_collections
CREATE POLICY "Collectors can manage own collections" ON herb_collections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM collectors c
      JOIN user_profiles up ON c.user_id = up.id
      WHERE c.id = herb_collections.collector_id 
      AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can read collections" ON herb_collections
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for processing_stages
CREATE POLICY "Authenticated users can manage processing stages" ON processing_stages
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for formulations
CREATE POLICY "Authenticated users can manage formulations" ON formulations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read formulations for verification" ON formulations
  FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_collectors_location ON collectors USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_herb_collections_location ON herb_collections USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_herb_collections_collection_date ON herb_collections(collection_date);
CREATE INDEX IF NOT EXISTS idx_processing_stages_stage ON processing_stages(stage);
CREATE INDEX IF NOT EXISTS idx_blockchain_transactions_tx_id ON blockchain_transactions(tx_id);
CREATE INDEX IF NOT EXISTS idx_ipfs_documents_cid ON ipfs_documents(cid);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- RLS Policies for quality_tests
CREATE POLICY "Authenticated users can manage quality tests" ON quality_tests
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for blockchain_transactions
CREATE POLICY "Authenticated users can read blockchain transactions" ON blockchain_transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert blockchain transactions" ON blockchain_transactions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for ipfs_documents
CREATE POLICY "Authenticated users can manage ipfs documents" ON ipfs_documents
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for regulatory_compliance
CREATE POLICY "Authenticated users can read compliance" ON regulatory_compliance
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage compliance" ON regulatory_compliance
  FOR ALL USING (auth.role() = 'authenticated');

-- Add updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();