import React, { useState } from 'react';
import { Plus, Thermometer, Droplets, FlaskConical, Package, MapPin, Save, X } from 'lucide-react';
import { REAL_PROCESSING } from '../data/realData';
import { PhotoUploadWithGeo } from './PhotoUploadWithGeo';
import { useAuth } from '../contexts/AuthContext';

export const ProcessingTracker: React.FC = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [processingStages] = useState(REAL_PROCESSING);
  const [formData, setFormData] = useState({
    stage: '',
    processorName: '',
    processorId: '',
    locationAddress: '',
    parameters: {
      temperature: '',
      humidity: '',
      duration: '',
      method: ''
    },
    gmpCompliant: false,
    processingLicense: ''
  });
  const [photos, setPhotos] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      console.log('Submitting processing stage:', { formData, photos });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        stage: '',
        processorName: '',
        processorId: '',
        locationAddress: '',
        parameters: {
          temperature: '',
          humidity: '',
          duration: '',
          method: ''
        },
        gmpCompliant: false,
        processingLicense: ''
      });
      setPhotos([]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error submitting processing stage:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStageIcon = (stage: ProcessingStage['stage']) => {
    switch (stage) {
      case 'drying': return Thermometer;
      case 'cleaning': return Droplets;
      case 'testing': return FlaskConical;
      case 'storage': return Package;
      case 'manufacturing': return Package;
      default: return Package;
    }
  };

  const getStageColor = (stage: ProcessingStage['stage']) => {
    switch (stage) {
      case 'drying': return 'text-orange-600 bg-orange-100';
      case 'cleaning': return 'text-blue-600 bg-blue-100';
      case 'testing': return 'text-purple-600 bg-purple-100';
      case 'storage': return 'text-gray-600 bg-gray-100';
      case 'manufacturing': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Processing & Quality Control</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Processing Stage
        </button>
      </div>

      {/* Add Processing Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Processing Stage</h3>
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
                      Processing Stage *
                    </label>
                    <select
                      required
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select stage</option>
                      <option value="drying">Drying</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="testing">Testing</option>
                      <option value="storage">Storage</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.processorName}
                      onChange={(e) => setFormData({...formData, processorName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Quality Labs India Pvt Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processor ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.processorId}
                      onChange={(e) => setFormData({...formData, processorId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., LAB-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processing License
                    </label>
                    <input
                      type="text"
                      value={formData.processingLicense}
                      onChange={(e) => setFormData({...formData, processingLicense: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., PROC-HAR-2024-001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Address *
                  </label>
                  <textarea
                    required
                    value={formData.locationAddress}
                    onChange={(e) => setFormData({...formData, locationAddress: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Complete processing facility address"
                  />
                </div>

                {/* Processing Parameters */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Processing Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature (°C)
                      </label>
                      <input
                        type="text"
                        value={formData.parameters.temperature}
                        onChange={(e) => setFormData({
                          ...formData,
                          parameters: {...formData.parameters, temperature: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 40°C"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Humidity (%)
                      </label>
                      <input
                        type="text"
                        value={formData.parameters.humidity}
                        onChange={(e) => setFormData({
                          ...formData,
                          parameters: {...formData.parameters, humidity: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 10%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.parameters.duration}
                        onChange={(e) => setFormData({
                          ...formData,
                          parameters: {...formData.parameters, duration: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 48 hours"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Method
                      </label>
                      <input
                        type="text"
                        value={formData.parameters.method}
                        onChange={(e) => setFormData({
                          ...formData,
                          parameters: {...formData.parameters, method: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., controlled air drying"
                      />
                    </div>
                  </div>
                </div>

                {/* GMP Compliance */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gmpCompliant"
                    checked={formData.gmpCompliant}
                    onChange={(e) => setFormData({...formData, gmpCompliant: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="gmpCompliant" className="ml-2 text-sm text-gray-700">
                    GMP Compliant Facility
                  </label>
                </div>

                {/* Photo Upload with Geo-tagging */}
                <PhotoUploadWithGeo
                  onPhotosChange={setPhotos}
                  maxPhotos={10}
                  required={true}
                  label="Processing Photos"
                  description="Add photos of the processing stage with GPS location data"
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
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Processing Stage</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {processingStages.map((stage, index) => {
          const Icon = getStageIcon(stage.stage);
          const colorClass = getStageColor(stage.stage);
          
          return (
            <div key={stage.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {stage.stage.replace('_', ' ').toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">Collection ID: {stage.collectionId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{stage.processorName}</p>
                    <p className="text-xs text-gray-500">
                      {stage.startDate.toLocaleDateString()} - {stage.endDate?.toLocaleDateString() || 'In Progress'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-900">{stage.location.address}</p>
                        <p className="text-xs text-gray-500">{stage.location.region}, {stage.location.country}</p>
                      </div>
                    </div>

                    {stage.qualityTests && stage.qualityTests.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Quality Test Results ({stage.qualityTests.length} tests)
                        </h4>
                        <div className="space-y-2">
                          {stage.qualityTests.map((test) => (
                            <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{test.testType}</p>
                                <p className="text-xs text-gray-500">
                                  {test.testDate.toLocaleDateString()} • {test.certificationBody}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${test.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className={`text-xs font-medium ${test.passed ? 'text-green-600' : 'text-red-600'}`}>
                                  {test.passed ? 'PASSED' : 'FAILED'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Processing Parameters</h4>
                    <div className="space-y-2">
                      {Object.entries(stage.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Blockchain: <span className="font-mono">{stage.blockchainHash}</span>
                      </span>
                    </div>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Processing Stage</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collection ID</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select collection batch</option>
                  <option value="HC2024001">HC2024001 - Ashwagandha (125.5 kg)</option>
                  <option value="HC2024002">HC2024002 - Brahmi (45.3 kg)</option>
                  <option value="HC2024003">HC2024003 - Turmeric (89.7 kg)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processing Stage</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="drying">Drying</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="testing">Quality Testing</option>
                  <option value="storage">Storage</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processor Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Processing facility name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processing Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe processing parameters, conditions, and observations..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};