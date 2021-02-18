import * as React from 'react';
import './App.css';
import {TokenAnnotator} from './Annotator';
import MyContext from './Components/Provider';
import {Provider} from './Components/Provider';

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
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>ACIBUS</h3>
        <a href="http://a-cibus.com">Acibus</a>
        <p>A React component for interactively highlighting parts of text.</p>
        <h4>Edit tags</h4>
        <MyContext.Consumer>
        {(context)=> (
        <button onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Unedit"}</button>)}
        </MyContext.Consumer>
        

        <div style={{display: 'flex', marginBottom: 24}}>          
              <Card>
                <h4>Object Relation - tags</h4>
                

                <MyContext.Consumer>
                      {(context)=> (
                <div>
                  {context.state.radios1.map((tag, idx) => (
                      
                      <label key={idx}>
                      
                        <input
                                type="radio"
                                value={tag}
                                onChange={context.onSelectTag}
                                checked={context.state.tag===tag}/>
                                {tag}
                                {context.state.isEditTag ? "": <button value={tag} onClick={context.deleteItem}>Del</button>}
                       
                       
                      </label>
                  ))}

                  <br/>
                  {context.state.isEditTag ? "": <div>
                  <input type='text' onChange={context.onInputChange}/>
                  <button onClick={context.addTag}>Add</button>
                  <button onClick={context.resetTag}>Reset</button>
                  </div>}


                </div> 
                      )}
                </MyContext.Consumer>
              
                  
                  <h4>Input Text</h4>
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
        </div>
        <MyContext.Consumer>
                      {(context)=> (
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(context.state.value, null, 2)}</pre>
        </Card>
        )}
                    </MyContext.Consumer>
      </div>

      </Provider>
            </div>
    )
  }
}

export default App;
