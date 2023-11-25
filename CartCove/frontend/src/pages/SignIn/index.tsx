import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const SignIn: React.FC = () => {
  const navigateTo = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    message.success("Successful landing");
    window.localStorage.setItem('userName',values.username)
    navigateTo("/");
  };

  return (
    <div className="SignIn">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
          Or <Link to="/Register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
