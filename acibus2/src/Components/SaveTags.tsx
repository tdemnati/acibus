import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import CreateTagList from './CreateTagList';

//TODO: Create Mutation that will update values of taglist

function SaveTags() {
  const myContext = useContext(ContentContext);
    const projectContext = useContext(ProjectContext);
    let myvalue = projectContext.state.tagList;
    let myID = projectContext.state.mytagListID;

    var n = myvalue.length;
    //console.log(n);

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

    //console.log(n);
    for (let i = 0; i < n; i++) {
      //console.log('Faire ' + i + ' pas vers l\'est');

      myContentfields.contentFields.push(
        {
          name: "FieldsGroup42444510",
          contentFieldValue: 
          { 
            data: null 
          },
          nestedContentFields: [
            {
              name: "tag",
              contentFieldValue: {
                data: myvalue[i].tag
              }
            },
            {
              name: "color",
              contentFieldValue: {
                data: myvalue[i].color
              }
            }
          ]
        }
        );
    };
    //console.log(myContentfields);
    //console.log(myID);
    
    //let mysContentfields = myContentfields.contentFields;
    let mysContentfields = myContentfields.contentFields;
    const UPDATE_STRUCTURED_CONTENT = gql`
    mutation MyUpdateStructuredContent($myID: Long!, $mysContentfields: [InputContentField]){
      updateStructuredContent(
        structuredContentId: $myID
        structuredContent: {
          contentStructureId: 70548
          title: "TagList"
          contentFields: $mysContentfields
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
const [updateStructuredContent, {data, loading, error}] = useMutation(UPDATE_STRUCTURED_CONTENT, {fetchPolicy: "no-cache",});

if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
if (error) return (<><Alert variant='warning'>Select first a content from the content list</Alert>
</>);

        return (
        <>
        {projectContext.state.mytagListID == 0 || projectContext.state.mytagListID == undefined ? <CreateTagList/> :<Button size="sm" onClick={() => {
          updateStructuredContent({ variables: { myID: myID, mysContentfields:mysContentfields}});
        }}>SAVE</Button>}
        </>
    )
  }
  
export default SaveTags;