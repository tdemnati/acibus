import * as React from 'react';
import TagContext from '../Providers/TagProvider';
import ContentContext from '../Providers/ContentProvider';


class Save extends React.Component{
    render() {
        return (
        <ContentContext.Consumer>
          {(contentcontext)=> (
              <p>{JSON.stringify([...contentcontext.state.value], null, 2)}</p>    
        )}
        </ContentContext.Consumer>
        )
    }
}

export default Save