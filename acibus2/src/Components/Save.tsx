import * as React from 'react';
import MyContext from '../Providers/Provider';
import {TokenAnnotator} from '../Annotator';
import TextContext from '../Providers/TextProvider';


class Save extends React.Component{
    
    render() {
        return (
          <TextContext.Consumer>
            {(textcontext)=> (
          <MyContext.Consumer>  
          {(context)=> (
            <>
              <pre>{JSON.stringify([...context.state.value, textcontext.state.TEXT], null, 2)}</pre>
            </>
          )}
        </MyContext.Consumer>)}
        </TextContext.Consumer>
        )
    
    
    }

}

export default Save;