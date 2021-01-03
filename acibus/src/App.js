import './App.css';
import {TokenAnnotator} from 'react-text-annotate'
import react from 'react'
//import TagSelector from './TagSelector'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
//import React, { useEffect, useState } from "react";

const TEXT = `On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`


const TAG_COLORS = {
  OB1: '#84d2ff',
  OB2: '#84d2ff',
  REL: 'green',
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
  { name: 'OB1', value: 'OB1' },
  { name: 'OB2', value: 'OB2' },
  { name: 'REL', value: 'REL' },
];

const radioValue = [
  { name: 'OB1', value: 'OB1' },
];

class App extends react.Component {
  state = {
    value: [{start: 17, end: 19, tag: 'OB1'}],
    tag: 'OB1',
  }

  handleChange = value => {
    this.setState({value})
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
    //this.setState({tag: e.currentTarget.checked})
  }

  render() {
    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>Acibus annotation tool</h3>
        <p>A React component for interactively associating objects.</p>
        <div style={{display: 'flex', marginBottom: 24}}>
          <Card>
            <h4>Default</h4>
            <br/>
            <ButtonGroup toggle className="mb">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={this.handleTagChange}
  
          >
            {radio.name}
            
<br/>
          </ToggleButton>
        ))}
        <br/>
      </ButtonGroup>
      <br/>
            <TokenAnnotator
              style={{
                fontFamily: 'ARIAL',
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
          <button><a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(this.state.value, null, 2)
            )}`}
            download="filename.json"
          >
            {`Download Json`}
          </a></button>
        </Card>

      </div>
    )
  }
}

export default App;
