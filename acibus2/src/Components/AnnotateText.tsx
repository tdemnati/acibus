import * as React from 'react';
import MyContext from '../Providers/Provider';
import {TokenAnnotator} from '../Annotator';
import {StructuredContentContext} from '../Providers/StructuredContentProvider';

class AnnotateText extends React.Component<any, any>{

    render() {
        return (
        <StructuredContentContext.Consumer>
            {(contentcontext)=> (
            <MyContext.Consumer>
              {(context)=> (
              <TokenAnnotator
                  style={{
                    fontFamily: 'IBM Plex Sans',
                    maxWidth: 500,
                    lineHeight: 1.5,
                  }}
                  tokens={contentcontext.state.TEXT.split(' ')}
                  value={context.state.value}
                  onChange={context.onSelectText}
                  getSpan={span => ({
                    ...span,
                    tag: context.state.tag,
                    color: context.state.tagList.find(el => el.tag === context.state.tag).color,
                  }
                   )}
                />
              )}
            </MyContext.Consumer>
            )}
        </StructuredContentContext.Consumer>


        )
    
    
    }

}

export default AnnotateText;