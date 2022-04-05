import React, { useEffect, useState } from "react";
import { Form, Space, Input, Typography, Button } from "antd";
import styled from "styled-components";
import { callApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const { Title, Paragraph } = Typography;


const ProfilePage = () => {
  const [user, setUse] = useState(null)
  const [reviews, setReviews] = useState(null)


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    callApi(`http://localhost:8090/api/review/user/${userId}`, {
      method: "GET",
    })
      .then((value) => {
        setReviews(value);
      })
      .catch((err) => () => {
        toast.error("Fetching reviews failed")
      });
  }, []);


  return(
    <div>
      <Typography>
      <Title>Profile</Title>
      <Title level={4}>You and your business!</Title>
      </Typography>
    </div>
  )
}

export default ProfilePage