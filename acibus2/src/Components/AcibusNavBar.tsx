import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo_acibus from '../images/logo_acibus.svg'

function AcibusNavBar() {

  return (
<>
  <br />
  <Navbar variant="light" className="shadow-sm bg-white">
    <Container> 
    <Row>
    <Navbar.Brand href="#home">
    <img
        alt=""
        src={logo_acibus}
        height="30"
        className="d-inline-block align-top"/>
    </Navbar.Brand>
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

export default AcibusNavBar