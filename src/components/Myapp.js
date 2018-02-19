import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './Myapp.less';
import BaseData from './BaseData/';
import Project from './Project/';
import DeliverWorth from './DeliverWorth/';

import {updataUserList,postUserList,deleteUserList} from '../services/userListServices';
import {updataBaseData,putBaseData} from '../services/baseDataServices';
import {updataProjectList,postProjectList,deleteProjectList,getProjectItem,putProjectItem} from '../services/projectServices';

class Myapp extends Component{
    constructor(props){
        super(props);
        this.state={
            // activeBar:"baseData",
                    userList:'',
                    baseData:{},
                    projectList:[]};
        // this.handleActiveBar=this.handleActiveBar.bind(this);
        this.handleBaseData=this.handleBaseData.bind(this);
        this.handleUserList=this.handleUserList.bind(this);
        this.handleProjectItem=this.handleProjectItem.bind(this);
        this.handleProjectList=this.handleProjectList.bind(this);
    };
    componentDidMount(){
        //
    }  
    // handleActiveBar(activeBar){
    //     this.setState({activeBar:activeBar})
    // };
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
    async handleProjectList(method,id,data){
        if(method==="POST"){
            await postProjectList(data)
        }
        if(method==="DELETE"){
            await deleteProjectList(id)
        }
        this.setState({
            projectList:await updataProjectList()
        })
    } 
    async handleProjectItem(method,id,data){
        if(method==="PUT"){
            await putProjectItem(id,data)
        }
        if(method==="GET"){
            await getProjectItem(id)
        }
    }
    render(){
        let content;
        if (this.state.activeBar==="baseData") {
        content=<BaseData 
                baseData={this.state.baseData} 
                handleBaseData={this.handleBaseData}/>
        }else if(this.state.activeBar==="project") {
        content=<Project 
                projectList={this.state.projectList} 
                handleProjectList={this.handleProjectList}
                handleProjectItem={this.handleProjectItem}/>
        }else if(this.state.activeBar==="deliverWorth") {
        content=<DeliverWorth 
                userList={this.state.userList} 
                handleUserList={this.handleUserList}/>
        }
        return <router>
            <div className="myApp">
                <div className="content">
                    {content}
                </div>
                <nav className="tabBar">
                    <Link to="/" className="bar"  activeClassName="bar active"
                        // onClick={()=>this.handleActiveBar("baseData")}
                        >产值基数</Link>
                    <Link to="/project" className="bar"  activeClassName="bar active"
                        // onClick={()=>this.handleActiveBar("project")}
                        >项目信息</Link>
                    <Link to="/deliverWorth" className="bar" activeClassName="bar active"
                        // onClick={()=>this.handleActiveBar("deliverWorth")}
                        >人员产值</Link>                
                </nav>
                <Route exact path="/" component={BaseData}/>
                <Route path="/project" component={Project}/>
                <Route path="/deliveWorth" component={DeliverWorth}/>
            </div>
        </router>
    }
}
export default Myapp;