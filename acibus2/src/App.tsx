import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import './App.css';
import {TagProvider} from './Providers/TagProvider';
import {ContentProvider} from './Providers/ContentProvider';

import ToggleEditTag from './Components/ToggleEditTag';
import RadioTag from './Components/RadioTag';
import AnnotateText from './Components/AnnotateText';
import StructuredContentList from './Components/StructuredContentList';
import SaveButton from './Components/SaveButton';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import SelectProject from './Components/SelectProject';

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

      <ContentProvider>
      <TagProvider>
      <Container>
      <Row>
        <Col   xs={3}>
          
          <div id="title">
          <h2 style={{marginTop:'0px', paddingTop:'20px'}}><a href="http://a-cibus.com">ACIBUS</a></h2>
          </div>
          <Accordion defaultActiveKey="1" flush>
          
          <Accordion.Item eventKey="1">
          <Accordion.Header>PROJECTS</Accordion.Header>
          <Accordion.Body>
          <div className="settings">
          <p className="settingsLabel">Select project</p>
          <SelectProject></SelectProject>
          </div>
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
          Some content config
          </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="4">
          <Accordion.Header>SETTINGS</Accordion.Header>
          <Accordion.Body>
          <div className="section">
          <p>Some settings</p>
          </div>
          </Accordion.Body>
          </Accordion.Item>


          </Accordion>
        </Col>
        
        <Col>
          <Card>
            <Card.Body>
            <Card.Title>Choose a Tag</Card.Title>
              <RadioTag/>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
            <Card.Title>Annotate Text</Card.Title>
            <AnnotateText/>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
            <Card.Title>Save</Card.Title>
            <SaveButton/>
            </Card.Body>
          </Card>
        </Col>

        <Col  xs={4}>

        <Card>
            <Card.Body>
            <Card.Title>Content List</Card.Title>
            <ul>
              <StructuredContentList structuredContentId={undefined}/>
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
