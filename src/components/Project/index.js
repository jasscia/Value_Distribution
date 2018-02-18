import React, {Component } from 'react';
import ProjectList from './ProjectList';
import CreatePro from './CreatePro';

class Project extends Component{
    constructor(props){
        super(props);        
        this.state={
            ifShowCreatePage:false,
            activeItem:{}
        };
        this.handleIfShowCreatePage=this.handleIfShowCreatePage.bind(this);
        this.handleActiveItem=this.handleActiveItem.bind(this);
    };
    componentDidMount(){
        this.props.handleProjectList();
    };
    handleIfShowCreatePage(){
        this.setState({
            ifShowCreatePage:!this.state.ifShowCreatePage
        });
    }
    handleActiveItem(itemInfo){
        this.setState({
            activeItem:itemInfo
        });
    }
    render(){
        let content;
        if (this.state.ifShowCreatePage){
            content=<CreatePro activeItem={this.state.activeItem}
                handleIfShowCreatePage={this.handleIfShowCreatePage}
                handleActiveItem={this.handleActiveItem}
                handleProjectList={this.props.handleProjectList}
                handleProjectItem={this.props.handleProjectItem}/>             
        }else{
            content=<ProjectList projectList={this.props.projectList} 
                handleIfShowCreatePage={this.handleIfShowCreatePage}
                handleActiveItem={this.handleActiveItem}
                handleProjectList={this.props.handleProjectList}
                handleProjectItem={this.props.handleProjectItem}/>
            }       
        return  content
    }
}
export default Project;