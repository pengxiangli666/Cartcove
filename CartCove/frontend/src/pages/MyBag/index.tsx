import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./index.css";
import qs from "qs";
import { useNavigate } from "react-router-dom";


interface ListItem {
  id: number;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
  product_id: number;
}

interface CreateOrder {
  product_id: number;
  quantity: number;
}

interface Order {
  products: CreateOrder[];
}

// const navigate = useNavigate();


const MyBag = () => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [numbers, setNumbers] = useState(0);
  const [allPrice, setAllPrice] = useState(0);

  const navigateTo = useNavigate();
  const settle = () => {
    navigateTo("/Settle");
  };

  useEffect(() => {
    axios
      .get("https://www.cartcove.org/cart/api/cart-items/", {
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

  const handleDelete = (product_id: number) => {
    axios
      .post(`https://www.cartcove.org/cart/api/remove-from-cart`,
        { product_id },
        {
          headers: {
            Authorization: "Token " + window.localStorage.getItem("Token"),
          },
        }
      )
      .then(() => {
        axios
          .get("https://www.cartcove.org/cart/api/cart-items/", {
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
      });
  };

  const handleAddToCard = (product_id: number) => {
    axios
      .post(
        `https://www.cartcove.org/cart/api/add-to-cart/${product_id}/`,
        qs.stringify({ quantity: 1 }),
        {
          headers: {
            Authorization: "Token " + window.localStorage.getItem("Token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(() => {
        axios
          .get("https://www.cartcove.org/cart/api/cart-items/", {
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
      });
  };


  const handleConfirmClick = async () => {
    const url = 'https://www.cartcove.org/api/orders/';
    let allProducts: CreateOrder[] = [];
    let data: Order;

    lists.forEach((item) => {
      const product = {
        product_id: item.product_id,
        quantity: item.quantity
      };

      allProducts.push(product);
    });

    data = {
      products: allProducts
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
      });
      console.log(response.data);
      // remove all from cart 
      await axios.delete('https://www.cartcove.org/api/cart-items/delete_all/', {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
      });
      settle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="MyBag">
      <div>
        <div>
          <div>Shopping Cart (all {numbers})</div>
          <div>
            <div>${allPrice}</div>
            <Button variant="primary" onClick={handleConfirmClick}>Settle accounts</Button>
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
                  <div onClick={() => handleDelete(res.id)}>-</div>
                  <div>{res.quantity}</div>
                  <div onClick={() => handleAddToCard(res.product_id)}>+</div>
                </div>
                <div>${res.quantity * res.product_price}</div>
                <div>
                  <div>
                    <div
                      onClick={() => handleDelete(res.id)}
                      style={{
                        color: 'white',
                        backgroundColor: 'red',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      delete
                    </div>
                  </div>
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
