import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, Menu, X, Phone, Globe, Clock, ChevronDown, ChevronRight, 
  Home, Users, FileText, HelpCircle, TrendingUp, Flame, Tag, LayoutGrid,
  MessageSquare
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { 
      name: 'Vehicles',
      icon: <Car size={20} />,
      children: [
        { name: 'All Cars', path: '/explore', icon: <LayoutGrid size={16} /> },
        { name: 'Popular Deals', path: '/explore?filter=popular', icon: <Tag size={16} /> },
        { name: 'Hot Deals', path: '/explore?filter=hot', icon: <Flame size={16} /> },
      ]
    },
    { name: 'Trends', path: '/trends', icon: <TrendingUp size={20} /> },
    { name: 'About', path: '/about', icon: <Users size={20} /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle size={20} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={20} /> },
  ];

  return (
    <>
      {/* Top Bar - Only visible on mobile */}
      <div className="bg-gray-900 dark:bg-black text-white py-2 md:hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>Global Import Solutions</span>
            </div>
            <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-red-500">
              <Phone size={16} />
              <span>+254 700 000 000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 md:hidden ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link to="/explore" className="flex items-center space-x-3">
              <Car className="text-red-600" size={32} />
              <div>
                <span className="text-2xl font-bold block dark:text-white">Wilphil Imports</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Premium Auto Imports</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                className="text-gray-700 dark:text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 top-20 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  link.children ? (
                    <div key={index} className="space-y-2">
                      <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                      <div className="pl-8 space-y-2">
                        {link.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            to={child.path}
                            className="block text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.icon}
                            <span>{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={index}
                      to={link.path}
                      className={`block text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 flex items-center gap-2 ${
                        location.pathname === link.path ? 'text-red-600 dark:text-red-500' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  )
                ))}
                <Link 
                  to="/admin"
                  className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Vertical Navbar - Right Side */}
      <div className="hidden md:block">
        {/* Info Bar - Top */}
        <div className="fixed top-0 right-0 left-0 bg-gray-900 dark:bg-black text-white py-2 z-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center text-sm">
              <Link to="/explore" className="flex items-center space-x-3">
                <Car className="text-red-600" size={24} />
                <div>
                  <span className="text-xl font-bold block">Wilphil Imports</span>
                  <span className="text-xs text-gray-400">Premium Auto Imports</span>
                </div>
              </Link>
              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>Global Import Solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
                <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-red-500">
                  <Phone size={16} />
                  <span>+254 700 000 000</span>
                </a>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">Import From:</span>
                  <span className="text-red-500">Japan</span>
                  <span>|</span>
                  <span className="text-red-500">UK</span>
                  <span>|</span>
                  <span className="text-red-500">Thailand</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Navigation - Right Side */}
        <nav className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-50 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
            : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'
        } rounded-l-xl overflow-hidden transition-all duration-300`}>
          <div className="py-6 px-4 flex flex-col items-center space-y-6">
            <ThemeToggle />
            
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.children ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowDropdown(link.name)}
                    onMouseLeave={() => setShowDropdown('')}
                  >
                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors transform hover:scale-110">
                      {link.icon}
                    </button>
                    
                    {/* Tooltip */}
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.name}
                    </span>
                    
                    {/* Dropdown */}
                    {showDropdown === link.name && (
                      <div className="absolute right-full mr-4 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 min-w-[180px] overflow-hidden">
                        {link.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            to={child.path}
                            className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2 transition-colors"
                          >
                            {child.icon}
                            <span>{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors transform hover:scale-110 ${
                      location.pathname === link.path 
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                        : 'text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    {link.icon}
                    
                    {/* Tooltip */}
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
            
            <Link 
              to="/admin" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors group transform hover:scale-110"
            >
              <FileText size={20} />
              
              {/* Tooltip */}
              <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Admin Panel
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;