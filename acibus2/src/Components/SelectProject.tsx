import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
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

function SelectProject() {
    const myContext = useContext(TagContext);
    let myFolderID = myContext.state.FolderID;
    let myFolderName = myContext.state.FolderName;

    const { loading, error, data} = useQuery(GET_STRUCTURED_CONTENT_FOLDERS);
    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! ${error.message}</p>;

    return (
      <>
        <div>
          <DropdownButton id="dropdown-item-button" title={myFolderName}>
                {data.structuredContentFolders.items.map(({id, name}) => (
                <Dropdown.Item as="button" 
                key={id}
                eventKey={id}
                value={id}
                onClick={myContext.onSelectProject}
                >{name}</Dropdown.Item>
            ))
        }
        </DropdownButton>
            </div>
        
      </>
      
    );
  }

export default SelectProject