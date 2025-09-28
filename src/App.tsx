import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UserProfile } from './components/UserProfile';
import Navigation from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CollectorRegistry } from './components/CollectorRegistry';
import { HerbCollection } from './components/HerbCollection';
import { ProcessingTracker } from './components/ProcessingTracker';
import { EnhancedTraceabilityChain } from './components/EnhancedTraceabilityChain';
import { ProductCatalog } from './components/ProductCatalog';
import { UserManagement } from './components/UserManagement';
import { RegulatoryCompliance } from './components/RegulatoryCompliance';
import { SystemSettings } from './components/SystemSettings';
import { PublicQRScanner } from './components/PublicQRScanner';
import { AdminDataManager } from './components/AdminDataManager';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPublicScanner, setShowPublicScanner] = useState(false);

  // Check if URL contains public scanner route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/verify' || path.includes('verify')) {
      setShowPublicScanner(true);
    }
  }, []);

  // Show public QR scanner if requested
  if (showPublicScanner) {
    return <PublicQRScanner />;
  }

  // Show loading screen during auth initialization
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        {/* Public Access Banner */}
        <div className="bg-green-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <span>🔍 Verify product authenticity without login</span>
            <button
              onClick={() => setShowPublicScanner(true)}
              className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Scan QR Code
            </button>
          </div>
        </div>
        
        {authMode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  // Show verification pending screen for unverified users
  if (user && !user.isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Account Verification Pending</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your account has been created successfully! Please wait for AYUSH regulator approval before you can access the system.
            </p>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800">
                <strong>Account Details:</strong><br />
                Name: {user.name}<br />
                Email: {user.email}<br />
                Role: {user.role}<br />
                Organization: {user.organization}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={logout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <ProtectedRoute requiredPermission="canAccessDashboard">
            <Dashboard />
          </ProtectedRoute>
        );
      case 'collectors':
        // For admin/regulator: User Management, For others: Collector Registry
        if (user?.role === 'admin' || user?.role === 'regulator') {
          return (
            <ProtectedRoute requiredPermission="canManageUsers">
              <UserManagement />
            </ProtectedRoute>
          );
        }
        return (
          <ProtectedRoute requiredPermission="canViewAllCollections">
            <CollectorRegistry />
          </ProtectedRoute>
        );
      case 'collection':
        return (
          <ProtectedRoute requiredPermission="canCreateCollection">
            <HerbCollection />
          </ProtectedRoute>
        );
      case 'processing':
        return (
          <ProtectedRoute requiredPermission="canViewProcessing">
            <ProcessingTracker />
          </ProtectedRoute>
        );
      case 'traceability':
        return (
          <ProtectedRoute requiredPermission="canVerifyProducts">
            <EnhancedTraceabilityChain />
          </ProtectedRoute>
        );
      case 'products':
        return (
          <ProtectedRoute requiredPermission="canViewProducts">
            <ProductCatalog />
          </ProtectedRoute>
        );
      case 'compliance':
        return (
          <ProtectedRoute requiredPermission="canViewReports">
            <RegulatoryCompliance />
          </ProtectedRoute>
        );
      case 'data-manager':
        return (
          <ProtectedRoute requiredPermission="canManageUsers">
            <AdminDataManager />
          </ProtectedRoute>
        );
      case 'settings':
        return (
          <ProtectedRoute requiredPermission="canManageUsers">
            <SystemSettings />
          </ProtectedRoute>
        );
      case 'qr-scanner':
        return <PublicQRScanner />;
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <ProtectedRoute requiredPermission="canAccessDashboard">
            <Dashboard />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;