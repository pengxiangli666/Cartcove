import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { SearchContext } from '../../context/SearchContext';

function Home() {
  const navigateTo = useNavigate();
  const { searchTerm } = useContext(SearchContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Send the request regardless of whether searchTerm is empty or not
    axios
      .get("https://www.cartcove.org/api/products/", {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
        params: {
          query: searchTerm,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // Errors can be handled here, such as setting error status or displaying error messages
      });
  }, [searchTerm]); // Add searchTerm as dependency

  const liClick = (res: any) => {
    navigateTo("/Detail?id=" + res.id);
  };

  return (
    <div className="Home">
      <ul>
        {lists.map((res: any, i) => (
          <li key={i} onClick={() => liClick(res)}>
            <div>
              <img src={res.image} alt="" />
            </div>
            <div>
              <div>{res.name}</div>
              <div>${res.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
