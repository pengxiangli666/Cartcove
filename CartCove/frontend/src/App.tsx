import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersonalSettings from "./pages/PersonalSettings";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Header from "./components/header";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/SignIn" element={<SignIn></SignIn>} />
          <Route path="/Register" element={<Register></Register>} />
          <Route path="/PersonalSettings" element={<PersonalSettings></PersonalSettings>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
