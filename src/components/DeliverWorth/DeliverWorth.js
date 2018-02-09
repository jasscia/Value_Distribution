import React from 'react';
//人员：产值 键值对列表
export function WorthList(props){
    let ifshowpersonList=props.ifshowpersonList
    let element=<div className={"worthList "+(ifshowpersonList?"hidden":"show")}></div>;
    return element;
}
//改变人员信息 按钮
export function EditpersonBtn(props){
    let ifshowpersonList=props.ifshowPersonList
    let element=<button className={"editPersonBtn "+(ifshowpersonList?"hidden":"show")}>Edit</button>;
    return element;
}
//人员 列表
export function PersonList(props){
    let ifshowpersonList=props.ifshowpersonList;
    let userList=props.userList;
    let element="";
    if(userList.length){
        element=userList.map(item=>{
            return <div className="item" key={item.id}>
                        {item.q_name}
                    </div>
        })
    }
    return <div className={"personList "+(ifshowpersonList?"show":"hidden")}>{element}</div>
}