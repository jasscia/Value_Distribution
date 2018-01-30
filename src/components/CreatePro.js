import React, { Component } from 'react';
import './CreatePro.less';
import {xhr,formateNumber} from './util.js';

class  CreatePro extends Component{
    constructor(props){
        super(props);
        
        this.state={
            newProjectName:'山西引黄衬砌检测',
            newWorth:12,
            newPersonNum:4,
            newDayNum:3,
            newDetail:[{username:'张三'}],

            baseUnitWorth:2.5
        };
        this.postNewInfo=this.postNewInfo.bind(this);
        this.delItem=this.delItem.bind(this);
        this.cancleCreate=this.cancleCreate.bind(this);
        this.handleInputData=this.handleInputData.bind(this);
    };
    componentDidMount(){
        //初始化表单内容
        if(this.props.data){
            let itemInfo=this.props.data;
            this.setState({
                newProjectName:itemInfo.project_name,
                newWorth:itemInfo.worth,
                newPersonNum:itemInfo.person_num,
                newDayNum:itemInfo.day_num,
                newDetail:itemInfo.detail,
    
                baseUnitWorth:2.5
            });
        }
        //获取 产值基数
        let url="http://qq.kkiqq.cn/api/baseworth",
            method="GET",
            data=null;
            xhr(method,url,data)
            .then((res)=>{
                this.setState({
                    baseUnitWorth:res.data[0].baseUnitWorth
                });
            });
    };
    postNewInfo(){
        let url="http://qq.kkiqq.cn/api/project";
        let method='POST';
        let data={
            project_name:this.state.newProjectName,
            worth:this.state.newWorth,
            person_num:this.state.newPersonNum,
            day_num:this.state.newDayNum,
            base_scale:this.state.baseUnitWorth/(this.state.newWorth/this.state.newDayNum/this.state.newPersonNum),
            detail:this.state.newDetail
        };
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            this.props.handleCreatePage();
        });
    };
    cancleCreate(){
        this.props.handleCreatePage();
    }
    delItem(){
        this.props.handleCreatePage();
    }
    handleInputData(e,handleObj){
        console.log(e.target.value);
        this.setState({
            [handleObj]:e.target.value
        });
    };
    
    render(){
        return(
            <div className="createItem" >
            <div className="cancle" onClick={this.cancleCreate}>×</div>
            <div className="item">
                <label htmlFor="projectName">项目名称：</label>
                <input id="projectName" type="text"
                        value={this.state.newProjectName} 
                        onChange={(e)=>this.handleInputData(e,"newProjectName")}/>
                <label htmlFor="projectName">&ensp;&ensp;&ensp;</label>
            </div>
            <div className="item">
                <label htmlFor="worth">合同金额：</label>
                <input id="worth"  type="number"
                        value={this.state.newWorth} 
                        onChange={(e)=>this.handleInputData(e,"newWorth")}/>
                <label htmlFor="worth">&ensp;万</label>
            </div>
            <div className="item">
                <label htmlFor="dayNum">计算工期：</label>
                <input id="dayNum" type="number"
                        value={this.state.newDayNum} 
                        onChange={(e)=>this.handleInputData(e,"newDayNum")}/>
                <label htmlFor="dayNum">&ensp;天</label>
            </div>
            <div className="item">
                <label htmlFor="personNum">人员投入：</label>
                <input id="personNum"  type="number"
                        value={this.state.newPersonNum} 
                        onChange={(e)=>this.handleInputData(e,"newPersonNum")}/>
                <label htmlFor="personNum">&ensp;人</label>
            </div>
            <div className="result">
                <section>产值基数：
                    <em>{formateNumber(this.state.baseUnitWorth,2)}</em>
                </section>
                <section>单位产值：
                    <em>{formateNumber(this.state.newWorth/this.state.newDayNum/this.state.newPersonNum,2)}</em>
                </section>
                <section>难度系数：
                    <em>{formateNumber(this.state.baseUnitWorth/(this.state.newWorth/this.state.newDayNum/this.state.newPersonNum),2)}</em>
                </section>
            </div>
            <button onClick={this.postNewInfo}>提交</button>            
            <button onClick={this.delItem}>删除</button>
        </div>
        );
    }
};

export default CreatePro;