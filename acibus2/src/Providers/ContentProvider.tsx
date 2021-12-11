import * as React from 'react';

const ContentContext = React.createContext(undefined!);


class ContentProvider extends React.Component{
  
  state = {
    value: [{ 
      color:'#ffe184',
      end:'11',
      start:'5',
      tag:'OBJ',
      tokens: ['Cardi', 'B.', 'in', 'an', 'music', 'album']
    }],
    StructuredContentID: '42',
    TEXT: 'Click on MY CONTENT and start annotating',
    MYLIST: []
  }
  

  render() {
return (
  <ContentContext.Provider 
    value={{
      state: this.state,
      onSelectText: value => {this.setState({value})},
      newtext: (id, text, mylist) => {
        this.setState({TEXT: text});
        this.setState({StructuredContentID: id});
        this.setState({MYLIST: mylist});
        console.log('The Text is: ' + text);
        console.log('The ID is: ' + id);
        console.log('The MyList is: ' + mylist);
     }
      }}>
    {this.props.children}
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



