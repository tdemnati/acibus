import * as React from 'react';
import { Button } from 'react-bootstrap';
import TagContext from '../Providers/TagProvider';

class ToggleEditTag extends React.Component{
    
    render() {
        return (
            <TagContext.Consumer>
            {(context)=> (
            <Button className="settings-btn" onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Unedit"}</Button>)}
            </TagContext.Consumer>
    )
    }

  }
  
export default ToggleEditTag;