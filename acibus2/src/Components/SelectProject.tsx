import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql } from '@apollo/react-hoc';
import { Alert, Dropdown, DropdownButton } from 'react-bootstrap';
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

    const { loading: contentloading, error: contenterror, data: contentdata} = useQuery(GET_STRUCTURED_CONTENT_FOLDERS, {
      fetchPolicy: "no-cache"});
    const { loading: tagsloading, error: tagserror, data: tagsdata} = useQuery(GET_TAGS, 
      {
        fetchPolicy: "no-cache",
        variables: {folderID: myFolderID},
        onCompleted: tagsdata => {
          //onClick={()=> {myContext.setTagList(arr);myContext.showProject()}};
          const arr =[];
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
         myContext.setTagList(arr);
         console.log(tagsdata);
         console.log(tagsdata.structuredContentFolderStructuredContents.items.length);
         if(tagsdata.structuredContentFolderStructuredContents.items.length == 1) myContext.setTagListID(tagsdata.structuredContentFolderStructuredContents.items[0].id);
         if(tagsdata.structuredContentFolderStructuredContents.items.length == 0) myContext.setTagListID(0);
        }
    });

    if (contentloading) return <p>Loading...</p>;
    if (contenterror) return <p>Loading error! ${contenterror.message}</p>;

    if (tagsloading) return <p>Loading...</p>;
    if (tagserror) return <><Alert variant='info'>Please select a project</Alert>
    <div className="settings">
      <DropdownButton  size="sm" id="dropdown-item-button" title={myContext.state.FolderName}>
            {contentdata.structuredContentFolders.items.map(({id, name}) => (
            <Dropdown.Item as="button" 
            key={id}
            eventKey={id}
            value={name}
            onClick={() => {{myContext.onSelectProject(id, name);myContext.showProject()}}}
            >{name}</Dropdown.Item>
        ))
    }
    </DropdownButton>
    </div>
  </>;
  
    //console.log(tagsdata);


    return (
      <>
        <div className="settings">
          <DropdownButton  size="sm" id="dropdown-item-button" title={myContext.state.FolderName}>
                {contentdata.structuredContentFolders.items.map(({id, name}) => (
                <Dropdown.Item as="button" 
                key={id}
                eventKey={id}
                value={name}
                onClick={() => {{myContext.onSelectProject(id, name);myContext.showProject()}}}
                >{name}</Dropdown.Item>
            ))
        }
        </DropdownButton>
        </div>
      </>
      
    );
  }

export default SelectProject