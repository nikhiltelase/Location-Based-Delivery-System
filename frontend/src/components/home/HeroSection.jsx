import React, { useState, useEffect } from 'react';
import { 
  Utensils, Rocket, Pizza, Salad, Sandwich, 
  ChefHat, Sparkles, Star, Heart 
} from 'lucide-react';

const HeroSection = () => {
  const [activeFood, setActiveFood] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      const scrollPercentage = (currentScroll / maxScroll) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const foodItems = [
    { 
      icon: Pizza, 
      color: 'bg-gradient-to-r from-yellow-500 to-red-500', 
      text: 'Pizza Paradise', 
      description: 'Artisan pizzas crafted with care',
      specialIcon: Star
    },
    { 
      icon: Salad, 
      color: 'bg-gradient-to-r from-green-400 to-lime-500', 
      text: 'Fresh Greens', 
      description: 'Locally sourced, nutrient-packed salads',
      specialIcon: Sparkles
    },
    { 
      icon: Sandwich, 
      color: 'bg-gradient-to-r from-orange-500 to-yellow-400', 
      text: 'Gourmet Sandwiches', 
      description: 'Handcrafted between fresh-baked bread',
      specialIcon: Heart
    }
  ];

  return (
    <div className="mt-4 relative min-h-screen bg-gradient-to-br from-green-100 to-blue-50 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-400 z-50 transition-all duration-200" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-emerald-300 rounded-full opacity-70 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6 relative">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Delicious Food
                <span className="block bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent animate-gradient-text">
                  Delivered Fresh
                </span>
              </h1>
              <div className="absolute -top-10 right-0 text-6xl opacity-30">
                <Rocket className="animate-spin-slow text-emerald-300" size={64} />
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-700 max-w-md relative">
              Experience culinary excellence at your fingertips. Fresh, fast, and flavorful meals delivered straight to you.
              <span className="absolute -top-4 -right-6 text-emerald-500 animate-ping">
                <ChefHat size={32} />
              </span>
            </p>

            {/* Interactive Food Selection */}
            <div className="flex space-x-4 py-4">
              {foodItems.map((item, index) => {
                const SpecialIcon = item.specialIcon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFood(activeFood === index ? null : index)}
                    className={`
                      ${item.color} text-white p-4 rounded-xl 
                      transform transition-all duration-300 relative group
                      shadow-lg hover:shadow-xl
                      ${activeFood === index 
                        ? 'scale-110 ring-4 ring-emerald-300' 
                        : 'hover:scale-105'}
                    `}
                  >
                    <item.icon size={32} />
                    {activeFood === index && (
                      <SpecialIcon 
                        className="absolute top-0 right-0 text-white animate-spin-slow" 
                        size={16} 
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Food Description */}
            {activeFood !== null && (
              <div className="mt-4 p-6 bg-white rounded-xl shadow-xl border border-green-200 transform origin-top animate-popup">
                <h3 className="text-2xl font-bold text-emerald-700">
                  {foodItems[activeFood].text}
                </h3>
                <p className="text-gray-600">
                  {foodItems[activeFood].description}
                </p>
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-6">
              <button className="
                bg-gradient-to-r from-emerald-600 to-blue-500
                text-white px-8 py-4 rounded-full 
                text-lg font-bold
                hover:bg-emerald-700
                transition-all duration-300
                transform hover:-translate-y-1
                shadow-xl hover:shadow-2xl
                flex items-center
                group
                relative
                overflow-hidden
              ">
                <span className="relative z-10">Order Now</span>
                <Utensils 
                  className="ml-3 transform group-hover:rotate-12 transition-transform" 
                  size={24} 
                />
                <span className="absolute inset-0 bg-white opacity-5 group-hover:opacity-20 transition-opacity"></span>
              </button>
            </div>
          </div>

          {/* Animated Food Illustration */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="w-full max-w-md bg-gradient-to-b from-green-200 to-green-50 rounded-full aspect-square 
              flex items-center justify-center relative overflow-hidden
              shadow-xl animate-subtle-bounce">
              {/* Floating Food Icons */}
              <div className="absolute animate-float">
                <Pizza 
                  className="absolute top-10 left-20 text-emerald-600 animate-drift" 
                  size={64} 
                />
                <Sandwich 
                  className="absolute bottom-20 right-10 text-green-500 animate-drift-reverse" 
                  size={48} 
                />
                <Salad 
                  className="absolute top-24 right-24 text-lime-600 animate-spin-slow" 
                  size={56} 
                />
              </div>

              {/* Central Delivery Illustration */}
              <div className="bg-white p-8 rounded-full shadow-2xl z-10 hover:scale-105 transition-transform">
                <Utensils 
                  className="text-emerald-600" 
                  size={96} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
