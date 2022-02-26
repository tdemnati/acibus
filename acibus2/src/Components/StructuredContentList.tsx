import React, { useContext} from "react";
import ContentContext from '../Providers/ContentProvider';
import ProjectContext from '../Providers/ProjectProvider';
import { v4 as uuidv4 } from 'uuid';


function StructuredContentList() {
  const contentcontext = useContext(ContentContext);
  const myContext = useContext(ProjectContext);

  const idlist = myContext.state.contentList.map(e => e.id);
  //console.log(idlist);

  return (
    <>
      {myContext.state.isSelectedProject ? "":
      <div>
            {myContext.state.contentList.map(({ id, status, text, contentFields}) => (
            <li key={id}>
              {/* {id}: {title} */}
              <div className="settings">
              <p id={id.toString()} key={uuidv4()} onClick={() => {contentcontext.newtext(id, text, contentFields);contentcontext.setContentIndex(idlist.indexOf(id))}} className="mylist">
              {text}
              </p>
              {status == "accepted" ? <i className="bi bi-check"></i>:""}
              {status == "rejected" ? <i className="bi bi-x"></i>: ""}
              {status == "void" ? <i className="bi bi-dash-circle"></i>: ""}
              </div>
            </li>))}
      </div>
    }
    </>
    
  );
}

export default StructuredContentList