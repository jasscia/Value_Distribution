import React, { Component } from 'react';
import {ProInfo,Detail} from '../Common';
import {updataBaseData} from '../../../services/baseDataServices'
import { updataUserList } from '../../../services/userListServices';
import {putProjectItem,getProjectItem} from '../../../services/projectServices';

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
        this.activeItemId = this.props.match.params.id;//为组件添加activeItemId 内部属性，提交更新的时候会用到
        var activeItem = await getProjectItem(this.activeItemId);
        let proUnitWorth=activeItem.worth/activeItem.day_num/activeItem.person_num;
        this.setState({
                project_name:activeItem.project_name,
                worth:activeItem.worth,
                person_num:activeItem.person_num,
                day_num:activeItem.day_num,
                base_scale:activeItem.base_scale,
                detail:activeItem.detail,
                proUnitWorth
            })
        
    };
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
        let proUnitWorth =this.state.worth/this.state.day_num/person_num;
        let base_scale=this.state.baseUnitWorth/proUnitWorth
        await this.setState({
            person_num,
            proUnitWorth,
            base_scale
        })
    }
    async updateProInfo(){
        let itemInfo = {
            project_name:this.state.project_name,
            worth:this.state.worth,
            person_num:this.state.person_num,
            day_num: this.state.day_num,
            base_scale: this.state.base_scale,
            detail:this.state.detail
        };
        await putProjectItem(this.activeItemId,itemInfo)
              this.props.history.goBack()
    }; 
    render(){
        let {activeItem} = this.state;
        return <div className="createInfo" >
                <ProInfo state={this.state} handleNewItem={this.handleNewItem} baseUnitWorth={this.state.baseUnitWorth}/>
                <Detail  state={this.state} handleNewItem={this.handleNewItem} />
                <button onClick={()=>this.updateProInfo()}>提交</button>
            </div>
    }
};
export default CreatePro;