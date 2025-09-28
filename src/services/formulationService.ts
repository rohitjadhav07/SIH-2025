import { supabase } from '../lib/supabase';
import { blockchainService } from './blockchain';
import { ipfsService } from './ipfs';
import { qrCodeService } from './qrCodeService';
import { v4 as uuidv4 } from 'uuid';

export interface FormulationData {
  productName: string;
  batchNumber: string;
  manufacturingDate: Date;
  expiryDate: Date;
  manufacturer: string;
  manufacturerId: string;
  latitude: number;
  longitude: number;
  locationAddress: string;
  ingredients: {
    collectionId: string;
    herbName: string;
    percentage: number;
    quantity: number;
    source: string;
  }[];
  batchSize: number;
  unitSize: string;
  ayushLicense: string;
  gmpCertification: string;
  fssaiLicense?: string;
  packagingDate?: Date;
  storageConditions?: string;
  dosage?: string;
  contraindications?: string;
  batchRecords: File[];
  certificates: File[];
}

class FormulationService {
  async createFormulation(data: FormulationData): Promise<string> {
    try {
      const formulationId = `FORM${Date.now()}`;
      
      // Upload batch records to IPFS
      const recordUploads = await Promise.all(
        data.batchRecords.map(record => ipfsService.uploadFile(record))
      );
      
      // Upload certificates to IPFS
      const certificateUploads = await Promise.all(
        data.certificates.map(cert => ipfsService.uploadFile(cert))
      );

      // Generate QR code
      const qrCode = `QR-${data.batchNumber}`;
      const qrData = qrCodeService.generateProductQRData({
        id: formulationId,
        name: data.productName,
        batchNumber: data.batchNumber,
        manufacturingDate: data.manufacturingDate.toISOString().split('T')[0],
        expiryDate: data.expiryDate.toISOString().split('T')[0],
        manufacturerId: data.manufacturerId,
        blockchainTxHash: '', // Will be updated after blockchain transaction
        ipfsHash: '', // Will be updated after IPFS upload
      });

      // Create comprehensive metadata
      const metadata = {
        formulationId,
        productInfo: {
          name: data.productName,
          batchNumber: data.batchNumber,
          manufacturingDate: data.manufacturingDate.toISOString(),
          expiryDate: data.expiryDate.toISOString(),
          batchSize: data.batchSize,
          unitSize: data.unitSize,
        },
        manufacturer: {
          name: data.manufacturer,
          id: data.manufacturerId,
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.locationAddress,
          },
        },
        compliance: {
          ayushLicense: data.ayushLicense,
          gmpCertification: data.gmpCertification,
          fssaiLicense: data.fssaiLicense,
        },
        ingredients: data.ingredients,
        usage: {
          storageConditions: data.storageConditions,
          dosage: data.dosage,
          contraindications: data.contraindications,
        },
        documents: {
          batchRecords: recordUploads.map(upload => ({
            cid: upload.cid,
            filename: upload.path,
            size: upload.size,
          })),
          certificates: certificateUploads.map(upload => ({
            cid: upload.cid,
            filename: upload.path,
            size: upload.size,
          })),
        },
        qrCode: qrData,
        timestamp: new Date().toISOString(),
        version: '1.0',
      };

      // Upload metadata to IPFS
      const metadataUpload = await ipfsService.uploadJSON(metadata);

      // Create blockchain transaction
      const blockchainTx = await blockchainService.createFormulationEvent({
        batchId: data.batchNumber,
        productName: data.productName,
        manufacturerId: data.manufacturerId,
        inputCollectionIds: data.ingredients.map(ing => ing.collectionId),
        quantity: data.batchSize,
        ipfsHash: metadataUpload.cid,
      });

      // Store in database
      const { data: formulation, error } = await supabase
        .from('formulations')
        .insert({
          formulation_id: formulationId,
          product_name: data.productName,
          batch_number: data.batchNumber,
          manufacturing_date: data.manufacturingDate.toISOString().split('T')[0],
          expiry_date: data.expiryDate.toISOString().split('T')[0],
          manufacturer: data.manufacturer,
          manufacturer_id: data.manufacturerId,
          location: `POINT(${data.longitude} ${data.latitude})`,
          location_address: data.locationAddress,
          ingredients: data.ingredients,
          batch_size: data.batchSize,
          unit_size: data.unitSize,
          qr_code: qrCode,
          ayush_license: data.ayushLicense,
          gmp_certification: data.gmpCertification,
          fssai_license: data.fssaiLicense,
          packaging_date: data.packagingDate?.toISOString().split('T')[0],
          storage_conditions: data.storageConditions,
          dosage: data.dosage,
          contraindications: data.contraindications,
          blockchain_hash: blockchainTx.txId,
          ipfs_hash: metadataUpload.cid,
        })
        .select()
        .single();

      if (error) throw error;

      // Store IPFS documents
      const ipfsDocuments = [
        ...recordUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'application/pdf',
          gateway_url: upload.url,
          entity_type: 'formulation',
          entity_id: formulationId,
        })),
        ...certificateUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'application/pdf',
          gateway_url: upload.url,
          entity_type: 'formulation',
          entity_id: formulationId,
        })),
        {
          cid: metadataUpload.cid,
          filename: 'formulation_metadata.json',
          file_size: metadataUpload.size,
          mime_type: 'application/json',
          gateway_url: metadataUpload.url,
          entity_type: 'formulation',
          entity_id: formulationId,
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
        entity_type: 'formulation',
        entity_id: formulationId,
      });

      return formulationId;
    } catch (error) {
      console.error('Create formulation error:', error);
      throw error;
    }
  }

  async getFormulations(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('formulations')
        .select(`
          *,
          ipfs_documents (*)
        `)
        .order('manufacturing_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get formulations error:', error);
      throw error;
    }
  }

  async getFormulationById(formulationId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('formulations')
        .select(`
          *,
          ipfs_documents (*)
        `)
        .eq('formulation_id', formulationId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get formulation by ID error:', error);
      throw error;
    }
  }

  async getTraceabilityChain(formulationId: string): Promise<any> {
    try {
      // Get formulation
      const formulation = await this.getFormulationById(formulationId);
      
      // Get all collections used in ingredients
      const collectionIds = formulation.ingredients.map((ing: any) => ing.collectionId);
      
      const { data: collections, error: collectionsError } = await supabase
        .from('herb_collections')
        .select(`
          *,
          collectors (
            *,
            user_profiles (name, organization)
          ),
          processing_stages (
            *,
            quality_tests (*)
          )
        `)
        .in('collection_id', collectionIds);

      if (collectionsError) throw collectionsError;

      return {
        formulation,
        collections: collections || [],
      };
    } catch (error) {
      console.error('Get traceability chain error:', error);
      throw error;
    }
  }
}

export const formulationService = new FormulationService();