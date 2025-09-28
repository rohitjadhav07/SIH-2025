import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, MapPin, Upload, X, Check, AlertCircle, Image, Loader } from 'lucide-react';

interface PhotoData {
  id: string;
  file: File;
  preview: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
    address?: string;
  };
  metadata: {
    timestamp: string;
    size: number;
    type: string;
    name: string;
  };
}

interface PhotoUploadWithGeoProps {
  onPhotosChange: (photos: PhotoData[]) => void;
  maxPhotos?: number;
  required?: boolean;
  label?: string;
  description?: string;
}

export const PhotoUploadWithGeo: React.FC<PhotoUploadWithGeoProps> = ({
  onPhotosChange,
  maxPhotos = 10,
  required = false,
  label = "Photos",
  description = "Add photos with location data"
}) => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check geolocation permission status
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
      });
    }

    return () => {
      // Cleanup camera stream on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGettingLocation(false);
          setLocationPermission('granted');
          resolve(position);
        },
        (error) => {
          setGettingLocation(false);
          setLocationPermission('denied');
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      // Using a free geocoding service (you might want to use Google Maps API or similar)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const createPhotoData = async (file: File): Promise<PhotoData> => {
    const preview = URL.createObjectURL(file);
    let location;

    try {
      const position = await getCurrentLocation();
      const address = await getAddressFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );

      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
        address
      };
    } catch (error) {
      console.warn('Could not get location:', error);
    }

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      preview,
      location,
      metadata: {
        timestamp: new Date().toISOString(),
        size: file.size,
        type: file.type,
        name: file.name
      }
    };
  };

  const handleFileSelect = async (files: FileList) => {
    const newPhotos: PhotoData[] = [];
    
    for (let i = 0; i < Math.min(files.length, maxPhotos - photos.length); i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const photoData = await createPhotoData(file);
        newPhotos.push(photoData);
      }
    }

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setCameraStream(stream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const file = new File([blob], `photo-${timestamp}.jpg`, { type: 'image/jpeg' });
      
      const photoData = await createPhotoData(file);
      const updatedPhotos = [...photos, photoData];
      
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos);
      
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => {
      if (photo.id === photoId) {
        URL.revokeObjectURL(photo.preview);
        return false;
      }
      return true;
    });
    
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="text-sm text-gray-500">
          {photos.length}/{maxPhotos} photos
        </div>
      </div>

      {/* Camera Capture */}
      {isCapturing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Capture Photo</h3>
              <button
                onClick={stopCamera}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {gettingLocation && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
                  <Loader className="h-3 w-3 mr-1 animate-spin" />
                  Getting location...
                </div>
              )}
              
              {locationPermission === 'granted' && (
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS Active
                </div>
              )}
            </div>
            
            <div className="flex justify-center mt-4">
              <button
                onClick={capturePhoto}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Camera className="h-4 w-4" />
                <span>Capture</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={startCamera}
          disabled={photos.length >= maxPhotos}
          className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600">Take Photo</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={photos.length >= maxPhotos}
          className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600">Upload Photos</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Location Permission Warning */}
      {locationPermission === 'denied' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              Location access denied. Photos will be uploaded without GPS coordinates.
            </span>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={photo.preview}
                  alt="Uploaded photo"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Photo Info Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Location Badge */}
              {photo.location && (
                <div className="absolute top-2 left-2 bg-green-500 text-white px-1 py-0.5 rounded text-xs flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS
                </div>
              )}

              {/* Photo Details */}
              <div className="mt-2 text-xs text-gray-500">
                <div className="flex items-center justify-between">
                  <span>{formatFileSize(photo.metadata.size)}</span>
                  <span>{new Date(photo.metadata.timestamp).toLocaleTimeString()}</span>
                </div>
                {photo.location && (
                  <div className="mt-1 truncate" title={photo.location.address}>
                    📍 {photo.location.address}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Details Modal - You can expand this */}
      {photos.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Photo Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Total Photos: {photos.length}</div>
            <div>Photos with GPS: {photos.filter(p => p.location).length}</div>
            <div>Total Size: {formatFileSize(photos.reduce((sum, p) => sum + p.metadata.size, 0))}</div>
          </div>
        </div>
      )}
    </div>
  );
};