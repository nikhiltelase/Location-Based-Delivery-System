import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Star, ChevronLeft, Heart } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";

// Skeleton Loader Component
const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-10 py-8 animate-pulse">
      <div className="h-6 w-24 bg-gray-300 mb-4"></div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="relative">
          <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
          <div className="absolute top-4 right-4 bg-white rounded-full p-2 flex items-center">
            <div className="h-5 w-12 bg-gray-300"></div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6">
          <div>
            <div className="h-10 w-3/4 bg-gray-300 mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-300"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300"></div>
            <div className="h-4 w-full bg-gray-300"></div>
            <div className="h-4 w-3/4 bg-gray-300"></div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-24 bg-gray-300 mb-2"></div>
              <div className="h-4 w-32 bg-gray-300"></div>
            </div>

            <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
          </div>

          <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { state } = useLocation(); // Get state from location (passed from ProductList)
  const { scrollPosition } = state || {};

  // Fetch product data based on the id
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/item/get`);
  const product = products.find((p) => p._id === id);

  useEffect(() => {
    // Scroll to the position when the product page is loaded
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  const handleOrder = () => {
    setIsAddedToCart(true);
    setTimeout(() => {
      navigate("/order");
    }, 500);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    // You can add actual cart logic here
    navigate("/cart")
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 sm:px-10 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">
          Product Not Found
        </h2>
        <button
          onClick={handleBack}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          <ChevronLeft className="mr-2" /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 py-8 mt-16">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="mr-2" /> Back
      </motion.button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white rounded-full p-2 shadow-md flex items-center"
            >
              <Star className="text-yellow-500 mr-1" fill="currentColor" />
              <span className="font-semibold">4.5</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className={`bg-white rounded-full p-2 shadow-md ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} />
            </motion.button>
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Category: {product.category || "Food"}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center border rounded-full"
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                >
                  +
                </button>
              </motion.div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors ${
                isAddedToCart ? "animate-pulse" : ""
              }`}
            >
              <ShoppingCart className="mr-2" />
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </motion.button>

            <motion.button
              onClick={handleOrder}
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: isAddedToCart ? 0 : Infinity,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors ${
                isAddedToCart ? "animate-pulse" : ""
              }`}
            >
              <ShoppingCart className="mr-2" />
              Order (${(product.price * quantity).toFixed(2)})
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
