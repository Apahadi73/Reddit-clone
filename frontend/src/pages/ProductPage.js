import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import StarRatingComponent from 'react-star-rating-component';

export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/product/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);
  return (
    <React.Fragment>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="rating">
                {/* <StarRatingComponent editing={false} starCount={5} value={product.rating} /> */}
              </div>
              {product.numReviews} reviews
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ color: "green" }}>${product.price}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p style={{ textAlign: "justify" }}>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  disabled={product.countInStock === 0}
                  className="btn-block"
                  type="button"
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
