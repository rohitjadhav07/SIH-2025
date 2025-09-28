import { create } from 'ipfs-http-client';
import { IPFS_CONFIG } from '../config/constants';

export interface IPFSUploadResult {
  cid: string;
  path: string;
  size: number;
  url: string;
}

export class RealIPFSService {
  private client: any;

  constructor() {
    this.client = create({
      host: IPFS_CONFIG.host,
      port: IPFS_CONFIG.port,
      protocol: IPFS_CONFIG.protocol,
      headers: IPFS_CONFIG.headers
    });
  }

  async uploadFile(file: File): Promise<IPFSUploadResult> {
    try {
      const result = await this.client.add(file, {
        progress: (prog: number) => console.log(`Upload progress: ${prog}`),
        pin: true
      });

      return {
        cid: result.cid.toString(),
        path: result.path,
        size: result.size,
        url: `https://ipfs.io/ipfs/${result.cid.toString()}`
      };
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(data: any): Promise<IPFSUploadResult> {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const result = await this.client.add(jsonString, {
        pin: true
      });

      return {
        cid: result.cid.toString(),
        path: result.path,
        size: result.size,
        url: `https://ipfs.io/ipfs/${result.cid.toString()}`
      };
    } catch (error) {
      console.error('IPFS JSON upload failed:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  async uploadCollectionData(collectionData: {
    herbInfo: any;
    location: any;
    photos: File[];
    certificates: File[];
    metadata: any;
  }): Promise<IPFSUploadResult> {
    try {
      // Upload photos
      const photoUploads = await Promise.all(
        collectionData.photos.map(photo => this.uploadFile(photo))
      );

      // Upload certificates
      const certificateUploads = await Promise.all(
        collectionData.certificates.map(cert => this.uploadFile(cert))
      );

      // Create comprehensive metadata
      const fullMetadata = {
        ...collectionData.metadata,
        herbInfo: collectionData.herbInfo,
        location: collectionData.location,
        photos: photoUploads.map(upload => ({
          cid: upload.cid,
          url: upload.url,
          size: upload.size
        })),
        certificates: certificateUploads.map(upload => ({
          cid: upload.cid,
          url: upload.url,
          size: upload.size
        })),
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      return await this.uploadJSON(fullMetadata);
    } catch (error) {
      console.error('Failed to upload collection data:', error);
      throw new Error('Failed to upload collection data to IPFS');
    }
  }

  async uploadProcessingData(processingData: {
    processType: string;
    parameters: any;
    testReports: File[];
    photos: File[];
    metadata: any;
  }): Promise<IPFSUploadResult> {
    try {
      // Upload test reports
      const reportUploads = await Promise.all(
        processingData.testReports.map(report => this.uploadFile(report))
      );

      // Upload photos
      const photoUploads = await Promise.all(
        processingData.photos.map(photo => this.uploadFile(photo))
      );

      const fullMetadata = {
        ...processingData.metadata,
        processType: processingData.processType,
        parameters: processingData.parameters,
        testReports: reportUploads.map(upload => ({
          cid: upload.cid,
          url: upload.url,
          size: upload.size
        })),
        photos: photoUploads.map(upload => ({
          cid: upload.cid,
          url: upload.url,
          size: upload.size
        })),
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      return await this.uploadJSON(fullMetadata);
    } catch (error) {
      console.error('Failed to upload processing data:', error);
      throw new Error('Failed to upload processing data to IPFS');
    }
  }

  async getFile(cid: string): Promise<any> {
    try {
      const chunks = [];
      for await (const chunk of this.client.cat(cid)) {
        chunks.push(chunk);
      }
      const data = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        data.set(chunk, offset);
        offset += chunk.length;
      }
      return data;
    } catch (error) {
      console.error('Failed to retrieve file from IPFS:', error);
      throw new Error('Failed to retrieve file from IPFS');
    }
  }

  async getJSON(cid: string): Promise<any> {
    try {
      const data = await this.getFile(cid);
      const jsonString = new TextDecoder().decode(data);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to retrieve JSON from IPFS:', error);
      throw new Error('Failed to retrieve JSON from IPFS');
    }
  }

  async pinFile(cid: string): Promise<boolean> {
    try {
      await this.client.pin.add(cid);
      return true;
    } catch (error) {
      console.error('Failed to pin file:', error);
      return false;
    }
  }

  async unpinFile(cid: string): Promise<boolean> {
    try {
      await this.client.pin.rm(cid);
      return true;
    } catch (error) {
      console.error('Failed to unpin file:', error);
      return false;
    }
  }

  getGatewayUrl(cid: string): string {
    return `https://ipfs.io/ipfs/${cid}`;
  }
}

export const realIPFSService = new RealIPFSService();