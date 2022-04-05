import React from "react";
import { Form, Input, Button, Typography } from "antd";
import styled from "styled-components";
import { callApi } from "../../api";
import { toast } from "react-toastify";

const { Title } = Typography;

const { TextArea } = Input;

const FormContainer = styled.div``;

const createDrinkPage = () => {
  const userId = localStorage.getItem("userId");
  const handleSubmit = (values) => {
    callApi("http://localhost:8090/api/drinks/create", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        userId,
      }),
    })
      .then((value) => {
        toast.success("Drink created!");
      })
      .catch((err) => toast.error("Drink creation failed. Try again later."));
  };

  return (
    <FormContainer>
      <Typography>
        <Title>Submit your own drink</Title>
      </Typography>
      <Form name="basic" onFinish={handleSubmit}>
        <Form.Item
          label="Drink name"
          name="name"
          rules={[{ required: true, message: "Ahem, drink needs a name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Recipe"
          name="recipe"
          rules={[
            { required: true, message: "Please add a recipe for your drink." },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Drink
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default createDrinkPage;
