import React, { useContext } from "react";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SearchContext } from '../../context/SearchContext'; // SearchContext


export default function Header() {

  const navigateTo = useNavigate();
  const location = useLocation();
  const [useName, setUseName] = useState("");
  const setting = () => {
    navigateTo("/PersonalSettings");
  };
  const logOut = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("Token");
    setUseName("");
    console.log("Log out successfully");
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
  const MyBag = () => {
    navigateTo("/MyBag");
  }
  useEffect(() => {
    const localUserName: string = window.localStorage.getItem("userName") || "";
    setUseName(localUserName);
  }, [location.pathname]);

  const { setSearchTerm } = useContext(SearchContext);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="lg" bg="#f5d07e" variant="light">
        <Container>
          <Navbar.Brand href="/">Cartcove</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Fresh Grocery</Nav.Link>
              <Nav.Link href="#link1">Fast Food</Nav.Link>
              <Nav.Link href="#link2">Drinks</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="search">
        <Form.Control
          type="text"
          aria-label="Disabled input example"
          placeholder="input search text"
          onChange={handleSearchChange}
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
