import React from "react";
import Navigation from "../components/Navigation";

function getProductID(ID = "") {
  let position = 0;

  for (let i = 0; ID.length > i; i++) {
    if (ID.charAt(i) === "/") {
      position = i;
    }
  }

  return ID.substring(position + 1);
}

function ReviewPage() {
  let productName = getProductID(window.location.pathname);

  return (
    <>
      <Navigation />

      <div className="reviewPage">
        <h1>{productName}</h1>

        <div className="reviewInfo">
          <div className="productRating">
            <h1>Rating</h1>

            <img
              src={
                "/static/images/rating/" +
                Math.floor(Math.random() * 11) +
                ".png"
              }
            />
          </div>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            recusandae iure necessitatibus reprehenderit inventore, dolores,
            esse enim voluptates culpa illum totam sit dolore, harum sapiente et
            magnam non vitae autem quibusdam sequi quaerat officia voluptatibus
            quam nulla. Minus, delectus modi.
          </p>
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
