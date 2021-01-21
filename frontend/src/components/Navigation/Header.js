import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../state/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // get userInfo from store
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
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
            <Link>
              <i class="fas fa-edit" style={{ fontSize: "2rem" }}></i>
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="userName">
                <NavDropdown.Item>
                  <Link to="#">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
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
