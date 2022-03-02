import { Card, Col, ProgressBar} from "react-bootstrap";
import ProjectContext from "../Providers/ProjectProvider";
import { useContext } from "react";

function ResultManager() {
  const projectContext = useContext(ProjectContext);
  
    return (
<>
    <Col xs={3} style={{width: '18rem' }}>
 
<Card>
  <Card.Body>
    <Card.Title>Progress</Card.Title>
    <div className="settings">
<p className="settingsLabel">TOTAL</p>
<p>{projectContext.state.total}</p>
</div>
    <Card.Text>

    <ProgressBar>
  <ProgressBar variant="success" now={projectContext.state.peraccepted} key={1} />
  <ProgressBar variant="warning" now={projectContext.state.perrejected} key={2} />
  <ProgressBar variant="light" now={projectContext.state.pervoid} key={3} />
</ProgressBar>
<br/>
<div className="settings">
<p className="settingsLabel">ACCEPTED</p>
<p>{projectContext.state.accepted}</p>
</div>

<div className="settings">
<p className="settingsLabel">REJECTED</p>
<p>{projectContext.state.rejected}</p>
</div>
<div className="settings">
<p className="settingsLabel">VOIDED</p>
<p>{projectContext.state.void}</p>
</div>
    </Card.Text>

  </Card.Body>
</Card>

</Col>
      </>
    );
  }

  export default ResultManager
