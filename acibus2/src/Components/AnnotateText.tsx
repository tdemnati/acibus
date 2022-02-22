import * as React from 'react';
import ProjectContext from '../Providers/ProjectProvider';
import {TokenAnnotator} from '../Annotator';
import ContentContext from '../Providers/ContentProvider';

class AnnotateText extends React.Component<any, any>{

    render() {
        return (
        <ContentContext.Consumer>
            {(contentcontext)=> (
            <ProjectContext.Consumer>
              {(context)=> (

                <>
{context.state.isSelectedProject ? "":
              <TokenAnnotator
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: 2.2,
                    wordWrap: 'break-word'
                  }}
                  tokens={contentcontext.state.TEXT.split(' ')}
                  value={contentcontext.state.value}
                  onChange={contentcontext.onSelectText}
                  getSpan={span => ({
                    ...span,
                    tag: context.state.tag,
                    color: context.state.tagList.find(el => el.tag === context.state.tag).color,
                  }
                   )}
                />
    }</>
              )}
            </ProjectContext.Consumer>
            )}
        </ContentContext.Consumer>


        )
    
    
    }

}

export default AnnotateText;