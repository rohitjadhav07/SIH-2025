import React, { useState } from 'react';
import { Shield, Award, FileCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { REAL_COMPLIANCE_DATA } from '../data/realData';

interface ComplianceCheck {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'expired';
  lastChecked: Date;
  expiryDate?: Date;
  certificateNumber?: string;
  issuingAuthority: string;
  description: string;
}

interface RegulatoryComplianceProps {
  productId?: string;
  batchNumber?: string;
}

export const RegulatoryCompliance: React.FC<RegulatoryComplianceProps> = ({
  productId = 'FORM-2024-001',
  batchNumber = 'ASH-2024-001'
}) => {
  const [complianceChecks] = useState<ComplianceCheck[]>(
    REAL_COMPLIANCE_DATA[productId as keyof typeof REAL_COMPLIANCE_DATA] || []
  );

  const getStatusIcon = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'non-compliant':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'non-compliant':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'expired':
        return 'bg-orange-50 border-orange-200 text-orange-800';
    }
  };

  const getOverallComplianceStatus = () => {
    const hasNonCompliant = complianceChecks.some(check => check.status === 'non-compliant');
    const hasExpired = complianceChecks.some(check => check.status === 'expired');
    const hasPending = complianceChecks.some(check => check.status === 'pending');

    if (hasNonCompliant || hasExpired) return 'non-compliant';
    if (hasPending) return 'pending';
    return 'compliant';
  };

  const overallStatus = getOverallComplianceStatus();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ministry of AYUSH Compliance</h3>
            <p className="text-sm text-gray-600">Product: {productId} | Batch: {batchNumber}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(overallStatus)}`}>
          {getStatusIcon(overallStatus)}
          <span className="font-medium capitalize">
            {overallStatus === 'non-compliant' ? 'Non-Compliant' : 
             overallStatus === 'pending' ? 'Pending Review' : 'Fully Compliant'}
          </span>
        </div>
      </div>

      {complianceChecks.length === 0 && (
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No compliance data available for this product</p>
        </div>
      )}

      <div className="space-y-4">
        {complianceChecks.map((check) => (
          <div key={check.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                {getStatusIcon(check.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{check.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(check.status)}`}>
                {check.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Issuing Authority:</span>
                <p className="font-medium text-gray-900">{check.issuingAuthority}</p>
              </div>
              
              {check.certificateNumber && (
                <div>
                  <span className="text-gray-500">Certificate Number:</span>
                  <p className="font-medium text-gray-900">{check.certificateNumber}</p>
                </div>
              )}
              
              <div>
                <span className="text-gray-500">Last Checked:</span>
                <p className="font-medium text-gray-900">{check.lastChecked.toLocaleDateString()}</p>
              </div>
            </div>

            {check.expiryDate && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Expires:</span>
                  <span className={`text-sm font-medium ${
                    check.expiryDate < new Date() ? 'text-red-600' : 
                    check.expiryDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-orange-600' : 
                    'text-green-600'
                  }`}>
                    {check.expiryDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Compliance Score</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">
              {Math.round((complianceChecks.filter(c => c.status === 'compliant').length / complianceChecks.length) * 100)}%
            </span>
            <p className="text-xs text-gray-500">
              {complianceChecks.filter(c => c.status === 'compliant').length} of {complianceChecks.length} checks passed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};