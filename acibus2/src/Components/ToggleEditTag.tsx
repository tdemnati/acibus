import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useContext } from 'react';
import { Button, ButtonGroup, CloseButton, ToggleButton } from 'react-bootstrap';
import TagContext from '../Providers/TagProvider';

//TODO: Create Mutation that will update values of taglist

function ToggleEditTag() {
  const myContext = useContext(TagContext);

        return (
            <>
            <Button size="sm" onClick={myContext.toggleEditTag}>{myContext.state.isEditTag ? "Edit" : "Save"}</Button>
            </>
    )
  }
  
export default ToggleEditTag;