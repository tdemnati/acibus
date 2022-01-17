import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Alert, Button } from 'react-bootstrap';


 

function SaveButton() {
    const myContext = useContext(ContentContext);
    let formatedValue ='';
    let myValue = myContext.state.value;
    let myText = myContext.state.TEXT;
    let myID = myContext.state.StructuredContentID;

    formatedValue+=`
    contentFields: [
    {
      name: "text"
      contentFieldValue: {
        data: "`+myText+`"
      }
    }`;

  myValue.map(value => {
    formatedValue+=`
            {
    name: "FieldsGroup13487557"
    contentFieldValue: { data: null }
    nestedContentFields: [
  {name:"start",contentFieldValue:{data:"${value.start}"}}
  {name:"end",contentFieldValue:{data:"${value.end}"}}
  {name:"tag",contentFieldValue:{data:"${value.tag}"}}
  {name:"color",contentFieldValue:{data:"${value.color}"}}  
  {
    name:"FieldsGroup30533882"
    contentFieldValue: { data: null }
    nestedContentFields:[`
      value.tokens.map(token=> (
        formatedValue+=`{name:"token",contentFieldValue:{data:"`+ token+ `"}}`));formatedValue+=`]
      }
    ]
  }`});
  
  formatedValue+=`
]`;
      

    
    const UPDATE_STRUCTURED_CONTENT = gql`
    mutation MyUpdateStructuredContent($myID: Long!){
      updateStructuredContent(
        structuredContentId: $myID
        structuredContent: {
          contentStructureId: 66167
          title: "My Content"
          ${formatedValue}
        }
      ) {
        id
        contentStructureId
        title
        contentFields {
          name
          contentFieldValue {
            data
          }
          nestedContentFields {
            name
            contentFieldValue {
              data
            }
          }
        }
      }
    }
`;
console.log(UPDATE_STRUCTURED_CONTENT);
    const [updateStructuredContent, {data, loading, error}] = useMutation(UPDATE_STRUCTURED_CONTENT);

    if (loading) return <p>Submitting...</p>;
    if (error) return (<><Alert variant='warning'>Select first a content from the content list</Alert><p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
    <Button size="sm" onClick={() => {
      updateStructuredContent();
    } }>ACCEPT</Button></>);

    return (
      <>
        <p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
        <Button size="sm" onClick={() => {
          updateStructuredContent({ variables: { myID: myID}});
        }}>ACCEPT</Button>
      </>
      
    );
  }

export default SaveButton

