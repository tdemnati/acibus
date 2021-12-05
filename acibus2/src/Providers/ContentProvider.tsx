import * as React from 'react';

const ContentContext = React.createContext(undefined!);


class ContentProvider extends React.Component{
  
  state = {
    StructuredContentID: '42',
    TEXT: 'Click on MY CONTENT and start annotating',
    MYLIST: []
  }
  

  render() {
return (
  <ContentContext.Provider 
    value={{
      state: this.state,
      setlist: (mylist) => {
        this.setState({MYLIST: mylist});
        console.log('MYLIST is: ' + this.state.MYLIST);
      },
      newtext: (e) => {
        this.setState({TEXT: e.target.outerText});
        this.setState({StructuredContentID: e.target.id});
        console.log('The Text is: ' + e.target.outerText);
        console.log('The ID is: ' + e.target.id);
     }
      }}>
    {this.props.children}
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



