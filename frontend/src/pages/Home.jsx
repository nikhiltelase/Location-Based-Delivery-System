import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedSlider from "../components/home/FeaturedSlider";
import SpecialOffers from "../components/home/SpecialOffers";
import ProductList from "../components/home/ProductList";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSlider />
      <SpecialOffers />
      <ProductList />
    </div>
  );
};

export default Home;
