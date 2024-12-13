import React, { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedSlider from "../components/home/FeaturedSlider";
import SpecialOffers from "../components/home/SpecialOffers";
import ProductList from "../components/home/ProductList";
import LoginModal from "../components/auth/LoginModal";
import Register from "../components/auth/RegisterModal";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onSwitchToRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <div>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={onSwitchToRegister}
      />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
      <HeroSection />
      <FeaturedSlider />
      <SpecialOffers />
      <ProductList />
    </div>
  );
};

export default Home;
