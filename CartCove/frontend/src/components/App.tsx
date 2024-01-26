import React from "react";
import Button from "./Button";

function App() {
  return (
    <Button
      onClick={function (event: React.MouseEvent<Element, MouseEvent>): void {
        throw new Error("Function not implemented.");
      }}
      text={"Hello"}
    />
      


  );
}

export default App;
