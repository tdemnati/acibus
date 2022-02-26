import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Button, Form } from 'react-bootstrap';
import { GET_STRUCTURED_CONTENTS } from './SelectProject';
import ContentContext from '../Providers/ContentProvider';

function AddContent() {
    const projectcontext = useContext(ProjectContext);
    const contentcontext = useContext(ContentContext);
      const ADD_FOLDER_STRUCTURED_CONTENT = gql`
      mutation addStructuredContent($folderID: Long!, $contentTEXT: String!){
        createStructuredContentFolderStructuredContent(
          structuredContentFolderId:$folderID, 
          structuredContent:{
          contentStructureId:"66167",
          title:"Content",
          contentFields: [
          {
            name: "text"
            contentFieldValue: {
              data: $contentTEXT
            }
          }
                  {
          name: "FieldsGroup13487557"
          nestedContentFields: [
        {
          name:"FieldsGroup30533882"
          nestedContentFields:[]
            }
          ]
        }
      ]
      }  ){
          id
          title
          keywords
          contentFields {
                name
                contentFieldValue {
                  data
                }
                nestedContentFields {
                  name
                  contentFieldValue {
                    data
                  }
                }
          }
        }
      }
`;


    const [createStructuredContentFolderStructuredContent, {data: contentdata, loading, error}] = useMutation(ADD_FOLDER_STRUCTURED_CONTENT, {
      refetchQueries: [{query: GET_STRUCTURED_CONTENTS, 
        variables: {folderID: projectcontext.state.FolderID,
        contentTEXT: "placeholder"}}],
        onCompleted: contentdata => {
          contentcontext.newtext(contentdata.createStructuredContentFolderStructuredContent.id, contentdata.createStructuredContentFolderStructuredContent.contentFields[0].contentFieldValue.data, '');
          projectcontext.addContent(contentdata.createStructuredContentFolderStructuredContent.id, contentdata.createStructuredContentFolderStructuredContent.contentFields[0].contentFieldValue.data, '');
          console.log(contentdata);
        },
      awaitRefetchQueries: true,
    });


    let inputcontentTEXT;

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! ${error.message}</p>;

    return (
      <>
            <div>
    <Form
      onSubmit={e => {
        e.preventDefault();
        createStructuredContentFolderStructuredContent({ variables: { folderID: projectcontext.state.FolderID,
          contentTEXT: inputcontentTEXT.value } });
          inputcontentTEXT ='';
      }}
    >
       
       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
    <Form.Control ref={node => {
            inputcontentTEXT = node;
          }} size="sm" as="textarea" rows={3} placeholder="New Content" required/>
    </Form.Group>
    <Button  size="sm" type="submit">Add Content</Button>
    </Form>
    </div>
      </>
      
    );
  }

export default AddContent

