import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Alert } from "react-bootstrap";
import "./index.css";
import ProductPageReview from "../../components/ProductPageReview";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const Detail = () => {
  const location: any = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id: number = JSON.parse(searchParams.get("id") || "");

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const navigateTo = useNavigate();
  useEffect(() => {
    axios
      .get(`https://cartcove.org/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  const add = () => {
    axios
      .post(
        `https://www.cartcove.org/cart/api/add-to-cart/${id}/`,
        qs.stringify({ quantity: 1 }),
        {
          headers: {
            Authorization: "Token " + window.localStorage.getItem("Token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setShow(true);
        setVariant("success");
        setMessage("Add successfully");
      })
      .catch((error) => {
        navigateTo("/SignIn");
      })
      ;


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
                <img src={product?.image} alt="" />
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div>
            <div>{product?.name}</div>
            <div>${product?.price}</div>
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

      <ProductPageReview productName={product?.name} />
    </div>
  );
};
export default Detail;
