import React, { useContext, useState} from "react";
import { gql, useQuery } from "@apollo/client";
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Badge, Button } from "react-bootstrap";

export const GET_GUIDELINES = gql`
query FolderstructuredContents($folderID: Long!){
  structuredContentFolderStructuredContents(structuredContentFolderId:$folderID, 
    filter:"contentStructureId eq 68652") {
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
 
  

function RetrieveGuideline() {
  const myContext = useContext(ProjectContext);
  const [show, setShow] = useState(true);


  const { loading, error, data } = useQuery(GET_GUIDELINES, {
  fetchPolicy: "no-cache",
    variables: {
      folderID: myContext.state.FolderID
    },
    onCompleted: guidelinedata => {
      if(data.structuredContentFolderStructuredContents.items.length == 1) {
        myContext.setGuidelineID(data.structuredContentFolderStructuredContents.items[0].id);
        myContext.setGuideline(data.structuredContentFolderStructuredContents.items[0].contentFields[0].contentFieldValue.data);
      console.log(data.structuredContentFolderStructuredContents.items[0].contentFields[0].contentFieldValue.data);
      };
      if(data.structuredContentFolderStructuredContents.items.length == 0) myContext.setGuidelineID(0);
      //console.log(data.structuredContentFolderStructuredContents.items[0].id);
      //myContext.setGuidelineID(data.structuredContentFolderStructuredContents.items[0].id);
    },
  });
  
  if (loading) return <p>Submitting...</p>;
  if (error) return <Alert variant='light'>You'll find here some guidelines once you've selected a project</Alert>;
  //console.log(data);


  return (
    <>
        <>
      <Alert show={show} variant="light">
        <Alert.Heading>Instructions</Alert.Heading>
        {myContext.state.isSelectedProject ? "No Instructions":
      <div>
            {data.structuredContentFolderStructuredContents.items.map(({ id, contentFields}) => (
            <div key={id} dangerouslySetInnerHTML={{__html:
              contentFields[0].contentFieldValue.data.toString()}}/>
            ))}
      </div>
    }
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="light">
            Close
          </Button>
        </div>
      </Alert>


          {!show && <><Badge pill bg="info" onClick={() => setShow(true)} style={{cursor: "pointer"}}>Click</Badge> to show some guidelines</>}
    </>
    </>
    
  );
}

export default RetrieveGuideline