import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, CloseButton, Dropdown, DropdownButton, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';


class RadioTag extends React.Component{
    
    render() {
        return (
        <TagContext.Consumer>
                    {(context)=> (
                        <div>
                        {context.state.tagList.map(({tag}, idx) => (
                            <ButtonGroup key={idx} size="sm">
                            <ToggleButton style={{marginLeft:5}}
                                id={`radio-${idx}`}
                                type="radio"
                                name="radio"
                                value={tag}
                                onChange={context.onSelectTag}
                                checked={context.state.tag===tag}
                                color='yellow'>
                                {tag} {context.state.isEditTag ? "": <CloseButton variant="white" aria-label="Hide" value={tag} onClick={context.deleteItem}></CloseButton>}</ToggleButton>
                            
                            </ButtonGroup>
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
  
  export default RadioTag