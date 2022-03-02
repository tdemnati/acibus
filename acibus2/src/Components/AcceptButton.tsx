import ContentContext from '../Providers/ContentProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Alert, Button, ButtonGroup, Spinner } from 'react-bootstrap';
import ProjectContext from '../Providers/ProjectProvider';
import { GET_STRUCTURED_CONTENTS } from './SelectProject';


 

function AcceptButton() {
    const myContext = useContext(ContentContext);
    const projectContext = useContext(ProjectContext);
    let myvalue = myContext.state.value;
    let myText = myContext.state.TEXT;
    let myID = myContext.state.StructuredContentID;

    var n = myvalue.length;
    let start=0;
    let end=0;
    let tag = 'tag';
    let color = 'color';
    let token:string;
    var k;

    type Data = string | null | number;

    type ContentFields = {
      contentFields: ContentField[],
    }

    type ContentFieldValue = {
      data?: Data;
    }

    type ContentField = {
      name?: string,
      contentFieldValue?: ContentFieldValue,
      nestedContentFields?: NestedContentField[],
    }

    type NestedContentField = {
      name?: string,
      contentFieldValue?: ContentFieldValue,
      nestedContentFields?: NestedContentField[],
    }

    let myContentfields: ContentFields = {
      contentFields: []
    };

    myContentfields.contentFields.push({name: "text",
    contentFieldValue: { data: myText }});

    //console.log(n);
    for (let i = 0; i < n; i++) {
      //console.log('Faire ' + i + ' pas vers l\'est');
      let myContentfield = {
        name: "FieldsGroup13487557",
        contentFieldValue: { data: null },
        nestedContentFields: []
    }
    for (let j = 0; j < 5; j++) {
      let tokens: ContentField = {
        name: "FieldsGroup30533882",
        contentFieldValue: { data: null },
        nestedContentFields: []
      }
      ;
      switch (j) {
        case 0:
          //console.log('Start:'+ myvalue[i].start);
          start = myvalue[i].start;
          myContentfield.nestedContentFields.push(
            {name:"start",contentFieldValue:{data:start}})
          break;
        case 1:
          //console.log('End:'+ myvalue[i].end);
          end = myvalue[i].end;
          myContentfield.nestedContentFields.push(
            {name:"end",contentFieldValue:{data:end}})
          break;
        case 2:
          //console.log('tag:'+ myvalue[i].tag);
          tag = myvalue[i].tag;
          myContentfield.nestedContentFields.push(
            {name:"tag",contentFieldValue:{data:tag}})
          break;
        case 3:
          //console.log('color:'+ myvalue[i].color);
          color = myvalue[i].color;
          myContentfield.nestedContentFields.push(
            {name:"color",contentFieldValue:{data:color}})
          break;
        case 4:
          //console.log('Tokens length = ' + myvalue[i].tokens.length);
          k = myvalue[i].tokens.length;
          //console.log(myvalue[i].tokens[0]);
           for (let m = 0; m < k; m++) {
            token = myvalue[i].tokens[m];
            //console.log('The token = ' + token);
             tokens.nestedContentFields.push({
             name:"token",contentFieldValue:{data:token}})
            }
            myContentfield.nestedContentFields.push(tokens);

          break;
        default:
        }

      //myContentfield.nestedContentFields[i].nestedContentFields.push(
      //  {name:"token",contentFieldValue:{data:"Tarik2"}})  
      //console.log(myNested);
      }
      
      myContentfields.contentFields.push(myContentfield);
    }
    //console.log(myContentfields.contentFields);
    let mysContentfields = myContentfields.contentFields;
    const UPDATE_STRUCTURED_CONTENT = gql`
    mutation MyUpdateStructuredContent($keywords: String!, $myID: Long!, $mysContentfields: [InputContentField]){
      updateStructuredContent(
        structuredContentId: $myID
        structuredContent: {
          contentStructureId: 66167
          title: "Content"
          keywords: [$keywords]
          contentFields: $mysContentfields
        }
      ) {
        id
        contentStructureId
        title
        keywords
        contentFields {
          name
          contentFieldValue {
            data
          }
          nestedContentFields {
            contentFieldValue {
              data
            }
            nestedContentFields {
              contentFieldValue {
                data
              }
            }
          }
        }
      }
    }
`;
//console.log(UPDATE_STRUCTURED_CONTENT);
    const [updateStructuredContent, {data, loading, error}] = useMutation(UPDATE_STRUCTURED_CONTENT,
      {
        refetchQueries: [{query: GET_STRUCTURED_CONTENTS, 
          variables: {folderID: projectContext.state.FolderID,
          contentTEXT: "placeholder"}}],
        onCompleted: data => {
          let mystatus = data.updateStructuredContent.keywords.toString();
          if (mystatus == undefined) {mystatus = ""}

          let count = myContext.state.contentIndex;

          myContext.setStatus(mystatus);
          //console.log("list length is:" + projectContext.state.contentList.length);
          //console.log(myContext.state.status);
          //console.log("mystatus is :" + projectContext.state.contentList[myContext.state.contentIndex].status);
 
          projectContext.state.contentList[count].status = mystatus;
          projectContext.state.contentList[count].contentFields = data.updateStructuredContent.contentFields;
          //console.log(projectContext.state.contentList[myContext.state.contentIndex].status);

          console.log("The initial index is :" + count);
          console.log(data.updateStructuredContent.contentFields);
          myContext.newtext(data.updateStructuredContent.id, projectContext.state.contentList[count].text, data.updateStructuredContent.contentFields);
          console.log(projectContext.state.contentList);
          //myContext.newtext(data.updateStructuredContent.id, data.updateStructuredContent.contenFields[0].contentFieldValue.data, data.updateStructuredContent.contenFields);
          projectContext.setCounts();
          if (count < projectContext.state.contentList.length-1) {
            console.log("My Count is" + count)
          myContext.setStatus(projectContext.state.contentList[count].status);
          count = count + 1;
          myContext.setContentIndex(count);
          myContext.newtext(projectContext.state.contentList[count].id, projectContext.state.contentList[count].text, projectContext.state.contentList[count].contentFields);
          }
          else if (count == projectContext.state.contentList.length-1) {
          console.log("My Count is " + count)
          myContext.setStatus(projectContext.state.contentList[count].status);
          //myContext.newtext(data.updateStructuredContent.id, projectContext.state.contentList[count].text, data.updateStructuredContent.contentFields);
          myContext.setContentIndex(0);
          myContext.newtext(projectContext.state.contentList[0].id, projectContext.state.contentList[0].text, projectContext.state.contentList[0].contentFields);
          }
          else {
          //console.log("There is a BUG")
          }
        }
      
      });

    if (loading) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
    if (error) return (<><Alert variant='warning'>Select first a content from the content list</Alert><p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
    </>);

let mysContentfieldsEND = [
  { name: "text", contentFieldValue: { data: myText } },
  {
    name: "FieldsGroup13487557",
    contentFieldValue: { data: null },
    nestedContentFields: [
      {
        name: "FieldsGroup30533882",
        contentFieldValue: { data: null }
      }
    ]
  }
];

let myCfield;
if (end == 0) {
  myCfield = mysContentfieldsEND;
} else {
  myCfield = mysContentfields;
}


    return (
      <>
      
{end === 0 ? <>
        <p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
        <ButtonGroup>
        <Button variant="success" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "ACCEPTED", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-check"></i>Accept</Button>
        <Button variant="warning" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "REJECTED", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-x"></i>Reject</Button>
        <Button variant="dark" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "VOID", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-dash-circle"></i> Ignore</Button>
        </ButtonGroup>
        </>:
<>
        <p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
        
        <ButtonGroup>
        <Button variant="success" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "ACCEPTED", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-check"></i>Accept</Button>
        <Button variant="warning" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "REJECTED", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-x"></i>Reject</Button>
        <Button variant="dark" style={{marginLeft: 10}} onClick={() => {
          updateStructuredContent({ variables: { keywords: "VOID", myID: myID, mysContentfields:myCfield}});
        }}><i className="bi bi-dash-circle"></i> Ignore</Button>
        </ButtonGroup>
        </>
}
</>
      
    );
  }

 
        
   
 

    
export default AcceptButton