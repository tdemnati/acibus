import { Accordion, Col} from "react-bootstrap";
import SelectProject from "./SelectProject";
import AddProject from "./AddProject";
import ToggleEditTag from "./ToggleEditTag";
import AddContent from "./AddContent";
import AddGuideline from "./AddGuideline";

function ProjectManager() {

    return (
<>
    <Col xs={3}>
            <Accordion defaultActiveKey="1" flush>
            <Accordion.Item eventKey="1">
            <Accordion.Header>PROJECTS</Accordion.Header>
            <Accordion.Body>
            <p className="settingsLabel">Select a project</p>
            <SelectProject/>
            <br/>
            <p className="settingsLabel">Create a project</p>
            <AddProject></AddProject>
            </Accordion.Body>
            <Accordion.Item eventKey="2">
            <Accordion.Header>TAGS</Accordion.Header>
            <Accordion.Body>
            <div className="settings">
            <p className="settingsLabel">Edit tags</p>
            <ToggleEditTag/>
            </div>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
            <Accordion.Header>CONTENTS</Accordion.Header>
            <Accordion.Body>
            <p className="settingsLabel">Add content</p>
            <AddContent/>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
            <Accordion.Header>GUIDELINES</Accordion.Header>
            <Accordion.Body>
            <div className="section">
            <p className="settingsLabel">Add/update the guideline</p>
            <AddGuideline/>
            </div>
            </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
            <Accordion.Header>TEAM</Accordion.Header>
            <Accordion.Body>
            <div className="section">
            <p>Select Project Members</p>
            </div>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </Col>
      </>
    );
  }

  export default ProjectManager
