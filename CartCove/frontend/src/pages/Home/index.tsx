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
    // 无论searchTerm是否为空，都发送请求
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
        // 可以在这里处理错误，例如设置错误状态或显示错误信息
      });
  }, [searchTerm]); // 添加searchTerm作为依赖项

  const liClick = (res: any) => {
    navigateTo("/Detail?res=" + JSON.stringify(res));
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
