import React from "react";
import Map from "./Map";
import AddressForm from "./AddressForm";
import LocationPermissionModal from "./LocationPermissionModal";
import { useLocation } from "../contexts/LocationContext";
import { MapPin, Navigation } from "lucide-react";

const LocationModal = () => {
  const { locationPermission } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-2 sm:px-4">
      {/* Location Permission Modal */}
      {locationPermission !== "granted" && <LocationPermissionModal />}

      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className=" bg-green-500 text-white p-2 sm:px-6 flex items-center space-x-4">
          <MapPin className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Select Delivery Location</h2>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 sm:px-6">
          {/* Map Section */}
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            <div className="sm:px-4 p-2 bg-green-50 flex items-center space-x-2">
              <Navigation className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Choose Your Location</h3>
            </div>
            <Map />
          </div>

          {/* Address Form Section */}
          <div className="w-full">
            <AddressForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;