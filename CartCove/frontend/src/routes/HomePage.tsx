import React, { useState } from "react";
import Navigation from "../components/Navigation";
import ProductPreview from "../components/ProductPreview";
import axios from "axios";

function HomePage() {
  const [nameList, setNameList] = useState(generateNames());

  function generateNames() {
    let names: string[] = [];

    for (let i = 0; 5 > i; i++) {
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          names[i] = "Burger";
          break;
        case 1:
          names[i] = "Butter";
          break;
        case 2:
          names[i] = "Cereal";
          break;
        case 3:
          names[i] = "Chicken";
          break;
        case 4:
          names[i] = "Chocolate";
          break;
        case 5:
          names[i] = "Eggs";
          break;
        case 6:
          names[i] = "Milk";
          break;
      }
    }

    return names;
  }

  const listPreview = generateNames();

  return (
    <>
      <Navigation />

      <h1 className="homeWelcome">Recommended Items</h1>

      <div className="homeRecommended">
        {nameList.map((Name) => (
          <ProductPreview name={Name} imagePath={Name} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
