import React, { Component } from 'react';
export class PersonList extends Component{
    constructor(props){
        super(props);
        this.postUserList=this.postUserList.bind(this)
    }
    postUserList(){
        this.props.postUserList(this.refs.personName.value);
    }
    
    render(){
        let element="";
        if(this.props.userList.length){
            element=this.props.userList.map(item=>{
            return <div className="item" key={item.id}>
                        <div className="personName">{item.q_name}</div>
                        <input type="button"  
                                className="delete" 
                                value="❌" 
                                onClick={(e)=>this.props.deleteUserList(item.id)}/>
                    </div>
            })
        }
        return <div className="personList">
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
    if(userList.length){
        element=userList.map(item=>{
        return <div className="item" key={item.id}>
                    {item.q_name}
                </div>
        })
    }
    return <div className="personList">
            {element}
            <button className="editPersonBtn">Edit</button>
        </div>
}