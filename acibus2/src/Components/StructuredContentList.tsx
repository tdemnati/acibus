import React, { useContext, useState} from "react";
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from "react-bootstrap";


function StructuredContentList() {
  const contentcontext = useContext(ContentContext);
  const myContext = useContext(ProjectContext);

  const idlist = myContext.state.contentList.map(e => e.id);
  //console.log(idlist);

  return (
    <>
      {myContext.state.isSelectedProject ? "":
      <ListGroup variant="flush">
            {myContext.state.contentList.map(({ id, status, text, contentFields}) => (
            <ListGroup.Item
            action 
            key={id} 
            variant="secondary-primary"
            onClick={() => {contentcontext.newtext(id, text, contentFields);contentcontext.setContentIndex(idlist.indexOf(id))}} >
              {/* {id}: {title} */}
              <div className="settings">
              <p id={id.toString()} key={uuidv4()} className="mylist">
              {text}
              </p>
              {status == "accepted" ? <i className="bi bi-check"></i>:""}
              {status == "rejected" ? <i className="bi bi-x"></i>: ""}
              {status == "void" ? <i className="bi bi-dash-circle"></i>: ""}
              </div>
            </ListGroup.Item>))}
      </ListGroup>
    }
    </>
    
  );
}

export default StructuredContentList