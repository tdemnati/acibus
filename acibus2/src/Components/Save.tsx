import * as React from 'react';
import MyContext from '../Providers/TagProvider';
import {TokenAnnotator} from '../Annotator';
import ContentContext from '../Providers/ContentProvider';


class Save extends React.Component{
    render() {
        return (
        <ContentContext.Consumer>
          {(textcontext)=> (
        <MyContext.Consumer>  
          {(context)=> (
            <>
              <pre>{JSON.stringify([...context.state.value, textcontext.state.TEXT], null, 2)}</pre>
            </>
          )}
        </MyContext.Consumer>)}
        </ContentContext.Consumer>
        )
    }
}

export default Save;