import React, { useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { useLocation } from "../contexts/LocationContext";

const LocationPermissionModal = () => {
  const { requestLocation, locationPermission, setLocationPermission } =
    useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Only show modal when permission is not granted or manual
  if (locationPermission === "granted" || locationPermission === "manual") {
    return null;
  }

  const handleEnableLocation = async () => {
    setIsLoading(true);
    try {
      await requestLocation();
    } catch (error) {
      console.error("Location permission error:", error);
      setLocationPermission("denied");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchManually = () => {
    // Switch to manual search mode
    setLocationPermission("manual");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 ease-in-out">
        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Header Section */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4 md:p-6">
                <MapPin
                  className="h-12 w-12 md:h-16 md:w-16 text-blue-500"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Location Access
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Help us find the best delivery options near you
            </p>
          </div>

          {/* Modal Body */}
          <div className="space-y-4">
            {/* Enable Location Button */}
            <button
              onClick={handleEnableLocation}
              disabled={isLoading}
              className="w-full flex items-center justify-center 
                bg-blue-500 text-white py-3 rounded-lg 
                hover:bg-blue-600 transition duration-300 
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enabling Location...
                </>
              ) : (
                <>
                  <navigation className="mr-2" size={20} />
                  Enable Location
                </>
              )}
            </button>

            {/* Search Manually Button */}
            <button
              onClick={handleSearchManually}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg 
                hover:bg-gray-200 transition duration-300
                flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <MapPin className="mr-2" size={20} />
              Search Manually
            </button>
          </div>

          {/* Denied Permission Message */}
          {locationPermission === "denied" && (
            <div className="mt-4 text-center text-red-500 flex items-center justify-center">
              <AlertCircle className="mr-2" size={20} />
              <p className="text-sm">
                Location access was denied. Please enable in your browser
                settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
