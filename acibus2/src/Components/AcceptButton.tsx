import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Alert, Button } from 'react-bootstrap';


 

function AcceptButton() {
    const myContext = useContext(ContentContext);
    let myvalue = myContext.state.value;
    let myText = myContext.state.TEXT;
    let myID = myContext.state.StructuredContentID;

    var n = myvalue.length;
    let start=0;
    let end=0;
    let tag = 'tag';
    let color = 'color';
    let tokens = [];
    let token:string;
    var k;

    type ContentFieldValue = {
      data?: string | null | number;
    }
    
    type ContentFields = {
  name: string,
  contentFieldValue: ContentFieldValue,
  nestedContentFields: NestedContentField[],
    }

    type NestedContentField = {
      name?: string,
      contentFieldValue?: ContentFieldValue,
      nestedContentFields?: NestedContentField[],
    }

    type UpdateStructuredContent = {
      title: string;
      id: number;
      contentStructureId: number;
      contentFields: [ContentFields];
    }

const myContentfields: ContentFields = {
name: "text",
contentFieldValue: {
data: "Tarik is the best"
},
nestedContentFields: [
    ]
  }
;






    console.log(n);
    for (let i = 0; i < n; i++) {
      console.log('Faire ' + i + ' pas vers l\'est');
      const myNested : NestedContentField = {};
      for (let j = 0; j < 5; j++) {
      switch (j) {
        case 0:
          console.log('Start:'+ myvalue[i].start);
          start = myvalue[i].start;
          break;
        case 1:
          console.log('End:'+ myvalue[i].end);
          end = myvalue[i].end
          break;
        case 2:
          console.log('tag:'+ myvalue[i].tag);
          tag = myvalue[i].tag
          break;
        case 3:
          console.log('color:'+ myvalue[i].color);
          color = myvalue[i].color;
          break;
        case 4:
          console.log('Tokens length = ' + myvalue[i].tokens.length);
          k = myvalue[i].tokens.length;
          //console.log(myvalue[i].tokens[0]);
           for (let m = 0; m < k; m++) {
            token = myvalue[i].tokens[m];
            console.log('The token is = ' + token);
            myNested.nestedContentFields.push({
              name:"token",contentFieldValue:{data:token}})
          }
          console.log(myNested)
          
          break;
        default:
          //console.log('something');
        }

        const myContentfield: ContentFields = {
          name: "FieldsGroup13487557",
          contentFieldValue: { data: null },
          nestedContentFields: [
        {name:"start",contentFieldValue:{data:start}},
        {name:"end",contentFieldValue:{data:end}},
        {name:"tag",contentFieldValue:{data:tag}},
        {name:"color",contentFieldValue:{data:color}}, 
        {
          name:"FieldsGroup30533882",
          contentFieldValue: { data: null },
          nestedContentFields:[
        {name:"token",contentFieldValue:{data:"Tarik"}}
      ]
            }
          ]
        }
      ;
      myContentfield.nestedContentFields[4].nestedContentFields.push({name:"token",contentFieldValue:{data:"Tarik2"}})
      console.log(myContentfield)
      

      }}

    return (<p>my value is {n}</p>    );
  }

 
        
   
 

    
export default AcceptButton