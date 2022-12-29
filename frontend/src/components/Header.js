import React from 'react'
import { Navbar, Nav,Container, Row } from 'react-bootstrap'

function Header() {
  return (
    <header>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">TechNoz</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fas fa-user"></i>Login</Nav.Link>
           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
   
  )
}

export default Header