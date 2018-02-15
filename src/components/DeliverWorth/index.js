import React, { Component } from 'react';
// import {xhr} from '../util.js';
import './DeliverWorth.less';
import {PersonList} from './DeliverWorth';

class DeliverWorth  extends Component{
    constructor(props){
        super(props);
        this.state={
            ifshowpersonList:true,
        }
    }
    handdleEditpersonBtn(e){
        this.state({
            ifshowpersonList:!this.state.ifshowpersonList
        })
    }
    render(){
        console.log('index中',this.props.userList)
        return <div className="deliverWorth">
                if(this.state.ifshowpersonList){
                    <div>
                        <div className="worthList"></div>;
                        <button className="editPersonBtn">Edit</button>
                    </div>
                }else if{
                    <PersonList 
                        userList={this.props.userList}>
                    </PersonList>
                }
            </div>
    }
}

export default DeliverWorth;