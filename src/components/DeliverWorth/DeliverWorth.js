import React, { Component } from 'react';
import {formateNumber} from '../../services/util.js';
import {updataProjectList} from '../../services/projectServices';

export class PersonList extends Component{
    constructor(props){
        super(props);
       
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
                                onClick={(e)=>this.props.deleteUser(item.id)}/>
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
                            onClick={()=>{this.props.addUser(this.refs.personName.value);}}/>
                </div>
                {element}
            </div>
    }    
};
export class PersonListWithWorth extends Component{
    constructor(props){
        super(props);
        this.state={
            totalWorth:{} //人员产值对象
        };
    }
   async componentDidMount(){
    let projectList=await updataProjectList();
        let totalWorth = {};
    projectList.forEach((item)=>{
        let detail=item.detail;
        let worth=item.base_scale*item.worth;
        console.log(worth)
        console.log(detail)
        detail.forEach((item)=>{
            if(!totalWorth[item.name]){
                totalWorth[item.name]=parseFloat(item.value)*worth;

            }else{

                totalWorth[item.name]+=(parseFloat(item.value)*worth)
            }
        })
    })
    
    this.setState({
        totalWorth
    })
    
}
render(){
    let element="";
    let totalWorthKeys=Object.keys(this.state.totalWorth);
    let totalWorth = this.state.totalWorth

    if(totalWorthKeys.length){
        element=totalWorthKeys.map(name=>{
            let value = totalWorth[name];
        return <div className="item" key={name}>
                    <div className="personName">{name}</div>
                    <div className="worth">￥{formateNumber(value,1)}万</div>
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