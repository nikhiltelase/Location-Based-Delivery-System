import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import LocationModal from "./pages/LocationModal";
import { LocationProvider } from "./contexts/LocationContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Cart from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";
import SavedAddresses from "./components/profile/SavedAddresses";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <LocationProvider>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/order" element={<LocationModal />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-addresses" element={<SavedAddresses />} />
        </Routes>
        <Footer />
      </Router>
    </LocationProvider>
  );
};

export default App;
