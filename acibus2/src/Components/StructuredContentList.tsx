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
      keywords
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

  const idlist = myContext.state.contentList.map(e => e.id);
  console.log(idlist);

  return (
    <>
      {myContext.state.isSelectedProject ? "":
      <div>
            {myContext.state.contentList.map(({ id, status, text, contentFields}) => (
            <li key={id}>
              {/* {id}: {title} */}
              <div className="settings">
              <p id={id.toString()} key={uuidv4()} onClick={() => {contentcontext.newtext(id, text, contentFields);console.log("The index is:" + idlist.indexOf(id))}} className="mylist">
              {text}
              </p>
              {status == "accepted" ? <i className="bi bi-check"></i>: ""
              
            }
              </div>
            </li>))}
      </div>
    }
    </>
    
  );
}

export default StructuredContentList