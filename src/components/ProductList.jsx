import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react";
import useFetch from "../hooks/useFetch";

const ProductList = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/item/get`);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
        Delicious Meals Await
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No products available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
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
