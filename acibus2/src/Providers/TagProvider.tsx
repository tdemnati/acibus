import * as React from 'react';

const TagContext = React.createContext(undefined!);

class TagProvider extends React.Component{
  state = {
    value: [{}],
    tag: 'SBJ',
    color: '#ffe184',
    tagList : [
                {tag:'SBJ',
                color:'#0d6efd'},
                {tag:'OBJ',
                color:'#ffe184'},
                {tag:'REL',
                color:'#d2afe9'},
    ],
    mynewtag:'TAG',
    mynewcolor:'#0d6efd',
    isEditTag: true,
    FolderID:'',
    FolderName:'Select'
  }
  //Set initial taglist state
  initialtagList = [...this.state.tagList];
  render() { 
return (
<TagContext.Provider value={{
  state: this.state,
  onSelectProject: e => {
    this.setState({FolderID: e.target.value});
    this.setState({FolderName: e.target.innerText});
    console.log('FolderID: '  + e.target.value);
    console.log('FolderName: ' + e.target.innerText);
  },
  onSelectTag: e => {this.setState({tag: e.currentTarget.value})},
  onSelectText: value => {this.setState({value})},
  addTag: () => {this.setState({tagList: [...this.state.tagList, {tag: this.state.mynewtag, color: this.state.mynewcolor}]})},
  resetTag: () => {
    this.setState({tagList: this.initialtagList});
    console.log("State is: " + JSON.stringify(this.state));
  },
  onInputChange: e =>{this.setState({mynewtag: e.target.value})},
  onColorChange: e =>{this.setState({mynewcolor: e.target.value})},
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
  toggleEditTag: () => {
    this.setState({isEditTag: !this.state.isEditTag});
    console.log("Edit status is: " + this.state.isEditTag)
    }
  }}>
  {this.props.children}
</TagContext.Provider>

)

  }

}

export default TagContext;

export {TagProvider};



