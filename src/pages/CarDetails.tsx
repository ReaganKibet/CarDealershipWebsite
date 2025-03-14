import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, Calendar, MapPin, Gauge, DollarSign, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { carMakes } from '../data/carMakes';

type CarDetails = {
  id: string;
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
  images: {
    id: string;
    url: string;
    is_primary: boolean;
  }[];
};

function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (carError) throw carError;

      const { data: imageData, error: imageError } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', id);

      if (imageError) throw imageError;

      const carDetails: CarDetails = {
        ...carData,
        images: imageData || []
      };

      setCar(carDetails);
      setSelectedImage(imageData?.find(img => img.is_primary)?.url || imageData?.[0]?.url || null);
    } catch (error) {
      console.error('Error fetching car details:', error);
      setError('Failed to load car details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'Car not found'}</p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              <ChevronLeft size={20} />
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const make = carMakes.find(m => m.id === car.make_id);
  const model = make?.models.find(m => m.id === car.model_id);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 mb-8"
        >
          <ChevronLeft size={20} />
          Back to Explore
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={selectedImage || car.images[0]?.url}
                alt={`${make?.name} ${model?.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden ${
                      selectedImage === image.url ? 'ring-2 ring-red-600' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${make?.name} ${model?.name}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {make?.name} {model?.name}
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar size={20} />
                <span>Year: {car.year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Gauge size={20} />
                <span>Mileage: {car.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={20} />
                <span>Location: {car.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Car size={20} />
                <span>Status: Available</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={24} className="text-red-600" />
                <span className="text-3xl font-bold text-red-600">
                  KSh {car.price.toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg">
                Contact Seller
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
                <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;