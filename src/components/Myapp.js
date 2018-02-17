import React, { Component } from 'react';
import './Myapp.less';
import BaseData from './BaseData/';
import Project from './Project/';
import DeliverWorth from './DeliverWorth/';

import {xhr} from './util.js';

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
        this.putBaseData=this.putBaseData.bind(this);

    };
    componentDidMount(){
        this.updataUserList();
        let url_baseData='http://qq.kkiqq.cn/api/baseworth',
            method_baseData='GET',
            data_baseData=null;
            xhr(method_baseData,url_baseData,data_baseData)
            .then((res)=>{
                this.setState({
                    baseData:res.data[0]
                });
            });       
    }
    
    handleActiveBar(activeBar){
        this.setState({activeBar:activeBar})
    };
    //baseData的处理
    //set state
    handleBaseData(baseData){
        this.setState({
            baseData:baseData
        })
    };
    putBaseData(baseData){   
        let url="http://qq.kkiqq.cn/api/baseworth/1";
        let method='PUT';
        let data=baseData;
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            console.log('新增baseData成功',res);
        });
    };
    //userList的处理
    updataUserList(){
        let url='http://qq.kkiqq.cn/api/userlist',
            method='GET',
            data=null;
            xhr(method,url,data)
            .then((res)=>{
                this.setState({
                    userList:res.data
                });
                console.log('baseData请求结果为',res.data);
            });
    };
    postUserList(userName){  
        let url="http://qq.kkiqq.cn/api/userlist";
        let method='POST';
        let data={name:userName};
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            console.log('新增成功',res);
            // this.updataUserList();
        })
    };
    deleteUserList(id){  
        let url="http://qq.kkiqq.cn/api/userlist/"+id;
        let method='DELETE';
        let data={};
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            console.log('删除成功',res);
        });
    }
    render(){
        let content;
        if (this.state.activeBar==="baseData") {
            content=<BaseData 
                    baseData={this.state.baseData} 
                    putBaseData={this.putBaseData} 
                    handleBaseData={this.handleBaseData}/>
        }else if(this.state.activeBar==="project") {
            content=<Project baseData={this.state.baseData} userList={this.userList}/>
        }else if(this.state.activeBar==="deliverWorth") {
            content=<DeliverWorth 
                    userList={this.state.userList} 
                    postUserList={this.postUserList} 
                    deleteUserList={this.deleteUserList}
                    // handleUserList={this.handleUserList}
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