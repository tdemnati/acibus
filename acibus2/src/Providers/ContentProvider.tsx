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
      newtext: (e) => {
        this.setState({TEXT: e.target.outerText});
        console.log(e.target.outerText);
     },
      }}>
    {this.props.children};
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



