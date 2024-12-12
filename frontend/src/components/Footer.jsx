import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Cart', path: '/cart' },
    { name: 'Profile', path: '/profile' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Heart, path: 'https://instagram.com' },
    { name: 'Twitter', icon: MapPin, path: 'https://twitter.com' }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg 
                  transform rotate-45 origin-center"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 text-white transform rotate-45"
                  >
                    <path 
                      d="M17 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" 
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
              <span className="text-2xl font-bold text-green-800">FoodApp</span>
            </div>
            <p className="text-gray-600 text-sm">
              Delicious meals delivered right to your doorstep. Fresh, fast, and fantastic!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-green-800 mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-green-600 text-sm transition duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact and Social */}
          <div>
            <h4 className="text-lg font-bold text-green-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Phone className="mr-3 text-green-500" size={20} />
                <span className="text-sm">(123) 456-7890</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="mr-3 text-green-500" size={20} />
                <span className="text-sm">support@foodapp.com</span>
              </div>
              
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700 transition duration-300"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} FoodApp. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;