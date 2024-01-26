import React, { useState } from "react";
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

function getReviewMessage(reviewIndex: number): string {
  switch (reviewIndex) {
    case 0:
      return "This product is excellent! Highly recommended.";

    case 1:
      return "Not bad, but could use some improvements.";

    case 2:
      return "Terrible experience, avoid buying this product.";

    case 3:
      return "Amazing quality! Exceeded my expectations.";

    case 4:
      return "Average product, nothing too special.";

    case 5:
      return "I love it! Best purchase I've made.";

    case 6:
      return "Disappointing. Not worth the money.";

    case 7:
      return "Impressive features, but complicated to use.";

    case 8:
      return "Decent product, fair value for the price.";

    case 9:
      return "Absolutely horrible. Regret buying it.";

    case 10:
      return "Satisfied with the purchase. Does the job well.";

    case 11:
      return "Overpriced for what it offers.";

    case 12:
      return "Fantastic customer service!";

    case 13:
      return "Could be better, but not terrible.";

    case 14:
      return "Good value for the money.";

    case 15:
      return "Mixed feelings about this product.";

    case 16:
      return "Faulty product, stopped working after a short time.";

    case 17:
      return "Solid performance, meets expectations.";

    case 18:
      return "Not recommended. Save your money.";

    case 19:
      return "Pleasantly surprised! Exceeded my expectations.";

    default:
      return "It's fine";
  }
}

function getFirstName(firstNameIndex: number): string {
  switch (firstNameIndex) {
    case 0:
      return "Alice";

    case 1:
      return "Bob";

    case 2:
      return "Charlie";

    case 3:
      return "David";

    case 4:
      return "Emma";

    case 5:
      return "Frank";

    case 6:
      return "Grace";

    case 7:
      return "Harry";

    case 8:
      return "Ivy";

    case 9:
      return "Jack";

    case 10:
      return "Karen";

    case 11:
      return "Leo";

    case 12:
      return "Mia";

    case 13:
      return "Nathan";

    case 14:
      return "Olivia";

    case 15:
      return "Peter";

    case 16:
      return "Quinn";

    case 17:
      return "Rachel";

    case 18:
      return "Samuel";

    case 19:
      return "Taylor";

    default:
      return "Charlie";
  }
}

function createReview() {
  const newReview = {
    name: getFirstName(Math.floor(Math.random() * 20)),
    rating: Math.floor(Math.random() * 5),
    review: getReviewMessage(Math.floor(Math.random() * 20)),
  };

  return newReview;
}

function ReviewPage() {
  type review = {
    name: string;
    rating: number;
    review: string;
  };

  const review = {
    name: "Adam",
    rating: 2,
    review: "It wasn't that good",
  };

  let productName = getProductID(window.location.pathname);
  let productReviews: review[] = [
    createReview(),
    createReview(),
    createReview(),
    createReview(),
    createReview(),
    createReview(),
    createReview(),
    createReview(),
  ];

  return (
    <>
      <div className="reviewPage">
        <h1>Reviews for {productName}</h1>

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

          <div className="reviewSubmissions">
            {productReviews.map((review) => (
              <div className="userReview">
                <h1>
                  {review.name}: {review.rating}/5
                </h1>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
