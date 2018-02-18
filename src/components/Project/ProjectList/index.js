import React, {Component } from 'react';
import {ProjectList} from './ProjectList.js';
import './ProjectList.less';
class Index extends Component{
  render(){
    return <div className="projectInfo">
            <input className="search" placeholder="按项目名称搜索"></input>
            <input type="button" className="createBtn" value="创建新项目"
                onClick={()=>{this.props.handleIfShowCreatePage();this.props.handleActiveItem()}} />
            <ProjectList projectList={this.props.projectList}  
                handleIfShowCreatePage={this.props.handleIfShowCreatePage}
                handleActiveItem={this.props.handleActiveItem}
                handleProjectList={this.props.handleProjectList}
                handleProjectItem={this.props.handleProjectItem}/>
          </div>
  }
}
export default Index;