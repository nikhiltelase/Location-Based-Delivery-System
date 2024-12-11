import React, { createContext, useState, useContext, useCallback } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("pending");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");

  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setLocationPermission("denied");
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          setSelectedLocation(location);
          const address = await getAddressFromCoordinates(
            location.lat,
            location.lng
          );
          setCurrentAddress(address);
          setLocationPermission("granted");
          resolve(location);
        },
        (error) => {
          console.error("Location request error:", error);
          setLocationPermission("denied");
          reject(error);
        }
      );
    });
  }, []);

  // Geocoding placeholder (you'll need to implement actual geocoding)
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      return data.results[0].formatted_address;
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Unable to retrieve address";
    }
  };

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        currentLocation,
        requestLocation,
        locationPermission,
        setLocationPermission,
        getAddressFromCoordinates,
        currentAddress,
        setCurrentAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
