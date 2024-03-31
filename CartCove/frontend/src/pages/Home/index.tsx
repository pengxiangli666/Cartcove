import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { SearchContext } from '../../context/SearchContext';
import { MyContext } from '../../context/MenuContext';


function Home() {
  const navigateTo = useNavigate();
  const { searchTerm } = useContext(SearchContext);
  const { menu } = useContext(MyContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Create params object
    const params: { [key: string]: string | number } = {};

    // Add searchTerm to params if it is not empty
    if (searchTerm) {
      params.query = searchTerm;
    }

    // Add menu to params if it is not empty
    if (menu) {
      params.category = menu;
    }

    // Send the request
    axios
      .get("/api/products/", {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("Token"),
        },
        params,
      })
      .then((res) => {
        setLists(res.data);
      })
  }, [searchTerm, menu]);

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
