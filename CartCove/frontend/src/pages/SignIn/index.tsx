import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "./index.css";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const navigateTo = useNavigate();
  const onFinish = (e: any) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      username: "",
      password: "",
    };
    console.log(formData, "formData");

    if (formData.username.trim() === "") {
      newErrors.username = "username cannot be empty";
      hasErrors = true;
    }
    if (formData.password.trim() === "") {
      newErrors.password = "password cannot be empty";
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    axios
      .post("http://127.0.0.1:8000/auth/login/", formData)
      .then((response:any) => {
        // handle success
        setShow(true);
        setVariant("success");
        setMessage("Registered successfully");
        window.localStorage.setItem("userName", formData.username);
        window.localStorage.setItem("Token", response.data.key);
        console.log(response, "response");
        // Cookies.set('Token', response.data.key);
        setTimeout(() => {
          navigateTo("/");
        }, 1000);
      })
      .catch(function (error) {
        // handle error
        setShow(true);
        setVariant("danger");
        setMessage(JSON.stringify(error.response.data, null, 2));
      })
      .finally(function () {
        // always executed
      });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="SignIn">
      <Alert
        show={show}
        variant={variant}
        style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClose={() => setShow(false)}
        dismissible
      >
        <p>{message}</p>
      </Alert>
      <Form name="normal_login" className="login-form" onSubmit={onFinish}>
        <Form.Group controlId="username">
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Username"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="login-form-button">
          Sign In
        </Button>
        Or <Link to="/Register">register now!</Link>
      </Form>
    </div>
  );
};

export default SignIn;
