import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, CloseButton, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row, ToggleButton } from 'react-bootstrap';


class RadioTag extends React.Component{
    
    render() {
        return (
        <TagContext.Consumer>
                    {(context)=> (
                        <div>
                        {context.state.tagList.map(({tag, color}, idx) => (
                            <ButtonGroup key={idx} size="sm">
                            <ToggleButton style={{marginLeft:5, backgroundColor:`${color}`, borderColor:`${color}`}}
                                id={`radio-${idx}`}
                                type="radio"
                                name="radio"
                                value={tag}
                                onChange={context.onSelectTag}
                                checked={context.state.tag===tag}
                                >
                                {tag} {context.state.isEditTag ? "": <CloseButton variant="white" aria-label="Hide" value={tag} onClick={context.deleteItem}></CloseButton>}</ToggleButton>
                            
                            </ButtonGroup>
                        ))}
                        
                        {context.state.isEditTag ? "": <div style={{marginTop: 10}}>

                        <Form>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridTag">
      <Form.Label>Tag</Form.Label>
      <Form.Control onChange={context.onInputChange}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridColor">
      <Form.Label htmlFor="exampleColorInput">Color</Form.Label>
            <Form.Control
                type="color"
                id="ColorInput"
                defaultValue="#0d6efd"
                title="Choose your color"
                onChange={context.onColorChange}
            />
    </Form.Group>
  </Row>
  <Row  className="mb-3">
  <Form.Group as={Col} controlId="formGridColor">
  <Button size="sm" onClick={context.addTag} variant="primary" type="button">
    Add
  </Button>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridColor">
  <Button style={{marginLeft: 10}} size="sm" onClick={context.resetTag}>Reset</Button>
  </Form.Group>
  </Row>

</Form>

                        </div>}
                   
                        </div> 
                        
                    )}
        </TagContext.Consumer>
    )
    }
    
  }
  
  export default RadioTag