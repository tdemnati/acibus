import * as React from 'react';

const ProjectContext = React.createContext(undefined!);

class ProjectProvider extends React.Component{
  state = {
    isSelectedProject: true,
    isSelectedSideProject: true,
    isSelectedResults: true,
    FolderID:'0',
    FolderName:'MY PROJECTS',
    value: [{}],
    tag: 'SBJ',
    color: '#ffe184',
    tagList : [],
    tagID:"any",
    mynewtag:'TAG',
    mynewcolor:'#0d6efd',
    isEditTag: true,
    mytagListID:'',
    guideLine:'',
    guideLineID:'',
    contentList : [],
    contentID: "any"
  }
  //Set initial taglist state
  initialtagList = [...this.state.tagList];
  render() { 
return (
<ProjectContext.Provider value={{ 
  state: this.state,
  setTagListID: (mytaglist) => {
    this.setState({mytagListID: mytaglist}, () => console.log(this.state.mytagListID));
  },
  setTagList:(mytaglists) =>{
    this.setState({tagList: mytaglists}, () => console.log(this.state.tagList))
  },
  setContentID: (mycontentid) => {
    this.setState({contentID: mycontentid}, () => console.log(this.state.contentID));
  },
  setContentList:(mycontentlist) =>{
    this.setState({contentList: mycontentlist}, () => console.log(this.state.contentList))
  },
  addContent: (myid, mytext, myvalue) => {this.setState({contentList: [...this.state.contentList, {id: myid, text: mytext, contentFields: myvalue}]})},
  onSelectProject: (id, name) => {
    this.setState({FolderID: id}, ()=>console.log(this.state.FolderID));
    this.setState({FolderName: name}, ()=>console.log(this.state.FolderName));
    console.log('FolderID: '  + id);
    console.log('FolderName: ' + name);
  },
  onSelectTag: e => {this.setState({tag: e.currentTarget.value})},
  onSelectText: value => {this.setState({value})},
  addTag: () => {this.setState({tagList: [...this.state.tagList, {tag: this.state.mynewtag, color: this.state.mynewcolor}]})},
  onGuidelineChange: (mydata) => {this.setState({guideLineChange: mydata})},
  setGuidelineID: (mydata) => {this.setState({guideLineID: mydata})},
  setGuideline: (mydata) => {this.setState({guideLine: mydata}, ()=>console.log(this.state.guideLine))},
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
  showProject: () => {
    this.setState({isSelectedProject: false});
    console.log("Select Project is: " + this.state.isSelectedProject)
    },
  hideProject: () => {
    this.setState({isSelectedProject: true});
    console.log("Select Project is: " + this.state.isSelectedProject)
    },
  setShowProject: () => {
      this.setState({isSelectedProject: !this.state.isSelectedProject});
      console.log("Select Project is: " + this.state.isSelectedProject)
      },
  showResults: () => {
    this.setState({isSelectedResults: false});
    console.log("Show Results is: " + this.state.isSelectedResults)
    },
  hideResults: () => {
    this.setState({isSelectedResults: true});
    console.log("Show Results is: " + this.state.isSelectedResults)
    },
  setShowResults: () => {
      this.setState({isSelectedResults: !this.state.isSelectedResults});
      console.log("Show Results is: " + this.state.isSelectedResults)
      },
  showSideProject: () => {
    this.setState({isSelectedSideProject: false});
    console.log("Select Side Project is: " + this.state.isSelectedSideProject)
    },
  hideSideProject: () => {
    this.setState({isSelectedSideProject: true});
    console.log("Select Side Project is: " + this.state.isSelectedSideProject)
    },
  setSideShowProject: () => {
      this.setState({isSelectedSideProject: !this.state.isSelectedSideProject});
      console.log("Select Side Project is: " + this.state.isSelectedSideProject)
      }
  }}>
  {this.props.children}
</ProjectContext.Provider>

)

  }

}

export default ProjectContext;

export {ProjectProvider};



