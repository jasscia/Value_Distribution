import React, { Component } from 'react';
import './Myapp.less';
import BaseData from './BaseData/';
import Project from './Project/';
import DeliverWorth from './DeliverWorth/';

import {updataUserList,postUserList,deleteUserList} from '../services/userListServices';
import {updataBaseData,putBaseData} from '../services/baseDataServices';
import {updataProjectList,postProjectListList,deleteProjectListList,getProjectItem,putProjectListItem} from '../services/projectServices';

class Myapp extends Component{
    constructor(props){
        super(props);
        this.state={activeBar:"deliverWorth",
                    userList:'',
                    baseData:{id:0,
                                baseDays:250,
                                basePerson:24,
                                baseUnitWorth:1,
                                baseWorth:6000}
                                };

        this.handleActiveBar=this.handleActiveBar.bind(this);
        this.handleBaseData=this.handleBaseData.bind(this);
        this.handleUserList=this.handleUserList.bind(this);

    };
    componentDidMount(){
        // let userList= updataUserList();
        // let baseData= updataBaseData();
        updataUserList().then((userList)=>{
            this.setState({
                userList:userList
            })
            console.log('更新后userlist是:',this.state.userList,userList)  
        });
        updataBaseData().then((baseData)=>{
            this.setState({
                baseData:baseData
            })
        })  
    }
    
    handleActiveBar(activeBar){
        this.setState({activeBar:activeBar})
    };
   async handleUserList(method,id,data){
        if(method==="DELETE"){
          await  deleteUserList(id);
        }
        if(method==="POST"){
          await  postUserList(data);
        }
        this.setState({
            userList:await updataUserList()
        })
    }
    async handleBaseData(method,data){
        if(method==="PUT"){
           await putBaseData(data)
        }
        this.setState({
            baseData:await updataBaseData()
        })
    };  
    render(){
        let content;
        if (this.state.activeBar==="baseData") {
            content=<BaseData 
                    baseData={this.state.baseData} 
                    handleBaseData={this.handleBaseData}/>
        }else if(this.state.activeBar==="project") {
            content=<Project baseData={this.state.baseData} userList={this.userList}/>
        }else if(this.state.activeBar==="deliverWorth") {
            content=<DeliverWorth 
                    userList={this.state.userList} 
                    handleUserList={this.handleUserList}
                    />
        }
        return (<div className="myApp" >
            <div className="content">
                {content}
            </div>
            <nav className="tabBar">
                <div className={'bar '+(this.state.activeBar==='baseData'?'active':'')} onClick={()=>this.handleActiveBar("baseData")}>产值基数</div>
                <div className={'bar '+(this.state.activeBar==='project'?'active':'')} onClick={()=>this.handleActiveBar("project")}>项目信息</div>
                <div className={'bar '+(this.state.activeBar==='deliverWorth'?'active':'')} onClick={()=>this.handleActiveBar("deliverWorth")}>人员产值</div>                
            </nav>
        </div>)
    }
}
export default Myapp;