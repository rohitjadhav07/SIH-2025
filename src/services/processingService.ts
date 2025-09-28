import { supabase } from '../lib/supabase';
import { blockchainService } from './blockchain';
import { ipfsService } from './ipfs';
import { v4 as uuidv4 } from 'uuid';

export interface ProcessingData {
  collectionId: string;
  stage: 'drying' | 'cleaning' | 'testing' | 'storage' | 'manufacturing';
  processorName: string;
  processorId: string;
  latitude: number;
  longitude: number;
  locationAddress: string;
  startDate: Date;
  endDate?: Date;
  parameters: Record<string, any>;
  gmpCompliant: boolean;
  processingLicense?: string;
  testReports: File[];
  photos: File[];
  qualityTests?: {
    testType: string;
    results: Record<string, any>;
    passed: boolean;
    certificationBody: string;
    certificateNumber?: string;
    labId: string;
  }[];
}

class ProcessingService {
  async createProcessingStage(data: ProcessingData): Promise<string> {
    try {
      const processingId = `PS${Date.now()}`;
      
      // Upload test reports to IPFS
      const reportUploads = await Promise.all(
        data.testReports.map(report => ipfsService.uploadFile(report))
      );
      
      // Upload photos to IPFS
      const photoUploads = await Promise.all(
        data.photos.map(photo => ipfsService.uploadFile(photo))
      );

      // Create comprehensive metadata
      const metadata = {
        processingId,
        stage: data.stage,
        processorInfo: {
          name: data.processorName,
          id: data.processorId,
          license: data.processingLicense,
          gmpCompliant: data.gmpCompliant,
        },
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.locationAddress,
        },
        timeline: {
          startDate: data.startDate.toISOString(),
          endDate: data.endDate?.toISOString(),
        },
        parameters: data.parameters,
        testReports: reportUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          size: upload.size,
        })),
        photos: photoUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          size: upload.size,
        })),
        qualityTests: data.qualityTests || [],
        timestamp: new Date().toISOString(),
        version: '1.0',
      };

      // Upload metadata to IPFS
      const metadataUpload = await ipfsService.uploadJSON(metadata);

      // Create blockchain transaction
      const blockchainTx = await blockchainService.createProcessingEvent({
        processingId,
        collectionId: data.collectionId,
        processorId: data.processorId,
        processType: data.stage,
        parameters: JSON.stringify(data.parameters),
        ipfsHash: metadataUpload.cid,
      });

      // Store in database
      const { data: processing, error } = await supabase
        .from('processing_stages')
        .insert({
          processing_id: processingId,
          collection_id: data.collectionId,
          stage: data.stage,
          processor_name: data.processorName,
          processor_id: data.processorId,
          location: `POINT(${data.longitude} ${data.latitude})`,
          location_address: data.locationAddress,
          start_date: data.startDate.toISOString(),
          end_date: data.endDate?.toISOString(),
          parameters: data.parameters,
          gmp_compliant: data.gmpCompliant,
          processing_license: data.processingLicense,
          blockchain_hash: blockchainTx.txId,
          ipfs_hash: metadataUpload.cid,
        })
        .select()
        .single();

      if (error) throw error;

      // Store quality tests if any
      if (data.qualityTests && data.qualityTests.length > 0) {
        const qualityTestInserts = data.qualityTests.map(test => ({
          test_id: `QT${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          processing_stage_id: processing.id,
          test_type: test.testType,
          test_date: new Date().toISOString(),
          results: test.results,
          passed: test.passed,
          certification_body: test.certificationBody,
          certificate_number: test.certificateNumber,
          lab_id: test.labId,
          nabl_accredited: true,
        }));

        await supabase.from('quality_tests').insert(qualityTestInserts);
      }

      // Store IPFS documents
      const ipfsDocuments = [
        ...reportUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'application/pdf',
          gateway_url: upload.url,
          entity_type: 'processing',
          entity_id: processingId,
        })),
        ...photoUploads.map(upload => ({
          cid: upload.cid,
          filename: upload.path,
          file_size: upload.size,
          mime_type: 'image/jpeg',
          gateway_url: upload.url,
          entity_type: 'processing',
          entity_id: processingId,
        })),
        {
          cid: metadataUpload.cid,
          filename: 'processing_metadata.json',
          file_size: metadataUpload.size,
          mime_type: 'application/json',
          gateway_url: metadataUpload.url,
          entity_type: 'processing',
          entity_id: processingId,
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
        entity_type: 'processing',
        entity_id: processingId,
      });

      return processingId;
    } catch (error) {
      console.error('Create processing stage error:', error);
      throw error;
    }
  }

  async getProcessingStages(collectionId?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('processing_stages')
        .select(`
          *,
          quality_tests (*),
          ipfs_documents (*)
        `)
        .order('start_date', { ascending: false });

      if (collectionId) {
        query = query.eq('collection_id', collectionId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Get processing stages error:', error);
      throw error;
    }
  }
}

export const processingService = new ProcessingService();