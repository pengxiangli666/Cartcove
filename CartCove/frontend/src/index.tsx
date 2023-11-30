import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../static/css/index.css";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import ProductPage from "./routes/ProductPage";
import ReviewPage from "./routes/ReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/product/*",
    element: <ProductPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/reviews/*",
    element: <ReviewPage />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
