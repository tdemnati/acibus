import * as React from 'react';

const ContentContext = React.createContext(undefined!);


class ContentProvider extends React.Component{
  
  state = {
    value: [],
    StructuredContentID: '42',
    TEXT: '',
    LIST: []
  }
  

  render() {
return (
  <ContentContext.Provider 
    value={{
      state: this.state,
      onSelectText: value => {this.setState({value})},
      getfolderlist: (value) => {
        this.setState({LIST: value});
        console.log(this.state.LIST)
      },
      newtext: (id, text, myvalue) => {
        this.setState({TEXT: text});
        this.setState({StructuredContentID: id});
        console.log('The Text is: ' + text);
        console.log('The ID is: ' + id);
        
        var array =[];
        var n = myvalue.length;
        //console.log(myvalue);
        console.log(n);
        let start=0;
        let end=0;
        let tag = 'tag';
        let color = 'color';
        let tokens = [];
        let token:String;
        var k;
        for (let i = 1; i < n; i++) {
          //console.log('Faire ' + i + ' pas vers l\'est');
          //console.log('La taille pour ' + i + ' vaut : '+myvalue[i].nestedContentFields.length);
         
          for (let j = 0; j < 5; j++) {
          switch (j) {
            case 0:
              //console.log('Start:'+ myvalue[i].nestedContentFields[0].contentFieldValue.data);
              start=Number(myvalue[i].nestedContentFields[0].contentFieldValue.data);
              
              break;
            case 1:
              //console.log('End:'+ myvalue[i].nestedContentFields[1].contentFieldValue.data);
              end=Number(myvalue[i].nestedContentFields[1].contentFieldValue.data);
              
              break;
            case 2:
              //console.log('tag:'+ myvalue[i].nestedContentFields[2].contentFieldValue.data);
              tag=myvalue[i].nestedContentFields[2].contentFieldValue.data;
              
              break;
            case 3:
              //console.log('color:'+ myvalue[i].nestedContentFields[3].contentFieldValue.data);
              color=myvalue[i].nestedContentFields[3].contentFieldValue.data;
              break;
            case 4:
              //console.log('Tokens length = ' + myvalue[i].nestedContentFields[4].nestedContentFields.length );
              k = myvalue[i].nestedContentFields[4].nestedContentFields.length;
              
              for (let m = 0; m < k; m++) {
                token = myvalue[i].nestedContentFields[4].nestedContentFields[m].contentFieldValue.data;
                //console.log(token);
                tokens.push(token);

              }
              //console.log(tokens);
              
              break;
            default:
              //console.log('something');
            }
        }
        array[i-1]={color, end, start, tag, tokens};
        
        array.push(array[i-1]);
        tokens=[];
        }
        //console.log('The Text is: ' + myvalue[0].contentFieldValue.data);
        
        //this.setState({MYVALUE: myvalue});
        //console.log('MY VALUE');
        this.setState({value: array.slice(0,n-1)},
          () => console.log(this.state.value));
        //console.log('value');
        //console.log(this.state.value);
     }
      }}>
    {this.props.children}
  </ContentContext.Provider>
)
  }
}

export default ContentContext;

export {ContentProvider};



