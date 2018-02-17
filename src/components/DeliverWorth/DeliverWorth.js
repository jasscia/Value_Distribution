import React, { Component } from 'react';
import {formateNumber} from '../../services/util.js'
export class PersonList extends Component{
    constructor(props){
        super(props);
        this.postUserList=this.postUserList.bind(this)
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
export function PersonListWithWorth(props){
    let userList=props.userList;
    let element="";
    if(userList&&userList.length){
        element=userList.map(item=>{
        return <div className="item" key={item.id}>
                    <div className="personName">{item.q_name}</div>
                    <div className="worth">￥{formateNumber(12,1)}万</div>
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