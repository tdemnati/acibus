import * as React from 'react';
import TagContext from '../Providers/TagProvider';

class ToggleEditTag extends React.Component{
    
    render() {
        return (
            <TagContext.Consumer>
            {(context)=> (
            <button className="settings-btn" onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Unedit"}</button>)}
            </TagContext.Consumer>
    )
    }

  }
  
export default ToggleEditTag;