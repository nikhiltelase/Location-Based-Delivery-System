import Map from "./Map";
import AddressForm from "./AddressForm";
import LocationPermissionModal from "./LocationPermissionModal";
import { useLocation } from "../contexts/LocationContext";

const LocationModal = () => {
  const { locationPermission } = useLocation();

  return (
    <div className=" sm:w-screen  overflow-clip">
      {/* Location Permission Modal */}
      {locationPermission !== "granted" && <LocationPermissionModal />}

      <div className="bg-white shadow-xl sm:p-2 rounded-lg sm:w-full max-w-3xl">
        <h2 className="text-2xl font-semibold pl-2 sm:pl-9 mb-4 text-gray-800">
          Select Delivery Location
        </h2>
        <div className="flex px-2 sm:px-10 flex-col sm:flex-row   justify-between sm:w-screen">
          <Map />
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
