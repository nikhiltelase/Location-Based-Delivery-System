import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react";
import useFetch from "../hooks/useFetch";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg px-10 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/item/get`);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
          Delicious Meals Await
        </h1>
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
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md">
          <img 
            src="/api/placeholder/400/300" 
            alt="Error" 
            className="mx-auto mb-6 opacity-50"
          />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something Went Wrong
          </h2>
          <p className="text-red-500 mb-4">
            {error.message || "Unable to load products. Please try again later."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-start mb-8 text-gray-800">
        Delicious Meals Await
      </h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <img 
            src="/api/placeholder/400/300" 
            alt="No Products" 
            className="mb-6 opacity-50"
          />
          <p className="text-2xl text-gray-500">
            No products available at the moment
          </p>
          <p className="text-gray-400 mt-2">
            Check back soon for exciting new meals!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-green-600 hover:text-green-800 transition-colors cursor-pointer">
                    <Info className="mr-2" size={20} />
                    Details
                  </div>

                  <button className="flex items-center bg-green-500 text-white px-3 py-2 rounded-full text-sm hover:bg-green-600 transition-colors">
                    <ShoppingCart className="mr-2" size={16} />
                    Order
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;