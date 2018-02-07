import React, { Component } from 'react';
import './Detail.less';
// import {xhr,formateNumber} from './util.js';

class Detail extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return this.props.presonList.map(preson=>{
      return <div key={preson.name} className={'list '+(this.props.ifShowDetail?'hidden':'show')}>
              <label htmlFor={preson.name}>{preson.name}</label>
              <input id={preson.name}/>
              <input type="checkbox" />
            </div>
    })
  }
}

export default Detail;