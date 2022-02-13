import { useContext, useState } from "react";
import { Accordion, Button, ButtonGroup, Col, Nav, Navbar, Offcanvas } from "react-bootstrap";
import plus_square from '../images/plus_square.svg'
import clipboard2_data from '../images/clipboard2_data.svg'
import ProjectManager from "./ProjectManager";
import ProjectContext from "../Providers/ProjectProvider";

function AcibusSideBar() {
  const projectContext = useContext(ProjectContext);

    return (
      <>
        <Col xs={1}>
        <Navbar bg="light" style={{width:50}}>
        <Nav className="flex-column">
        <ButtonGroup vertical>
        {projectContext.state.isSelectedProject ?
        <Button size="sm" onClick={() => projectContext.setShowProject()} variant="secondary">
            <i className="bi bi-card-list"></i>
            </Button>
            :
            <Button size="sm" onClick={() => projectContext.setShowProject()} variant="outline-secondary">
            <i className="bi bi-card-list"></i>
            </Button>
        }
            <Button size="sm" onClick={() => projectContext.hideProject()} variant="secondary">
            <i className="bi bi-bar-chart-line"></i>
            </Button>
        </ButtonGroup>
        </Nav>
        </Navbar>
        </Col>
        {projectContext.state.isSelectedProject ? "":
        <ProjectManager/>
    }
      </>
    );
  }

  export default AcibusSideBar