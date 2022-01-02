import React from "react";
import { gql } from "@apollo/client";
import { graphql, ChildProps } from "@apollo/react-hoc";
import ContentContext from '../Providers/ContentProvider';
import { v4 as uuidv4 } from 'uuid';

const UPDATE_STRUCTURED_CONTENTS = gql`
mutation{
  updateStructuredContent(
    structuredContentId:67320,
    structuredContent:{
    contentStructureId:66167,
    title:"Jimmy Fallon",
    friendlyUrlPath: "wc1",
    contentFields:[{
      name:"text",
      contentFieldValue:{
        data:"James Fallon is an American comedian, television host, and actor. He is known for his work in television as a cast member on Saturday Night Live and as the host of late-night talk show The Tonight Show Starring Jimmy Fallon and before that Late Night with Jimmy Fallon."
      }
    },
      {
        name:"FieldsGroup13487557"
        contentFieldValue:{
          data:null
        },
        nestedContentFields:[{
      name:"start",
      contentFieldValue:{
        data:"0"
      }
      },
      {
      name:"end",
      contentFieldValue:{
        data:"2"
      }
      },
        {
      name:"tag",
      contentFieldValue:{
        data:"SBJ"
      }
      },
        {
      name:"color",
      contentFieldValue:{
        data:"#ffe184"
      }
      },  
      {
        name:"FieldsGroup30533882"
        contentFieldValue:{
          data:null
        },
        nestedContentFields:[{
      name:"token",
      contentFieldValue:{
        data:"James"
      }
        },
          {
      name:"token",
      contentFieldValue:{
        data:"Fallon"
      }
          }
      ]  
      }
    ]  
      },
      {
        name:"FieldsGroup13487557"
        contentFieldValue:{
          data:null
        },
        nestedContentFields:[{
      name:"start",
      contentFieldValue:{
        data:"2"
      }
      },
      {
      name:"end",
      contentFieldValue:{
        data:"3"
      }
      },
        {
      name:"tag",
      contentFieldValue:{
        data:"REL"
      }
      },
        {
      name:"color",
      contentFieldValue:{
        data:"green"
      }
      },  
      {
        name:"FieldsGroup30533882"
        contentFieldValue:{
          data:null
        },
        nestedContentFields:[{
      name:"token",
      contentFieldValue:{
        data:"is"
      }
        }
      ]  
      }
    ]  
      }
      
    ]
  }) {
id,
    contentStructureId,
    title,
    contentFields{
      name
    contentFieldValue{
      data
    }
      nestedContentFields{
        name
        contentFieldValue{
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

  type UpdateStructuredContent = {
    id: number;
    contentStructureId: number;
    title: String
    contentFields: [ContentFields]
  }
  
  type Response = {
    updateStructuredContent: UpdateStructuredContent;
  }
  
  type ContentFields = {
    name: String;
    contentFieldValue: ContentFieldValue;
    nestedContentFields: [NestedContentFields];
  }
  
  type ContentFieldValue = {
    data: string;
  }

  type NestedContentFields = {
    contentFieldValue: ContentFieldValue;
  }

const withUpdateContent = graphql<InputProps, Response>(UPDATE_STRUCTURED_CONTENTS, {
  options: ({ structuredContentId }) => ({
    variables: { structuredContentId }
  }
  )
}
  );

class UpdateContent extends React.Component<ChildProps<InputProps, Response>, {}> {

  onClick() {
    this.props.mutate()
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render(){


    return (

      <ContentContext.Consumer>
      
      {(contentcontext)=> (
        
      <div>
        <button onClick={this.onClick.bind(this)}>Accept</button>
          </div>
          )
          }
      </ContentContext.Consumer>
      
        )
  }
}

export default withUpdateContent(UpdateContent)