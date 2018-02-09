import React, { Component } from 'react';
import {xhr} from './util.js';
import './DeliverWorth.css';

class DeliverWorth  extends Component{
    constructor(props){
        super(props);
        this.state={
            ifshowPresonList:true,
            userList:{}
        }
    }
    componentDidMount(){
        //初始化表单内容
        let url='http://qq.kkiqq.cn/api/userlist',
        method='GET',
        data=null;
        xhr(method,url,data)
        .then((res)=>{
            console.log(res);
            this.setState({
                userList:res.data
            });
        });
    }
    handdleEditPresonBtn(e){
        this.state({
            ifshowPresonList:!this.state.ifshowPresonList
        })
    }
    render(){
        return <div className="DeliverWorth">
                    <WorthList ifShow={this.state.ifshowPresonList}></WorthList>
                    <EditPresonBtn ifShow={this.state.ifshowPresonList}></EditPresonBtn>
                    <PresonList ifShow={this.state.ifshowPresonList} userList={this.state.userList}></PresonList>
                </div>
    }
}
//人员：产值 键值对列表
function WorthList(props){
    let ifshowPresonList=props.ifshowPresonList
    let element=<div className={"worthList "+(ifshowPresonList?"hidden":"show")}></div>;
    return element;
}
//改变人员信息 按钮
function EditPresonBtn(props){
    let ifshowPresonList=props.ifshowPresonList
    let element=<button className={"EditPresonBtn "+(ifshowPresonList?"hidden":"show")}>编辑人员信息</button>;
    return element;
}
//人员 列表
function PresonList(props){
    let ifshowPresonList=props.ifshowPresonList;
    let userList=props.userList;
    let element="";
    if(userList.length){
        element=userList.map(item=>{
            return <div className="item" key={item.id}>
                        {item.q_name}
                    </div>
        })
    }
    return <div className={"presonList "+(ifshowPresonList?"show":"hidden")}>{element}</div>
}
export default DeliverWorth;