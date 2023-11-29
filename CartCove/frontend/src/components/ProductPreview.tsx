import React from "react";

function ProductPreview({ name = "Product", imagePath = "Image" }) {
  return (
    <>
      <a className="productPreview" href={"product/" + imagePath}>
        <img
          src={"/static/images/" + imagePath + ".png"}
          width="100"
          height="100"
        />
        <h1> {name} </h1>
      </a>
    </>
  );
}

export default ProductPreview;
