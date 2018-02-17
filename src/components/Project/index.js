import React, { Component } from 'react';
import './Project.less';
import {xhr} from '../../services/util.js';
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
        let content;

        if (this.state.ifShowCreatePage){
            content=
            <div className="projectInfo">
                <CreatePro itemInfo={this.state.activeItemInfo} handleCreatePage={this.handleCreatePage}/>
            </div>               
        }else{content=
                <div className="projectInfo">
                    <input className="search" placeholder="按项目名称搜索"></input>
                    <div className="createBtn">  
                        <span onClick={()=>this.handleCreatePage()}>创建新项目</span>
                    </div>
                    <ProjectInfoList data={this.state.projectInfoList} handleCreatePage={this.handleCreatePage}/>
                </div>
            }
        
        return content
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
    let presonLeader=[];
    let presonList=[];
    data.detail.map(item=>{
        if(item.value&&!item.rol){
           presonList.push(<em key={item.name}  className="presonName">
                    {item.name}:{item.value}
                </em>)
        }else if(item.rol){
            presonLeader.push(<em key={item.name}  className="presonName">
            {item.name}:{item.value}
        </em>)
        }
        return presonList?presonList:presonLeader;
    });
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
                        <div className="preson leader">负责人：{presonLeader}</div>
                        <div className="preson main">参与人员：{presonList}</div>
                    </section>
                </section>
    return  element   
}

export default Project;