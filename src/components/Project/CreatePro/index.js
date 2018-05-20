import React, { Component } from 'react';
import {ProInfo,Detail} from '../Common'
import {postProjectList} from '../../../services/projectServices';

import {updataBaseData} from '../../../services/baseDataServices'
import {updataUserList } from '../../../services/userListServices';

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
        this.handleNewItem=this.handleNewItem.bind(this);
        this.AddProject = this.AddProject.bind(this);
    };
   async componentDidMount(){
        let baseData=await updataBaseData();
        let userList=await updataUserList();
        let detail = userList.map(function(item,index){
            return {
                name:item.q_name,
                value:0,
                rol:''
            }
        })

        this.setState({
            detail:detail,
            baseUnitWorth:baseData.baseUnitWorth
        })
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
       // await this.setState({
       //      person_num:person_num
       //  })
       //  await this.setState({
       //      proUnitWorth:this.state.worth/this.state.day_num/this.state.person_num
       //  })
       //  await this.setState({
       //      base_scale:this.state.baseUnitWorth/this.state.proUnitWorth
       //  })
        let proUnitWorth =this.state.worth/this.state.day_num/person_num;
        let base_scale=this.state.baseUnitWorth/proUnitWorth
        await this.setState({
            person_num,
            proUnitWorth,
            base_scale
        })
       
    }

    async AddProject(){
        //判断 创建页面是由谁打开的
        //如果来自edit则会带着参数activeItem，此时如果更新，调用 更新单个数据条
        //如果来自 createNew 则不会带参数，此时如果更新 调用 projectList 新增       
        // let itemInfo = {
        //     project_name:this.state.project_name,
        //     worth:this.state.worth,
        //     person_num:this.state.person_num,
        //     day_num: this.state.day_num,
        //     base_scale: this.state.base_scale,
        //     detail:this.state.detail
        //};

        let { project_name, worth, person_num, day_num, base_scale, detail } = this.state;
        let itemInfo = { project_name, worth, person_num, day_num, base_scale, detail } 
        await postProjectList(itemInfo);
        this.props.history.goBack();
    }; 
    
    render(){
    return <div className="createInfo" >
                <ProInfo state={this.state} handleNewItem={this.handleNewItem} baseUnitWorth={this.state.baseUnitWorth}/>
                <Detail  state={this.state} handleNewItem={this.handleNewItem} />
                <button onClick={this.AddProject}>提交</button>
            </div>
    }
};
export default CreatePro;