import React, { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 12.99,
      image: "/api/placeholder/400/300",
      restaurant: "Pizza Paradise",
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: 8.99,
      image: "/api/placeholder/400/300",
      restaurant: "Burger House",
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-500">Start adding your favorite meals!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                >
                  <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{item.restaurant}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">
                    ${item.price}
                  </span>
                  <button className="flex items-center text-green-500 hover:text-green-600">
                    Order Again <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
