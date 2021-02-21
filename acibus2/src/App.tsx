import * as React from 'react';
import './App.css';
import MyContext from './Providers/Provider';
import {Provider} from './Providers/Provider';
import {TextProvider} from './Providers/TextProvider';
import ToggleEditTag from './Components/ToggleEditTag';
import RadioTag from './Components/RadioTag';
import Annotate from './Components/Annotate';
import Save from './Components/Save';

//const TEXT = `On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`

const Card = ({children}) => (
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
)

class App extends React.Component<any, any> {

  render() {

    return (
    <div>
      <TextProvider>
      <Provider>
      <div id="wrapper">
    
        <div id="sidebar">
          <div id="title">
          <h2 style={{marginTop:'0px', paddingTop:'20px'}}><a href="http://a-cibus.com">ACIBUS</a></h2>
          </div>
          <div className="section">
          <p>Select Text File</p>
          {/* todo */}
          </div>
          <div className="section">
          <p>Edit tags</p>
          <ToggleEditTag/>
          </div>
        </div>

        <div id="main">
          <Card>
            <h4>Choose a Tag</h4>
            <RadioTag/>
          </Card>
          <Card>
            <h4>Annotate Text</h4>
            <Annotate/>
          </Card>
          <Card>
            <h4>Save Output</h4>
            <Save/>
          </Card>
        </div>

        </div>
      </Provider>
      </TextProvider>
    </div>
    )
  }
}

export default App;
