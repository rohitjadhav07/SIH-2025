import React, { useState } from 'react';
import { FileText, Image, Download, Eye, Pin, Hash, Calendar } from 'lucide-react';
import { IPFSDocument } from '../types/blockchain';

interface IPFSDocumentViewerProps {
  document: IPFSDocument;
  title?: string;
}

export const IPFSDocumentViewer: React.FC<IPFSDocumentViewerProps> = ({
  document,
  title = "IPFS Document"
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getFileIcon = () => {
    if (document.mimeType.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-600" />;
    }
    return <FileText className="h-5 w-5 text-gray-600" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    window.open(document.gateway, '_blank');
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getFileIcon()}
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        </div>
        <div className="flex items-center space-x-1">
          {document.pinned && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
              <Pin className="h-3 w-3" />
              <span className="text-xs font-medium">Pinned</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Filename:</span>
          <span className="font-medium text-gray-900 truncate max-w-40" title={document.filename}>
            {document.filename}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Size:</span>
          <span className="text-gray-900">{formatFileSize(document.size)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Type:</span>
          <span className="text-gray-900">{document.mimeType}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Upload Date:</span>
          <span className="text-gray-900">{document.uploadDate.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Hash className="h-4 w-4 text-gray-400" />
          <label className="block text-xs font-medium text-gray-600">IPFS Content ID (CID)</label>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <span className="font-mono text-xs text-gray-900 break-all">{document.cid}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handlePreview}
          className="flex items-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm"
        >
          <Eye className="h-4 w-4" />
          <span>Preview</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{document.filename}</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {document.mimeType.startsWith('image/') ? (
                <img
                  src={document.gateway}
                  alt={document.filename}
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Preview not available for this file type</p>
                  <button
                    onClick={handleDownload}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Download to View
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};