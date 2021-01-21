import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../state/actions/userActions";

const Header = ({ createPost }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // get userInfo from store
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const onButtonPressed = () => {
    // opens modal when user clicks the create post button
    createPost(true);
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <LinkContainer to="/">
          <Navbar.Brand>
            <h2>Socialo</h2>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto right">
            {userInfo ? (
              <React.Fragment>
                <Button onClick={onButtonPressed}>
                  <i className="fas fa-edit" style={{ fontSize: "1.5rem" }}></i>
                </Button>
                <NavDropdown title={userInfo.name} id="userName">
                  <NavDropdown.Item>
                    <Link to="#">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <Link to="/login" style={{ marginRight: "1rem" }}>
                <i className="fas fa-user" /> LOGIN
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
