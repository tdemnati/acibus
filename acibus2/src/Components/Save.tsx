import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';


class Save extends React.Component{
    render() {
        return (
        <ContentContext.Consumer>
          {(textcontext)=> (
        <TagContext.Consumer>  
          {(context)=> (
            <>
              <p>{JSON.stringify([...context.state.value, textcontext.state.TEXT], null, 2)}</p>
            </>
          )}
        </TagContext.Consumer>)}
        </ContentContext.Consumer>
        )
    }
}

export default Save