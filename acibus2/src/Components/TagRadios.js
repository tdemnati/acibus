import React from 'react'

class TagRadios extends React.Component {

  mytags = {
    tag: '',
    items:['OBJECT1', 'OBJECT2', 'RELATION']
  }

  handleTagChange = (e) => {
    this.setState({tag: e.currentTarget.value})
  }

  handleonChangeTags = (e) => {
    this.setState({tag: e.target.tag})
  };
  
  toggleAddItem = () => {
    this.setState(mytags => {
      const items = [...mytags.items, mytags.tag];
 
      return {
        items,
        tag: 'OBJECT',
      };
    });
  };

  render () {
    console.log(this.state)
    const {items} = this.props
    return (

      <div>
        
            <input value={this.mytags.tag} onChange={this.handleonChangeTags} />
            <button onClick={this.toggleAddItem}>Add</button>  
        
          {items.map(
          (item, idx) => 
          (
              <div className='md-radio'>
                  <input key={idx}
                      type="radio"
                      value={item}
                      onChange={() => this.handleTagChange}
                      checked={this.mytags.items===item}
                  />
                    <label>{item}</label>
              </div>
          )
          )
          }

      </div>

)

  }
  }
;

export default TagRadios;