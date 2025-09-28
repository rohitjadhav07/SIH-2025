import React, { useState } from 'react';
import { Shield, Hash, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { BlockchainTransaction } from '../types/blockchain';

interface BlockchainVerificationProps {
  transaction: BlockchainTransaction;
  entityType: string;
  entityId: string;
}

export const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({
  transaction,
  entityType,
  entityId
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'pending' | 'failed'>('verified');

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <h4 className="text-sm font-medium text-gray-900">Blockchain Verification</h4>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-xs font-medium capitalize">{verificationStatus}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Transaction ID:</span>
          <span className="font-mono text-xs text-gray-900 truncate max-w-32" title={transaction.txId}>
            {transaction.txId}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Block Number:</span>
          <span className="font-medium text-gray-900">#{transaction.blockNumber}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Timestamp:</span>
          <span className="text-gray-900">{transaction.timestamp.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Transaction Hash</label>
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-400" />
              <span className="font-mono text-xs text-gray-900 break-all">{transaction.hash}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Previous Hash</label>
            <span className="font-mono text-xs text-gray-700 break-all">{transaction.previousHash}</span>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Merkle Root</label>
            <span className="font-mono text-xs text-gray-700 break-all">{transaction.merkleRoot}</span>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Validator Node</label>
            <span className="text-xs text-gray-900">{transaction.validator}</span>
          </div>

          <div className="flex space-x-2 pt-2">
            <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100">
              <ExternalLink className="h-3 w-3" />
              <span>View on Explorer</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100">
              <Shield className="h-3 w-3" />
              <span>Verify Signature</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};