import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "../contexts/LocationContext";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { MapPin, Crosshair, Search, XCircle } from "lucide-react";
import useGoogleMapsScript from "../hooks/useGoogleMapsScript";


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
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  // Handle location selection from map click or marker drag
  const handleLocationSelect = async (lat, lng) => {
    const location = { lat, lng };
    setSelectedLocation(location);

    // Get address details
    const address = await getAddressFromCoordinates(lat, lng);
    setCurrentAddress(address);
  };

  // Locate Me functionality
  const handleLocateMe = () => {
    requestLocation();
  };

  // Handle autocomplete selection
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      handleLocationSelect(lat, lng);
      setSearchQuery(place.formatted_address || "");
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
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
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
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
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
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
        </div>

        {/* Locate Me Button */}
        <button
          onClick={handleLocateMe}
          className="bg-blue-500 text-white p-3 rounded-lg 
            hover:bg-blue-600 transition duration-300 
            flex items-center justify-center"
          aria-label="Use my current location"
        >
          <Crosshair size={20} />
        </button>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={
          selectedLocation ||
          currentLocation || { lat: 20.5937, lng: 78.9629 }
        }
        zoom={15}
        onClick={(e) => handleLocationSelect(e.latLng.lat(), e.latLng.lng())}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
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
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <MapPin className="mr-3 text-blue-500" size={24} />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Delivery Location
              </p>
              <p className="text-xs text-gray-500">{currentAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;