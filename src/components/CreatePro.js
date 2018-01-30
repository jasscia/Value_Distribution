import React, { Component } from 'react';
import './CreatePro.less';
import {xhr} from './util.js';

class  CreatePro extends Component{
    constructor(props){
        super(props);
        
        this.state={
            newProjectName:'山西引黄衬砌检测',
            newWorth:10,
            newPresonNum:4,
            newDayNum:3,
            newBaseScale:0.9,
            newDetail:[{username:'张三'}]
        };
        this.postNewInfo=this.postNewInfo.bind(this);
        this.handleInputData=this.handleInputData.bind(this);
    };
    postNewInfo(){
        let url="http://qq.kkiqq.cn/api/project";
        let method='POST';
        let data={
            project_name:this.state.newProjectName,
            worth:this.state.newWorth,
            preson_num:this.state.newPresonNum,
            day_num:this.state.newDayNum,
            base_scale:this.state.newBaseScale,
            detail:this.state.newDetail
        };
        console.log(data);
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{});

    };
    handleInputData(e,handleObj){
        this.setState({
            [handleObj]:e.target.value
        });
    };
    
    render(){
        return(
            <div className="createItem" >
            <div className="item">
                <label htmlFor="projectName">项目名称：</label>
                <input id="projectName" onChange={(e)=>this.handleInputData(e,"newProjectName")}></input>
                <label htmlFor="projectName">&ensp;&ensp;&ensp;</label>
            </div>
            <div className="item">
                <label htmlFor="worth">合同金额：</label>
                <input id="worth" onChange={(e)=>this.handleInputData(e,"newWorth")}></input>
                <label htmlFor="worth">&ensp;万</label>
            </div>
            <div className="item">
                <label htmlFor="dayNum">计算工期：</label>
                <input id="dayNum" onChange={(e)=>this.handleInputData(e,"newDayNum")}></input>
                <label htmlFor="dayNum">&ensp;天</label>
            </div>
            <div className="item">
                <label htmlFor="presonNum">人员投入：</label>
                <input id="presonNum" onChange={(e)=>this.handleInputData(e,"newPresonNum")}></input>
                <label htmlFor="presonNum">&ensp;人</label>
            </div>
            <div className="item">
                <label htmlFor="basScale">难度系数：</label>
                <input id="baseScale" onChange={(e)=>this.handleInputData(e,"newBaseScale")} disabled="disabled"></input>
                <label htmlFor="basScale">&ensp;&ensp;</label>
            </div>
            <button onClick={this.postNewInfo}>提交</button> 
            <button onClick={this.postNewInfo}>删除</button>
        </div>
        );
    }
};

export default CreatePro;