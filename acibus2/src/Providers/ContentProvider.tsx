import * as React from 'react';

const ContentContext = React.createContext(undefined!);


class ContentProvider extends React.Component{
  
  state = {
    StructuredContentID: '42',
    TEXT: 'Click on MY CONTENT and start annotating'
  }
  

  render() {
return (
  <ContentContext.Provider 
    value={{
      state: this.state,
      newtext: (e) => {
        this.setState({TEXT: e.target.outerText});
        this.setState({StructuredContentID: '5426'});
        console.log('The Text is: ' + e.target.outerText);
        console.log('The ID is: ' + e.target.innerHTML);
     }
      }}>
    {this.props.children}
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



