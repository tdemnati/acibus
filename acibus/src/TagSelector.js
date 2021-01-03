import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { useState } from "react";


/*
 * The second argument that will be passed to
 * `handleChange` from `ToggleButtonGroup`
 * is the SyntheticEvent object, but we are
 * not using it in this example so we will omit it.
 */
export default function TagSelector() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'Object1', value: '1' },
      { name: 'Object2', value: '2' },
    ];
  
    return (
      <>
        <br />
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }