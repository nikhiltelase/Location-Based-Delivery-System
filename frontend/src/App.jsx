import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import LocationModal from "./components/LocationModal";
import { LocationProvider } from "./contexts/LocationContext";
import SavedAddresses from "./components/SavedAddresses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <LocationProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/order" element={<LocationModal />} />
          <Route path="/saved-addresses" element={<SavedAddresses />} />
        </Routes>
        <Footer />
      </Router>
    </LocationProvider>
  );
};

export default App;
