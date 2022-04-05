import React, { useEffect, useState } from "react";
import { Form, Space, Input, Typography, Button } from "antd";
import styled from "styled-components";
import { callApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  width: 80%;
  max-width: 600px;
  margin: auto;
`;

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    callApi("http://localhost:8090/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => {
        sessionStorage.setItem("authenticated", JSON.stringify(true));
        localStorage.setItem("userId", JSON.stringify(res.user.id));
        navigate("/dashboard");
      })
      .catch((err) =>
        toast.error("Login failed, check credentials and try again.")
      );
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form name="basic" onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <a href="register">No account? Sign up!</a>
    </FormContainer>
  );
};

export default Login;
