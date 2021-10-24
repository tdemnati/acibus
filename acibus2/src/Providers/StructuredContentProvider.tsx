import React from "react";
import { gql } from "@apollo/client";
import { graphql, ChildProps } from "@apollo/react-hoc";

const GET_STRUCTURED_CONTENT = gql`
query query_structuredCont789($structuredContentId: Long!){
    structuredContent(structuredContentId: $structuredContentId) {
      title
      id
      contentFields {
        contentFieldValue {
          data
        }
      }
    }
  } 
`;
 
  type InputProps = {
    structuredContentId: string
  };
  
  type Response = {
    structuredContent: StructuredContent;
  }
  
  type StructuredContent = {
    title: string;
    id: number;
    contentFields: ContentField[];
  }
  
  type ContentField = {
    contentFieldValue: ContentFieldValue;
  }
  
  type ContentFieldValue = {
    data: string;
  }

  const StructuredContentContext = React.createContext(undefined!);

const withStructuredContent = graphql<InputProps, Response>(GET_STRUCTURED_CONTENT, {
  options: ({ structuredContentId }) => ({
    variables: { structuredContentId }
  }
  )
}
  );

class StructuredContentProvider extends React.Component<ChildProps<InputProps, Response>, {}> {
  state = {
    StructuredContentID: '42',
    TEXT: 'This is the My TEXT'
  }

  render(){
    const { loading, error, structuredContent } = this.props.data;
    if (loading) return <div>Loading</div>;
    if (error) return <h1>ERROR</h1>;
    
    return (
      <StructuredContentContext.Provider 
        value={{
          state: this.state,
          newtext: () => {
            this.setState({TEXT: structuredContent.title});
         },
          }}>
        {this.props.children};
      </StructuredContentContext.Provider>
    )
  }
}

export default withStructuredContent(StructuredContentProvider);

export {StructuredContentContext};