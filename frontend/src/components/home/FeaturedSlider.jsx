import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

const FeaturedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Margherita Maestro",
      description: "Classic Italian pizza with fresh basil and mozzarella",
      price: 19.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1579702484272-77a56e214cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxNYXJnaGVyaXRhJTIwTWFlc3Ryb3xlbnwwfHx8fDE3MzQwMDY2NzV8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegetarian", "Classic"],
    },
    {
      id: 4,
      title: "Veggie Paradise",
      description: "Garden-fresh vegetables on crispy thin crust",
      price: 18.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1535961652354-923cb08225a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxWZWdnaWUlMjBQYXJhZGlzZXxlbnwwfHx8fDE3MzQwMDY2NzZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegan", "Healthy"],
    },
    {
      id: 6,
      title: "Mediterranean Dream",
      description: "Olives, feta, and sun-dried tomatoes blend",
      price: 21.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1543507129-0d5571b71162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxNZWRpdGVycmFuZWFuJTIwRHJlYW18ZW58MHx8fHwxNzM0MDA2Njc2fDA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Mediterranean", "Vegetarian"],
    },
    {
      id: 8,
      title: "Truffle Delight",
      description: "Luxurious black truffle shavings on creamy Alfredo base",
      price: 29.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1495240013514-62e89ff5a164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxUcnVmZmxlJTIwRGVsaWdodHxlbnwwfHx8fDE3MzQwMDYxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Gourmet", "Vegetarian"],
    },
    {
      id: 11,
      title: "Cheesy Overload",
      description: "An explosion of five different kinds of cheese",
      price: 20.5,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxDaGVlc3klMjBPdmVybG9hZHxlbnwwfHx8fDE3MzQwMDYxMzZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegetarian", "Cheesy"],
    },
    {
      id: 12,
      title: "Pesto Perfection",
      description: "Fresh basil pesto topped with cherry tomatoes and ricotta",
      price: 21.75,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxQZXN0byUyMFBlcmZlY3Rpb258ZW58MHx8fHwxNzM0MDA2MTM3fDA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegetarian", "Gourmet"],
    },
    {
      id: 15,
      title: "Garlic Mushroom Medley",
      description:
        "Aromatic roasted garlic with button and portobello mushrooms",
      price: 19.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxHYXJsaWMlMjBNdXNocm9vbSUyME1lZGxleXxlbnwwfHx8fDE3MzQwMDYxMzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegetarian", "Healthy"],
    },
    {
      id: 11,
      title: "Cheesy Overload",
      description: "An explosion of five different kinds of cheese",
      price: 20.5,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxDaGVlc3klMjBPdmVybG9hZHxlbnwwfHx8fDE3MzQwMDYxMzZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegetarian", "Cheesy"],
    },
    {
      id: 4,
      title: "Veggie Paradise",
      description: "Garden-fresh vegetables on crispy thin crust",
      price: 18.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1535961652354-923cb08225a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxWZWdnaWUlMjBQYXJhZGlzZXxlbnwwfHx8fDE3MzQwMDY2NzZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
      categories: ["Vegan", "Healthy"],
    },
  ];

  // Calculate slides per page based on screen size
  const getSlidesPerPage = () => {
    return window.innerWidth >= 1024 ? 3 : 1;
  };

  const [slidesPerPage, setSlidesPerPage] = useState(getSlidesPerPage());

  // Responsive adjustment
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerPage(getSlidesPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      (prev + 1) * slidesPerPage >= slides.length ? 0 : prev + 1
    );
  }, [slidesPerPage, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.floor((slides.length - 1) / slidesPerPage) : prev - 1
    );
  }, [slidesPerPage, slides.length]);

  // Auto-slide effect
  useEffect(() => {
    if (!isHovered) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [nextSlide, isHovered]);

  // Render visible slides based on current page and slides per page
  const visibleSlides = slides.slice(
    currentSlide * slidesPerPage,
    currentSlide * slidesPerPage + slidesPerPage
  );

  return (
    <div
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Featured Delicacies
      </h2>

      <div className="relative overflow-hidden">
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {slide.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {slide.title}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-5 h-5 mr-1" fill="currentColor" />
                      <span className="text-gray-700 text-sm">
                        {slide.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{slide.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ${slide.price.toFixed(2)}
                    </span>
                    <div className="flex space-x-3">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                        Order
                      </button>
                      <button className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 
          bg-white/80 p-2 rounded-full shadow-md hover:bg-white 
          transition duration-300 z-10"
        >
          <ChevronLeft className="w-8 h-8 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 
          bg-white/80 p-2 rounded-full shadow-md hover:bg-white 
          transition duration-300 z-10"
        >
          <ChevronRight className="w-8 h-8 text-gray-700" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: Math.ceil(slides.length / slidesPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
              ${currentSlide === index ? "bg-green-500 w-6" : "bg-gray-300"}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlider;
