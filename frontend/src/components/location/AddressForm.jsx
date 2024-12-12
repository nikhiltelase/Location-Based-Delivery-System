import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "../../contexts/LocationContext";
import { useNavigate } from "react-router-dom";
import { Map, MapPin, Home, Briefcase, Users, CheckCircle } from "lucide-react";

const AddressForm = () => {
  const { selectedLocation } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [addressDetails, setAddressDetails] = useState({
    area: "",
    landmark: "",
    type: "",
    flatNumber: "",
  });
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Focus first input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    // Validation logic remains the same as in the original component
    if (
      !addressDetails.flatNumber ||
      !addressDetails.area ||
      !selectedLocation ||
      !type
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const body = {
      ...addressDetails,
      type,
      location: {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      },
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/address/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        toast.success("Address saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            setAddressDetails({ area: "", landmark: "", flatNumber: "", type: "" });
            setType("");
            navigate("/saved-addresses");
          }
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save address. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("An error occurred while saving the address.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addressTypes = [
    { name: "Home", icon: Home, value: "home" },
    { name: "Office", icon: Briefcase, value: "office" },
    { name: "Other", icon: Users, value: "other" },
  ];

  return (
    <div className="min- bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center sm:p-4">
      <ToastContainer />
      <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
       
        
        <div className="p-2 sm:p-6 space-y-6">
          {/* Flat Number Input */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              House/Flat/Block No. 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              name="flatNumber"
              value={addressDetails.flatNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter house/flat number"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                transition-all duration-300 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-green-300"
            />
          </div>

          {/* Area Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              Apartment/Road/Area
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="area"
              value={addressDetails.area || ""}
              onChange={handleInputChange}
              placeholder="Enter apartment, road, area"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                transition-all duration-300 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-green-300"
            />
          </div>

          {/* Landmark Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              Landmark 
              <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              value={addressDetails.landmark || ""}
              onChange={handleInputChange}
              placeholder="Enter nearby landmark"
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                transition-all duration-300 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-green-300"
            />
          </div>

          {/* Address Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              Save Address As
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {addressTypes.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => !isLoading && setType(item.value)}
                  disabled={isLoading}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 
                    transition-all duration-300 ease-in-out group
                    ${
                      type === item.value
                        ? "bg-green-500 text-white border-green-600 shadow-lg"
                        : "bg-white text-gray-700 hover:bg-green-50 border-gray-300 hover:border-green-300"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <item.icon 
                    className={`w-8 h-8 mb-2 
                      ${type === item.value ? 'text-white' : 'text-green-500 group-hover:text-green-600'}
                    `} 
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Address Button */}
          <button
            onClick={handleSaveAddress}
            disabled={!type || isLoading}
            className="w-full bg-green-500 text-white py-3.5 rounded-xl 
              hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 ease-in-out
              flex items-center justify-center
              transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <div className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></div>
            ) : (
              <CheckCircle className="mr-2 w-5 h-5" />
            )}
            {isLoading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;