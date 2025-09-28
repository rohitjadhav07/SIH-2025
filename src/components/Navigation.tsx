import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Users, 
  Leaf, 
  Package, 
  Activity, 
  Shield, 
  FileText, 
  LogOut,
  User,
  Settings,
  QrCode,
  Database
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { user, logout } = useAuth();

  const isActive = (tab: string) => activeTab === tab;

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { tab: 'dashboard', icon: Home, label: 'Dashboard' }
    ];

    switch (user.role) {
      case 'farmer':
      case 'wild_collector':
        return [
          ...baseItems,
          { tab: 'collection', icon: Leaf, label: 'Herb Collection' },
          { tab: 'traceability', icon: Activity, label: 'My Collections' }
        ];
      
      case 'aggregator':
      case 'processor':
        return [
          ...baseItems,
          { tab: 'collectors', icon: Users, label: 'View Collections' },
          { tab: 'processing', icon: Package, label: 'Processing' },
          { tab: 'traceability', icon: Activity, label: 'Traceability' }
        ];
      
      case 'testing_lab':
        return [
          ...baseItems,
          { tab: 'processing', icon: Package, label: 'Quality Testing' },
          { tab: 'compliance', icon: Shield, label: 'Test Reports' },
          { tab: 'traceability', icon: Activity, label: 'Lab Results' }
        ];
      
      case 'manufacturer':
        return [
          ...baseItems,
          { tab: 'processing', icon: Package, label: 'Manufacturing' },
          { tab: 'products', icon: FileText, label: 'Product Catalog' },
          { tab: 'compliance', icon: Shield, label: 'Compliance' },
          { tab: 'traceability', icon: Activity, label: 'Batch Records' }
        ];
      
      case 'regulator':
        return [
          ...baseItems,
          { tab: 'collectors', icon: Users, label: 'User Registry' },
          { tab: 'collection', icon: Leaf, label: 'Collections' },
          { tab: 'processing', icon: Package, label: 'Processing' },
          { tab: 'products', icon: FileText, label: 'Products' },
          { tab: 'compliance', icon: Shield, label: 'Regulatory Compliance' },
          { tab: 'traceability', icon: Activity, label: 'Full Traceability' }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { tab: 'collectors', icon: Users, label: 'User Management' },
          { tab: 'data-manager', icon: Database, label: 'Data Management' },
          { tab: 'collection', icon: Leaf, label: 'All Collections' },
          { tab: 'processing', icon: Package, label: 'All Processing' },
          { tab: 'products', icon: FileText, label: 'All Products' },
          { tab: 'compliance', icon: Shield, label: 'System Compliance' },
          { tab: 'traceability', icon: Activity, label: 'System Traceability' },
          { tab: 'qr-scanner', icon: QrCode, label: 'QR Scanner' },
          { tab: 'settings', icon: Settings, label: 'System Settings' }
        ];
      
      case 'consumer':
        return [
          ...baseItems,
          { tab: 'products', icon: FileText, label: 'Product Catalog' },
          { tab: 'traceability', icon: Activity, label: 'Verify Products' },
          { tab: 'qr-scanner', icon: QrCode, label: 'QR Scanner' }
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onTabChange('dashboard')}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SwasthyaChain</h1>
                <p className="text-xs text-gray-500">Blockchain Traceability</p>
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.tab)
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </div>

            <button
              onClick={() => onTabChange('profile')}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200 pt-2 pb-3">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange(item.tab)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.tab)
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}