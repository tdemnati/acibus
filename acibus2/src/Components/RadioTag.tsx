import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, CloseButton, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row, ToggleButton } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';




function RadioTag() {
  const myContext = useContext(ProjectContext);

  //console.log(tagsdata);
        return (
                        <div>
                        {myContext.state.tagList.map(({tag, color}, idx) => (
                            <ButtonGroup key={idx} size="sm">
                            <ToggleButton style={{marginLeft:5, backgroundColor:`${color}`, borderColor:`${color}`}}
                                id={`radio-${idx}`}
                                type="radio"
                                name="radio"
                                value={tag}
                                onChange={myContext.onSelectTag}
                                checked={myContext.state.tag===tag}
                                >
                                {tag} {myContext.state.isEditTag ? "": <CloseButton variant="white" aria-label="Hide" value={tag} onClick={myContext.deleteItem}></CloseButton>}</ToggleButton>
                            
                            </ButtonGroup>
                        ))}
                        
                        {myContext.state.isEditTag ? "": <div style={{marginTop: 10}}>

                        <Form>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridTag">
      <Form.Label>Tag</Form.Label>
      <Form.Control onChange={myContext.onInputChange}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridColor">
      <Form.Label>Color</Form.Label>
            <Form.Control
                type="color"
                defaultValue="#0d6efd"
                title="Choose your color"
                onChange={myContext.onColorChange}
            />
    </Form.Group>
  </Row>
  <Row  className="mb-3">
  <Form.Group as={Col} controlId="formGridColor">
  <Button size="sm" onClick={myContext.addTag} variant="primary" type="button">
    Add
  </Button>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridColor">
  <Button style={{marginLeft: 10}} size="sm" onClick={myContext.resetTag}>Reset</Button>
  </Form.Group>
  </Row>

</Form>

                        </div>}
                   
                        </div> 
                        
                    
    )
    
    
  }
  
  export default RadioTag