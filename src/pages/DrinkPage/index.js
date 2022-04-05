import { Typography, Card} from "antd";
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify";
import callApi from "../../api";

const {Title, Text} = Typography

const DrinkPage = ({drink}) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    console.log(drink)
    if(drink && drink.id) {
      callApi(`http://localhost:8090/api/review/drink/${drink.id}`, {
        method: "GET",
      }).then((res) => {
        setReviews(res)
      }).catch(()=> {
        toast.error("Error fetching reviews")
      })
    }
  }, [drink])

  return ( 
  <Typography>
    <Title>{drink.name}</Title>
   {reviews && reviews.length > 0 && reviews.map((review) => 
      <Card style={{ width: 300 }}>
        <Title bold>{review.user.username}</Title>
        <Text >{review.content}</Text> 
      </Card>
    )}
  </Typography>
  )
}



export default DrinkPage