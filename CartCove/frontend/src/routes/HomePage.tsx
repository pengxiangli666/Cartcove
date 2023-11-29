import React from "react";
import Navigation from "../components/Navigation";
import ProductPreview from "../components/ProductPreview";

function HomePage() {
  return (
    <>
      <Navigation />

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
