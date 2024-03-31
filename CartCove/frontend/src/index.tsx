import React from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  BrowserRouter,
  Route,
} from "react-router-dom";
import NotFound from "./routes/NotFound";
import Home from "./pages/Home";
import Header from "./components/header";
import PersonalSettings from "./pages/PersonalSettings";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Detail from "./pages/Detail";
import MyBag from "./pages/MyBag";
import ProductPage from "./routes/ProductPage";
import ReviewPage from "./routes/ReviewPage";
import AddProduct from "./routes/AddProduct";
import Settle from "./pages/Settle";
import { SearchProvider } from './context/SearchContext'; // SearchProvider
import { MyProvider } from './context/MenuContext'; // MyProvider


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchProvider>
      <MyProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/SignIn" element={<SignIn></SignIn>} />
            <Route path="/Register" element={<Register></Register>} />
            <Route path="/Detail" element={<Detail></Detail>} />
            <Route path="/MyBag" element={<MyBag></MyBag>} />
            <Route path="/Settle" element={<Settle></Settle>} />
            <Route
              path="/PersonalSettings"
              element={<PersonalSettings></PersonalSettings>}
            />
            <Route path="/product/*" element={<ProductPage />} />
            <Route path="/reviews/*" element={<ReviewPage />} />
            <Route path="/add/*" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </SearchProvider>
  </React.StrictMode>
);
