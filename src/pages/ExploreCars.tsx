import React, { useState } from 'react';
import { Car, Filter, Search, X, Calendar, MapPin, Gauge, DollarSign, Info } from 'lucide-react';
import { carMakes } from '../data/carMakes';

const cars = [
  {
    id: '1',
    makeId: 'bmw',
    modelId: 'm5',
    year: 2024,
    price: 103400,
    mileage: 1500,
    location: 'Los Angeles, CA',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2070',
        isPrimary: true
      }
    ],
    description: 'High-performance luxury sedan with 617 horsepower',
    specs: {
      engine: '4.4L V8 Twin-Turbo',
      transmission: '8-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      horsepower: '617 hp',
      acceleration: '0-60 mph in 3.2s'
    },
    features: [
      'M Sport Differential',
      'Active M Suspension',
      'M Carbon Ceramic Brakes',
      'Premium Merino Leather',
      'Harman Kardon Sound System'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    makeId: 'porsche',
    modelId: '911',
    year: 2024,
    price: 161100,
    mileage: 500,
    location: 'Miami, FL',
    images: [
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070',
        isPrimary: true
      }
    ],
    description: 'Track-focused sports car with naturally aspirated engine',
    specs: {
      engine: '4.0L Flat-6',
      transmission: '7-Speed PDK',
      drivetrain: 'Rear-Wheel Drive',
      horsepower: '502 hp',
      acceleration: '0-60 mph in 3.0s'
    },
    features: [
      'Sport Chrono Package',
      'PCCB Ceramic Brakes',
      'Adaptive Sport Seats',
      'Sport Exhaust System',
      'Rear-Axle Steering'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    makeId: 'mercedes',
    modelId: 'g63',
    year: 2023,
    price: 156450,
    mileage: 2500,
    location: 'New York, NY',
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=2070',
        isPrimary: true
      }
    ],
    description: 'Iconic luxury SUV with powerful performance',
    specs: {
      engine: '4.0L V8 Biturbo',
      transmission: '9-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      horsepower: '577 hp',
      acceleration: '0-60 mph in 4.5s'
    },
    features: [
      'AMG RIDE CONTROL',
      'Nappa Leather Interior',
      'Burmester Surround Sound',
      'AMG Performance Exhaust',
      '22-inch AMG Wheels'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    makeId: 'audi',
    modelId: 'rs6',
    year: 2024,
    price: 145000,
    mileage: 1000,
    location: 'Dubai, UAE',
    images: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070',
        isPrimary: true
      }
    ],
    description: 'High-performance luxury wagon with supercar capabilities',
    specs: {
      engine: '4.0L V8 Twin-Turbo',
      transmission: '8-Speed Automatic',
      drivetrain: 'Quattro All-Wheel Drive',
      horsepower: '591 hp',
      acceleration: '0-60 mph in 3.5s'
    },
    features: [
      'RS Sport Suspension',
      'Carbon Fiber Package',
      'Bang & Olufsen Sound',
      'Matrix LED Headlights',
      'Sport Differential'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    makeId: 'porsche',
    modelId: 'taycan',
    year: 2024,
    price: 185000,
    mileage: 500,
    location: 'Tokyo, Japan',
    images: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070',
        isPrimary: true
      }
    ],
    description: 'All-electric performance sedan with cutting-edge technology',
    specs: {
      engine: 'Dual Electric Motors',
      transmission: '2-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      horsepower: '750 hp',
      acceleration: '0-60 mph in 2.6s'
    },
    features: [
      'Performance Battery Plus',
      'Adaptive Air Suspension',
      'Porsche Dynamic Chassis Control',
      'Premium Package',
      'Sport Chrono Package'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const priceRanges = ['All', 'Under KSh 5M', 'KSh 5M-10M', 'KSh 10M-20M', 'Above KSh 20M'];
const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);
const mileageRanges = ['All', '0-1k', '1k-5k', '5k-10k', '10k-25k', '25k+'];
const bodyTypes = ['All', 'Sedan', 'SUV', 'Coupe', 'Wagon', 'Convertible'];
const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['All', 'Automatic', 'Manual', 'DCT', 'CVT'];
const drivetrains = ['All', 'AWD', 'RWD', 'FWD', '4WD'];
const colors = ['All', 'Black', 'White', 'Silver', 'Blue', 'Red', 'Grey'];

function ExploreCars() {
  const [filters, setFilters] = useState({
    make: 'All',
    model: 'All',
    year: 'All',
    price: 'All',
    mileage: 'All',
    bodyType: 'All',
    fuelType: 'All',
    transmission: 'All',
    drivetrain: 'All',
    color: 'All',
    location: '',
    searchQuery: ''
  });

  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const availableModels = filters.make !== 'All'
    ? carMakes.find(make => make.id === filters.make)?.models || []
    : [];

  const filteredCars = cars.filter(car => {
    const matchesMake = filters.make === 'All' || car.makeId === filters.make;
    const matchesModel = filters.model === 'All' || car.modelId === filters.model;
    const matchesYear = filters.year === 'All' || car.year === parseInt(filters.year);
    const matchesLocation = !filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase());
    
    let matchesMileage = true;
    if (filters.mileage !== 'All') {
      const [min, max] = filters.mileage.split('-').map(v => v.replace('k', '000'));
      const mileage = car.mileage;
      if (max) {
        matchesMileage = mileage >= parseInt(min) && mileage < parseInt(max);
      } else {
        matchesMileage = mileage >= parseInt(min.replace('+', ''));
      }
    }

    let matchesPrice = true;
    if (filters.price === 'Under KSh 5M') matchesPrice = car.price < 5000000;
    else if (filters.price === 'KSh 5M-10M') matchesPrice = car.price >= 5000000 && car.price < 10000000;
    else if (filters.price === 'KSh 10M-20M') matchesPrice = car.price >= 10000000 && car.price < 20000000;
    else if (filters.price === 'Above KSh 20M') matchesPrice = car.price >= 20000000;

    const searchMatches = !filters.searchQuery || 
      car.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesMake && matchesModel && matchesYear && matchesPrice && 
           matchesMileage && matchesLocation && searchMatches;
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'make' ? { model: 'All' } : {})
    }));
  };

  const resetFilters = () => {
    setFilters({
      make: 'All',
      model: 'All',
      year: 'All',
      price: 'All',
      mileage: 'All',
      bodyType: 'All',
      fuelType: 'All',
      transmission: 'All',
      drivetrain: 'All',
      color: 'All',
      location: '',
      searchQuery: ''
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg"
        >
          <Filter size={24} />
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800 overflow-y-auto p-4' : 'hidden lg:block'}`}>
            {showFilters && (
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 dark:text-gray-400">
                  <X size={24} />
                </button>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Make</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.make}
                  onChange={(e) => handleFilterChange('make', e.target.value)}
                >
                  <option value="All">All Makes</option>
                  {carMakes.map(make => (
                    <option key={make.id} value={make.id}>{make.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Model</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.model}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                  disabled={filters.make === 'All'}
                >
                  <option value="All">All Models</option>
                  {availableModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Year</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  <option value="All">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Price Range</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Mileage</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.mileage}
                  onChange={(e) => handleFilterChange('mileage', e.target.value)}
                >
                  {mileageRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Body Type</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.bodyType}
                  onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                >
                  {bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Fuel Type</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                >
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Transmission</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                >
                  {transmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Drivetrain</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.drivetrain}
                  onChange={(e) => handleFilterChange('drivetrain', e.target.value)}
                >
                  {drivetrains.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Color</h3>
                <select
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.color}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Location</h3>
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Vehicles</h1>
                <div className="text-gray-600 dark:text-gray-400">
                  Showing {filteredCars.length} vehicles
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => {
                const make = carMakes.find(m => m.id === car.makeId);
                const model = make?.models.find(m => m.id === car.modelId);
                
                return (
                  <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative">
                      <img 
                        src={car.images[0].url} 
                        alt={`${make?.name} ${model?.name}`} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {make?.name} {model?.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Calendar size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Gauge size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>{car.mileage.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MapPin size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>{car.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Car size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>{car.specs.transmission}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                            <p className="text-xl font-bold text-red-600 dark:text-red-500">
                              KSh {car.price.toLocaleString()}
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedCar(car)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {carMakes.find(m => m.id === selectedCar.makeId)?.name}{' '}
                    {carMakes.find(m => m.id === selectedCar.makeId)?.models.find(m => m.id === selectedCar.modelId)?.name}
                  </h2>
                  <p className="text-xl text-red-600 dark:text-red-500 font-bold mt-2">
                    KSh {selectedCar.price.toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <img 
                src={selectedCar.images[0].url} 
                alt="Car" 
                className="w-full h-96 object-cover rounded-lg mb-6"
              />

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Vehicle Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="text-gray-500 dark:text-gray-400" size={20} />
                      <span>Year: {selectedCar.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Gauge className="text-gray-500 dark:text-gray-400" size={20} />
                      <span>Mileage: {selectedCar.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="text-gray-500 dark:text-gray-400" size={20} />
                      <span>Location: {selectedCar.location}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white">
                    Specifications
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(selectedCar.specs).map(([key, value]) => (
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
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Features</h3>
                  <ul className="space-y-2">
                    {selectedCar.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedCar.description}</p>
                  </div>

                  <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <Car size={20} />
                    Schedule a Test Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreCars;