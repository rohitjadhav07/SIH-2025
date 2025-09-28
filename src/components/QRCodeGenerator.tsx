import React, { useState, useEffect } from 'react';
import { QrCode, Download, Share2, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  data: {
    productId: string;
    batchNumber: string;
    manufacturingDate: string;
    traceabilityUrl: string;
  };
  size?: number;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  data,
  size = 200
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateQRCode();
  }, [data]);

  const generateQRCode = async () => {
    // Simulate QR code generation
    // In real implementation, use a library like qrcode
    const qrData = JSON.stringify({
      productId: data.productId,
      batchNumber: data.batchNumber,
      manufacturingDate: data.manufacturingDate,
      verifyUrl: data.traceabilityUrl,
      timestamp: new Date().toISOString()
    });

    // Create a simple QR code placeholder
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple pattern as QR code placeholder
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);
      
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < size; i += 10) {
        for (let j = 0; j < size; j += 10) {
          if ((i + j) % 20 === 0) {
            ctx.fillRect(i, j, 8, 8);
          }
        }
      }
      
      // Add corner markers
      ctx.fillStyle = '#000000';
      ctx.fillRect(10, 10, 30, 30);
      ctx.fillRect(size - 40, 10, 30, 30);
      ctx.fillRect(10, size - 40, 30, 30);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(15, 15, 20, 20);
      ctx.fillRect(size - 35, 15, 20, 20);
      ctx.fillRect(15, size - 35, 20, 20);
    }
    
    setQrCodeUrl(canvas.toDataURL());
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `qr-code-${data.productId}-${data.batchNumber}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(data.traceabilityUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Product Traceability - ${data.productId}`,
          text: `Verify the authenticity and traceability of this Ayurvedic product`,
          url: data.traceabilityUrl
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <QrCode className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Product QR Code</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{data.productId}</p>
          <p className="text-xs text-gray-500">Batch: {data.batchNumber}</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {qrCodeUrl && (
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
            <img
              src={qrCodeUrl}
              alt="Product QR Code"
              className="w-48 h-48"
            />
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Scan to verify product authenticity and view complete traceability
          </p>
          <div className="bg-gray-50 rounded p-2 max-w-xs">
            <p className="text-xs font-mono text-gray-700 break-all">
              {data.traceabilityUrl}
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleCopyUrl}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy URL'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">QR Code Information</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <p><span className="font-medium">Product ID:</span> {data.productId}</p>
          <p><span className="font-medium">Batch Number:</span> {data.batchNumber}</p>
          <p><span className="font-medium">Manufacturing Date:</span> {data.manufacturingDate}</p>
          <p><span className="font-medium">Generated:</span> {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};