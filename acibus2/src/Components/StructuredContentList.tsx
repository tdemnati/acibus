import React, { useContext} from "react";
import { gql, useQuery } from "@apollo/client";
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "react-bootstrap";

export const GET_STRUCTURED_CONTENTS = gql`
query FolderstructuredContents($folderID: Long!){
  structuredContentFolderStructuredContents(structuredContentFolderId:$folderID, 
    filter:"contentStructureId eq 66167") {
    totalCount
    items {
      id
      title
      contentStructureId
      contentFields {
        label
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
          }}
}
      }
    }
  }
} 
`;
 

function StructuredContentList() {
  const contentcontext = useContext(ContentContext);
  const myContext = useContext(ProjectContext);



  const { loading, error, data } = useQuery(GET_STRUCTURED_CONTENTS, {
    variables: {
      folderID: myContext.state.FolderID
    }
  });
  
  if (loading) return <p>Submitting...</p>;
  if (error) return <Alert variant='info'>You'll find here the list of content once you've selected a project</Alert>;
  //console.log(data);


  return (
    <>
      {myContext.state.isSelectedProject ? "":
      <div>
            {data.structuredContentFolderStructuredContents.items.map(({ id, contentFields}) => (
            <li key={id}>
              {/* {id}: {title} */}
              <div className="Settings">
              <p id={id.toString()} key={uuidv4()} onClick={() => contentcontext.newtext(id, contentFields[0].contentFieldValue.data, contentFields)} className="mylist">
              {contentFields[0].contentFieldValue.data}
              </p>
              <p>
                
              </p>
              </div>
            </li>))}
      </div>
    }
    </>
    
  );
}

export default StructuredContentList