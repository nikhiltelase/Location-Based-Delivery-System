import React, { useEffect, useState } from "react";

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]); // State to store fetched addresses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch addresses from the backend
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:3000/address/get");

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setAddresses(data); // Update state with fetched addresses
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchAddresses();
  }, []);

  // Handle delete address
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/address/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      // Update state after successful deletion
      setAddresses((prev) => prev.filter((address) => address._id !== id));
      alert("Address deleted successfully!");
    } catch (err) {
      alert("Error deleting address: " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading addresses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (addresses.length === 0) {
    return (
      <p className="text-center text-gray-500">No saved addresses found.</p>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="p-4 border rounded-md shadow-sm bg-white"
          >
            <h4 className="font-medium mb-2 capitalize">
              {address.type}{" "}
              {address.isFavorite && <span className="text-yellow-500">★</span>}
            </h4>
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
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleDelete(address._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => alert("Edit functionality not implemented yet")}
              >
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
