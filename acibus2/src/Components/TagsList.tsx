import React, { useContext} from "react";
import { gql, useQuery } from "@apollo/client";
import ContentContext from '../Providers/ContentProvider';
import TagContext from '../Providers/TagProvider';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export const GET_STRUCTURED_CONTENTS = gql`
query FolderstructuredContents($folderID: Long!){
  structuredContentFolderStructuredContents(structuredContentFolderId:$folderID, 
    filter:"contentStructureId eq 70548") {
    items {
      id
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
        nestedContentFields {
          name
          contentFieldValue {
            data
          }}
}
      }
    }
  }
}
`;


function TagsList() {
  //const contentcontext = useContext(ContentContext);
  const tagcontext = useContext(TagContext);



  const { loading, error, data } = useQuery(GET_STRUCTURED_CONTENTS, {
    variables: {
      folderID: tagcontext.state.FolderID
    }
  });
  
  if (loading) return <p>Submitting...</p>;
  if (error) return <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select a project from the list or create a new one.</Tooltip>}>
  <span className="d-inline-block">
    <Button disabled style={{ pointerEvents: 'none' }}>
    GO
    </Button>
  </span>
</OverlayTrigger>;
  //console.log(data)
  const arr =[];
  
  data.structuredContentFolderStructuredContents.items.map(
    ({contentFields}) => 
    (
    contentFields.map(
                    (d) => (
                      arr.push(
                                {
                                  tag: d.nestedContentFields[0].contentFieldValue.data, 
                                  color: d.nestedContentFields[1].contentFieldValue.data
                                }
                              )
                          )                
                    )
    )
              );
  return (
    <>
              <Button onClick={() => {tagcontext.setTagList(arr);tagcontext.toggleFalseSelectProject()}}>GO</Button>
    </>
    
  );
}

export default TagsList