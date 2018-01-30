import React, { Component } from 'react';
import './Project.less';
import {xhr} from './util.js';
import CreatePro from './CreatePro';


class Project extends Component{
    constructor(props){
        super(props);
        
        this.state={
            projectInfoList:[],
            ifShowCreatePage:false,
            activeItemInfo:''
        };
        this.handleCreatePage=this.handleCreatePage.bind(this);
    };
    componentDidMount(){
        this.updateProList();
    };
    updateProList(){
        let url="http://qq.kkiqq.cn/api/project",
        method="GET",
        data=null;
        xhr(method,url,data)
        .then((res)=>{
            this.setState({
                projectInfoList:res.data
            });
        });
    }
    handleCreatePage(itemInfo){
        this.setState({
            ifShowCreatePage:!this.state.ifShowCreatePage
        });
        // if(itemInfo){
            this.setState({
                activeItemInfo:itemInfo?itemInfo:''
            })
        // };
        this.updateProList();
    }
    render(){
        if (this.state.ifShowCreatePage){
            return (
                <div className="projectInfo">
                    <div className="create">                    
                        <CreatePro data={this.state.activeItemInfo} handleCreatePage={this.handleCreatePage}/>
                    </div>
                </div>)
        }else{
            return (
                <div className="projectInfo">
                    <input className="search" placeholder="按项目名称搜索"></input>
                    <div className="create">  
                        <span onClick={()=>this.handleCreatePage()}>创建新项目</span>
                    </div>
                    <ProjectInfoList data={this.state.projectInfoList} handleCreatePage={this.handleCreatePage}/>
                </div>)
            }
    }
}
function ProjectInfoList(props){

    const list=props.data.map((item)=>
        <ProjectInfoItem itemInfo={item} key={item.id} handleCreatePage={props.handleCreatePage}/>
    );
    return list;
}
function ProjectInfoItem(props){
    let data=props.itemInfo;
    const element=<section className="projectInfoItem">                   
                    <section className="projectName">
                        <strong className="proName">{data.project_name}</strong>
                        <span className="edit" onClick={()=>props.handleCreatePage(data)}>more>></span>
                    </section>
                    <section className="projectBaseInfo"> 
                        <div className="projectWorth">合同额：$<em>{data.worth}</em>&ensp;万</div>
                        <div className="projectDays">工期：<em>{data.day_num}</em>&ensp;天</div>
                    </section>
                    <section className="projectPreson">
                        <div className="preson leader">负责人：<em className="presonName">{data.detail[0].leader}</em></div>
                        <div className="preson main">主要参与：<em className="presonName">{data.detail[1].main.join(',')}</em></div>
                        <div className="preson side">辅助：<em className="presonName">{data.detail[2].side.join(',')}</em></div>
                    </section>
                </section>
    return  element   
}

export default Project;