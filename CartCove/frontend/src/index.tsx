import React from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  createBrowserRouter,
  BrowserRouter,
  Route,
} from "react-router-dom";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import Home from "./pages/Home";
import Header from "./components/header";
import PersonalSettings from "./pages/PersonalSettings";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Detail from "./pages/Detail";
import MyBag from "./pages/MyBag";

import "../static/css/index.css";
import ProductPage from "./routes/ProductPage";
import ReviewPage from "./routes/ReviewPage";
import AddProduct from "./routes/AddProduct";

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
  {
    path: "/add/*",
    element: <AddProduct />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/SignIn" element={<SignIn></SignIn>} />
        <Route path="/Register" element={<Register></Register>} />
        <Route path="/Detail" element={<Detail></Detail>} />
        <Route path="/MyBag" element={<MyBag></MyBag>} />
        <Route
          path="/PersonalSettings"
          element={<PersonalSettings></PersonalSettings>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
