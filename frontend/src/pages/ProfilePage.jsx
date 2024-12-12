import React from "react";
import { User, MapPin, Clock, Heart } from "lucide-react";

const ProfilePage = () => {
  const tabs = [
    { id: "personal", icon: User, label: "Personal Info" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "orders", icon: Clock, label: "Orders" },
    { id: "favorites", icon: Heart, label: "Favorites" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0 border-r border-gray-200">
            <div className="flex flex-col items-center p-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-600">john@example.com</p>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Content will change based on selected tab */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h3>
            <form className="space-y-6">{/* Form fields */}</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
