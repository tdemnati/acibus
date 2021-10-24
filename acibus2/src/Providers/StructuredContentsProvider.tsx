import * as React from 'react';
import {StructuredContentContext} from '../Providers/StructuredContentProvider';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

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


export function GetStructuredContents({handleIdChange}) {
  const { loading, error, data } = useQuery(GET_STRUCTURED_CONTENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    
    data.structuredContents.items.map(({ id, title, contentFields}) => (

    <li key={id} onClick={() => handleIdChange(id, title)}>
      {/* {id}: {title} */}
      {contentFields.map((d) => (
      <p key={d.contentFieldValue.data} className="mylist">
        {d.contentFieldValue.data}
      </p>))}
      
    </li>
    
  ))

  )
  
}

