import React, { Component } from 'react';
import './Project.css';
import {xhr} from './util.js'


class Project extends Component{
    constructor(props){
        super(props);
        
        this.state={
            projectInfoList:[]
        }
    };
    componentDidMount(){
        let url="http://qq.kkiqq.cn/api/project",
            method="GET",
            data=null;
        // let res = await xhr(method,url,data);
        xhr(method,url,data)
        .then((res)=>{
            this.setState({
                projectInfoList:res.data
            });
        });
    }
    render(){
        return (
            <div className="projectInfo">
                {/* <div className="search"> */}
                    <input className="search" placeholder="按项目名称搜索"></input>
                {/* </div> */}
                <div className="create">                    
                    <Edit />
                    <span>创建新项目</span>
                </div>
                <ProjectInfoList data={this.state.projectInfoList}/>
            </div>)
    }
}
function ProjectInfoList(props){

    const list=props.data.map((item)=>
        <ProjectInfoItem data={item} key={item.id} />
    );
    return list;
}
function ProjectInfoItem(props){
    let data=props.data;
    const element=<section className="projectInfoItem">                   
                    <section className="projectName">
                        <strong className="proName">{data.project_name}</strong>
                        <span className="edit">编辑</span>
                    </section>
                    <section className="projectBaseInfo"> 
                        <div className="projectWorth">合同额$<em>{data.worth}</em>&ensp;万</div>
                        <div className="projectDays">工期<em>{data.day_num}</em>&ensp;天</div>
                    </section>
                    <section className="projectPreson">
                        <div className="preson leader">负责人：<em className="presonName">{data.person_num}</em></div>
                        <div className="preson main">主要参与：<em className="presonName">{data.person_num}</em></div>
                        <div className="preson side">辅助：<em className="presonName">{data.person_num}</em></div>
                    </section>
                </section>
    return  element   
}
function Edit(props){
    const element=<form className="createItem">
        <div>
            <label for="projectName">项目名称:</label><input id="projectName"></input>
        </div>
        <div>
            <label for="contractAmount">合同额：$</label><input id="contractAmount"></input><label for="contractAmount">万</label>
        </div>
        <div>
            <label for="calcTimeLimit">计算工期：</label><input id="calcTimeLimit"></input><label for="calcTimeLimit">天</label>
        </div>
    </form>
    return element;
}
export default Project;