import ProjectContext from '../Providers/ProjectProvider';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/react-hoc';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { GET_STRUCTURED_CONTENTS } from './StructuredContentList';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GET_GUIDELINES } from './RetrieveGuideline';


function AddGuideline() {
    const tagcontext = useContext(ProjectContext);
      const ADD_FOLDER_STRUCTURED_CONTENT = gql`
      mutation addStructuredContent($folderID: Long!, $contentGUIDELINE: String!){
        createStructuredContentFolderStructuredContent(
          structuredContentFolderId:$folderID, 
          structuredContent:{
          contentStructureId:"68652",
          title:"Guideline",
          contentFields: [
          {
            name: "guideline"
            contentFieldValue: {
              data: $contentGUIDELINE
            }
          }
      ]
      }  ){
          id
          title
          contentFields {
                name
                contentFieldValue {
                  data
                }
          }
        }
      }
`;

const UPDATE_GUIDELINES = gql`
mutation MyUpdateStructuredContent($myID: Long!, $contentGUIDELINE: String!){
  updateStructuredContent(
    structuredContentId: $myID
    structuredContent: {
      contentStructureId: 68652
      title: "TagList"
      contentFields: { 
        name: "guideline", contentFieldValue: { data: $contentGUIDELINE }
      }

    }
  ) {
    id
    contentStructureId
    title
    contentFields {
      name
      contentFieldValue {
        data
      }
    }
  }
}
`;


    const [createStructuredContentFolderStructuredContent, {data, loading, error}] = useMutation(ADD_FOLDER_STRUCTURED_CONTENT, {
      fetchPolicy: "no-cache",
      onCompleted: data => {
        console.log(data.createStructuredContentFolderStructuredContent.id);
        tagcontext.setGuidelineID(data.createStructuredContentFolderStructuredContent.id);
      },
      refetchQueries: [{query: GET_GUIDELINES, 
        variables: {folderID: tagcontext.state.FolderID,
        contentTEXT: "placeholder"}}],
      awaitRefetchQueries: true,
    });
    const [updateStructuredContent, {data: guidelinedata, loading: guidelineloading, error: guidelineerror}] = useMutation(UPDATE_GUIDELINES, {
      fetchPolicy: "no-cache",
      onCompleted: guidelinedata => {
        console.log(guidelinedata.updateStructuredContent.id);
        tagcontext.setGuidelineID(guidelinedata.updateStructuredContent.id);
      },
      refetchQueries: [{query: GET_GUIDELINES, 
        variables: {folderID: tagcontext.state.FolderID,
        contentTEXT: "placeholder"}}],
      awaitRefetchQueries: true,
    });

    if (guidelineloading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    if (guidelineerror) return (<><Alert variant='warning'>Select first a content from the content list</Alert></>);
    

    let inputcontentGUIDELINE;

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! ${error.message}</p>;

    return (
      <>
            <div>
            <CKEditor
        editor={ ClassicEditor }
        config={ {
            toolbar: [ 'bold', 'italic', 'link', 'numberedList' ]
        } }
        data="<p>Type your instructions here</p>"
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
            tagcontext.onGuidelineChange(data);
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
    />
    <br/>

<>
        {tagcontext.state.guideLineID == 0 || tagcontext.state.guideLineID == undefined ? <Button  size="sm" onClick={e => {
        e.preventDefault();
        createStructuredContentFolderStructuredContent({ variables: { folderID: tagcontext.state.FolderID,
          contentGUIDELINE: tagcontext.state.guideLineChange } });
          inputcontentGUIDELINE ='';
      }}>Add Guideline</Button> :<Button size="sm" onClick={() => {
          updateStructuredContent({ variables: { myID: tagcontext.state.guideLineID,
            contentGUIDELINE: tagcontext.state.guideLineChange}});
        }}>SAVE</Button>}
</>

    </div>
      </>
      
    );
  }

export default AddGuideline

