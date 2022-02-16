import { useContext } from "react";
import { Button, ButtonGroup, Col, Nav, Navbar } from "react-bootstrap";
import ProjectManager from "./ProjectManager";
import ProjectContext from "../Providers/ProjectProvider";
import ResultManager from "./ResultManager";

function AcibusSideBar() {
  const projectContext = useContext(ProjectContext);

    return (
      <>
        <Col xs={1}>
        <Navbar bg="light" style={{width:50}}>
        <Nav className="flex-column">
        <ButtonGroup vertical>
        {projectContext.state.isSelectedSideProject ?
        <Button onClick={() => {projectContext.hideResults();projectContext.setSideShowProject()}} variant="secondary">
            <i className="bi bi-card-list"></i>
            </Button>
            :
            <Button onClick={() => {projectContext.hideResults();projectContext.setSideShowProject()}} variant="outline-secondary">
            <i className="bi bi-card-list"></i>
            </Button>
        }
        {projectContext.state.isSelectedResults ?
            <Button onClick={() => {projectContext.hideSideProject();projectContext.setShowResults()}} variant="secondary">
            <i className="bi bi-bar-chart-line"></i>
            </Button>:
            <Button onClick={() => {projectContext.hideSideProject();projectContext.setShowResults()}} variant="outline-secondary">
            <i className="bi bi-bar-chart-line"></i>
            </Button>
            }
        </ButtonGroup>
        </Nav>
        </Navbar>
        </Col>
        {projectContext.state.isSelectedSideProject ? "":
        <ProjectManager/>
    }
        {projectContext.state.isSelectedResults ? "":
        <ResultManager/>
    }
      </>
    );
  }

  export default AcibusSideBar