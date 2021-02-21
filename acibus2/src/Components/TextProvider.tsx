import * as React from 'react';

const TextContext = React.createContext(undefined!);

class TextProvider extends React.Component{
  state = {
    TEXT: `On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album, " Invasion of Privacy . "`
  }
  //Preserve state for reser
  render() {
return (
<TextContext.Provider value={{
  state: this.state,
  }}>
  {this.props.children}
</TextContext.Provider>

)

  }

}

export default TextContext;

export {TextProvider};



