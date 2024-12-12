import React, { useState } from 'react';
import { 
  Home, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search, 
  MapPin,
  Heart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { 
      name: 'Home', 
      icon: Home, 
      path: '/' 
    },
    { 
      name: 'Locations', 
      icon: MapPin, 
      path: '/locations' 
    },
    { 
      name: 'Favorites', 
      icon: Heart, 
      path: '/favorites' 
    },
    { 
      name: 'Cart', 
      icon: ShoppingCart, 
      path: '/cart' 
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/profile' 
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Enhanced Creative Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-green-800 flex items-center space-x-3"
            >
              <div className="logo-container w-12 h-12 relative perspective-500 transform hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 logo-base bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg 
                  transform rotate-45 origin-center transition-all duration-500 
                  group-hover:rotate-0 animate-logo-float"></div>
                
                <div className="absolute inset-1 logo-overlay bg-gradient-to-tr from-green-300/70 to-green-500/70 
                  rounded-xl blur-sm opacity-0 group-hover:opacity-100 
                  transition-all duration-500 transform rotate-45 group-hover:rotate-0"></div>
                
                <div className="absolute inset-0 logo-leaf flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 text-white transform rotate-45 
                      animate-pulse group-hover:rotate-0 transition-transform duration-300"
                  >
                    <path 
                      d="M17 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" 
                      fill="currentColor"
                    />
                    <path 
                      d="M20 4.5V4a2 2 0 0 0-2-2h-2A2 2 0 0 0 14 4v.5h2v-.5h2v.5h2Z" 
                      fill="currentColor"
                    />
                    <path 
                      d="M12.152 20.203c-1.11 1.49-1.642 2.235-2.152 2.235s-1.041-.745-2.152-2.235a24.742 24.742 0 0 1-2.848-5.791C4.339 11.957 5.545 9.89 7.333 9.17 8.758 8.554 10.188 9.087 12 10.5c1.812-1.413 3.242-1.946 4.667-1.33 1.788.72 2.994 2.787 2.181 5.242a24.742 24.742 0 0 1-2.848 5.79c-1.11 1.491-1.642 2.236-2.152 2.236s-1.041-.745-2.152-2.235a25.324 25.324 0 0 1-.544-.789Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <span className="group-hover:text-green-600 transition-colors duration-300">FoodApp</span>
            </Link>
          </div>

          {/* Rest of the Navbar remains the same as in the previous version */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center flex-grow mx-8 max-w-xl"
          >
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search restaurants, dishes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full 
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400" 
              />
            </div>
            <button 
              type="submit" 
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full 
                hover:bg-green-600 transition duration-300"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Toggle and other components remain the same */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 text-gray-700 
                  hover:text-green-600 transition duration-300 
                  hover:bg-green-50 px-3 py-2 rounded-full"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu - remains the same */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Search Bar for Mobile */}
              <form 
                onSubmit={handleSearchSubmit} 
                className="px-4 mb-4"
              >
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search restaurants, dishes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full 
                      focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 
                      text-gray-400" 
                  />
                </div>
              </form>

              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 
                    text-gray-700 hover:bg-green-50 rounded-lg"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-base font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;