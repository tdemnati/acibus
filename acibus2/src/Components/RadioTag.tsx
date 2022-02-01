import ProjectContext from '../Providers/ProjectProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, CloseButton, Col, Form, Row, ToggleButton } from 'react-bootstrap';
import { useContext } from 'react';
import SaveTags from './SaveTags';

function RadioTag() {
  const myContext = useContext(ProjectContext);

        return (
          <>
          {myContext.state.isSelectedProject ? "":
          
                        <div>
                          <ButtonGroup key="123">
                        {myContext.state.tagList.map(({tag, color}, idx) => (
                            
                            <ToggleButton className='customToggleButton' style={{marginLeft:5, ['--mycolor' as any]:`${color}`, borderColor:`${color}`}}
                                id={`radio-${idx}`}
                                key={idx}
                                type="radio"
                                name="radio"
                                value={tag} 
                                onChange={myContext.onSelectTag}
                                checked={myContext.state.tag===tag}
                                variant="outline-success"
                                >
                                {tag} {myContext.state.isEditTag ? "": <CloseButton aria-label="Hide" value={tag} onClick={myContext.deleteItem}></CloseButton>}</ToggleButton>
                            
                            
                        ))}</ButtonGroup>
                        
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
    Add Tag
  </Button>
  </Form.Group>
  <Col>
  <SaveTags/>
  </Col>
  </Row>
</Form>
</div>}
</div> 
}</>     
                    
    )
    
    
  }
  
  export default RadioTag