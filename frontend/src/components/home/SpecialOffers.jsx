import React, { useState } from "react";
import { Clock, Tag, Copy, Sparkles, Gift, StarIcon } from "lucide-react";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Weekend Feast",
      description: "Indulge in culinary delights with 20% off on gourmet orders",
      code: "WEEKEND20",
      validUntil: "2024-12-31",
      image: "https://plus.unsplash.com/premium_photo-1722945647437-d8161b0d1197?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-orange-400 to-pink-500",
      icon: Gift,
      bonus: "Extra dessert with order"
    },
    {
      id: 2,
      title: "First-Timer's Delight",
      description: "Welcome to flavor town! Exclusive $10 off your maiden voyage",
      code: "FIRSTORDER",
      validUntil: "2024-12-31",
      image: "https://cdn.prod.website-files.com/64065a0c7d458f52b2f800fb/64e77ea533f70b30c3f4f474__preview-home.jpg",
      gradient: "from-emerald-400 to-teal-500",
      icon: StarIcon,
      bonus: "Free premium side"
    },
    {
      id: 3,
      title: "Midnight Munchies",
      description: "Late-night cravings? 15% off after 9 PM",
      code: "NIGHT15",
      validUntil: "2024-12-31",
      image: "https://plus.unsplash.com/premium_photo-1671580669360-8b4ee48b1695?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gradient: "from-purple-400 to-indigo-500",
      icon: Sparkles,
      bonus: "Surprise appetizer"
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-12"
        >
          Exclusive Culinary Offers
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-emerald-200 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-52 object-cover"
                />
                <div 
                  className={`
                    absolute top-4 right-4 
                    bg-gradient-to-br ${offer.gradient} 
                    text-white rounded-full 
                    w-12 h-12 flex items-center justify-center
                    shadow-lg
                  `}
                >
                  <offer.icon className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Tag className="w-6 h-6 text-emerald-500 mr-3" />
                  <h3 className="text-2xl font-bold text-emerald-800">
                    {offer.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-5 text-base">
                  {offer.description}
                </p>

                <div className="bg-emerald-50 p-4 rounded-lg mb-5">
                  <p className="text-sm text-emerald-700 mb-2">Promo Code:</p>
                  <div className="flex items-center justify-between">
                    <code 
                      className={`
                        bg-white px-4 py-2 rounded-md 
                        text-emerald-600 font-mono text-lg 
                        border border-emerald-200
                        ${copiedCode === offer.code ? 'animate-pulse' : ''}
                      `}
                    >
                      {offer.code}
                    </code>
                    <motion.button 
                      onClick={() => handleCopyCode(offer.code)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="
                        text-emerald-500 hover:text-emerald-700 
                        flex items-center space-x-2
                        bg-emerald-100 px-3 py-2 rounded-md
                      "
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedCode === offer.code ? 'Copied!' : 'Copy'}</span>
                    </motion.button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>
                      Valid until {new Date(offer.validUntil).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-emerald-600 font-medium">
                    {offer.bonus}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;