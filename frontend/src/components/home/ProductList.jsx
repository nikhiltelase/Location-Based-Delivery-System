import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info, Filter, Search } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";

const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="bg-white rounded-2xl shadow-lg px-6 py-8 overflow-hidden"
    >
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>

      <div className="p-4 space-y-4">
        <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-5/6 mb-4"></div>

        <div className="flex justify-between items-center space-x-3">
          <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: products,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/item/get`);
  console.log(products);

  const handleClick = (e, productId) => {
    // Save the position of the clicked product before navigation
    const position = e.target.getBoundingClientRect().top + window.scrollY;

    // Navigate to the product detail page and pass the scroll position via state
    navigate(`/product/${productId}`, { state: { scrollPosition: position } });
  };

  // Filter and sort products
  const processedProducts = products
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return a.price - b.price;
            case "price-high":
              return b.price - a.price;
            default:
              return a.name.localeCompare(b.name);
          }
        })
    : [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
        >
          Culinary Delights Await
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
            <ProductCardSkeleton key={skeleton} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen"
      >
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-10 text-center max-w-md shadow-2xl">
          <img
            src="/api/placeholder/400/300"
            alt="Error"
            className="mx-auto mb-6 rounded-xl opacity-70 transform hover:scale-105 transition-transform"
          />
          <h2 className="text-3xl font-bold text-red-600 mb-4 animate-pulse">
            Oops! Something Went Wrong
          </h2>
          <p className="text-red-500 mb-6">
            {error.message ||
              "Unable to load products. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Reload Page
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-start mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        Culinary Delights Await
      </motion.h1>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-green-400 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative w-full md:w-1/4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-4 pr-8 py-3 rounded-full border-2 border-gray-200 focus:border-green-400 appearance-none"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {processedProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-[400px] text-center"
        >
          <img
            src="https://www.searchenginejournal.com/wp-content/uploads/2020/04/335b76ca-14ff-46e1-99ea-ca92f550aaf5-5ea1dd86e8e38.jpeg"
            alt="oops"
            width={500}
            className="mb-6 opacity-50 rounded-xl"
          />
          <p className="text-3xl text-gray-500">No dishes match your search</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {processedProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/product/${product._id}`}
                  onClick={(e) => handleClick(e, product._id)} // handle click event
                  className="block bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600 hover:text-green-800 transition-colors cursor-pointer group">
                        <Info className="mr-2" size={20} />
                        <span className="transition-all duration-300 group-hover:translate-x-1">
                          Details
                        </span>
                      </div>

                      <button className="flex items-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-md">
                        <ShoppingCart className="mr-2" size={16} />
                        Order
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;
