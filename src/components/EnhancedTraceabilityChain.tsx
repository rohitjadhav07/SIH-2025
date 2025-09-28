import React, { useState } from 'react';
import { Search, MapPin, Calendar, User, Package, FlaskConical, QrCode, ExternalLink, Shield, FileText } from 'lucide-react';
import { BlockchainVerification } from './BlockchainVerification';
import { IPFSDocumentViewer } from './IPFSDocumentViewer';
import { QRCodeGenerator } from './QRCodeGenerator';
import { RegulatoryCompliance } from './RegulatoryCompliance';
import { BlockchainTransaction, IPFSDocument } from '../types/blockchain';
import { REAL_FORMULATIONS, REAL_COLLECTIONS, REAL_PROCESSING } from '../data/realData';

export const EnhancedTraceabilityChain: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrace, setSelectedTrace] = useState<string | null>('P001');

  const traceData = {
    FORM2024001: {
      product: {
        name: REAL_FORMULATIONS[0].productName,
        batchNumber: REAL_FORMULATIONS[0].batchNumber,
        manufacturingDate: '2024-01-25',
        expiryDate: '2026-01-24',
        qrCode: REAL_FORMULATIONS[0].qrCode,
        ayushLicense: REAL_FORMULATIONS[0].ayushLicense,
        gmpCertification: REAL_FORMULATIONS[0].gmpCertification
      },
      chain: [
        {
          stage: 'Collection',
          date: REAL_COLLECTIONS[0].collectionDate.toLocaleDateString(),
          location: REAL_COLLECTIONS[0].location.address,
          person: 'Ramesh Kumar Patel (Certified Farmer)',
          details: REAL_COLLECTIONS[0].harvestMethod,
          coordinates: `${REAL_COLLECTIONS[0].location.latitude}°N, ${REAL_COLLECTIONS[0].location.longitude}°E`,
          quantity: `${REAL_COLLECTIONS[0].quantity} ${REAL_COLLECTIONS[0].unit}`,
          blockchainTx: {
            txId: 'tx_' + REAL_COLLECTIONS[0].id,
            blockNumber: 12345,
            timestamp: REAL_COLLECTIONS[0].collectionDate,
            hash: REAL_COLLECTIONS[0].blockchainHash,
            previousHash: '0x9f3e8d1c5a7b2e6f9c2d5a8b1e4f7a0b',
            merkleRoot: '0xb5c8e1f4a7d0c3f6b9e2a5d8c1f4a7b0',
            validator: 'peer0.collector.ayurvedic.com',
            status: 'confirmed' as const
          },
          ipfsDocuments: [
            {
              cid: REAL_COLLECTIONS[0].photos[0],
              filename: 'collection_photo_001.jpg',
              size: 2048576,
              mimeType: 'image/jpeg',
              uploadDate: REAL_COLLECTIONS[0].collectionDate,
              pinned: true,
              gateway: `https://ipfs.io/ipfs/${REAL_COLLECTIONS[0].photos[0]}`
            },
            {
              cid: REAL_COLLECTIONS[0].ipfsHash,
              filename: 'organic_certificate.pdf',
              size: 512000,
              mimeType: 'application/pdf',
              uploadDate: REAL_COLLECTIONS[0].collectionDate,
              pinned: true,
              gateway: `https://ipfs.io/ipfs/${REAL_COLLECTIONS[0].ipfsHash}`
            }
          ]
        },
        {
          stage: 'Primary Processing',
          date: REAL_PROCESSING[0].startDate.toLocaleDateString(),
          location: REAL_PROCESSING[0].location.address,
          person: REAL_PROCESSING[0].processorName,
          details: `${REAL_PROCESSING[0].parameters.method} - ${REAL_PROCESSING[0].parameters.duration}`,
          temperature: REAL_PROCESSING[0].parameters.temperature,
          duration: REAL_PROCESSING[0].parameters.duration,
          blockchainTx: {
            txId: 'tx_' + REAL_PROCESSING[0].id,
            blockNumber: 12346,
            timestamp: REAL_PROCESSING[0].startDate,
            hash: REAL_PROCESSING[0].blockchainHash,
            previousHash: REAL_COLLECTIONS[0].blockchainHash,
            merkleRoot: '0xd7e0f1a4b7c0d3e6f9a2b5c8d1e4f7a0',
            validator: 'peer0.manufacturer.ayurvedic.com',
            status: 'confirmed' as const
          },
          ipfsDocuments: [
            {
              cid: REAL_PROCESSING[0].ipfsHash,
              filename: 'processing_parameters.json',
              size: 4096,
              mimeType: 'application/json',
              uploadDate: REAL_PROCESSING[0].startDate,
              pinned: true,
              gateway: `https://ipfs.io/ipfs/${REAL_PROCESSING[0].ipfsHash}`
            }
          ]
        },
        {
          stage: 'Quality Testing',
          date: REAL_PROCESSING[1].startDate.toLocaleDateString(),
          location: REAL_PROCESSING[1].location.address,
          person: REAL_PROCESSING[1].processorName,
          details: 'Comprehensive quality analysis using HPLC, ICP-MS methods',
          tests: REAL_PROCESSING[1].parameters.tests,
          results: 'All tests passed - Grade A certified - NABL Accredited',
          blockchainTx: {
            txId: 'tx_' + REAL_PROCESSING[1].id,
            blockNumber: 12347,
            timestamp: REAL_PROCESSING[1].startDate,
            hash: REAL_PROCESSING[1].blockchainHash,
            previousHash: REAL_PROCESSING[0].blockchainHash,
            merkleRoot: '0xe8f1a2b5c8d1e4f7a0b3c6d9e2f5a8b1',
            validator: 'peer0.lab.ayurvedic.com',
            status: 'confirmed' as const
          },
          ipfsDocuments: [
            {
              cid: REAL_PROCESSING[1].ipfsHash,
              filename: 'quality_test_report.pdf',
              size: 1024000,
              mimeType: 'application/pdf',
              uploadDate: REAL_PROCESSING[1].endDate!,
              pinned: true,
              gateway: `https://ipfs.io/ipfs/${REAL_PROCESSING[1].ipfsHash}`
            }
          ]
        },
        {
          stage: 'Manufacturing',
          date: REAL_FORMULATIONS[0].manufacturingDate.toLocaleDateString(),
          location: REAL_FORMULATIONS[0].location.address,
          person: REAL_FORMULATIONS[0].manufacturer,
          details: `Fine powdering and packaging in GMP facility - ${REAL_FORMULATIONS[0].unitSize}`,
          batchSize: `${REAL_FORMULATIONS[0].batchSize} units`,
          packagingDate: REAL_FORMULATIONS[0].packagingDate.toLocaleDateString(),
          blockchainTx: {
            txId: 'tx_' + REAL_FORMULATIONS[0].id,
            blockNumber: 12348,
            timestamp: REAL_FORMULATIONS[0].manufacturingDate,
            hash: REAL_FORMULATIONS[0].blockchainHash,
            previousHash: REAL_PROCESSING[1].blockchainHash,
            merkleRoot: '0xf9a2b3c6d9e2f5a8b1c4d7e0f3a6b9c2',
            validator: 'peer0.regulator.ayurvedic.com',
            status: 'confirmed' as const
          },
          ipfsDocuments: [
            {
              cid: REAL_FORMULATIONS[0].ipfsHash,
              filename: 'manufacturing_batch_record.pdf',
              size: 768000,
              mimeType: 'application/pdf',
              uploadDate: REAL_FORMULATIONS[0].packagingDate,
              pinned: true,
              gateway: `https://ipfs.io/ipfs/${REAL_FORMULATIONS[0].ipfsHash}`
            }
          ]
        }
      ]
    }
  };

  const currentTrace = selectedTrace ? traceData[selectedTrace as keyof typeof traceData] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SwasthyaChain Product Traceability</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product code, batch number, or QR code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {currentTrace && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Traceability Chain */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentTrace.product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Batch: {currentTrace.product.batchNumber}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Mfg: {currentTrace.product.manufacturingDate}</span>
                    <span>Exp: {currentTrace.product.expiryDate}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-green-200">
                    <QrCode className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-gray-700">{currentTrace.product.qrCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traceability Chain */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Complete Traceability Chain</h4>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {currentTrace.chain.map((stage, index) => (
                    <div key={index} className="relative flex items-start space-x-6">
                      {/* Timeline Dot */}
                      <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-sm relative z-10"></div>
                      
                      {/* Stage Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="text-lg font-medium text-gray-900">{stage.stage}</h5>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {stage.date}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{stage.location}</p>
                                  {'coordinates' in stage && (
                                    <p className="text-xs text-gray-500">{stage.coordinates}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <p className="text-sm text-gray-700">{stage.person}</p>
                              </div>
                              
                              {'quantity' in stage && (
                                <div className="flex items-center space-x-2">
                                  <Package className="h-4 w-4 text-gray-400" />
                                  <p className="text-sm text-gray-700">{stage.quantity}</p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-700 mb-3">{stage.details}</p>
                              
                              {'tests' in stage && stage.tests && (
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-gray-600 mb-1">Quality Tests:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {stage.tests.map((test, testIndex) => (
                                      <span key={testIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                        {test}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Blockchain Verification */}
                          <BlockchainVerification
                            transaction={stage.blockchainTx}
                            entityType={stage.stage}
                            entityId={`${selectedTrace}_${index}`}
                          />

                          {/* IPFS Documents */}
                          {stage.ipfsDocuments && stage.ipfsDocuments.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <h6 className="text-sm font-medium text-gray-700">Associated Documents</h6>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {stage.ipfsDocuments.map((doc, docIndex) => (
                                  <IPFSDocumentViewer
                                    key={docIndex}
                                    document={doc}
                                    title={`${stage.stage} Document ${docIndex + 1}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code Generator */}
            <QRCodeGenerator
              data={{
                productId: selectedTrace || '',
                batchNumber: currentTrace.product.batchNumber,
                manufacturingDate: currentTrace.product.manufacturingDate,
                traceabilityUrl: `https://verify.swasthyachain.gov.in/trace/${selectedTrace}`
              }}
            />

            {/* Regulatory Compliance */}
            <RegulatoryCompliance
              productId={selectedTrace || ''}
              batchNumber={currentTrace.product.batchNumber}
            />
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Trace Queries</h4>
        <div className="space-y-3">
          {['FORM2024001', 'FORM2024002', 'FORM2024003'].map((productId, index) => (
            <div
              key={productId}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedTrace === productId ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedTrace(productId)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {index === 0 ? REAL_FORMULATIONS[0]?.productName : 
                     index === 1 ? REAL_FORMULATIONS[1]?.productName : 'Turmeric Gold Tablets'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Batch: {index === 0 ? REAL_FORMULATIONS[0]?.batchNumber : 
                            index === 1 ? REAL_FORMULATIONS[1]?.batchNumber : 'TUR-SC-2024-003'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Blockchain Verified
                  </span>
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};