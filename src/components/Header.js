import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../utils";
import "../styles/components/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorageItem("user");
    navigate("/");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="header"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/posts" className="header-item">
            Rivulet
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="header-item" to="/posts/new">
              New Post
            </Link>
            <Button className="logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
