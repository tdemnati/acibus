import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import './App.css';
import {TagProvider} from './Providers/TagProvider';
import {ContentProvider} from './Providers/ContentProvider';

import ToggleEditTag from './Components/ToggleEditTag';
import RadioTag from './Components/RadioTag';
import AnnotateText from './Components/AnnotateText';
import StructuredContentList from './Components/StructuredContentList';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import SelectProject from './Components/SelectProject';
import AcibusNavBAr from './Components/AcibusNavBar';
import AddProject from './Components/AddProject';
import AddContent from './Components/AddContent';
import AcceptButton from './Components/AcceptButton';

/* const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      padding: 16,
      backgroundColor: 'white',
    }}
  >
    {children}
  </div>
) */

class App extends React.Component<any, any> {

  render() {

    return (
      
    <div>
      <AcibusNavBAr/>
      <ContentProvider>
      <TagProvider>
      <Container>
      <Row>
        <Col   xs={3}>
          
          <Accordion defaultActiveKey="1" flush>
          
          <Accordion.Item eventKey="1">
          <Accordion.Header>PROJECTS</Accordion.Header>
          <Accordion.Body>
          
          <p className="settingsLabel">Select a project</p>
          
          <SelectProject></SelectProject>
          <br/>
          <p className="settingsLabel">Create a project</p>
          <AddProject></AddProject>
          </Accordion.Body>
          
          <Accordion.Item eventKey="2">
          <Accordion.Header>TAGS</Accordion.Header>
          <Accordion.Body>
          <div className="settings">
          <p className="settingsLabel">Edit tags</p>
          <ToggleEditTag/>
          </div>
          </Accordion.Body>
          </Accordion.Item>


          </Accordion.Item>
          <Accordion.Item eventKey="3">
          <Accordion.Header>CONTENTS</Accordion.Header>
          <Accordion.Body>
          <p className="settingsLabel">Add content</p>
          <AddContent/>
          </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="4">
          <Accordion.Header>GUIDELINES</Accordion.Header>
          <Accordion.Body>
          <div className="section">
          <p>Some settings</p>
          </div>
          </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
          <Accordion.Header>TEAM</Accordion.Header>
          <Accordion.Body>
          <div className="section">
          <p>Select Project Members</p>
          </div>
          </Accordion.Body>
          </Accordion.Item>

          </Accordion>
        </Col>
        <br />
        <Col>
        <br />
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

        <Col  xs={4}>
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
      </TagProvider>
      </ContentProvider>
    </div>
    )
  }
}

export default App
