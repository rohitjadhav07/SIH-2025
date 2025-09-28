import { supabase } from '../lib/supabase';
import { blockchainService } from './blockchain';
import { ipfsService } from './ipfs';
import { v4 as uuidv4 } from 'uuid';
import { MOCK_COLLECTIONS } from '../data/mockCollections';

export interface CollectionData {
  herbName: string;
  botanicalName: string;
  quantity: number;
  unit: 'kg' | 'grams' | 'tons';
  collectionDate: Date;
  latitude: number;
  longitude: number;
  locationAddress: string;
  harvestMethod: string;
  qualityGrade: 'A' | 'B' | 'C';
  weatherConditions?: {
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  soilType?: string;
  organicCertified: boolean;
  photos: File[];
  certificates: File[];
}

class CollectionService {
  async createCollection(collectorId: string, data: CollectionData): Promise<string> {
    try {
      const collectionId = `HC${Date.now()}`;
      
      // Upload photos to IPFS
      const photoUploads = await Promise.all(
        data.photos.map(photo => ipfsService.uploadFile(photo))
      );
      
      // Upload certificates to IPFS
      const certificateUploads = await Promise.all(
        data.certificates.map(cert => ipfsService.uploadFile(cert))
      );

      // Create comprehensive metadata for IPFS
      const metadata = {
        collectionId,
        herbInfo: {
          name: data.herbName,
          botanicalName: data.botanicalName,
          quantity: data.quantity,
          unit: data.unit,
          qualityGrade: data.qualityGrade,
        },
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.locationAddress,
        },
        harvestDetails: {
          method: data.harvestMethod,
          date: data.collectionDate.toISOString(),
          weatherConditions: data.weatherConditions,
          soilType: data.soilType,
          organicCertified: data.organicCertified,
        },
        photos: photoUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          size: upload.size,
        })),
        certificates: certificateUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          size: upload.size,
        })),
        timestamp: new Date().toISOString(),
        version: '1.0',
      };

      // Upload metadata to IPFS
      const metadataUpload = await ipfsService.uploadJSON(metadata);

      // Create blockchain transaction
      const blockchainTx = await blockchainService.createCollectionEvent({
        collectionId,
        herbId: data.botanicalName,
        collectorId,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        quantity: data.quantity,
        ipfsHash: metadataUpload.cid,
      });

      // Store in database
      const { data: collection, error } = await supabase
        .from('herb_collections')
        .insert({
          collection_id: collectionId,
          collector_id: collectorId,
          herb_name: data.herbName,
          botanical_name: data.botanicalName,
          quantity: data.quantity,
          unit: data.unit,
          collection_date: data.collectionDate.toISOString(),
          location: `POINT(${data.longitude} ${data.latitude})`,
          location_address: data.locationAddress,
          harvest_method: data.harvestMethod,
          quality_grade: data.qualityGrade,
          weather_conditions: data.weatherConditions,
          soil_type: data.soilType,
          organic_certified: data.organicCertified,
          photos: photoUploads.map(u => u.cid),
          certificates: certificateUploads.map(u => u.cid),
          blockchain_hash: blockchainTx.txId,
          ipfs_hash: metadataUpload.cid,
        })
        .select()
        .single();

      if (error) throw error;

      // Store IPFS documents
      const ipfsDocuments = [
        ...photoUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'image/jpeg',
          gateway_url: upload.url,
          entity_type: 'collection',
          entity_id: collectionId,
        })),
        ...certificateUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'application/pdf',
          gateway_url: upload.url,
          entity_type: 'collection',
          entity_id: collectionId,
        })),
        {
          cid: metadataUpload.cid,
          filename: 'collection_metadata.json',
          file_size: metadataUpload.size,
          mime_type: 'application/json',
          gateway_url: metadataUpload.url,
          entity_type: 'collection',
          entity_id: collectionId,
        },
      ];

      await supabase.from('ipfs_documents').insert(ipfsDocuments);

      // Store blockchain transaction
      await supabase.from('blockchain_transactions').insert({
        tx_id: blockchainTx.txId,
        block_number: blockchainTx.blockNumber,
        transaction_hash: blockchainTx.hash,
        previous_hash: blockchainTx.previousHash,
        merkle_root: blockchainTx.merkleRoot,
        validator: blockchainTx.validator,
        status: blockchainTx.status,
        entity_type: 'collection',
        entity_id: collectionId,
      });

      return collectionId;
    } catch (error) {
      console.error('Create collection error:', error);
      throw error;
    }
  }

  async getCollections(userId?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('herb_collections')
        .select('*')
        .order('collection_date', { ascending: false });

      if (userId) {
        query = query.eq('collector_id', userId);
      }

      const { data, error } = await query;
      
      // If table doesn't exist or other error, use mock data
      if (error) {
        console.warn('Collections table may not exist yet, using mock data:', error.message);
        let mockData = [...MOCK_COLLECTIONS];
        
        // Filter by user ID if provided
        if (userId) {
          mockData = mockData.filter(collection => collection.collector_id === userId);
        }
        
        return mockData;
      }

      return data || [];
    } catch (error) {
      console.error('Get collections error:', error);
      // Return mock data as fallback
      let mockData = [...MOCK_COLLECTIONS];
      
      if (userId) {
        mockData = mockData.filter(collection => collection.collector_id === userId);
      }
      
      return mockData;
    }
  }

  async getCollectionById(collectionId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('herb_collections')
        .select(`
          *,
          collectors (
            *,
            user_profiles (name, organization, phone, email)
          ),
          processing_stages (*),
          ipfs_documents (*)
        `)
        .eq('collection_id', collectionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get collection by ID error:', error);
      throw error;
    }
  }
}

export const collectionService = new CollectionService();