import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { carMakes } from '../data/carMakes';

type Car = {
  id: string;
  make_id: string;
  model_id: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  status: 'draft' | 'published' | 'sold' | 'archived';
  created_at: string;
  primary_image?: {
    url: string;
  };
};

function AdminPanel() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          primary_image:car_images(url)
        `)
        .eq('user_id', user?.id)
        .eq('car_images.is_primary', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) throw error;

      setCars(cars.filter(car => car.id !== carId));
      setSuccessMessage('Car deleted successfully');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting car:', error);
      setError('Failed to delete car. Please try again.');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <Link
            to="/admin/car/new"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Car
          </Link>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => {
            const make = carMakes.find(m => m.id === car.make_id);
            const model = make?.models.find(m => m.id === car.model_id);

            return (
              <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={car.primary_image?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={`${make?.name} ${model?.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                    car.status === 'published' ? 'bg-green-500 text-white' :
                    car.status === 'sold' ? 'bg-blue-500 text-white' :
                    car.status === 'archived' ? 'bg-gray-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {make?.name} {model?.name}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    <p>Year: {car.year}</p>
                    <p>Price: KSh {car.price.toLocaleString()}</p>
                    <p>Mileage: {car.mileage.toLocaleString()} km</p>
                    <p>Location: {car.location}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/admin/car/${car.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No cars found. Add your first car listing!</p>
            <Link
              to="/admin/car/new"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              <Plus size={20} />
              Add New Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;