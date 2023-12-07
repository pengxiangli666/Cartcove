import React from "react";
import Navigation from "../components/Navigation";
import ProductPreview from "../components/ProductPreview";
import axios from "axios";

function HomePage() {
  return (
    <>
      <Navigation />

      <h1 className="homeWelcome">Recommended Items</h1>

      <div className="homeRecommended">
        <ProductPreview name="Butter" imagePath="Butter" />
        <ProductPreview name="Cereal" imagePath="Cereal" />
        <ProductPreview name="Chocolate" imagePath="Chocolate" />
        <ProductPreview name="Eggs" imagePath="Eggs" />
        <ProductPreview name="Milk" imagePath="Milk" />
      </div>
    </>
  );
}

export default HomePage;
