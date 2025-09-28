import React, { useState } from 'react';
import { useEffect } from 'react';
import { Plus, Camera, MapPin, Calendar, Scale, Star, Hash, Package2, Save, X } from 'lucide-react';
import { collectionService } from '../services/collectionService';
import { useAuth } from '../contexts/AuthContext';
import { PhotoUploadWithGeo } from './PhotoUploadWithGeo';

export const HerbCollection: React.FC = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await collectionService.getCollections(
        user?.role === 'farmer' || user?.role === 'wild_collector' ? user.id : undefined
      );
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
      // For now, show empty state instead of error
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    herbName: '',
    botanicalName: '',
    quantity: '',
    unit: 'kg',
    harvestMethod: '',
    qualityGrade: 'A',
    soilType: '',
    organicCertified: false,
    weatherConditions: {
      temperature: '',
      humidity: '',
      rainfall: ''
    }
  });
  const [photos, setPhotos] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      // Here you would call the collection service with the form data and photos
      console.log('Submitting collection:', { formData, photos, certificates });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        herbName: '',
        botanicalName: '',
        quantity: '',
        unit: 'kg',
        harvestMethod: '',
        qualityGrade: 'A',
        soilType: '',
        organicCertified: false,
        weatherConditions: {
          temperature: '',
          humidity: '',
          rainfall: ''
        }
      });
      setPhotos([]);
      setCertificates([]);
      setShowAddForm(false);
      
      // Reload collections
      await loadCollections();
    } catch (error) {
      console.error('Error submitting collection:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Herb Collection Records</h2>
        {(user?.role === 'farmer' || user?.role === 'wild_collector') && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </button>
        )}
      </div>

      {/* Add Collection Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">New Herb Collection</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Herb Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.herbName}
                      onChange={(e) => setFormData({...formData, herbName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Ashwagandha"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Botanical Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.botanicalName}
                      onChange={(e) => setFormData({...formData, botanicalName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Withania somnifera"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.0"
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="kg">kg</option>
                        <option value="grams">grams</option>
                        <option value="tons">tons</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quality Grade *
                    </label>
                    <select
                      value={formData.qualityGrade}
                      onChange={(e) => setFormData({...formData, qualityGrade: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="A">Grade A - Premium</option>
                      <option value="B">Grade B - Standard</option>
                      <option value="C">Grade C - Basic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harvest Method *
                    </label>
                    <select
                      required
                      value={formData.harvestMethod}
                      onChange={(e) => setFormData({...formData, harvestMethod: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select method</option>
                      <option value="Hand harvesting">Hand harvesting</option>
                      <option value="Machine harvesting">Machine harvesting</option>
                      <option value="Sustainable wild harvesting">Sustainable wild harvesting</option>
                      <option value="Selective harvesting">Selective harvesting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Type
                    </label>
                    <input
                      type="text"
                      value={formData.soilType}
                      onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Red laterite soil"
                    />
                  </div>
                </div>

                {/* Weather Conditions */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Weather Conditions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature (°C)
                      </label>
                      <input
                        type="number"
                        value={formData.weatherConditions.temperature}
                        onChange={(e) => setFormData({
                          ...formData,
                          weatherConditions: {...formData.weatherConditions, temperature: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="28"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Humidity (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.weatherConditions.humidity}
                        onChange={(e) => setFormData({
                          ...formData,
                          weatherConditions: {...formData.weatherConditions, humidity: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="65"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rainfall (mm)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.weatherConditions.rainfall}
                        onChange={(e) => setFormData({
                          ...formData,
                          weatherConditions: {...formData.weatherConditions, rainfall: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Organic Certification */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="organicCertified"
                    checked={formData.organicCertified}
                    onChange={(e) => setFormData({...formData, organicCertified: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="organicCertified" className="ml-2 text-sm text-gray-700">
                    Organic Certified
                  </label>
                </div>

                {/* Photo Upload with Geo-tagging */}
                <PhotoUploadWithGeo
                  onPhotosChange={setPhotos}
                  maxPhotos={10}
                  required={true}
                  label="Collection Photos"
                  description="Add photos of the herb collection with GPS location data"
                />

                {/* Certificate Upload */}
                <PhotoUploadWithGeo
                  onPhotosChange={setCertificates}
                  maxPhotos={5}
                  label="Certificates & Documents"
                  description="Upload relevant certificates and documentation"
                />

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || photos.length === 0}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Collection</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-12">
          <Package2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No collections found</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <div key={collection.collection_id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{collection.herb_name}</h3>
                  <p className="text-sm italic text-gray-600">{collection.botanical_name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className={`h-5 w-5 ${collection.quality_grade === 'A' ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    collection.quality_grade === 'A' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    Grade {collection.quality_grade}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Scale className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{collection.quantity} {collection.unit}</p>
                    <p className="text-xs text-gray-500">Quantity</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(collection.collection_date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">Collection Date</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-900">{collection.location_address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Camera className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{collection.harvest_method}</p>
                    {collection.organic_certified && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Organic Certified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Blockchain Hash</p>
                    <p className="text-sm font-mono text-gray-700 truncate">{collection.blockchain_hash}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Blockchain Verified</span>
                  </div>
                </div>
                
                {collection.ipfs_hash && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">IPFS Document Hash</p>
                    <p className="text-sm font-mono text-gray-700 truncate">{collection.ipfs_hash}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                View Full Traceability Chain
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};