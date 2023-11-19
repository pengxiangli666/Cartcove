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
import "../static/css/index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
        <Route
          path="/PersonalSettings"
          element={<PersonalSettings></PersonalSettings>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
