import React from 'react';
export function ProjectList(props){
    if(!props.projectList.length){
        return <div></div>
    };
    return props.projectList.map((item)=>
        <ProjectItem onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} item={item} key={item.id}/>
    );
}
function ProjectItem(props){
    if(!props.item){
        return <div></div>
    };
    //把主要人员和配合人员抽出
    //detail是 每个人的{姓名,分配比例,角色}组成的数组
    let leader=[];
    let other=[];
    for(let item of props.item.detail){
        if(item.value&&!item.rol){
            other.push(<em key={item.name}  className="presonName">{item.name}:{item.value}</em>)
        }else if(item.rol){
            leader.push(<em key={item.name}  className="presonName">{item.name}:{item.value}</em>)}
    }
    return <div className="item">                 
                <div className="projectName">
                    <strong className="proName">{props.item.project_name}</strong>
                    <span className="edit" 
                        onClick={()=>{
                                    props.onEditClick(props.item)}}>edit</span>
                    <span className="delete" 
                        onClick={()=>{
                                    props.onDeleteClick(props.item.id)}}>delete</span>
                </div>
                <div className="projectBaseInfo"> 
                    <div className="projectWorth">合同额:$<em>{props.item.worth}</em>万</div>
                    <div className="projectDays">工期:<em>{props.item.day_num}</em>天</div>
                    <div className="projectBaseScale">调整系数:<em>{props.item.base_scale}</em></div>
                </div>
                <div className="projectPreson">
                    <div className="preson leader">负责人:{leader}</div>
                    <div className="preson main">参与人员:{other}</div>
                </div>
            </div>
}