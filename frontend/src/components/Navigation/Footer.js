import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2C3E50", color: "white" }}>
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy; Socialo</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
