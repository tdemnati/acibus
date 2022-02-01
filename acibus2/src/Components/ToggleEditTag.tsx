import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import ProjectContext from '../Providers/ProjectProvider';

//TODO: Create Mutation that will update values of taglist

function ToggleEditTag() {

    const projectContext = useContext(ProjectContext);

        return (
            <>
            {projectContext.state.isEditTag ? <Button size="sm" onClick={projectContext.toggleEditTag}>Edit</Button>
            : <Button size="sm" onClick={projectContext.toggleEditTag}>Unedit</Button>}
            </>
    )
  }
  
export default ToggleEditTag;