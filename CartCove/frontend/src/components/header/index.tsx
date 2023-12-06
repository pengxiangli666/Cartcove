import React from "react";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
  const MyBag=()=>{
    navigateTo("/MyBag");
  }
  useEffect(() => {
    console.log(location.pathname, "location.pathname");

    const localUserName: string = window.localStorage.getItem("userName") || "";
    setUseName(localUserName);
  }, [location.pathname]);
  return (
    <header className="header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">Cartcove</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Fresh Grocery</Nav.Link>
              <Nav.Link href="#link">Fast Food</Nav.Link>
              <Nav.Link href="#link">Drinks</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Homes</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Tools</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Makeup</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Health</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="search">
        <Form.Control
          type="text"
          aria-label="Disabled input example"
          placeholder="input search text"
        />
      </div>
      <div>
        <Button variant="primary" onClick={MyBag}>My Bag</Button>
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
