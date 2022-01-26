import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import TagsList from './TagsList';


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
query getmytaglist($folderID: Long!){
  structuredContentFolderStructuredContents(
    structuredContentFolderId:$folderID, 
    filter:"contentStructureId eq 70548") {
  items{
    id
    title
    contentStructureId
    contentFields{
      name
      contentFieldValue{
        data
      }
      nestedContentFields{
        name
        contentFieldValue{
          data
        }
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
    //if (tagserror) return <p>Submission error! ${tagserror.message}</p>;
  
    //console.log(tagsdata);
    const arr =[]

    return (
      <>
        <div>
          <DropdownButton id="dropdown-item-button" title={myFolderName}>
                {contentdata.structuredContentFolders.items.map(({id, name}) => (
                <Dropdown.Item as="button" 
                key={id}
                eventKey={id}
                value={tagsdata}
                onClick={() => {{myContext.onSelectProject(id, name);myContext.setTagList(arr);myContext.toggleTrueSelectProject()}}}
                >{name}</Dropdown.Item>
            ))
        }
        </DropdownButton>
            </div>
        
      </>
      
    );
  }

export default SelectProject