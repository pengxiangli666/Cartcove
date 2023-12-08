import React from "react";
import Navigation from "../components/Navigation";
import ProductPageReview from "../components/ProductPageReview";

function getProductID(ID = "") {
  let position = 0;

  for (let i = 0; ID.length > i; i++) {
    if (ID.charAt(i) === "/") {
      position = i;
    }
  }

  return ID.substring(position + 1);
}

function ProductPage() {
  let productName = getProductID(window.location.pathname);

  return (
    <>
      <Navigation />

      <div className="productPage">
        <img src={"/static/images/" + productName + ".png"} />

        <div className="productInfo">
          <h1>{productName}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            recusandae iure necessitatibus reprehenderit inventore, dolores,
            esse enim voluptates culpa illum totam sit dolore, harum sapiente et
            magnam non vitae autem quibusdam sequi quaerat officia voluptatibus
            quam nulla. Minus, delectus modi.
          </p>
        </div>
      </div>

      <ProductPageReview productName={productName} />
    </>
  );
}

export default ProductPage;
