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
                            <ButtonGroup key={idx}>
                            <ToggleButton
                                type="radio"
                                value={idx}
                                onChange={context.onSelectTag}
                                checked={context.state.tag===tag}
                                >{tag}</ToggleButton>
                            {context.state.isEditTag ? "": <CloseButton value={tag} onClick={context.deleteItem}></CloseButton>}
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