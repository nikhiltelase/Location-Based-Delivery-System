import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "../contexts/LocationContext";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const { selectedLocation } = useLocation();
  const navigate = useNavigate();
  const [addressDetails, setAddressDetails] = useState({
    area: "",
    landmark: "",
    type: "",
    flatNumber: "",
  });
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    // Validate required fields
    if (
      !addressDetails.flatNumber ||
      !addressDetails.area ||
      !selectedLocation ||
      !type
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("An error occurred while saving the address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addressTypes = [
    { name: "Home", icon: "🏠" },
    { name: "Office", icon: "💼" },
    { name: "Other", icon: "👥" },
  ];

  return (
    <div className="container mx-auto max-w-md px-2 py-6 sm:p-6 relative">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-2 space-y-6">
        {/* House/Flat/Block Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            House/Flat/Block No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="flatNumber"
            value={addressDetails.flatNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter house/flat number"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-all duration-200 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Apartment/Road/Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apartment/Road/Area <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="area"
            value={addressDetails.area || ""}
            onChange={handleInputChange}
            placeholder="Enter apartment, road, area"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-all duration-200 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Landmark <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            name="landmark"
            value={addressDetails.landmark || ""}
            onChange={handleInputChange}
            placeholder="Enter nearby landmark"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-all duration-200 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Address Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Save Address As <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {addressTypes.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => !isLoading && setType(item.name.toLowerCase())}
                disabled={isLoading}
                className={`flex flex-col items-center justify-center p-3 rounded-md border 
                  transition-all duration-200 ease-in-out
                  ${
                    type === item.name.toLowerCase()
                      ? "bg-blue-500 text-white border-blue-600 shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Address Button */}
        <button
          onClick={handleSaveAddress}
          disabled={!type || isLoading}
          className="w-full bg-green-500 text-white py-3 rounded-md 
            hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 ease-in-out
            flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></div>
          ) : null}
          {isLoading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;