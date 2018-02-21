import React, {Component } from 'react';
import {updataProjectList,getProjectItem,deleteProjectItem} from '../../../services/projectServices';
import {ProjectList} from './ProjectList';

class Index extends Component{
    constructor(props){
      super(props);
      this.state={
         projectList:[]
      }
      this.getProjectList = this.getProjectList.bind(this);
      this.goEditProject = this.goEditProject.bind(this);
      this.goDeleteProject = this.goDeleteProject.bind(this);
      this.onCreateClick = this.onCreateClick.bind(this);
    }
    componentDidMount(){
        this.getProjectList();
    }
    
    async getProjectList(method,id,data){
        this.setState({
            projectList:await updataProjectList()
        })
    }
    onCreateClick(){
       this.props.history.push('/project/create')
    }
    goEditProject(item){

        // this.props.history.push(`/project/edit/`,{
        //       activeItem:item
        // });
        //这里不需要传递数据，到编辑页面再去获取索要编辑项目的数据

        this.props.history.push(`/project/edit/${item.id}`,{
              activeItem:item
        });
    }
    async goDeleteProject(id){
        await deleteProjectItem(id);
        this.getProjectList();
    }
  
  render(){
    return <div className="projectInfo">
            <input className="search" placeholder="按项目名称搜索"></input>
            <input type="button" className="createBtn" value="创建新项目" onClick={this.onCreateClick} />
            <ProjectList projectList={this.state.projectList}  
                        onEditClick={this.goEditProject}  
                        onDeleteClick={this.goDeleteProject}/>
          </div>
  }
}
export default Index;