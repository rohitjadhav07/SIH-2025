import React, { useState } from 'react';
import { Plus, QrCode, Calendar, MapPin, Award, Package, Save, X } from 'lucide-react';
import { REAL_FORMULATIONS } from '../data/realData';
import { PhotoUploadWithGeo } from './PhotoUploadWithGeo';
import { useAuth } from '../contexts/AuthContext';

export const ProductCatalog: React.FC = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    manufacturer: '',
    locationAddress: '',
    batchSize: '',
    unitSize: '',
    ayushLicense: '',
    gmpCertification: '',
    fssaiLicense: '',
    storageConditions: '',
    dosage: '',
    contraindications: '',
    ingredients: [{ name: '', percentage: '', source: '' }]
  });
  const [photos, setPhotos] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', percentage: '', source: '' }]
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      console.log('Submitting product:', { formData, photos });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        productName: '',
        batchNumber: '',
        manufacturingDate: '',
        expiryDate: '',
        manufacturer: '',
        locationAddress: '',
        batchSize: '',
        unitSize: '',
        ayushLicense: '',
        gmpCertification: '',
        fssaiLicense: '',
        storageConditions: '',
        dosage: '',
        contraindications: '',
        ingredients: [{ name: '', percentage: '', source: '' }]
      });
      setPhotos([]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const products = REAL_FORMULATIONS.map(formulation => ({
    id: formulation.id,
    name: formulation.productName,
    batchNumber: formulation.batchNumber,
    manufacturingDate: formulation.manufacturingDate.toISOString().split('T')[0],
    expiryDate: formulation.expiryDate.toISOString().split('T')[0],
    manufacturer: formulation.manufacturer,
    location: `${formulation.location.region}, ${formulation.location.country}`,
    ingredients: formulation.ingredients.map(ing => ({
      name: ing.herbName,
      percentage: ing.percentage,
      source: ing.source
    })),
    certifications: [
      'AYUSH Licensed',
      'GMP Certified',
      'FSSAI Approved',
      ...(formulation.ingredients.some(ing => ing.source === 'Gujarat') ? ['Organic Certified'] : [])
    ],
    qrCode: formulation.qrCode,
    status: 'In Stock',
    unitsProduced: formulation.batchSize,
    unitSize: formulation.unitSize,
    ayushLicense: formulation.ayushLicense,
    gmpCertification: formulation.gmpCertification
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
        {(user?.role === 'manufacturer' || user?.role === 'admin') && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </button>
        )}
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Product Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.productName}
                      onChange={(e) => setFormData({...formData, productName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Ashwagandha Capsules"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.batchNumber}
                      onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., ASH-2024-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturing Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.manufacturingDate}
                      onChange={(e) => setFormData({...formData, manufacturingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturer *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.manufacturer}
                      onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Himalaya Drug Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch Size *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.batchSize}
                      onChange={(e) => setFormData({...formData, batchSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturing Location *
                  </label>
                  <textarea
                    required
                    value={formData.locationAddress}
                    onChange={(e) => setFormData({...formData, locationAddress: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Complete manufacturing facility address"
                  />
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Ingredients</h4>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          placeholder="Ingredient name"
                          value={ingredient.name}
                          onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Percentage"
                          value={ingredient.percentage}
                          onChange={(e) => updateIngredient(index, 'percentage', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Source"
                          value={ingredient.source}
                          onChange={(e) => updateIngredient(index, 'source', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AYUSH License *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ayushLicense}
                      onChange={(e) => setFormData({...formData, ayushLicense: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., AYUSH-MFG-KAR-2024-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GMP Certification *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.gmpCertification}
                      onChange={(e) => setFormData({...formData, gmpCertification: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., GMP-CERT-2024-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      FSSAI License
                    </label>
                    <input
                      type="text"
                      value={formData.fssaiLicense}
                      onChange={(e) => setFormData({...formData, fssaiLicense: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., FSSAI-LIC-2024-001"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Conditions
                    </label>
                    <textarea
                      value={formData.storageConditions}
                      onChange={(e) => setFormData({...formData, storageConditions: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Store in cool, dry place below 25°C"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosage Instructions
                    </label>
                    <textarea
                      value={formData.dosage}
                      onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 1-2 capsules twice daily after meals"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraindications
                  </label>
                  <textarea
                    value={formData.contraindications}
                    onChange={(e) => setFormData({...formData, contraindications: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Not recommended during pregnancy and lactation"
                  />
                </div>

                {/* Photo Upload with Geo-tagging */}
                <PhotoUploadWithGeo
                  onPhotosChange={setPhotos}
                  maxPhotos={15}
                  required={true}
                  label="Product Photos"
                  description="Add photos of the product, packaging, and manufacturing facility with GPS location data"
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
                        <span>Save Product</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Product Header */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Batch: {product.batchNumber}</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <QrCode className="h-8 w-8 text-green-600 mx-auto" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 mt-1">{product.qrCode}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Manufacturing</p>
                    <p className="text-sm font-medium text-gray-900">{product.manufacturingDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Batch Size</p>
                    <p className="text-sm font-medium text-gray-900">
                      {product.unitsProduced.toLocaleString()} {product.unitSize}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.manufacturer}
                  </p>
                  <p className="text-xs text-gray-500">{product.location}</p>
                  <p className="text-xs text-gray-400">
                    License: {product.ayushLicense}
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients</h4>
                <div className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ingredient.name}</p>
                        <p className="text-xs text-gray-500">Source: {ingredient.source}</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">{ingredient.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium text-gray-700">Certifications</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Status: {product.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Expires</p>
                    <p className="text-sm font-medium text-gray-900">{product.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex-1 text-sm text-green-600 hover:text-green-700 font-medium">
                  View Traceability
                </button>
                <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Generate Labels
                </button>
                <button className="flex-1 text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Download QR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Product</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Turmeric Gold Capsules"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="TUR-2024-001"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units to Produce</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Manufacturing facility name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Collection Batch</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select collection batch</option>
                  <option value="HC2024001">HC2024001 - Ashwagandha (125.5 kg available)</option>
                  <option value="HC2024002">HC2024002 - Brahmi (45.3 kg available)</option>
                  <option value="HC2024003">HC2024003 - Turmeric (89.7 kg available)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Ingredients</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded p-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">HC001 - Ashwagandha (25.5 kg available)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">HC002 - Brahmi (12.3 kg available)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Formulation Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the formulation process, proportions, and special instructions..."
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
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};