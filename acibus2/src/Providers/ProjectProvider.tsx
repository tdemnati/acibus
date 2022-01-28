import * as React from 'react';

const ProjectContext = React.createContext(undefined!);

class ProjectProvider extends React.Component{
  state = {
    value: [{}],
    tag: 'SBJ',
    color: '#ffe184',
    tagList : [],
    tagID:"any",
    mynewtag:'TAG',
    mynewcolor:'#0d6efd',
    isEditTag: true,
    isSelectedProject: false,
    FolderID:'0',
    FolderName:'MY PROJECTS',
    mytagList:[],
    TAGLIST:[]
  }
  //Set initial taglist state
  initialtagList = [...this.state.tagList];
  render() { 
return (
<ProjectContext.Provider value={{ 
  state: this.state,
  onSelectProjectSet: (contentFields) => {
    this.setState({mytagList: contentFields});
  },
  setTagList:(mytaglists) =>{
    this.setState({tagList: mytaglists}, () => console.log(mytaglists))}

  ,
  onSelectProject: (id, name) => {
    this.setState({FolderID: id});
    this.setState({FolderName: name});
    console.log('FolderID: '  + id);
    console.log('FolderName: ' + name);
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
    },
  hideProject: () => {
    this.setState({isSelectedProject: true});
    console.log("Select Project is: " + this.state.isSelectedProject)
    },
  showProject: () => {
    this.setState({isSelectedProject: false});
    console.log("Select Project is: " + this.state.isSelectedProject)
    }, 
  }}>
  {this.props.children}
</ProjectContext.Provider>

)

  }

}

export default ProjectContext;

export {ProjectProvider};



