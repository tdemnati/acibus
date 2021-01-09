import React from 'react';
import './App.css';
import {TokenAnnotator} from './Annotator'
import {ObjectRelationsTag} from './Components/ObjectRelationsTag'


const TEXT = `On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`

const TAG_COLORS = {
  OB1: '#ffe184',
  OB2: '#ffe184',
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

const radios = [
  {
    value: [{start: 17, end: 19, tag: 'OB1'}],
    tag: 'OB1'
  },
  {
    value: [{start: 17, end: 19, tag: 'OB2'}],
    tag: 'OB2'
  }
];


class App extends React.Component<any, any> {
  state = {
    value: [{start: 17, end: 19, tag: 'OB1'}],
    tag: 'OB1'
  }

  handleChange = value => {
    this.setState({value})
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }

  render() {

    const valuetag = this.state.tag;

    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>ACIBUS</h3>
        <a href="http://a-cibus.com">Acibus</a>
        <p>A React component for interactively highlighting parts of text.</p>
        <div style={{display: 'flex', marginBottom: 24}}>


          
          <Card>

            
            <h4>Object Relation - tags</h4>
          <form>
          {radios.map((radio, idx) => (
          <label>
          {radio.tag}
        <input key={idx}
                type="radio"
                value={radio.tag}
                onChange={this.handleTagChange}
                checked={valuetag===radio.tag}/>
        </label>
          ))}
          </form>

          <br/>
          <h4>Input Text</h4>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
            />
          </Card>
        </div>
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default App;
