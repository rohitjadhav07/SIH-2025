import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_PERMISSIONS } from '../../types/auth';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: keyof typeof ROLE_PERMISSIONS[keyof typeof ROLE_PERMISSIONS];
  allowedRoles?: Array<keyof typeof ROLE_PERMISSIONS>;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  allowedRoles,
  fallback
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (!user.isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Pending Verification</h2>
          <p className="text-gray-600 mb-4">
            Your account is currently under review by AYUSH regulators. You'll receive an email notification once approved.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Account Details:</strong><br />
              Name: {user.name}<br />
              Role: {user.role}<br />
              Organization: {user.organization}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Deactivated</h2>
          <p className="text-gray-600">
            Your account has been deactivated. Please contact the administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  // Check role-based permissions
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to access this page. Required role: {allowedRoles.join(' or ')}.
          </p>
        </div>
      </div>
    );
  }

  // Check specific permission
  if (requiredPermission) {
    const userPermissions = ROLE_PERMISSIONS[user.role];
    if (!userPermissions[requiredPermission]) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Insufficient Permissions</h2>
            <p className="text-gray-600">
              You don't have the required permissions to access this feature.
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};