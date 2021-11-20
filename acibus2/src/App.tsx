import * as React from 'react';
import './App.css';
import {TagProvider} from './Providers/TagProvider';
import {ContentProvider} from './Providers/ContentProvider';

import ToggleEditTag from './Components/ToggleEditTag';
import RadioTag from './Components/RadioTag';
import AnnotateText from './Components/AnnotateText';
import StructuredContentList from './Components/StructuredContentList';
import Save from './Components/Save';

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
          <div className="section">
          <h3>DATA SET</h3>
          <p>Select Text File</p>
          {/* todo */}
          </div>
          <div className="section">
          
          <h3>SETTINGS</h3>
          <div className="settings">
          <p>Edit tags</p>
          <ToggleEditTag/>
          </div>
          </div>
          <div className="section">
            <h3>MY CONTENT</h3>
            <ul>
              <StructuredContentList structuredContentId={undefined}/>
            </ul>
          </div>
          
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
            <Save/>
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
