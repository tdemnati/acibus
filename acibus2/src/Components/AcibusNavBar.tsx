import * as React from 'react'; 
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import acibus_logo_ok from '../images/acibus_logo_ok.png'

function AcibusNavBAr() {

  return (

<>

  <br />
  <Navbar bg="primary" variant="dark">
    <Container> 
    <Navbar.Brand href="#home">
    <img
          alt=""
          src={acibus_logo_ok}
          width="23"
          height="23"
          className="d-inline-block align-top"
        />{' '}
      Acibus
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>

  <br />

</>);
}

export default AcibusNavBAr