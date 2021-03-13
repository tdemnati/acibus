import * as React from 'react';

const MyContext = React.createContext(undefined!);

class Provider extends React.Component{
  state = {
    value: [{start: 17, end: 19, tag: 'SBJ'}],
    tag: 'SBJ',
    tagList : [
                {tag:'SBJ',
                color:'#ffe184'},
                {tag:'OBJ',
                color:'#ffe184'},
                {tag:'REL',
                color:'#d2afe9'},
    ],
    newtag:{tag: 'TAG',color:'#ffe184'},
    isEditTag: true
  }
  //Preserve state for reser
  initialtagList = [...this.state.tagList];
  render() {
return (
<MyContext.Provider value={{
  state: this.state,
  onSelectTag: e => {this.setState({tag: e.currentTarget.value})},
  onSelectText: value => {this.setState({value})},
  addTag: () => {this.setState({tagList: [...this.state.tagList, this.state.newtag]})},
  resetTag: () => {
    this.setState({tagList: this.initialtagList});
    console.log("State is: " + JSON.stringify(this.state));
  },
  onInputChange: e =>{this.setState({newtag: {tag: e.target.value, color: ""}})},
  deleteItem: (e) =>{
    var array = [...this.state.tagList];
    var index = array.findIndex(el => el.tag === e.target.value);
    console.log("The array is:" + array)
    if (index !==-1){
      array.splice(index,1);
      this.setState({tagList: array});
      console.log("Value is: " + e.target.value);
    } 
  },
  toggleEditTag: (previousState) => {
    this.setState({isEditTag: !this.state.isEditTag});
    console.log("Edit status is: " + this.state.isEditTag)
    }
  }}>
  {this.props.children}
</MyContext.Provider>

)

  }

}

export default MyContext;

export {Provider};



