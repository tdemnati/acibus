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
import { Accordion } from 'react-bootstrap';

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      padding: 16,
      backgroundColor: 'white',
      width: 500,
    }}
  >
    {children}
  </div>
)

class App extends React.Component<any, any> {

  render() {

    return (
      
    <div>

      <ContentProvider>
      <TagProvider>
      <div id="wrapper">
        <div id="sidebar">
          
          <div id="title">
          <h2 style={{marginTop:'0px', paddingTop:'20px'}}><a href="http://a-cibus.com">ACIBUS</a></h2>
          </div>
          <Accordion defaultActiveKey="1" flush>
          
          <Accordion.Item eventKey="1">
          <Accordion.Header>PROJECT</Accordion.Header>
          <Accordion.Body>
          <div className="settings">
          <p className="settingsLabel">Select project</p>
          </div>
          <div className="settings">
          <p className="settingsLabel">Edit tags</p>
          <ToggleEditTag/>
          </div>
          </Accordion.Body>
          
          </Accordion.Item>
          <Accordion.Item eventKey="2">
          <Accordion.Header>MY CONTENT</Accordion.Header>
          <Accordion.Body>
          <div className="section">
            <ul>
              <StructuredContentList structuredContentId={undefined}/>
            </ul>
          </div>
          </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="3">
          <Accordion.Header>SETTINGS</Accordion.Header>
          <Accordion.Body>
          <div className="section">
          <p>Some settings</p>
          </div>
          </Accordion.Body>
          </Accordion.Item>


          </Accordion>
        </div>
        
        <div id="main">
          <Card>
            <h4>Choose a Tag</h4>
            <RadioTag/>
          </Card>
          <Card>
            <h4>Annotate Text</h4>
            <AnnotateText/>
          </Card>
          <Card>
            <h4>Save</h4>
            <SaveButton/>
          </Card>
        </div>
        </div>
      </TagProvider>
      </ContentProvider>
    </div>
    )
  }
}

export default App
