import * as React from 'react';
import MyContext from '../Providers/TagProvider';

class ToggleEditTag extends React.Component{
    
    render() {
        return (
            <MyContext.Consumer>
            {(context)=> (
            <button className="settings-btn" onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Unedit"}</button>)}
            </MyContext.Consumer>
    )
    }

  }
  
export default ToggleEditTag;