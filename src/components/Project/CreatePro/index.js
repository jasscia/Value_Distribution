import React, { Component } from 'react';
import './CreatePro.less';
import {ProInfo,Detail} from './CreatePro.js'
import {updataBaseData} from '../../../services/baseDataServices'
import { updataUserList } from '../../../services/userListServices';

class  CreatePro extends Component{
    constructor(props){
        super(props);       
        this.state={
            project_name:'',
            worth:'',
            person_num:'',
            day_num:'',
            base_scale:'',
            detail:[],

            baseUnitWorth:'',
            proUnitWorth:''
        };
        this.updateProInfo=this.updateProInfo.bind(this);
        this.handleNewItem=this.handleNewItem.bind(this);
    };
   async componentDidMount(){
       let res=await updataBaseData();
       await this.setState({
           baseUnitWorth:res.baseUnitWorth
       })
        if(this.props.activeItem){
        await this.setState({
                project_name:this.props.activeItem.project_name,
                worth:this.props.activeItem.worth,
                person_num:this.props.activeItem.person_num,
                day_num:this.props.activeItem.day_num,
                base_scale:this.props.activeItem.base_scale,
                detail:this.props.activeItem.detail,

                proUnitWorth:this.props.activeItem.worth/this.props.activeItem.day_num/this.props.activeItem.person_num
            })
        }else{
            let res=await updataUserList();
            let detail=[]
            for(let index in res){
                detail[index]={};
                detail[index].name=res[index].q_name;
                detail[index].value='';
                detail[index].rol=''
            }
            console.log('jajakfjfakjf',detail)
            this.setState({
                detail:detail
            })
        }
    };
    //这个函数用来临时存放 各个参数更新
    async handleNewItem(e,target,index,key){
        if(target==='detail'){
            let preDetail=this.state.detail;
            preDetail[index][key]=e.target.value;
            await this.setState({
                detail:preDetail
            })
        }else{
            await this.setState({
                [target]:e.target.value
            })
        }
        let person_num=0;
        this.state.detail.forEach((item)=>{
            if(item.value){person_num++}
        })
       await this.setState({
            person_num:person_num
        })
        await this.setState({
            proUnitWorth:this.state.worth/this.state.day_num/this.state.person_num
        })
        await this.setState({
            base_scale:this.state.baseUnitWorth/this.state.proUnitWorth
        })
    }

    async updateProInfo(){
        //判断 创建页面是由谁打开的
        //如果来自edit则会带着参数activeItem，此时如果更新，调用 更新单个数据条
        //如果来自 createNew 则不会带参数，此时如果更新 调用 projectList 新增       
        let itemInfo = {
            project_name:this.state.project_name,
            worth:this.state.worth,
            person_num:this.state.person_num,
            day_num: this.state.day_num,
            base_scale: this.state.base_scale,
            detail:this.state.detail
        };
        if(this.props.activeItem){
            await this.props.handleProjectItem('PUT',this.props.activeItem.id,itemInfo)
        }else{
            console.log(itemInfo);
            await this.props.handleProjectList('POST',null,itemInfo);
        }
    }; 
    
    render(){
        console.log(this.props)
    return <div className="createInfo" >
                <ProInfo activeItem={this.props.activeItem}
                        state={this.state}
                        handleNewItem={this.handleNewItem} 
                        baseUnitWorth={this.state.baseUnitWorth}/>
                <Detail  activeItem={this.props.activeItem}
                        state={this.state}
                        handleNewItem={this.handleNewItem} />
                <button onClick={()=>{this.updateProInfo();this.props.handleIfShowCreatePage()}}>提交</button>
            </div>
    }
};
export default CreatePro;