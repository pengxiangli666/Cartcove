import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Alert } from "react-bootstrap";
import "./index.css";
import ProductPageReview from "../../components/ProductPageReview";
const Detail = () => {
  const location: any = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const res: any = JSON.parse(searchParams.get("res") || "");

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  const add = () => {
    axios
      .post(
        `https://www.airdropsharing.xyz/cart/api/add-to-cart/${res.id}/`,
        qs.stringify({ quantity: 1 }),
        {
          headers: {
            Authorization: "Token " + window.localStorage.getItem("Token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setShow(true);
          setVariant("success");
          setMessage("Add successfully");
        }
      });
  };
  return (
    <div className="Detail">
      <div>
        <div>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="myCarousel"
            interval={null}
            data-bs-theme="dark"
          >
            <Carousel.Item>
              <Carousel.Caption>
                <img src={res.image} alt="" />
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div>
            <div>{res.name}</div>
            <div>${res.price}</div>
            <div>Description</div>
            <div>500 remaining</div>
          </div>
        </div>
        <div>
          <div onClick={add} style={{ cursor: "pointer" }}>
            Add to cart
          </div>
        </div>
      </div>
      <Alert
        show={show}
        variant={variant}
        style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClose={() => setShow(false)}
        dismissible
      >
        <p>{message}</p>
      </Alert>

      <ProductPageReview productName={res.name} />
    </div>
  );
};
export default Detail;
