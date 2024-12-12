import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Edit2 } from "lucide-react";

const AddressSkeletonLoader = () => {
  return (
    <div className="p-4 border rounded-md mt-16 shadow-sm bg-white animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-3 bg-gray-200 rounded w-3/4"></div>
        ))}
        <div className="flex space-x-2 mt-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/address/get`);

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load addresses: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/address/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      setAddresses((prev) => prev.filter((address) => address._id !== id));
      toast.success("Address deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Error deleting address: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (address) => {
    toast.info("Edit functionality coming soon!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="p-4 mt-16">
        <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((loader) => (
            <AddressSkeletonLoader key={loader} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center mt-16">
        <img 
          src="/api/placeholder/400/200" 
          alt="Error" 
          className="mb-4 opacity-50"
        />
        <p className="text-red-500 text-lg">
          Failed to load addresses. Please try again later.
        </p>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center mt-16">
        <img 
          src="/api/placeholder/400/200" 
          alt="No Addresses" 
          className="mb-4 opacity-50"
        />
        <p className="text-gray-500 text-lg">
          No saved addresses found. Add your first address!
        </p>
      </div>
    );
  }

  return (
    <div className="p-14 mt-16">
      <ToastContainer />
      <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="p-4 border rounded-md shadow-sm bg-white relative"
          >
            {address.isFavorite && (
              <span className="absolute top-2 right-2 text-yellow-500 text-xl">
                ★
              </span>
            )}
            <h4 className="font-medium mb-2 capitalize">
              {address.type}
            </h4>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Flat/Block:</strong> {address.flatNumber}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Area:</strong> {address.area}
              </p>
              {address.landmark && (
                <p className="text-sm text-gray-700">
                  <strong>Landmark:</strong> {address.landmark}
                </p>
              )}
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {address.location.lat.toFixed(6)},{" "}
                {address.location.lng.toFixed(6)}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(address._id)}
                disabled={deletingId === address._id}
                className="flex-1 flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded 
                  hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
              >
                {deletingId === address._id ? (
                  <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => handleEdit(address)}
                className="flex-1 flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded 
                  hover:bg-green-600 transition-colors duration-200"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;