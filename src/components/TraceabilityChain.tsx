import React, { useState } from 'react';
import { Search, MapPin, Calendar, User, Package, FlaskConical, QrCode, ExternalLink } from 'lucide-react';

export const TraceabilityChain: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrace, setSelectedTrace] = useState<string | null>('P001');

  const traceData = {
    P001: {
      product: {
        name: 'Ashwagandha Premium Powder',
        batchNumber: 'ASH-2024-001',
        manufacturingDate: '2024-01-25',
        expiryDate: '2026-01-24',
        qrCode: 'QR-ASH-2024-001'
      },
      chain: [
        {
          stage: 'Collection',
          date: '2024-01-15',
          location: 'Village Kheda, Gujarat',
          person: 'Raj Patel (Farmer)',
          details: 'Ashwagandha roots harvested at optimal maturity during dormant season',
          coordinates: '23.0225°N, 72.5714°E',
          quantity: '25.5 kg',
          blockchainHash: '0xa4b8c9d2e5f1a7b3c6d9e2f5a8b1c4d7'
        },
        {
          stage: 'Primary Processing',
          date: '2024-01-16',
          location: 'Processing Facility, Anand',
          person: 'Gujarat Processing Unit',
          details: 'Controlled drying at 45-50°C for 7 days, moisture reduced to 8.5%',
          temperature: '45-50°C',
          duration: '7 days',
          blockchainHash: '0xc6d9e0f3a6b9c2d5e8f1a4b7c0d3e6'
        },
        {
          stage: 'Quality Testing',
          date: '2024-01-24',
          location: 'Quality Control Center, Ahmedabad',
          person: 'Quality Labs India',
          details: 'Comprehensive quality analysis - all parameters within limits',
          tests: ['Moisture Content', 'Alkaloid Analysis', 'Heavy Metals', 'Pesticide Residue'],
          results: 'All tests passed - Grade A certified',
          blockchainHash: '0xd7e0f1a4b7c0d3e6f9a2b5c8d1e4f7'
        },
        {
          stage: 'Manufacturing',
          date: '2024-01-25',
          location: 'AyurMed Manufacturing, Mumbai',
          person: 'AyurMed Pharmaceuticals',
          details: 'Fine powdering and packaging in controlled environment',
          batchSize: '500 units (100g each)',
          packagingDate: '2024-01-25',
          blockchainHash: '0xe8f1a2b5c8d1e4f7a0b3c6d9e2f5a8'
        }
      ]
    }
  };

  const currentTrace = selectedTrace ? traceData[selectedTrace as keyof typeof traceData] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Traceability</h2>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Product Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200">
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
          <div className="p-6">
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
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                            
                            {'temperature' in stage && (
                              <div className="text-xs text-gray-600 space-y-1">
                                <p>Temperature: {stage.temperature}</p>
                                <p>Duration: {stage.duration}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Blockchain Hash */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">
                                Blockchain: <span className="font-mono">{stage.blockchainHash}</span>
                              </span>
                            </div>
                            <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                              <span>Verify on Chain</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Trace Queries</h4>
        <div className="space-y-3">
          {['P001', 'P002', 'P003'].map((productId) => (
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
                    {productId === 'P001' ? 'Ashwagandha Premium Powder' : 
                     productId === 'P002' ? 'Brahmi Memory Capsules' : 'Turmeric Gold Tablets'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Batch: {productId === 'P001' ? 'ASH-2024-001' : 
                            productId === 'P002' ? 'BRA-2024-002' : 'TUR-2024-003'}
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Fully Traced
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};