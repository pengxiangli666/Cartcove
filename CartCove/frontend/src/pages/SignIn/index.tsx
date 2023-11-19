import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const onFinish = (e: any) => {
    e.preventDefault();

    // 检查表单字段是否为空
    let hasErrors = false;
    const newErrors = {
      username: "",
      password: "",
    };
    console.log(formData,'formData');
    
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
    // message.success("Successful landing");
    window.localStorage.setItem("userName", formData.username);
    navigateTo("/");
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
