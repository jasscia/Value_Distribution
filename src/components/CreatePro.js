import React, { Component } from 'react';
import './CreatePro.less';
import {xhr} from './util.js';

class  CreatePro extends Component{
    constructor(props){
        super(props);
        
        this.state={
            newProjectName:'',
            newWorth:'',
            newPresonNum:'',
            newDayNum:'',
            newBaseScale:'',
            newDetail:[]
        };
        this.postNewInfo=this.postNewInfo.bind(this);
        this.handleProjectName=this.handleProjectName.bind(this);
        this.handleWorth=this.handleWorth.bind(this);
        this.handlePersonNum=this.handlePersonNum.bind(this);
        this.handleDaynum=this.handleDaynum.bind(this);
        this.handleBaseScale=this.handleBaseScale.bind(this);
        this.handleDetail=this.handleDetail.bind(this);
    };
    postNewInfo(){
        let url="http://qq.kkiqq.cn/api/project";
        let method='POST';
        let data={
            project_name:this.state.newProjectName,
            worth:this.state.newWorth,
            preson_num:this.newPresonNum,
            day_num:this.state.newDayNum,
            base_scale:this.state.newBaseScale,
            detail:this.state.newDetail
        };
        console.log(data);
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{});

    };
    handleProjectName(e){
        this.setState({
            newProjectName:e.target.value
        });
    };
    handleWorth(e){
        this.setState({
            newWorth:e.target.value
        });
    };
    handlePersonNum(e){
        this.setState({
            newPresonNum:e.target.value
        });
    };
    handleDaynum(e){
        this.setState({
            newDayNum:e.target.value
        });
    };
    handleBaseScale(e){
        this.setState({
            newBaseScale:e.target.value
        });
    };
    handleDetail(e){
        this.setState({
            newDetail:e.target.value
        });
    };
    
    render(){
        return(
            <div className="createItem" >
            <div className="item">
                <label htmlFor="projectName">项目名称：</label>
                <input id="projectName" onChange={this.handleProjectName}></input>
                <label htmlFor="projectName">&ensp;&ensp;&ensp;</label>
            </div>
            <div className="item">
                <label htmlFor="worth">合同金额：</label>
                <input id="worth" onChange={this.handleWorth}></input>
                <label htmlFor="worth">&ensp;万</label>
            </div>
            <div className="item">
                <label htmlFor="dayNum">计算工期：</label>
                <input id="dayNum" onChange={this.handleDaynum}></input>
                <label htmlFor="dayNum">&ensp;天</label>
            </div>
            <div className="item">
                <label htmlFor="personNum">人员投入：</label>
                <input id="personNum" onChange={this.handlePersonNum}></input>
                <label htmlFor="personNum">&ensp;人</label>
            </div>
            <div className="item">
                <label htmlFor="basScale">难度系数：</label>
                <input id="basScale" onChange={this.handleBaseScale}></input>
                <label htmlFor="basScale">&ensp;&ensp;</label>
            </div>
            <button onClick={this.postNewInfo}>提交</button> 
            <button onClick={this.postNewInfo}>删除</button>
        </div>
        );
    }
};

export default CreatePro;