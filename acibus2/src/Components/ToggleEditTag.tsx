import * as React from 'react';
import MyContext from './Provider';

class ToggleEditTag extends React.Component{
    
    render() {
        return (
            <MyContext.Consumer>
            {(context)=> (
            <button onClick={context.toggleEditTag}>{context.state.isEditTag ? "Edit" : "Unedit"}</button>)}
            </MyContext.Consumer>
    )
    }

  }
  
  export default ToggleEditTag;