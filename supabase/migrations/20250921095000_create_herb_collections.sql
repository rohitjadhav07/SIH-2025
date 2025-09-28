/*
  # Create herb collections table and related tables
  
  This migration creates the necessary tables for herb collection tracking.
*/

-- Create herb_collections table if it doesn't exist
CREATE TABLE IF NOT EXISTS herb_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id TEXT UNIQUE NOT NULL,
  collector_id UUID REFERENCES user_profiles(id),
  herb_name TEXT NOT NULL,
  botanical_name TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  collection_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  location GEOGRAPHY(POINT, 4326),
  location_address TEXT,
  harvest_method TEXT,
  quality_grade TEXT DEFAULT 'A',
  weather_conditions JSONB,
  soil_type TEXT,
  organic_certified BOOLEAN DEFAULT FALSE,
  photos TEXT[],
  certificates TEXT[],
  blockchain_hash TEXT,
  ipfs_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create collectors table if it doesn't exist
CREATE TABLE IF NOT EXISTS collectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  collector_type TEXT NOT NULL CHECK (collector_type IN ('farmer', 'wild_collector')),
  location GEOGRAPHY(POINT, 4326),
  location_address TEXT,
  region TEXT,
  country TEXT DEFAULT 'India',
  specialization TEXT[],
  experience_years INTEGER,
  farm_size_hectares DECIMAL,
  forest_area TEXT,
  ayush_registration TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create processing_stages table if it doesn't exist
CREATE TABLE IF NOT EXISTS processing_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id TEXT REFERENCES herb_collections(collection_id),
  stage_type TEXT NOT NULL,
  processor_name TEXT NOT NULL,
  processor_id TEXT,
  location_address TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  parameters JSONB,
  gmp_compliant BOOLEAN DEFAULT FALSE,
  processing_license TEXT,
  photos TEXT[],
  blockchain_hash TEXT,
  ipfs_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ipfs_documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS ipfs_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cid TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  gateway_url TEXT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blockchain_transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS blockchain_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tx_id TEXT UNIQUE NOT NULL,
  block_number BIGINT,
  transaction_hash TEXT,
  previous_hash TEXT,
  merkle_root TEXT,
  validator TEXT,
  status TEXT DEFAULT 'confirmed',
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE herb_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ipfs_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_transactions ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for now (can be tightened later)
CREATE POLICY "Allow all operations on herb_collections" ON herb_collections FOR ALL USING (true);
CREATE POLICY "Allow all operations on collectors" ON collectors FOR ALL USING (true);
CREATE POLICY "Allow all operations on processing_stages" ON processing_stages FOR ALL USING (true);
CREATE POLICY "Allow all operations on ipfs_documents" ON ipfs_documents FOR ALL USING (true);
CREATE POLICY "Allow all operations on blockchain_transactions" ON blockchain_transactions FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_herb_collections_collector_id ON herb_collections(collector_id);
CREATE INDEX IF NOT EXISTS idx_herb_collections_collection_date ON herb_collections(collection_date);
CREATE INDEX IF NOT EXISTS idx_collectors_user_id ON collectors(user_id);
CREATE INDEX IF NOT EXISTS idx_processing_stages_collection_id ON processing_stages(collection_id);
CREATE INDEX IF NOT EXISTS idx_ipfs_documents_entity ON ipfs_documents(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_transactions_entity ON blockchain_transactions(entity_type, entity_id);