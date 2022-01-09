import * as React from 'react'; 
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo_acibus from '../images/logo_acibus.png'

function AcibusNavBAr() {

  return (

<>

  <br />
  <Navbar variant="dark" className="shadow-sm bg-primary">
    <Container> 
    <Row>
    <Navbar.Brand href="#home">
    <img
          alt=""
          src={logo_acibus}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      Acibus
    </Navbar.Brand>
    </Row>
    <Row>
    <Nav>
    <Nav.Link href="#home">Tasks</Nav.Link>
    </Nav>
    </Row>
    <Row>
    <Nav className="me-auto">
      <Nav.Link href="#features">Notifications</Nav.Link>
      <Nav.Link href="#pricing">My User</Nav.Link>
    </Nav>
    </Row>

    </Container>
  </Navbar>

  <br />

</>);
}

export default AcibusNavBAr