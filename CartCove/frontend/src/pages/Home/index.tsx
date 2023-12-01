import React from "react";
import {  useNavigate } from "react-router-dom";
import "./index.css";
function Home() {
  const navigateTo = useNavigate();
  const liClick=()=>{
    navigateTo("/Detail");
  }
  return (
    <div className="Home">
      <ul>
        {[1, 2, 3, 4, 5, 6].map((res,i) => {
          return (
            <li key={i} onClick={liClick}>
              <div>
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201502%2F25%2F20150225220538_QnGZZ.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1703486875&t=f9d29c955f51cadf9c88d5cc52d37843"
                  alt=""
                />
              </div>
              <div>
                <div>
                Anta plank shoes women's shoes 2023 autumn and winter new white casual shoes increase small white shoes retro sports shoes
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Home;
