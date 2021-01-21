import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import StarRatingComponent from 'react-star-rating-component';

const Product = ({ product }) => {
  return (
    <Card className="my-3 py-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="rating">
            {/* {<StarRatingComponent editing={false} starCount={5} value={product.rating} />} */}
          </div>
          <div className="review">{product.numReviews} reviews</div>
        </Card.Text>
        <Card.Text className="my-3" as="h4" style={{ color: "green" }}>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
