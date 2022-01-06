import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Button, Form } from 'react-bootstrap';


 

function AddProject() {
    const myContext = useContext(ContentContext);

    const ADD_SITE_STRUCTURED_CONTENT_FOLDER = gql`
    mutation createFolder($folderName: String!, $folderDescription: String!){
      createSiteStructuredContentFolder(siteKey:"42754", structuredContentFolder:{
        name:$folderName,
        description:$folderDescription
      }) {
          id
          name
      }
    }
`;

    const [createSiteStructuredContentFolder, {data, loading, error}] = useMutation(ADD_SITE_STRUCTURED_CONTENT_FOLDER, {
      variables: {
        folderName: "placeholder",
        folderDescription: "placeholder"
      },
    });
    let inputfolderName;
    let inputfolderDescription;

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! ${error.message}</p>;

    return (
      <>
            <div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          createSiteStructuredContentFolder({ variables: { folderName: inputfolderName.value,
            folderDescription: inputfolderDescription.value } });
            inputfolderName.value = '';
            inputfolderDescription ='';
        }}
      >
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
<Form.Control ref={node => {
            inputfolderName = node;
          }} size="sm" type="text" placeholder="Project Name" required/>
         </Form.Group>
       
       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
    <Form.Control ref={node => {
            inputfolderDescription = node;
          }} size="sm" as="textarea" rows={3}  placeholder="Project Description" required/>
  </Form.Group>
        <Button  size="sm" type="submit">Add Project</Button>
      </Form>
    </div>
      </>
      
    );
  }

export default AddProject

