import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Button, Input } from "antd";
import { callApi } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { toast } from "react-toastify";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const Card = styled.div`
  width: 300px;
  max-width: 100%;
  border: 1px solid #f200e2;
  margin: auto;
  text-align: left;
  padding: 0.5rem;
  border-radius: 1px;
  -webkit-box-shadow: 5px 3px 5px 0px rgba(242, 0, 226, 0.23);
  box-shadow: 5px 3px 5px 0px rgba(242, 0, 226, 0.23);
  margin-bottom: 2rem;
`;

const PinkEnchancer = styled.span`
  color: #f200e2;
`;

const Dashboard = ({ drinks }) => {
  const navigate = useNavigate();
  const [reviewOpen, setReviewOpen] = useState(null);
  const [reviewText, setReviewText] = useState("");


  const submitReview = (drinkId) => {
    const userId = localStorage.getItem("userId");
    if (reviewText !== "" && reviewText !== null) {
      callApi("http://localhost:8090/api/review/create", {
        method: "POST",
        body: JSON.stringify({
          content: reviewText,
          userId,
          drinkId,
        }),
      })
        .then((value) => {
          toast.success("Review submitted!");
        })
        .catch((err) =>
          toast.error("Review submittion failed. Try again later.")
        );
    }
  };

  const handleReviewInputChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <Typography>
      <Title>Realboyz Drink Club</Title>
      <Title level={4}>Drinks? Drinks!</Title>

      <Row justify="center">
        {drinks &&
          drinks.length > 0 &&
          drinks.map((drink, i) => (
            <Col xs={16} lg={12} xl={8} key={drink.name + i}>
              <Card>
                <Link to={`/drink/${drink.id}`}>
                  <Title level={4}>{capitalizeFirstLetter(drink?.name)}</Title>
                </Link>
                <Paragraph>{capitalizeFirstLetter(drink?.recipe)}</Paragraph>
                <Paragraph>
                  Created by
                  <PinkEnchancer>{drink?.user?.username}</PinkEnchancer>
                </Paragraph>
                
                <Button
                  onClick={() => setReviewOpen(reviewOpen === i ? null : i)}
                >
                  {reviewOpen === i ? "Close" : "Review"}
                </Button>
                {reviewOpen === i && (
                  <div>
                    <Input
                      name="review-text"
                      value={reviewText}
                      onChange={handleReviewInputChange}
                    />
                    <Button onClick={() => submitReview(drink.id)}>
                      Submit
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          ))}
      </Row>
      {drinks && drinks.length === 0 && (
        <Paragraph>No drinks. Create one?</Paragraph>
      )}
    </Typography>
  );
};

export default Dashboard;
