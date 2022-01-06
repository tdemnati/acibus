import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useQuery } from '@apollo/client';


function SelectProject() {
    const myContext = useContext(ContentContext);
    let formatedValue ='';
    let myValue = myContext.state.value;
    let myText = myContext.state.TEXT;
    let myID = myContext.state.StructuredContentID;

    const GET_STRUCTURED_CONTENT_FOLDERS = gql`
    query {
      structuredContentFolders(siteKey:"42754") {
        items{
          id
          name
        }
      }
    }
`;

    const { loading, error, data } = useQuery(GET_STRUCTURED_CONTENT_FOLDERS);
    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! ${error.message}</p>;

    return (
      <>
        {/* <p>{JSON.stringify([...myContext.state.value], null, 2)}</p>
        <Button size="sm" onClick={() => {
          selectProject();
        }}>ACCEPT</Button> */}


        <div>
          <DropdownButton id="dropdown-item-button" title="Select">
                {data.structuredContentFolders.items.map(({id, name}) => (
                <Dropdown.Item as="button" key={id}>{name}</Dropdown.Item>
            ))
        }
        </DropdownButton>
            </div>
        
      </>
      
    );
  }

export default SelectProject

function uuidv4(): React.Key {
  throw new Error('Function not implemented.');
}

