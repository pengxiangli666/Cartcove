import React from "react";
import Navigation from "../components/Navigation";
import ProductPreview from "../components/ProductPreview";

function HomePage() {
  return (
    <>
      <Navigation />

      <h1>This is a product page!</h1>
      <ProductPreview />
    </>
  );
}

export default HomePage;
