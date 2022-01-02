import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

// enable cors


const client = new ApolloClient({
  uri: "https://a-cibus.com:8443/o/graphql",
  cache: new InMemoryCache(),
  headers:{
    Authorization: `Basic ZGVtbmF0aS50YXJpa0BnbWFpbC5jb206dGVzdA==`
  }
});

ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start mea suring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

