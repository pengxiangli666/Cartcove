import React from "react";
import ReactDOM from "react-dom/client";
import "../static/css/index.css";
import App from "./components/App";
import Navigation from "./components/Navigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navigation />
    <App />
  </React.StrictMode>
);
