import React, { Component } from 'react';
import {formateNumber} from '../../services/util.js';
import {updataProjectList} from '../../services/projectServices';
export class PersonList extends Component{
    constructor(props){
        super(props);
        this.postUserList=this.postUserList.bind(this);
    }
    postUserList(){
        this.props.handleUserList('POST',null,this.refs.personName.value);
    }
    render(){
        let element="";
        if(this.props.userList&&this.props.userList.length){
            element=this.props.userList.map(item=>{
            return <div className="item" key={item.id}>
                        <div className="personName">{item.q_name}</div>
                        <input type="button"  
                                className="delete" 
                                value="❌" 
                                onClick={(e)=>this.props.handleUserList('DELETE',item.id)}/>
                    </div>
            })
        }
        return <div className="personList">
                <button className="editPersonBtn">退出</button>
                <div className="newItem">
                    <input className="personName" placeholder="新增人员" ref="personName"/>
                    <input type="button"  
                            className="add" 
                            value="✅"
                            onClick={this.postUserList}/>
                </div>
                {element}
            </div>
    }    
};
export class PersonListWithWorth extends Component{
    constructor(props){
        super(props);
        this.totalWorth=[];
    }
   async componentDidMount(){
    let projectList=await updataProjectList();
    projectList.foreach((item)=>{
        let detail=item.detail;
        let worth=item.base_scale*item.worth;
        detail.foreach((item)=>{
            if(this.totalWorth[item.q_name]){
                this.totalWorth[item.q_name]=item.value*worth;
            }else{
                this.totalWorth[item.q_name]+=(item.value*worth)
            }
        })
    })
    console.log(this.totalWorth)
}
    render(){
    // let userList=props.userList;
    let element="";
    if(this.totalWorth&&this.totalWorthlength){
        element=this.totalWorth.map(item=>{
        return <div className="item" key={item.id}>
                    <div className="personName">{item.q_name}</div>
                    <div className="worth">￥{formateNumber(item.value,1)}万</div>
                    <input type="button"
                            className="more" 
                            value=">" 
                            // onClick={(e)=>this.props.showDetail}
                            />
                </div>
        })
    }
    return <div className="personListWithWorth">
            <button className="editPersonBtn">Edit</button>
            {element}
        </div>
    }
}