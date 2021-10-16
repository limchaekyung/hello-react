import React, {Component} from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props){ //제일먼저, 초기화담당
    super(props);
    this.max_content_id=3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub: 'World wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title: 'HTML', desc: 'HTML is for information'},
        {id:2, title: 'CSS', desc: 'CSS is for design'},
        {id:3, title: 'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id===this.state.selected_content_id){
          return data;
          break;
        }
        i=i+1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode==='welcome'){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent> 
    }else if(this.state.mode==='create'){
      _article=<CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id=this.max_content_id+1;
         
        // this.state.contents.push( //1. 배열 추가(원본을 변경)
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // this.setState({
        //   contents:this.state.contents
        // });

        // var _contents=this.state.contents.concat( //2. 배열 추가(복제해서 변경)
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        // this.setState({
        //   contents:_contents
        // })
        
        var _contents = Array.from(this.state.contents);    //3. 원본을 변경하지 않고 사용하는 push
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id: this.max_content_id
        });

        // var newContents = Array.from(this.state.contents);  //객체를 확인
        // newContents.push({id:this.max_content_id,
        // title:_title, desc:_desc});

      }.bind(this)}></CreateContent>
    }else if(this.state.mode==='update'){
      _content=this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        //add content to this.state.contents
        var _contents = Array.from(this.state.contents);  //원본 변경X
        var i = 0;
        while(i<_contents.length){
          if(_contents[i].id===_id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i=i+1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            //alert('hihihi');
            this.setState({mode:'welcome'});
          }.bind(this)}
          >
        </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)} 
        data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode==='delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i<this.state.contents.length){
                if(_contents[i].id===this.state.selected_content_id){
                  _contents.splice(i, 1); //삭제
                  break;
                }
                i=i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted');
            }
          }else{
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;