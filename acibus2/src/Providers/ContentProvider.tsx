import * as React from 'react';

const ContentContext = React.createContext(undefined!);


class ContentProvider extends React.Component{
  
  state = {
    StructuredContentID: '42',
    TEXT: 'This is the INITIAL TEXT'
  }
  

  render() {
return (
  <ContentContext.Provider 
    value={{
      state: this.state,
      newtext: () => {
        this.setState({TEXT: 'This is the NEW TEXT'});
     },
      }}>
    {this.props.children};
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



