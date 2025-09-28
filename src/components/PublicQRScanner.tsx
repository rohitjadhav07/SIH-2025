import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Search, Package, MapPin, Calendar, Shield, Leaf, Factory, TestTube, Award, ExternalLink, Download } from 'lucide-react';
import { PublicHeader } from './PublicHeader';

interface ProductTraceability {
  formulation: {
    formulation_id: string;
    product_name: string;
    batch_number: string;
    manufacturing_date: string;
    expiry_date: string;
    manufacturer: string;
    qr_code: string;
    ingredients: any[];
    ayush_license: string;
    gmp_certification: string;
  };
  collections: any[];
  processing: any[];
  compliance: any[];
  blockchain: any[];
}

export const PublicQRScanner: React.FC = () => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<ProductTraceability | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<'manual' | 'camera'>('manual');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const searchProduct = async (qrCodeValue: string) => {
    if (!qrCodeValue.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual API
      const mockData: ProductTraceability = {
        formulation: {
          formulation_id: 'FORM-2024-001',
          product_name: 'Ashwagandha Capsules',
          batch_number: 'ASH-2024-001',
          manufacturing_date: '2024-09-20',
          expiry_date: '2026-09-20',
          manufacturer: 'Himalaya Drug Company',
          qr_code: qrCodeValue,
          ingredients: [
            { name: 'Ashwagandha Extract', percentage: 95, source: 'COL-2024-001' },
            { name: 'Excipients', percentage: 5 }
          ],
          ayush_license: 'AYUSH-MFG-KAR-2024-001',
          gmp_certification: 'GMP-CERT-2024-001'
        },
        collections: [
          {
            collection_id: 'COL-2024-001',
            herb_name: 'Ashwagandha',
            botanical_name: 'Withania somnifera',
            quantity: 50,
            unit: 'kg',
            collection_date: '2024-09-15',
            location_address: 'Field No. 3, Patel Organic Farms, Gujarat',
            collector_name: 'Ramesh Patel',
            quality_grade: 'A',
            organic_certified: true
          }
        ],
        processing: [
          {
            processing_id: 'PROC-2024-001',
            stage: 'drying',
            processor_name: 'Quality Labs India Pvt Ltd',
            start_date: '2024-09-16',
            end_date: '2024-09-18',
            gmp_compliant: true
          }
        ],
        compliance: [
          {
            compliance_name: 'AYUSH Manufacturing License',
            status: 'compliant',
            certificate_number: 'AYUSH-MFG-KAR-2024-001',
            issuing_authority: 'Ministry of AYUSH'
          }
        ],
        blockchain: [
          {
            tx_id: 'tx_collection_001',
            block_number: 1001,
            transaction_hash: '0x1234567890abcdef',
            status: 'confirmed'
          }
        ]
      };
      
      setProductData(mockData);
    } catch (err) {
      setError('Product not found or invalid QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = () => {
    searchProduct(qrCode);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [scanMode]);

  const downloadCertificate = () => {
    // Simulate certificate download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Certificate of Authenticity\n\nProduct: ' + productData?.formulation.product_name;
    element.download = 'certificate.txt';
    element.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <PublicHeader showBackButton={true} showLoginButton={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scanner Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center mb-6">
            <QrCode className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Product Verification</h2>
            <p className="text-gray-600 mt-2">
              Scan QR code or enter product code to verify authenticity and view complete traceability
            </p>
          </div>

          {/* Scan Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setScanMode('manual')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  scanMode === 'manual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setScanMode('camera')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  scanMode === 'camera'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Camera Scan
              </button>
            </div>
          </div>

          {/* Manual Entry */}
          {scanMode === 'manual' && (
            <div className="max-w-md mx-auto">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="Enter QR code or product ID"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <button
                  onClick={handleManualSearch}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Camera Scanner */}
          {scanMode === 'camera' && (
            <div className="max-w-md mx-auto">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-green-500"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-green-500"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-green-500"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-green-500"></div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Position QR code within the frame
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}
        </div>

        {/* Product Information */}
        {productData && (
          <div className="space-y-6">
            {/* Product Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{productData.formulation.product_name}</h3>
                  <p className="text-gray-600">Batch: {productData.formulation.batch_number}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">Verified Authentic</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Factory className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manufacturer</p>
                    <p className="text-sm text-gray-600">{productData.formulation.manufacturer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manufacturing Date</p>
                    <p className="text-sm text-gray-600">{new Date(productData.formulation.manufacturing_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expiry Date</p>
                    <p className="text-sm text-gray-600">{new Date(productData.formulation.expiry_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                Ingredients & Sources
              </h4>
              <div className="space-y-3">
                {productData.formulation.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{ingredient.name}</p>
                      {ingredient.source && (
                        <p className="text-sm text-gray-600">Source: {ingredient.source}</p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{ingredient.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traceability Chain */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Supply Chain Traceability
              </h4>
              
              <div className="space-y-4">
                {/* Collection */}
                {productData.collections.map((collection, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-gray-900">Collection</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Grade {collection.quality_grade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{collection.herb_name}</strong> ({collection.botanical_name})
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Collected by: {collection.collector_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Location: {collection.location_address}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(collection.collection_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}

                {/* Processing */}
                {productData.processing.map((process, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TestTube className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Processing - {process.stage}</span>
                      {process.gmp_compliant && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          GMP Compliant
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Processor: {process.processor_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Period: {new Date(process.start_date).toLocaleDateString()} - {new Date(process.end_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Certifications & Compliance
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData.compliance.map((cert, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{cert.compliance_name}</h5>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Certificate: {cert.certificate_number}
                    </p>
                    <p className="text-sm text-gray-600">
                      Authority: {cert.issuing_authority}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-600" />
                Blockchain Verification
              </h4>
              
              <div className="space-y-3">
                {productData.blockchain.map((tx, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Transaction: {tx.tx_id}</p>
                        <p className="text-sm text-gray-600">Block: {tx.block_number}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {tx.status}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadCertificate}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Certificate</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-4 w-4" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sample QR Codes for Testing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample QR Codes for Testing</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setQrCode('QR-ASH-2024-001');
                searchProduct('QR-ASH-2024-001');
              }}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <p className="font-medium text-gray-900">Ashwagandha Capsules</p>
              <p className="text-sm text-gray-600">QR-ASH-2024-001</p>
            </button>
            <button
              onClick={() => {
                setQrCode('QR-TUR-2024-002');
                searchProduct('QR-TUR-2024-002');
              }}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <p className="font-medium text-gray-900">Turmeric Powder</p>
              <p className="text-sm text-gray-600">QR-TUR-2024-002</p>
            </button>
            <button
              onClick={() => {
                setQrCode('QR-BRA-2024-003');
                searchProduct('QR-BRA-2024-003');
              }}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
            >
              <p className="font-medium text-gray-900">Brahmi Extract</p>
              <p className="text-sm text-gray-600">QR-BRA-2024-003</p>
            </button>
          </div>
        </div>

        {/* Footer with Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Are you a business stakeholder?</h4>
            <p className="text-gray-600 mb-4">
              Access the full SwasthyaChain platform to manage your supply chain operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <span>Access Business Dashboard</span>
              </button>
              <button
                onClick={() => window.location.href = '/?mode=register'}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <span>Register Your Business</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              For farmers, processors, manufacturers, testing labs, and regulators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};