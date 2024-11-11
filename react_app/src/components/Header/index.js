import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarNav" />
          
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/user-list">User List</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
