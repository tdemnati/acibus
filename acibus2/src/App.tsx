import * as React from 'react';
import './App.css';
import {TokenAnnotator} from './Annotator';
import MyContext from './Components/Provider';
import {Provider} from './Components/Provider';
import ToggleEditTag from './Components/ToggleEditTag';
import RadioTag from './Components/RadioTag';

const TEXT = `On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`

const TAG_COLORS = {
  OB1: '#ffe184',
  OB2: '#ffe184',
  REL: 'rgb(98, 95, 250)'
}

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

class App extends React.Component<any, any> {

  render() {

    return (
    <div>
      <Provider>
        <div>
          <h3>ACIBUS</h3>
          <a href="http://a-cibus.com">Acibus</a>
          <p>A React component for interactively highlighting parts of text.</p>
          <h4>Edit tags</h4>
          <ToggleEditTag/>
          <Card>
            <h4>Tags</h4>
            <RadioTag/>
          </Card>
        </div>
        <div>
          <Card>
            <h4>Text</h4>
            <MyContext.Consumer>
              {(context)=> (
              <TokenAnnotator
                  style={{
                    fontFamily: 'IBM Plex Sans',
                    maxWidth: 500,
                    lineHeight: 1.5,
                  }}
                  tokens={TEXT.split(' ')}
                  value={context.state.value}
                  onChange={context.onSelectText}
                  getSpan={span => ({
                    ...span,
                    tag: context.state.tag,
                    color: TAG_COLORS[context.state.tag],
                  })}
                />
              )}
            </MyContext.Consumer>
          </Card>
          <Card>
            <MyContext.Consumer>  
              {(context)=> (
                <>
                  <h4>Output</h4>
                  <pre>{JSON.stringify([...context.state.value, {text: TEXT}], null, 2)}</pre>
                </>
              )}
            </MyContext.Consumer>
          </Card>
        </div>
      </Provider>
    </div>
    )
  }
}

export default App;
