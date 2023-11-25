import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const Register: React.FC = () => {
  const navigateTo = useNavigate();
  const onFinish = (values: any) => {
    console.log(values);
    message.success("Registered successfully");
    navigateTo("/SignIn");
  };

  return (
    <div className="Register">
      <Form
        onFinish={onFinish}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        labelCol={{
          sm: { span: 7 },
        }}
        labelAlign="left"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Shipping Address"
          label="Shipping Address"
          rules={[
            { required: true, message: "Please input your Shipping Address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          Or <Link to="/SignIn">Return to land!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
