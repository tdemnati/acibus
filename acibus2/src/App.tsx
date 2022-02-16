import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as React from 'react';
import './App.css';
import {ProjectProvider} from './Providers/ProjectProvider';
import {ContentProvider} from './Providers/ContentProvider';
import RadioTag from './Components/RadioTag';
import AnnotateText from './Components/AnnotateText';
import StructuredContentList from './Components/StructuredContentList';
import { Card, Col, Container, Row } from 'react-bootstrap';
import AcibusNavBar from './Components/AcibusNavBar';
import AcceptButton from './Components/AcceptButton';
import RetrieveGuideline from './Components/RetrieveGuideline';
import AcibusSideBar from './Components/AcibusSideBar';
import ProjectManager from './Components/ProjectManager';

class App extends React.Component<any, any> {

  render() {

    return (
      
    <div>
      <ContentProvider>
      <ProjectProvider>
      <AcibusNavBar/>
      <Container fluid>
      <Row>
        <AcibusSideBar/>
        <br />
        <Col xs={3}>
          <Card>
          <Card.Header>Choose a Tag</Card.Header>
            <Card.Body>
              <RadioTag/>
            </Card.Body>
          </Card>
          <br />
          <Card>
          <Card.Header>Annotate Text</Card.Header>
            <Card.Body>
            <AnnotateText/>
            </Card.Body>
          </Card>
          <br />
          <Card>
          <Card.Header>Save</Card.Header>
            <Card.Body>
            <AcceptButton/>
            </Card.Body>
          </Card>
        </Col>
        <Col  xs={5}>
        <Card>
            <Card.Body>
        <RetrieveGuideline/>
        </Card.Body>
          </Card>
        <br />
        <Card>
            <Card.Body>
            <Card.Title>Content List</Card.Title>
            <ul>
              <StructuredContentList/>
            </ul>
            </Card.Body>
          </Card>

        </Col>
        </Row>
        </Container>
      </ProjectProvider>
      </ContentProvider>
    </div>
    )
  }
}

export default App
