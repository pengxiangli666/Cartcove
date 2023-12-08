import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./index.css";

const Register: React.FC = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password1: "",
  });
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const onFinish = (e: any) => {
    // message.success("Registered successfully");
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      username: "",
      password1: "",
    };
    console.log(formData, "formData");

    if (formData.username.trim() === "") {
      newErrors.username = "username cannot be empty";
      hasErrors = true;
    }
    if (formData.password1.trim() === "") {
      newErrors.password1 = "password cannot be empty";
      hasErrors = true;
    }
    if (formData.password1.trim()!==formData.password2.trim()) {
      setShow(true);
      setVariant("danger");
      setMessage("The two password entries are inconsistent");
      return
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    axios
      .post("https://www.airdropsharing.xyz/auth/registration/", formData)
      .then(function (response) {
        // handle success
        setShow(true);
        setVariant("success");
        setMessage("Registered successfully");
        setTimeout(() => {
          navigateTo("/SignIn");
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
    <div className="Register">
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
      <Form onSubmit={onFinish} name="normal_login" className="login-form">
        <Form.Group controlId="username">
          <Form.Label column sm="2">
            Username
          </Form.Label>
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
        <Form.Group controlId="password1">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Form.Control
            type="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            isInvalid={!!errors.password1}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label column sm="10">
            Enter the password once
          </Form.Label>
          <Form.Control
            type="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            isInvalid={!!errors.password2}
            placeholder="Enter the password once"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label column sm="2">
            E-mail
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="E-mail"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Button type="submit" className="login-form-button">
            Register
          </Button>
          Or <Link to="/SignIn">Return to land!</Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
