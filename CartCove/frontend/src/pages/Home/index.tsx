import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
function Home() {
  const navigateTo = useNavigate();
  const [lists, setLists] = useState([]);

  const liClick = (res: any) => {
    navigateTo("/Detail?res=" + JSON.stringify(res));
  };
  useEffect(() => {
    axios
      .get("https://www.airdropsharing.xyz/api/products/", {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setLists(res.data);
      });
  }, []);
  return (
    <div className="Home">
      <ul>
        {lists.map((res: any, i) => {
          return (
            <li key={i} onClick={() => liClick(res)}>
              <div>
                <img src={res.image} alt="" />
              </div>
              <div>
                <div>{res.name}</div>
                <div>${res.price}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Home;
