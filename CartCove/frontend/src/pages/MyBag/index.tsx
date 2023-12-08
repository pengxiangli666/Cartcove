import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./index.css";
const MyBag = () => {
  const [lists, setLists] = useState([]);
  const [numbers, setNumbers] = useState(0);
  const [allPrice, setAllPrice] = useState(0);
  useEffect(() => {
    axios
      .get("https://www.airdropsharing.xyz/cart/api/cart-items/", {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setLists(res.data);
        let number = 0;
        let price = 0;
        res.data.forEach((element: any) => {
          number += element.quantity;
          price += element.quantity * element.product_price;
        });
        setNumbers(number);
        setAllPrice(price);
      });
  }, []);

  return (
    <div className="MyBag">
      <div>
        <div>
          <div>Shopping Cart (all {numbers})</div>
          <div>
            <div>${allPrice}</div>
            <Button variant="primary">Settle accounts</Button>
          </div>
        </div>
        <div>
          <div>Commodity information</div>
          <div>Unit price</div>
          <div>quantity</div>
          <div>amount</div>
          <div>Controls</div>
        </div>
        <ul>
          {lists.map((res, i) => {
            return (
              <li key={i}>
                <div>
                  <img src={res.product_image} alt="" />
                </div>
                <div>{res.product_name}</div>
                <div>${res.product_price}</div>
                <div>
                  <div>-</div>
                  <div>{res.quantity}</div>
                  <div>+</div>
                </div>
                <div>${res.quantity * res.product_price}</div>
                <div>
                  <div>delete</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default MyBag;
