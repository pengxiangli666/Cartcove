import React from "react";

function ProductPageReview({ productName = "" }) {
  return (
    <>
      <div className="productPageReview">
        <h1>Reviews for {productName}</h1>
        <a href={"/reviews/" + productName}>Click here to view all reviews</a>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
          quia odio at nostrum maiores laudantium perferendis reprehenderit sed
          quos inventore porro, laboriosam unde voluptas velit a asperiores
          neque. Tempora autem illo quae alias nam excepturi ab laboriosam
          mollitia voluptate magni deserunt, hic eaque aperiam. Amet autem eos
          culpa vero possimus. Tempora corrupti quidem, temporibus aut magnam
          blanditiis eaque recusandae enim sint obcaecati quo quas fuga officiis
          dolor odit iste inventore animi illum tenetur sapiente. Fugiat
          suscipit consectetur illum perspiciatis iusto ipsum voluptatibus quis
          neque sequi earum, similique harum sapiente totam tempora temporibus
          porro laborum voluptate! Optio quasi eligendi recusandae pariatur.
        </p>
      </div>
    </>
  );
}

export default ProductPageReview;
