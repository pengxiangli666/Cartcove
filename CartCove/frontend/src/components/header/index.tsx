import React from "react";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
export default function Header() {
  console.log(Button, "Button");

  const navigateTo = useNavigate();
  const location = useLocation();
  const [useName, setUseName] = useState("");
  const setting = () => {
    navigateTo("/PersonalSettings");
  };
  const logOut = () => {
    window.localStorage.removeItem("userName");
    setUseName("");
    // message.success("Log out successfully");
    navigateTo("/");
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={setting}>
          Personal Settings
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logOut}>
          Log out
        </a>
      ),
    },
  ];
  useEffect(() => {
    console.log(location.pathname, "location.pathname");

    const localUserName: string = window.localStorage.getItem("userName") || "";
    setUseName(localUserName);
  }, [location.pathname]);
  return (
    <header className="header">
      <div>Cartcove</div>
      <div className="search">
        <Form.Control
          type="text"
          aria-label="Disabled input example"
          placeholder="input search text"
        />
      </div>
      <div>
        <Button variant="primary">My Bag</Button>
      </div>
      {useName ? (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {useName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {items.map((res) => {
              return <Dropdown.Item key={res.key}>{res.label}</Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant="light">
          <Link to="/SignIn">Sign In</Link>
        </Button>
      )}
    </header>
  );
}
