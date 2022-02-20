import { Accordion, Card, Col, ProgressBar} from "react-bootstrap";
import SelectProject from "./SelectProject";
import AddProject from "./AddProject";
import ToggleEditTag from "./ToggleEditTag";
import AddContent from "./AddContent";
import AddGuideline from "./AddGuideline";

function ResultManager() {

    return (
<>
    <Col xs={3} style={{width: '18rem' }}>
 
<Card>
  <Card.Body>
    <Card.Title>Progress</Card.Title>
    <div className="settings">
<p className="settingsLabel">TOTAL</p>
<p>140</p>
</div>
    <Card.Text>

    <ProgressBar>
  <ProgressBar variant="success" now={35} key={1} />
  <ProgressBar variant="warning" now={20} key={2} />
  <ProgressBar variant="light" now={10} key={3} />
</ProgressBar>
<br/>
<div className="settings">
<p className="settingsLabel">ACCEPTED</p>
<p>40</p>
</div>
<div className="settings">
<p className="settingsLabel">REJECTED</p>
<p>30</p>
</div>
<div className="settings">
<p className="settingsLabel">VOIDED</p>
<p>10</p>
</div>
    </Card.Text>

  </Card.Body>
</Card>

</Col>
      </>
    );
  }

  export default ResultManager
