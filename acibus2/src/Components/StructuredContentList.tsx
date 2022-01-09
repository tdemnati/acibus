import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { graphql, ChildProps } from "@apollo/react-hoc";
import ContentContext from '../Providers/ContentProvider';
import TagContext from '../Providers/TagProvider';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "react-bootstrap";


function StructuredContentList() {
  const contentcontext = useContext(ContentContext);
  const tagcontext = useContext(TagContext);

const GET_STRUCTURED_CONTENTS = gql`
query FolderstructuredContents($folderID: Long!){
  structuredContentFolderStructuredContents(structuredContentFolderId:$folderID) {
    totalCount
    items {
      id
      title
      contentFields {
        label
        contentFieldValue {
          data
          
        }
nestedContentFields {
        contentFieldValue {
          data
          
        }
        nestedContentFields {
          contentFieldValue {
            data
          }}
}
      }
    }
  }
}
`;

  const { loading, error, data } = useQuery(GET_STRUCTURED_CONTENTS, {
    variables: {
      folderID: tagcontext.state.FolderID
    },
  });
  if (loading) return <p>Submitting...</p>;
  if (error) return <Alert variant='info'>You'll find here the list of content once you've selected a project</Alert>;

  return (
    <>
      <div>
              {data.structuredContentFolderStructuredContents.items.map(({ id, title, contentFields}) => (
            <li key={id}>
              {/* {id}: {title} */}
              {contentFields.map((d) => (
              <p id={id.toString()} key={uuidv4()} onClick={() => contentcontext.newtext(id, d.contentFieldValue.data, contentFields)} className="mylist">
                {d.contentFieldValue.data}
              </p>))}
            </li>))}
      </div>
      
    </>
    
  );
}

export default StructuredContentList