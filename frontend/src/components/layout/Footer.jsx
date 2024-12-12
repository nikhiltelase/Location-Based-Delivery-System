import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Send, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Cart', path: '/cart' },
    { name: 'Profile', path: '/profile' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, path: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, path: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, path: 'https://facebook.com' },
    { name: 'LinkedIn', icon: Linkedin, path: 'https://linkedin.com' }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100 border-t border-green-100 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-xl 
                  transform rotate-6 origin-center"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-10 h-10 text-white transform -rotate-6"
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
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">FoodApp</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Delicious meals delivered right to your doorstep. Fresh, fast, and fantastic! Experience culinary excellence at your fingertips.
            </p>
            
            {/* Newsletter Signup */}
            <form onSubmit={handleEmailSubmit} className="flex">
              <input 
                type="email" 
                placeholder="Subscribe to our newsletter" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-l-full border-2 border-green-300 focus:border-green-500 transition-all"
              />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-r-full hover:from-green-600 hover:to-green-800 transition-all"
              >
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ translateX: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-green-600 text-base transition duration-300 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Featured Offers */}
            <div className="mt-8">
              <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 mb-4">Featured Offers</h4>
              <div className="space-y-2">
                <div className="bg-green-100 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm text-green-800">New User Discount</span>
                  <span className="text-sm font-bold text-green-600">20% OFF</span>
                </div>
                <div className="bg-green-100 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm text-green-800">Refer a Friend</span>
                  <span className="text-sm font-bold text-green-600">$10 Credit</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact and Social */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 mb-6">Contact & Connect</h4>
            <div className="space-y-4">
              <div className="flex items-center bg-green-50 rounded-full p-3 shadow-md">
                <Phone className="mr-4 text-green-500" size={24} />
                <div>
                  <span className="text-sm text-gray-600">Customer Support</span>
                  <p className="font-semibold text-green-800">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center bg-green-50 rounded-full p-3 shadow-md">
                <Mail className="mr-4 text-green-500" size={24} />
                <div>
                  <span className="text-sm text-gray-600">Email Support</span>
                  <p className="font-semibold text-green-800">support@foodapp.com</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6 justify-center">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-green-500 hover:text-green-700 transition duration-300 bg-green-50 p-3 rounded-full shadow-md"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-green-200 text-center"
        >
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} FoodApp. All Rights Reserved. 
            <span className="block mt-2 text-xs text-gray-500">
              Crafted with ❤️ for food lovers everywhere
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;