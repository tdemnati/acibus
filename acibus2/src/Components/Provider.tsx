import * as React from 'react';

const MyContext = React.createContext(undefined!);

class Provider extends React.Component{
  state = {
    value: [{start: 17, end: 19, tag: 'OBJECT_1'}],
    tag: 'OBJECT_1',
    radios1 : ['OBJECT_1','OBJECT_2', 'RELATION'],
    newtag:'TAG',
    isEditTag: true,
  }
  //Preserve state for reser
  initialRadios1 = [...this.state.radios1];
  render() {
return (
<MyContext.Provider value={{
  state: this.state,
  onSelectTag: e => {this.setState({tag: e.currentTarget.value})},
  onSelectText: value => {this.setState({value})},
  addTag: () => {this.setState({radios1: [...this.state.radios1, this.state.newtag]})},
  resetTag: () => {
    this.setState({radios1: this.initialRadios1});
    console.log("State is: " + JSON.stringify(this.state));
  },
  onInputChange: e =>{this.setState({newtag: e.target.value})},
  deleteItem: (e) =>{
    var array = [...this.state.radios1];
    var index = array.indexOf(e.target.value);
    if (index !==-1){
      array.splice(index,1);
      this.setState({radios1: array});
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



