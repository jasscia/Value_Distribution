import React, { Component } from 'react';
import './Project.css';
// window.onload(function(){
//     var url="http://qq.kkiqq.cn/api/userlist";
//     ajax.get(url);
// })
class Project extends Component{
    render(){
        return (
            <div className="projectInfo">
                {/* <div className="search"> */}
                    <input className="search" placeholder="按项目名称搜索"></input>
                {/* </div> */}
                <div className="create">
                    <form></form>
                    <span>创建新项目</span>
                </div>
                <ProjectInfoList />
                <ProjectInfoList />
                <ProjectInfoList />
                <ProjectInfoList />
                <ProjectInfoList />
                <ProjectInfoList />
            </div>)
    }
}
function ProjectInfoList(props){
    const element=<section className="projectInfoList">                   
                    <section className="projectName">
                        <strong className="proName">pro_1</strong>
                        <span className="edit">编辑</span>
                    </section>
                    <section className="projectBaseInfo"> 
                        <div className="projectWorth">合同额$<em>50</em>&ensp;万</div>
                        <div className="projectDays">工期<em>20</em>&ensp;天</div>
                    </section>
                    <section className="projectPreson">
                        <div className="preson leader">负责人：<em className="presonName">张三，李四</em></div>
                        <div className="preson main">主要参与：<em className="presonName">张三，李四</em></div>
                        <div className="preson side">辅助：<em className="presonName">张三，李四</em></div>
                    </section>
                </section>
    return  element   
}
export default Project;