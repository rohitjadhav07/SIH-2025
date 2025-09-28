import React from 'react';
import { Leaf, ArrowLeft, LogIn } from 'lucide-react';

interface PublicHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  showLoginButton?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ 
  showBackButton = false, 
  onBack,
  showLoginButton = true 
}) => {
  const handleBackToMain = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  const handleLogin = () => {
    window.location.href = '/';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={handleBackToMain}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SwasthyaChain</h1>
                <p className="text-xs text-gray-500">Product Verification Portal</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Verify Ayurvedic Products
            </div>
            {showLoginButton && (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>Business Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};