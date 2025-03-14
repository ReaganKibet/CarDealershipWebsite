import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft, AlertCircle, CheckCircle, X, Star } from 'lucide-react';
import { carMakes } from '../data/carMakes';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../lib/supabase';
import { uploadCarImage, deleteCarImage } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

type CarFormData = {
  make_id: string;
  model_id: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  description: string;
  specs: {
    engine: string;
    transmission: string;
    drivetrain: string;
    horsepower: string;
    acceleration: string;
  };
  features: string[];
  status: 'draft' | 'published' | 'sold' | 'archived';
};

type CarImage = {
  id?: string;
  url: string;
  is_primary: boolean;
  file?: File;
  storage_path?: string;
};

function CarForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<CarFormData>({
    make_id: '',
    model_id: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    location: '',
    description: '',
    specs: {
      engine: '',
      transmission: '',
      drivetrain: '',
      horsepower: '',
      acceleration: ''
    },
    features: [''],
    status: 'draft'
  });

  const [images, setImages] = useState<CarImage[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [availableModels, setAvailableModels] = useState([] as typeof carMakes[0]['models']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (formData.make_id) {
      const make = carMakes.find(m => m.id === formData.make_id);
      setAvailableModels(make?.models || []);
      if (!make?.models.find(m => m.id === formData.model_id)) {
        setFormData(prev => ({ ...prev, model_id: '' }));
      }
    }
  }, [formData.make_id]);

  useEffect(() => {
    if (isEditMode && id) {
      fetchCarData(id);
    }
  }, [id]);

  const fetchCarData = async (carId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch car data
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single();
      
      if (carError) throw carError;
      
      // Fetch car images
      const { data: imageData, error: imageError } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId);
      
      if (imageError) throw imageError;
      
      setFormData({
        make_id: carData.make_id,
        model_id: carData.model_id,
        year: carData.year,
        price: carData.price,
        mileage: carData.mileage,
        location: carData.location,
        description: carData.description,
        specs: carData.specs,
        features: carData.features,
        status: carData.status
      });
      
      setImages(imageData.map(img => ({
        id: img.id,
        url: img.url,
        is_primary: img.is_primary,
        storage_path: img.storage_path
      })));
    } catch (error) {
      console.error('Error fetching car data:', error);
      setError('Failed to load car data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to save a car listing.');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      let carId = id;
      
      // Create or update car record
      if (isEditMode && carId) {
        const { error } = await supabase
          .from('cars')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', carId);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('cars')
          .insert({
            ...formData,
            user_id: user.id
          })
          .select('id')
          .single();
        
        if (error) throw error;
        carId = data.id;
      }
      
      if (!carId) throw new Error('Failed to get car ID');
      
      // Handle image uploads for new images
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file, index) => {
          const imageUrl = await uploadCarImage(file, carId!);
          
          if (!imageUrl) {
            throw new Error(`Failed to upload image ${index + 1}`);
          }
          
          return {
            car_id: carId,
            url: imageUrl,
            is_primary: index === 0 && images.length === 0, // First image is primary if no existing images
            storage_path: `car-images/${carId}/${file.name}`
          };
        });
        
        const uploadedImages = await Promise.all(uploadPromises);
        
        // Insert image records
        if (uploadedImages.length > 0) {
          const { error } = await supabase
            .from('car_images')
            .insert(uploadedImages);
          
          if (error) throw error;
        }
      }
      
      setSuccessMessage('Car listing saved successfully!');
      
      // Redirect to admin panel after successful save
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error saving car:', error);
      setError('Failed to save car listing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('specs.')) {
      const specName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specName]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImagesChange = (files: File[]) => {
    setImageFiles(files);
    
    // Create preview URLs for the new images
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      is_primary: false,
      file
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    
    // If it's an existing image (has an ID), delete it from storage and database
    if (imageToRemove.id && imageToRemove.storage_path) {
      try {
        // Delete from storage
        await deleteCarImage(imageToRemove.storage_path);
        
        // Delete from database
        const { error } = await supabase
          .from('car_images')
          .delete()
          .eq('id', imageToRemove.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting image:', error);
        setError('Failed to delete image. Please try again.');
        return;
      }
    }
    
    // Remove from state
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    // If it's a new image (has a file), remove from imageFiles
    if (imageToRemove.file) {
      const fileIndex = imageFiles.findIndex(f => f === imageToRemove.file);
      if (fileIndex !== -1) {
        const newFiles = [...imageFiles];
        newFiles.splice(fileIndex, 1);
        setImageFiles(newFiles);
      }
    }
  };

  const setAsPrimaryImage = async (index: number) => {
    if (!id) return;
    
    const imageToSetAsPrimary = images[index];
    
    if (!imageToSetAsPrimary.id) {
      // For new images, just update the state
      const newImages = images.map((img, i) => ({
        ...img,
        is_primary: i === index
      }));
      setImages(newImages);
      return;
    }
    
    try {
      // Update all images to not be primary
      await supabase
        .from('car_images')
        .update({ is_primary: false })
        .eq('car_id', id);
      
      // Set the selected image as primary
      const { error } = await supabase
        .from('car_images')
        .update({ is_primary: true })
        .eq('id', imageToSetAsPrimary.id);
      
      if (error) throw error;
      
      // Update state
      const newImages = images.map((img, i) => ({
        ...img,
        is_primary: i === index
      }));
      setImages(newImages);
    } catch (error) {
      console.error('Error setting primary image:', error);
      setError('Failed to set primary image. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Car Listing' : 'Add New Car'}
          </h1>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)} 
              className="ml-auto text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>{successMessage}</span>
            <button 
              onClick={() => setSuccessMessage(null)} 
              className="ml-auto text-green-800 dark:text-green-200 hover:text-green-600 dark:hover:text-green-400"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Make
                </label>
                <select
                  name="make_id"
                  value={formData.make_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select Make</option>
                  {carMakes.map(make => (
                    <option key={make.id} value={make.id}>{make.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model
                </label>
                <select
                  name="model_id"
                  value={formData.model_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  disabled={!formData.make_id}
                >
                  <option value="">Select Model</option>
                  {availableModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (KSh)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mileage (km)
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="sold">Sold</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                required
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Specifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Engine
                  </label>
                  <input
                    type="text"
                    name="specs.engine"
                    value={formData.specs.engine}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. 2.0L Turbo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transmission
                  </label>
                  <input
                    type="text"
                    name="specs.transmission"
                    value={formData.specs.transmission}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. 8-Speed Automatic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Drivetrain
                  </label>
                  <input
                    type="text"
                    name="specs.drivetrain"
                    value={formData.specs.drivetrain}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. All-Wheel Drive"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Horsepower
                  </label>
                  <input
                    type="text"
                    name="specs.horsepower"
                    value={formData.specs.horsepower}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. 300 hp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Acceleration
                  </label>
                  <input
                    type="text"
                    name="specs.acceleration"
                    value={formData.specs.acceleration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. 0-60 mph in 5.5s"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Features</h3>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Feature
                </button>
              </div>
              
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700"
                    disabled={formData.features.length <= 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Images</h3>
              <ImageUpload images={imageFiles} onImagesChange={handleImagesChange} />
              
              {images.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Current Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className={`w-full h-32 object-cover rounded-lg ${image.is_primary ? 'ring-2 ring-red-600' : ''}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-1 bg-red-600 text-white rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                          {!image.is_primary && (
                            <button
                              type="button"
                              onClick={() => setAsPrimaryImage(index)}
                              className="p-1 bg-blue-600 text-white rounded-full"
                              title="Set as primary image"
                            >
                              <Star size={16} />
                            </button>
                          )}
                        </div>
                        {image.is_primary && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Car
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CarForm;