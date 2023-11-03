import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="navigation">
          <h1>CartCove</h1>
        </div>

        <div className="text">
          <h1>"Hello World!" - Jamel</h1>
          <h1>"Hello World!" - Zhongsheng</h1>
        </div>
      </>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
