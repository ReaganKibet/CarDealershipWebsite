import React from 'react';
import { Car, ChevronRight, Shield, Star, PenTool as Tool, DollarSign, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=3283")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Experience Luxury with Wilphil Imports
                </h1>
                <p className="text-lg sm:text-xl mb-8 text-gray-200">
                  Your premier destination for exclusive luxury and performance vehicles. 
                  Direct imports from Japan, UK, and Thailand.
                </p>
                <Link 
                  to="/explore" 
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  Explore Our Collection <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Featured Imports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
                name: "BMW M5 Competition",
                origin: "Japan Import",
                specs: {
                  horsepower: "617 hp",
                  torque: "553 lb-ft",
                  fuelEconomy: "15/21 mpg",
                  interior: "Premium Merino Leather"
                },
                cnfPrice: "KSh 8,500,000",
                fullPrice: "KSh 12,300,000",
                offer: "Free Shipping"
              },
              {
                image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
                name: "Porsche 911 GT3",
                origin: "UK Import",
                specs: {
                  horsepower: "502 hp",
                  torque: "346 lb-ft",
                  fuelEconomy: "14/18 mpg",
                  interior: "Race-Tex® Sport Seats"
                },
                cnfPrice: "KSh 15,200,000",
                fullPrice: "KSh 19,800,000",
                offer: "0% Finance"
              },
              {
                image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
                name: "Mercedes-AMG G63",
                origin: "Thailand Import",
                specs: {
                  horsepower: "577 hp",
                  torque: "627 lb-ft",
                  fuelEconomy: "13/16 mpg",
                  interior: "Nappa Leather"
                },
                cnfPrice: "KSh 12,800,000",
                fullPrice: "KSh 16,500,000",
                offer: "Free Registration"
              }
            ].map((car, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm">
                    {car.offer}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{car.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{car.origin}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Horsepower</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.specs.horsepower}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Torque</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.specs.torque}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Fuel Economy</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.specs.fuelEconomy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Interior</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.specs.interior}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">CNF Price:</span>
                      <span className="font-bold text-red-600 dark:text-red-500">{car.cnfPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Full Price:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{car.fullPrice}</span>
                    </div>
                  </div>
                  <Link 
                    to="/explore" 
                    className="w-full bg-gray-900 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Car size={20} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Import Process */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Our Import Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Vehicle Selection</h3>
              <p className="text-gray-600 dark:text-gray-400">Choose from our curated collection or request specific models</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Price Quotation</h3>
              <p className="text-gray-600 dark:text-gray-400">Transparent pricing including CNF and landed cost</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Secure shipping from source country to Kenya</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick clearance and delivery to your location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-400">Wilphil Imports - Your trusted source for premium vehicle imports since 1990. Direct imports from Japan, UK, and Thailand.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Import Sources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Japan - Tokyo, Osaka</li>
                <li>UK - London, Manchester</li>
                <li>Thailand - Bangkok</li>
                <li>Special Orders Available</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Nairobi, Kenya</li>
                <li>Phone: +254 700 000 000</li>
                <li>Email: info@wilphilimports.com</li>
                <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg w-full dark:bg-gray-800 dark:border-gray-700"
                />
                <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;