import React, { useState } from "react";

interface Props{

onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const ObjectRelationsTag: React.FC<Props> = ({onChange}) => {

  const [valuetag] = useState('OB1');

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
return (
    <>
    <br />
    <h4>Object Relation - tags - NEW</h4>
          <form>
          {radios.map((radio, idx) => (
          <label>
          {radio.tag}
        <input key={idx}
                type="radio"
                value={radio.tag}
                onChange={onChange}
                checked={valuetag===radio.tag}/>
        </label>
          ))}
          </form>
  </>

);

}

