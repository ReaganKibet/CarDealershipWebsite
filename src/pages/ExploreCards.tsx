import React, { useState } from 'react';
import { Car, Filter, Search } from 'lucide-react';

const carBrands = ['All', 'BMW', 'Mercedes', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini'];
const carTypes = ['All', 'Sedan', 'SUV', 'Sports Car', 'Luxury', 'Electric'];
const priceRanges = ['All', 'Under $50k', '$50k-$100k', '$100k-$200k', '$200k+'];

const cars = [
  {
    id: 1,
    name: 'BMW M5 Competition',
    brand: 'BMW',
    type: 'Sedan',
    price: 103400,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2070',
    description: 'High-performance luxury sedan with 617 horsepower',
  },
  {
    id: 2,
    name: 'Porsche 911 GT3',
    brand: 'Porsche',
    type: 'Sports Car',
    price: 161100,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070',
    description: 'Track-focused sports car with naturally aspirated engine',
  },
  {
    id: 3,
    name: 'Mercedes-AMG G63',
    brand: 'Mercedes',
    type: 'SUV',
    price: 156450,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=2070',
    description: 'Iconic luxury SUV with powerful performance',
  },
  // Add more cars as needed
];

function ExploreCards() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = cars.filter(car => {
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesType = selectedType === 'All' || car.type === selectedType;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;
    
    if (selectedPrice === 'Under $50k') matchesPrice = car.price < 50000;
    else if (selectedPrice === '$50k-$100k') matchesPrice = car.price >= 50000 && car.price < 100000;
    else if (selectedPrice === '$100k-$200k') matchesPrice = car.price >= 100000 && car.price < 200000;
    else if (selectedPrice === '$200k+') matchesPrice = car.price >= 200000;

    return matchesBrand && matchesType && matchesPrice && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Our Collection</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-lg"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {carBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Car size={16} />
                  <span>{car.brand}</span>
                  <span>•</span>
                  <span>{car.type}</span>
                </div>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <p className="text-2xl font-bold text-red-600">${car.price.toLocaleString()}</p>
                <button className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCards;