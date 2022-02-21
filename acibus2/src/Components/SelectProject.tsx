import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql } from '@apollo/react-hoc';
import { Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import ContentContext from '../Providers/ContentProvider';


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

export const GET_STRUCTURED_CONTENTS = gql`
query FolderstructuredContents($folderID: Long!){
  structuredContentFolderStructuredContents(structuredContentFolderId:$folderID, 
    filter:"contentStructureId eq 66167") {
    totalCount
    items {
      id
      title
      contentStructureId
      keywords
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


function SelectProject() {
    const myContext = useContext(ProjectContext);
    let myFolderID = myContext.state.FolderID;
    const myContent = useContext(ContentContext);

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


    const { loading: contentlistloading, error: contentlisterror, data: contentlistdata} = useQuery(GET_STRUCTURED_CONTENTS, 
      {
        fetchPolicy: "no-cache",
        variables: {folderID: myFolderID},
        onCompleted: contentlistdata => {
          //onClick={()=> {myContext.setTagList(arr);myContext.showProject()}};
          const arr1 =[];
          contentlistdata.structuredContentFolderStructuredContents.items.map(
            ({contentFields, keywords, id}) => 

                              arr1.push(
                                        {
                                          text: contentFields[0].contentFieldValue.data,
                                          status : keywords.toString(),
                                          id : id,
                                          contentFields: contentFields
                                        }
                                      )

            );
         myContext.setContentList(arr1);
         console.log(contentlistdata);
         console.log(contentlistdata.structuredContentFolderStructuredContents.items.length);
         if(contentlistdata.structuredContentFolderStructuredContents.items.length !== 0) {myContent.newtext(arr1[0].id, arr1[0].text, contentlistdata.structuredContentFolderStructuredContents.items[0].contentFields)};
         if(contentlistdata.structuredContentFolderStructuredContents.items.length == 0) myContent.newtext('', '', '');
        }
    });


    if (contentloading) return <p>Loading...</p>;
    if (contenterror) return <p>Loading error! ${contenterror.message}</p>;

    if (tagsloading) return <p>Loading...</p>;
    if (tagserror) return <>

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

    if (contentlistloading) return <p>Loading...</p>;
    if (contentlisterror) return <Alert variant='info'>Please select a project</Alert>

  
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