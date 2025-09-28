import React, { useState } from 'react';
import { MapPin, Calendar, Image, Download, ExternalLink, X, ZoomIn } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  filename: string;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  metadata?: {
    size: number;
    type: string;
  };
}

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  showLocation?: boolean;
  showDownload?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  title = "Photos",
  showLocation = true,
  showDownload = true
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.filename;
    link.click();
  };

  const openInNewTab = (photo: Photo) => {
    window.open(photo.url, '_blank');
  };

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-8">
        <Image className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No photos available</h3>
        <p className="mt-1 text-sm text-gray-500">Photos will appear here when uploaded.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{photos.length} photos</span>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
              <img
                src={photo.url}
                alt={photo.filename}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>

            {/* Photo Actions Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="View full size"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                {showDownload && (
                  <button
                    onClick={() => downloadPhoto(photo)}
                    className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => openInNewTab(photo)}
                  className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Location Badge */}
            {photo.location && showLocation && (
              <div className="absolute top-2 left-2 bg-green-500 text-white px-1 py-0.5 rounded text-xs flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                GPS
              </div>
            )}

            {/* Photo Info */}
            <div className="mt-2 text-xs text-gray-500">
              <div className="truncate" title={photo.filename}>
                {photo.filename}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span>{new Date(photo.timestamp).toLocaleDateString()}</span>
                {photo.metadata && (
                  <span>{formatFileSize(photo.metadata.size)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900">{selectedPhoto.filename}</h4>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.filename}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>

              {/* Photo Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Photo Details</h5>
                  <div className="space-y-1 text-gray-600">
                    <div>Filename: {selectedPhoto.filename}</div>
                    <div>Date: {new Date(selectedPhoto.timestamp).toLocaleString()}</div>
                    {selectedPhoto.metadata && (
                      <>
                        <div>Size: {formatFileSize(selectedPhoto.metadata.size)}</div>
                        <div>Type: {selectedPhoto.metadata.type}</div>
                      </>
                    )}
                  </div>
                </div>

                {selectedPhoto.location && showLocation && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Location Data</h5>
                    <div className="space-y-1 text-gray-600">
                      <div>Latitude: {selectedPhoto.location.latitude.toFixed(6)}</div>
                      <div>Longitude: {selectedPhoto.location.longitude.toFixed(6)}</div>
                      {selectedPhoto.location.address && (
                        <div>Address: {selectedPhoto.location.address}</div>
                      )}
                      <button
                        onClick={() => openGoogleMaps(selectedPhoto.location!.latitude, selectedPhoto.location!.longitude)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 mt-2"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>View on Map</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                {showDownload && (
                  <button
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
                <button
                  onClick={() => openInNewTab(selectedPhoto)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in New Tab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};