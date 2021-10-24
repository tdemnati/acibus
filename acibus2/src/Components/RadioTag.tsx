import * as React from 'react';
import TagContext from '../Providers/TagProvider';


class RadioTag extends React.Component{
    
    render() {
        return (
        <TagContext.Consumer>
                    {(context)=> (
                        <div>
                        {context.state.tagList.map(({tag}, idx) => (
                            <label key={idx}>
                            <input
                                type="radio"
                                value={tag}
                                onChange={context.onSelectTag}
                                checked={context.state.tag===tag}/>
                            {tag}
                            {context.state.isEditTag ? "": <button value={tag} onClick={context.deleteItem}>Del</button>}
                            </label>
                        ))}
                        <br/>
                        {context.state.isEditTag ? "": <div>
                        <input type="text" onChange={context.onInputChange}/>
                        <button onClick={context.addTag}>Add</button>
                        <button onClick={context.resetTag}>Reset</button>
                        </div>}
                   
                        </div> 
                        
                    )}
        </TagContext.Consumer>
    )
    }
    
  }
  
  export default RadioTag;