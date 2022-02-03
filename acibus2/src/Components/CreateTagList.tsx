import { gql, useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { useContext } from 'react';
import { Alert, Button, ButtonGroup, CloseButton, Spinner, ToggleButton } from 'react-bootstrap';
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import { GET_STRUCTURED_CONTENT_FOLDERS, GET_TAGS } from './SelectProject';

//TODO: Create Mutation that will update values of taglist

function CreateTagList() {
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
    const CREATE_TAGLIST = gql`
    mutation AddTagList($folderID: Long!, $mysContentfields: [InputContentField]){
      createStructuredContentFolderStructuredContent(
        structuredContentFolderId:$folderID,
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
const [createStructuredContentFolderStructuredContent, {data, loading, error}] = useMutation(CREATE_TAGLIST, {
  onCompleted: data => {
    console.log(data);
    projectContext.setTagListID(data.createStructuredContentFolderStructuredContent.id);
  }
});


if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
if (error) return (<p>Error happened</p>);

        return (
            <>
          <Button size="sm" type="submit" onClick={() => 
          {createStructuredContentFolderStructuredContent({ variables: { folderID: projectContext.state.FolderID, mysContentfields:mysContentfields}})}
}>SAVE</Button>
            </>
    )
  }
  
export default CreateTagList;