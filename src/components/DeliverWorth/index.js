import React, { Component } from 'react';
import {xhr} from '../util.js';
import './DeliverWorth.less';
import {WorthList,EditpersonBtn,PersonList} from './DeliverWorth';

class DeliverWorth  extends Component{
    constructor(props){
        super(props);
        this.state={
            ifshowpersonList:true,
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
            this.setState({
                userList:res.data
            });
        });
    }
    handdleEditpersonBtn(e){
        this.state({
            ifshowpersonList:!this.state.ifshowpersonList
        })
    }
    render(){
        return <div className="deliverWorth">
                    <WorthList ifShow={this.state.ifshowpersonList}></WorthList>
                    <EditpersonBtn ifShow={this.state.ifshowpersonList}></EditpersonBtn>
                    <PersonList ifShow={this.state.ifshowpersonList} userList={this.state.userList}></PersonList>
                </div>
    }
}

export default DeliverWorth;