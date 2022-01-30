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
    style={{backgroundColor: props.color, borderRadius:5, paddingLeft:'10px', paddingRight:'10px' || '#fff', padding: '2 6px'}}
    data-start={props.start}
    data-end={props.end}
    onClick={() => props.onClick({start: props.start, end: props.end})}
  >
    {props.content}
    {props.tag && (
      <span style={{fontSize: '1em', fontWeight: 1000, marginLeft: 6, marginTop:3}}>{props.tag}</span>
    )}
  </mark>
)

export default Mark