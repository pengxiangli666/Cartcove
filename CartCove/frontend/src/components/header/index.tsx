import React, { useContext } from "react";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SearchContext } from '../../context/SearchContext';
import { MyContext } from '../../context/MenuContext';
import axios from 'axios';


type Category = {
  id: number;
  name: string;
  description: string;
  parent: null | string; // or whatever the type of 'parent' is
};


export default function Header() {

  const navigateTo = useNavigate();
  const location = useLocation();
  const [useName, setUseName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    axios.get('/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);



  const { setSearchTerm } = useContext(SearchContext);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { setMenu } = useContext(MyContext);

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="lg" bg="#f5d07e" variant="light">
        <Container>
          <Navbar.Brand href="/">Cartcove</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {categories.map((category) => (
                <Nav.Link
                  key={category.id}
                  href={`#${category.name}`}
                  onClick={(event) => {
                    navigateTo("/");
                    setMenu(category.id);
                    event.preventDefault();
                  }}
                >
                  {category.name}
                </Nav.Link>
              ))}
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
        <Button variant="primary" onClick={MyBag}>My Cart</Button>
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
