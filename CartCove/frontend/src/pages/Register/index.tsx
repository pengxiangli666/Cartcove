import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const Register: React.FC = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const onFinish = (e: any) => {
    // message.success("Registered successfully");
    e.preventDefault();

    // 检查表单字段是否为空
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
    navigateTo("/SignIn");
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
        <Form.Group controlId="password">
          <Form.Label column sm="2">
            Password
          </Form.Label>
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
        <Form.Group controlId="Shipping Address">
          <Form.Label column sm="4">
            Shipping Address
          </Form.Label>
          <Form.Control
            type="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
            placeholder="address"
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
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
