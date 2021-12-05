import React from "react";
import { gql } from "@apollo/client";
import { graphql, ChildProps } from "@apollo/react-hoc";
import ContentContext from '../Providers/ContentProvider';
import { v4 as uuidv4 } from 'uuid';

const GET_STRUCTURED_CONTENTS = gql`
query {
  structuredContents(siteKey: "42754") {
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

  render(){
    const { loading, error, structuredContents } = this.props.data;
    if (loading) return <div>Loading</div>;
    if (error) return <h1>ERROR</h1>;
    
    return (
      
        
      <ContentContext.Consumer>
      
      {(contentcontext)=> (
        
      <div>
        <button onClick={() => contentcontext.setlist(structuredContents)}>Show list</button>
              {structuredContents.items.map(({ id, title, contentFields}) => (
            <li key={id}>
              {/* {id}: {title} */}
              {contentFields.map((d) => (
              <p id={id.toString()} key={uuidv4()} onClick={contentcontext.newtext} className="mylist">
                {d.contentFieldValue.data}
              </p>))}
            </li>
          ))
      }
          </div>
          )
          }
      </ContentContext.Consumer>
      
        )
  }
}

export default withStructuredContents(StructuredContentList)