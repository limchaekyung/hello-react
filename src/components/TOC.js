import React, {Component} from 'react';

class TOC extends Component{
    shouldComponentUpdate(newProps, newState){  //렌더 이전에 실행
      console.log('===> TOC render shouldComponentUpdate'
      , newProps.data //바뀐값
      , this.props.data //현재값
      );
      if(this.props.data===newProps.data){
        return false; //렌더 호출 X
      }
      return true; 
    }
    render(){
      console.log('==> TOC render');
        var lists = [];
        var data = this.props.data;
        var i=0;
        while(i<data.length){
            lists.push(
              <li key={data[i].id}>
                <a 
                  href={"/content/"+data[i].id}
                  data-id={data[i].id}
                  /*onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id);
                  }.bind(this)}*/
                  onClick={function(id, e){
                    e.preventDefault();
                    this.props.onChangePage(id);
                  }.bind(this, data[i].id)}
                  
                >{data[i].title}</a>
              </li>);
        i=i+1;
      }
      return(
        <nav>
              <ul>
                  {lists}
              </ul>
          </nav>
      );
    }
  }
  
export default TOC;