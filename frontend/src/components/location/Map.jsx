import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import {
  MapPin,
  Crosshair,
  Search,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import { useLocation } from "../../contexts/LocationContext";

const MapSkeleton = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] animate-pulse">
      <div className="absolute top-4 left-4 right-4 z-10 flex space-x-2">
        <div className="flex-grow h-12 bg-gray-300 rounded-lg"></div>
        <div className="w-16 h-12 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="w-full h-full bg-gray-200"></div>
    </div>
  );
};

const Map = () => {
  const {
    selectedLocation,
    currentLocation,
    requestLocation,
    setSelectedLocation,
    getAddressFromCoordinates,
    setCurrentAddress,
    currentAddress,
  } = useLocation();

  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const { isLoaded, loadError } = useGoogleMapsScript(apiKey);

  const [searchQuery, setSearchQuery] = useState("");
  const [addressError, setAddressError] = useState(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  // Handle location selection from map click or marker drag
  const handleLocationSelect = async (lat, lng) => {
    try {
      const location = { lat, lng };
      setSelectedLocation(location);
      setAddressError(null);

      // Get address details
      const address = await getAddressFromCoordinates(lat, lng);
      setCurrentAddress(address);
    } catch (error) {
      setAddressError("Unable to retrieve address details");
      console.error("Location selection error:", error);
    }
  };

  // Locate Me functionality
  const handleLocateMe = () => {
    setAddressError(null);
    requestLocation();
  };

  // Handle autocomplete selection
  const handlePlaceSelect = () => {
    try {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        handleLocationSelect(lat, lng);
        setSearchQuery(place.formatted_address || "");
        setAddressError(null);
      } else {
        setAddressError("Unable to find location details");
      }
    } catch (error) {
      setAddressError("Error selecting location");
      console.error("Place selection error:", error);
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setAddressError(null);
    if (autocompleteRef.current) {
      autocompleteRef.current.inputRef.current.value = "";
    }
  };

  // Custom red marker SVG
  const redMarkerSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
      <path fill="#FF0000" d="M16 0 C7.2 0 0 7.2 0 16 C0 24.8 16 48 16 48 S32 24.8 32 16 C32 7.2 24.8 0 16 0 Z" />
      <circle cx="16" cy="16" r="8" fill="white" />
    </svg>
  `;

  // Loading and error states
  if (loadError) {
    return (
      <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-red-50 rounded-lg p-4">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Map Loading Error
          </h2>
          <p className="text-red-600">
            Unable to load Google Maps. Please check your internet connection.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <MapSkeleton />;
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      {/* Search and Locate Me Section */}
      <div className="absolute top-4 left-4 right-4 z-10 flex space-x-2">
        {/* Autocomplete Search */}
        <div className="flex-grow relative">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceSelect}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for an address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-green-500 
                  text-sm transition duration-300"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                    hover:text-gray-600 transition"
                >
                  <XCircle size={20} />
                </button>
              )}
            </div>
          </Autocomplete>
          {addressError && (
            <div className="absolute top-full mt-1 w-full">
              <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                {addressError}
              </div>
            </div>
          )}
        </div>

        {/* Locate Me Button */}
        <button
          onClick={handleLocateMe}
          className="bg-green-500 text-white p-3 rounded-lg 
            hover:bg-green-600 transition duration-300 
            flex items-center justify-center group"
          aria-label="Use my current location"
        >
          <Crosshair size={20} className="group-hover:animate-pulse" />
        </button>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={
          selectedLocation || currentLocation || { lat: 20.5937, lng: 78.9629 }
        }
        zoom={15}
        onClick={(e) => handleLocationSelect(e.latLng.lat(), e.latLng.lng())}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* Draggable Marker */}
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            draggable
            onDragEnd={(e) =>
              handleLocationSelect(e.latLng.lat(), e.latLng.lng())
            }
            icon={{
              url: `data:image/svg+xml;charset=UTF-8;base64,${btoa(
                redMarkerSVG
              )}`,
              scaledSize: new window.google.maps.Size(32, 48),
              anchor: new window.google.maps.Point(16, 48),
            }}
          />
        )}
      </GoogleMap>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="absolute bottom-0 sm:bottom-2 left-2 right-4 z-10">
          <div
            className="bg-white p-2 rounded-lg shadow-lg flex items-center 
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            <div className="flex justify-center items-center">
              <MapPin className="mr-1 text-green-500" size={24} />
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  Delivery Location
                </p>
                <p
                  className="text-xs text-gray-500 truncate"
                  title={currentAddress}
                >
                  {currentAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
