import * as React from 'react';
import MyContext from '../Providers/Provider';
import {TokenAnnotator} from '../Annotator';
import TextContext from '../Providers/TextProvider';


class Annotate extends React.Component{
    
    render() {
        return (
        <TextContext.Consumer>
            {(textcontext)=> (
            <MyContext.Consumer>
              {(context)=> (
              <TokenAnnotator
                  style={{
                    fontFamily: 'IBM Plex Sans',
                    maxWidth: 500,
                    lineHeight: 1.5,
                  }}
                  tokens={textcontext.state.TEXT.split(' ')}
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
        </TextContext.Consumer>


        )
    
    
    }

}

export default Annotate;