import React, { Component } from 'react';
import './CreatePro.less';
import {xhr,formateNumber} from '../../util.js';
// import Detail from './Detail.js'

class  CreatePro extends Component{
    constructor(props){
        super(props);
    //初始化 表单数据    
        this.state={
            newProjectName:Number(''),
            newWorth:Number(''),
            newDayNum:Number(''),
            newDetail:[],

            baseUnitWorth:Number(''),
            ifShowDetail:false
        };
        this.updateProInfo=this.updateProInfo.bind(this);
        this.delItem=this.delItem.bind(this);
        this.cancleCreate=this.cancleCreate.bind(this);
        this.handleInputData=this.handleInputData.bind(this);
        this.handleShowDetial=this.handleShowDetial.bind(this);
        this.handleDetail=this.handleDetail.bind(this);
    };
    componentDidMount(){
        //初始化表单内容
        console.log('mounted');
        //如果从more中接收数据  用接收到的数据初始化化表单
        if(this.props.itemInfo){
            let itemInfo=this.props.itemInfo;
            if(itemInfo){
                console.log('接收了参数');
                this.setState({
                    newProjectName:itemInfo.project_name,
                    newWorth:Number(itemInfo.worth),
                    newDayNum:Number(itemInfo.day_num),
                    newDetail:itemInfo.detail,
                });
            }
        }else{
            //如果从 创建新项目 中接收数据（即没有任何信息），此时采用发送请求的方式获取表单初始化数据
            //由于新建项目 并没有项目信息，只有detail的信息，则发送请求，从userlist中获取所有人员信息
            let url='http://qq.kkiqq.cn/api/userlist',
            method='GET',
            data=null;
            xhr(method,url,data)
            .then((res)=>{
                console.log('没有接收传参 接收的的请求数据是：',res.data);
                let detail=[];
                res.data.map((person,index)=>{
                    detail[index]={};
                    detail[index].name=person.q_name;
                    detail[index].value=0;
                    detail[index].rol=null;
                    return detail[index];
                });
                this.setState({
                    detail:detail
                });
            });
        }
        //获取 产值基数
        let url='http://qq.kkiqq.cn/api/baseworth',
            method='GET',
            data=null;
            xhr(method,url,data)
            .then((res)=>{
                this.setState({
                    baseUnitWorth:res.data[0].baseUnitWorth
                });
            });
    };
    updateProInfo(){
        let url=this.props.data?'http://qq.kkiqq.cn/api/project/'+this.props.data.id:'http://qq.kkiqq.cn/api/project';
        //根据进入本页面的方式 确定是采用put（从 新建项目 进入）还是post（从more进入）方法
        let method=this.props.data?'PUT':'POST';
        let personNum=0;
        this.state.newDetail.forEach(item=>{if(item.value>0){personNum++}});
        let base_scale=0;
        if(this.state.newWorth && this.state.newDayNum && personNum){
            base_scale=this.state.baseUnitWorth/(this.state.newWorth/this.state.newDayNum/personNum);
            base_scale=Number(base_scale);
        }
        let data={
            project_name:this.state.newProjectName,
            worth:this.state.newWorth,
            day_num:this.state.newDayNum,
            base_scale:base_scale,
            detail:this.state.newDetail
        };
        xhr(method,url,JSON.stringify(data))
        .then(res=>{
            this.props.handleCreatePage();
            alert(res);
        });
    };
    
    cancleCreate(){
        this.props.handleCreatePage();
    }
    delItem(){
        if(!this.props.data){return}
        let url='http://qq.kkiqq.cn/api/project/'+this.props.data.id;
        let method='DELETE';
        let data={};
        xhr(method,url,JSON.stringify(data))
        .then(res=>{
            this.props.handleCreatePage();
        })
    }
    handleInputData(e,handleObj){
        this.setState({
            [handleObj]:Number(e.target.value)
        });
    };
    handleShowDetial(e){
        this.setState({
            ifShowDetail:!this.state.ifShowDetail
        })
    };
    handleDetail(e){

    }
    
    render(){
        return(
            <div className="createWapper"> 
                <div className="createBar" onClick={this.handleShowDetial}>
                    <section className="handleProInfo">项目信息</section>
                    <section className="handleDetail">产值分配</section>
                </div>
                <div className="createInfo" >
                    <ProInfo proInfo={this.state} 
                            handleInputData={this.handleInputData} 
                            ifShowDetail ={this.state.ifShowDetail}>
                    </ProInfo>
                    <Detail personList={this.state.newDetail} 
                            ifShowDetail ={this.state.ifShowDetail}>
                    </Detail>
                    <button onClick={this.updateProInfo}>提交</button>            
                    <button onClick={this.delItem}>删除</button>
                </div>
            </div>
        );
    }
};

function ProInfo(props){
    let proInfo=props.proInfo;
    let handleInputData=props.handleInputData;
    let ifShowDetail=props.ifShowDetail;

    let projectName=proInfo.newProjectName;
    let proWorth=proInfo.newWorth;
    let dayNum=proInfo.newDayNum;

    let personNum=0;
    proInfo.newDetail.forEach(item=>{if(item.value>0){personNum++}});

    let proUnitWorth=(proWorth&&dayNum&&personNum)?proWorth/dayNum/personNum:'0';
    let baseUnitWorth=proInfo.baseUnitWorth;
    let baseScale=(baseUnitWorth&&proUnitWorth)?baseUnitWorth/proUnitWorth:'0'
    
    let Element=  
        <div className= {'proInfo '+(ifShowDetail?'hidden':'show')} >  
            <div className="item">
                    <label htmlFor="projectName">项目名称：</label>
                    <input id="projectName" type="text"
                            value={projectName} 
                            onChange={(e)=>handleInputData(e,"newProjectName")}/>
                    <label htmlFor="projectName">&ensp;&ensp;&ensp;</label>
                </div>
                <div className="item">
                    <label htmlFor="worth">合同金额：</label>
                    <input id="worth"  type="number"
                            value={proWorth} 
                            onChange={(e)=>handleInputData(e,"newWorth")}/>
                    <label htmlFor="worth">&ensp;万</label>
                </div>
                <div className="item">
                    <label htmlFor="dayNum">计算工期：</label>
                    <input id="dayNum" type="number"
                            value={proInfo.newDayNum} 
                            onChange={(e)=>handleInputData(e,"newDayNum")}/>
                    <label htmlFor="dayNum">&ensp;天</label>
                </div>
                
                <div className="result">
                    <section>产值基数：
                        <em>{formateNumber(baseUnitWorth,2)}</em>
                        &ensp;万/人/天
                    </section>
                    <section>单位产值：
                        <em>{formateNumber(proUnitWorth,2)}</em>
                        &ensp;万/人/天
                    </section>
                    <section>参与人数：
                        <em>{personNum}</em>
                        &ensp;人
                    </section>
                    <section>难度系数：
                        <em>{formateNumber(baseScale,2)}</em>
                    </section>
                </div>
        </div>
    
    return Element
}
function Detail(props){
    console.log(props.ifShowDetail);
    let personList=props.personList;
    let ifShowDetail=props.ifShowDetail;
    let element=  personList.map(person=>{
        return <div key={person.name} className="list">
                <label htmlFor={person.name}>{person.name}</label>
                <input id={person.name}/>
                <input type="checkbox" />
              </div>
      })
    return  <div  className= {'detail '+(ifShowDetail?'show':'hidden')}>
                {element}
            </div>
}

export default CreatePro;