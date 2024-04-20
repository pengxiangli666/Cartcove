import React, { useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./index.css";

const PersonalSettings: React.FC = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });
  const [errors, setErrors] = useState({
    old_password: "",
    new_password: "",
  });
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const onFinish = (e: any) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      old_password: "",
      new_password: "",
    };

    if (!formData.old_password) {
      hasErrors = true;
      newErrors.old_password = "Old password is required";
    }

    if (!formData.new_password) {
      hasErrors = true;
      newErrors.new_password = "New password is required";
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
<<<<<<< HEAD
    axios
      .patch("http://127.0.0.1:8001/api/customer/info/update", formData)
      .then(function (response) {
        // handle success
        setShow(true);
        setVariant("success");
        setMessage("Submit successfully");
        setTimeout(() => {
          navigateTo("/Index");
        }, 1000);
=======
    // 发送请求到后端服务器

    fetch('/auth/password_change/', {
      method: 'PUT',
      headers: {
        'Authorization': "Token " + window.localStorage.getItem("Token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status === 204) {
          setVariant('success'); // 修改这里
          setMessage('Password changed successfully');
          setShow(true);
          setTimeout(() => {
            navigateTo("/Index");
          }, 1000);
        } else if (response.status === 400) { // 添加这里
          return response.json().then(data => {
            setVariant('danger');
            setMessage(data.old_password ? data.old_password[0] : data.new_password[0]);
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 1500);
          });
        }
        return response.json();
>>>>>>> main
      })


  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="PersonalSettings">
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
        <Form.Group controlId="old_password">
          <Form.Label column sm="2">
            Old Password
          </Form.Label>
          <Form.Control
            type="password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            isInvalid={!!errors.old_password}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.old_password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="new_password">
          <Form.Label column sm="2">
            New Password
          </Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            isInvalid={!!errors.new_password}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.new_password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Button type="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default PersonalSettings;
