import QRCode from 'qrcode';
import CryptoJS from 'crypto-js';

export interface QRCodeData {
  productId: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  manufacturerId: string;
  blockchainTxHash: string;
  ipfsHash: string;
  verificationUrl: string;
  timestamp: string;
}

export class QRCodeService {
  private secretKey = process.env.REACT_APP_QR_SECRET || 'SwasthyaChain2024SecretKey';

  async generateQRCode(data: QRCodeData, size: number = 300): Promise<string> {
    try {
      // Create secure payload
      const payload = {
        ...data,
        hash: this.generateSecurityHash(data)
      };

      const qrData = JSON.stringify(payload);
      
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });

      return qrCodeDataURL;
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  async generateQRCodeBuffer(data: QRCodeData, size: number = 300): Promise<Buffer> {
    try {
      const payload = {
        ...data,
        hash: this.generateSecurityHash(data)
      };

      const qrData = JSON.stringify(payload);
      
      const buffer = await QRCode.toBuffer(qrData, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });

      return buffer;
    } catch (error) {
      console.error('Failed to generate QR code buffer:', error);
      throw new Error('Failed to generate QR code buffer');
    }
  }

  parseQRCode(qrData: string): QRCodeData | null {
    try {
      const payload = JSON.parse(qrData);
      
      // Verify security hash
      const expectedHash = this.generateSecurityHash({
        productId: payload.productId,
        batchNumber: payload.batchNumber,
        manufacturingDate: payload.manufacturingDate,
        expiryDate: payload.expiryDate,
        manufacturerId: payload.manufacturerId,
        blockchainTxHash: payload.blockchainTxHash,
        ipfsHash: payload.ipfsHash,
        verificationUrl: payload.verificationUrl,
        timestamp: payload.timestamp
      });

      if (payload.hash !== expectedHash) {
        throw new Error('QR code verification failed - invalid hash');
      }

      return {
        productId: payload.productId,
        batchNumber: payload.batchNumber,
        manufacturingDate: payload.manufacturingDate,
        expiryDate: payload.expiryDate,
        manufacturerId: payload.manufacturerId,
        blockchainTxHash: payload.blockchainTxHash,
        ipfsHash: payload.ipfsHash,
        verificationUrl: payload.verificationUrl,
        timestamp: payload.timestamp
      };
    } catch (error) {
      console.error('Failed to parse QR code:', error);
      return null;
    }
  }

  private generateSecurityHash(data: Omit<QRCodeData, 'hash'>): string {
    const dataString = JSON.stringify(data, Object.keys(data).sort());
    return CryptoJS.HmacSHA256(dataString, this.secretKey).toString();
  }

  generateVerificationUrl(productId: string, batchNumber: string): string {
    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://swasthyachain.gov.in';
    return `${baseUrl}/verify/${productId}/${batchNumber}`;
  }

  generateProductQRData(product: {
    id: string;
    name: string;
    batchNumber: string;
    manufacturingDate: string;
    expiryDate: string;
    manufacturerId: string;
    blockchainTxHash: string;
    ipfsHash: string;
  }): QRCodeData {
    return {
      productId: product.id,
      batchNumber: product.batchNumber,
      manufacturingDate: product.manufacturingDate,
      expiryDate: product.expiryDate,
      manufacturerId: product.manufacturerId,
      blockchainTxHash: product.blockchainTxHash,
      ipfsHash: product.ipfsHash,
      verificationUrl: this.generateVerificationUrl(product.id, product.batchNumber),
      timestamp: new Date().toISOString()
    };
  }
}

export const qrCodeService = new QRCodeService();