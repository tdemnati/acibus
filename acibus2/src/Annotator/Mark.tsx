import React from 'react'

export interface MarkProps {
  key: string
  content: string
  start: number
  end: number
  tag: string
  color?: string
  onClick: (arg0: any) => any
}

const Mark: React.FC<MarkProps> = props => (
  <mark
    style={{backgroundColor: props.color || '#fff', padding: '0 4px'}}
    data-start={props.start}
    data-end={props.end}
    onClick={() => props.onClick({start: props.start, end: props.end})}
  >
    {props.content}
    {props.tag && (
      <span style={{fontSize: '0.7em', fontWeight: 500, marginLeft: 6}}>{props.tag}</span>
    )}
  </mark>
)

export default Mark