import React, { Component } from 'react';
import './index.less';
import {PersonList,PersonListWithWorth} from './DeliverWorth';
import {updataUserList,postUserList,deleteUserList} from '../../services/userListServices';

class DeliverWorth  extends Component{
    constructor(props){
        super(props);
        this.state={
            ifshowpersonList:true,
            userList:[]
        };
        this.handleEditpersonBtn=this.handleEditpersonBtn.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount(){
        this.getUserList()
    }
    async getUserList(){
        let userList = await updataUserList();
        this.setState({
            userList
        })
    }
    async addUser(data){
        await  postUserList(data);
        this.getUserList();

    }
    async deleteUser(id){
         await  deleteUserList(id);
         this.getUserList();
    }
   
    handleEditpersonBtn(e){
        if(e.target.tagName==='BUTTON'){
            this.setState({
                ifshowpersonList:!this.state.ifshowpersonList
            })
        }
    }
    render(){
        return <div className="deliverWorth" onClick={this.handleEditpersonBtn}>
                {this.state.ifshowpersonList?
                    <PersonListWithWorth 
                        userList={this.state.userList}>
                    </PersonListWithWorth>
                    :<PersonList 
                        userList={this.state.userList}
                        addUser={this.addUser}
                        deleteUser={this.deleteUser}
                        >
                    </PersonList>
                }
            </div>
    }
}

export default DeliverWorth;