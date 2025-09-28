import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Leaf, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@swasthyachain.gov.in', password: 'admin123' },
    { role: 'Regulator', email: 'regulator@ayush.gov.in', password: 'regulator123' },
    { role: 'Farmer', email: 'ramesh.patel@gmail.com', password: 'farmer123' },
    { role: 'Wild Collector', email: 'priya.nair@forestcoop.org', password: 'collector123' },
    { role: 'Testing Lab', email: 'lab@qualitylabs.com', password: 'lab123' },
    { role: 'Manufacturer', email: 'manufacturing@himalaya.com', password: 'mfg123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="bg-green-600 p-3 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SwasthyaChain</h1>
                <p className="text-sm text-gray-600">Ministry of AYUSH</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Blockchain-Based Botanical Traceability
            </h2>
            <p className="text-gray-600 mb-8">
              Secure, transparent, and immutable tracking of Ayurvedic herbs from collection to consumer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <Shield className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Blockchain Security</h3>
                <p className="text-sm text-gray-600">Immutable records with cryptographic verification</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <Leaf className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900">End-to-End Tracking</h3>
                <p className="text-sm text-gray-600">From farm to pharmacy with complete transparency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
              <p className="text-gray-600 mt-2">Sign in to your SwasthyaChain account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials for Testing:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {demoCredentials.map((cred, index) => (
                  <div key={index} className="bg-white p-2 rounded border hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="font-medium text-gray-900">{cred.role}</div>
                    <div className="text-gray-600">{cred.email}</div>
                    <div className="text-gray-500">{cred.password}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Use any of these credentials to explore different user roles and features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};