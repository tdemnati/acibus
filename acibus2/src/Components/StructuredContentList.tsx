import React from "react";
import { gql } from "@apollo/client";
import { graphql, ChildProps } from "@apollo/react-hoc";
import ContentContext from '../Providers/ContentProvider';


const GET_STRUCTURED_CONTENTS = gql`
query {
  structuredContents(siteKey: "42754") {
    items {
      id
      title
      contentFields {
        contentFieldValue {
          data
        }
      }
    }
  }
}
`;
 
  type InputProps = {
    structuredContentId: string
  };
  
  type Response = {
    structuredContents: StructuredContents;
  }
  
  type StructuredContents = {
    items: [Items];
  }
  
  type Items = {
    id: number;
    title: string;
    contentFields: [ContentFields];
  }

  type ContentFields = {
    contentFieldValue: ContentFieldValue;
  }
  
  type ContentFieldValue = {
    data: string;
  }

const withStructuredContents = graphql<InputProps, Response>(GET_STRUCTURED_CONTENTS, {
  options: ({ structuredContentId }) => ({
    variables: { structuredContentId }
  }
  )
}
  );

class StructuredContentList extends React.Component<ChildProps<InputProps, Response>, {}> {
  state = {
    StructuredContentID: '42',
    TEXT: 'This is the My TEXT'
  }

  render(){
    const { loading, error, structuredContents } = this.props.data;
    if (loading) return <div>Loading</div>;
    if (error) return <h1>ERROR</h1>;
    
    return (
    
      structuredContents.items.map(({ id, title, contentFields}) => (
  
      <li key={id}>
        {/* {id}: {title} */}
        {contentFields.map((d) => (
        <p key={d.contentFieldValue.data} className="mylist">
          {d.contentFieldValue.data}
        </p>))}
        
      </li>
      
    ))
  
    )
  }
}

export default withStructuredContents(StructuredContentList);