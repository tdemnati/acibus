import * as React from 'react';
import { Button } from 'react-bootstrap';
import TagContext from '../Providers/TagProvider';

class ToggleEditTag extends React.Component{
    
    render() {
        return (
            <TagContext.Consumer>
            {(context)=> (
            <Button size="sm" onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Save"}</Button>)}
            </TagContext.Consumer>
    )
    }

  }
  
export default ToggleEditTag;