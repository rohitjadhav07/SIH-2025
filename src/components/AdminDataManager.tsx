import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Database, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Save,
  X
} from 'lucide-react';

interface DataTable {
  name: string;
  displayName: string;
  count: number;
  description: string;
}

export const AdminDataManager: React.FC = () => {
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState<string>('user_profiles');
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const tables: DataTable[] = [
    {
      name: 'user_profiles',
      displayName: 'User Profiles',
      count: 0,
      description: 'Manage all user accounts and profiles'
    },
    {
      name: 'herb_collections',
      displayName: 'Herb Collections',
      count: 0,
      description: 'View and manage all herb collection records'
    },
    {
      name: 'processing_stages',
      displayName: 'Processing Stages',
      count: 0,
      description: 'Manage processing and manufacturing stages'
    },
    {
      name: 'formulations',
      displayName: 'Product Formulations',
      count: 0,
      description: 'Manage final product formulations and batches'
    },
    {
      name: 'quality_tests',
      displayName: 'Quality Tests',
      count: 0,
      description: 'View and manage quality test results'
    },
    {
      name: 'regulatory_compliance',
      displayName: 'Compliance Records',
      count: 0,
      description: 'Manage regulatory compliance and certifications'
    },
    {
      name: 'blockchain_transactions',
      displayName: 'Blockchain Transactions',
      count: 0,
      description: 'View blockchain transaction history'
    },
    {
      name: 'collectors',
      displayName: 'Collectors',
      count: 0,
      description: 'Manage farmer and wild collector profiles'
    }
  ];

  useEffect(() => {
    if (selectedTable) {
      loadTableData(selectedTable);
    }
  }, [selectedTable]);

  const loadTableData = async (tableName: string) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual Supabase query
      const mockData = generateMockData(tableName);
      setTableData(mockData);
    } catch (error) {
      console.error('Error loading table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (tableName: string) => {
    switch (tableName) {
      case 'user_profiles':
        return [
          {
            id: '1',
            name: 'Ramesh Patel',
            email: 'ramesh.patel@gmail.com',
            role: 'farmer',
            organization: 'Patel Organic Farms',
            is_verified: true,
            is_active: true,
            created_at: '2024-09-01'
          },
          {
            id: '2',
            name: 'Priya Nair',
            email: 'priya.nair@forestcoop.org',
            role: 'wild_collector',
            organization: 'Kerala Forest Cooperative',
            is_verified: true,
            is_active: true,
            created_at: '2024-09-02'
          }
        ];
      case 'herb_collections':
        return [
          {
            id: '1',
            collection_id: 'COL-2024-001',
            herb_name: 'Ashwagandha',
            botanical_name: 'Withania somnifera',
            quantity: 50,
            unit: 'kg',
            quality_grade: 'A',
            collection_date: '2024-09-15',
            organic_certified: true
          }
        ];
      case 'formulations':
        return [
          {
            id: '1',
            formulation_id: 'FORM-2024-001',
            product_name: 'Ashwagandha Capsules',
            batch_number: 'ASH-2024-001',
            manufacturer: 'Himalaya Drug Company',
            manufacturing_date: '2024-09-20',
            expiry_date: '2026-09-20',
            batch_size: 10000
          }
        ];
      default:
        return [];
    }
  };

  const handleEdit = (row: any) => {
    setEditingRow(row.id);
    setEditData({ ...row });
  };

  const handleSave = async () => {
    try {
      // Simulate save operation
      console.log('Saving data:', editData);
      
      // Update local data
      setTableData(prev => 
        prev.map(item => 
          item.id === editingRow ? { ...editData } : item
        )
      );
      
      setEditingRow(null);
      setEditData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        // Simulate delete operation
        setTableData(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tableData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTable}_export.json`;
    link.click();
  };

  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Database className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
        <p className="mt-1 text-sm text-gray-500">
          Only system administrators can access data management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
              <p className="text-gray-600">Manage all system data and records</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => loadTableData(selectedTable)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {tables.map((table) => (
            <button
              key={table.name}
              onClick={() => setSelectedTable(table.name)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedTable === table.name
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium text-gray-900">{table.displayName}</h3>
              <p className="text-sm text-gray-600 mt-1">{table.description}</p>
              <p className="text-xs text-gray-500 mt-2">{table.count} records</p>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Record</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {filteredData.length > 0 && Object.keys(filteredData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingRow === row.id ? (
                          <input
                            type="text"
                            value={editData[key] || ''}
                            onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          <span>{String(value)}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingRow === row.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(row)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filteredData.length === 0 && !loading && (
            <div className="text-center py-12">
              <Database className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or add a new record.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};