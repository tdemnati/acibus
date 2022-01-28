import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Alert, Button, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useQuery } from '@apollo/client';


export const GET_STRUCTURED_CONTENT_FOLDERS = gql`
query {
  structuredContentFolders(siteKey:"42754") {
    items{
      id
      name
    }
  }
}
`;

export const GET_TAGS = gql`
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

function SelectProject() {
    const myContext = useContext(ProjectContext);
    let myFolderID = myContext.state.FolderID;
    let myFolderName = myContext.state.FolderName;

    const { loading: contentloading, error: contenterror, data: contentdata} = useQuery(GET_STRUCTURED_CONTENT_FOLDERS);
    const { loading: tagsloading, error: tagserror, data: tagsdata} = useQuery(GET_TAGS, 
      {
        variables: {folderID: myFolderID}
    });

    if (contentloading) return <p>Loading...</p>;
    if (contenterror) return <p>Loading error! ${contenterror.message}</p>;

    if (tagsloading) return <p>Loading...</p>;
    //TODO: Need to handle error in case of error code 404
    if (tagserror) return <><Alert variant='info'>Select a Project First</Alert>
    <div className="settings">
      <DropdownButton  size="sm" id="dropdown-item-button" title={myFolderName}>
            {contentdata.structuredContentFolders.items.map(({id, name}) => (
            <Dropdown.Item as="button" 
            key={id}
            eventKey={id}
            value={tagsdata}
            onClick={() => {{myContext.onSelectProject(id, name);myContext.hideProject()}}}
            >{name}</Dropdown.Item>
        ))
    }
    </DropdownButton>
    
            </div>
    
  </>;
  
    //console.log(tagsdata);
    const arr =[]

    tagsdata.structuredContentFolderStructuredContents.items.map(
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
        <div className="settings">
          <Col>
          <DropdownButton  size="sm" id="dropdown-item-button" title={myFolderName}>
                {contentdata.structuredContentFolders.items.map(({id, name}) => (
                <Dropdown.Item as="button" 
                key={id}
                eventKey={id}
                value={tagsdata}
                onClick={() => {{myContext.onSelectProject(id, name);myContext.hideProject()}}}
                >{name}</Dropdown.Item>
            ))
        }
        </DropdownButton></Col><Col>
        <Button  size="sm" onClick={()=> {myContext.setTagList(arr);myContext.showProject()}}>Load</Button>
        </Col> </div>
        
      </>
      
    );
  }

export default SelectProject