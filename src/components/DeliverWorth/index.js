import React, { Component } from 'react';
import './index.less';
import {PersonList,PersonListWithWorth} from './DeliverWorth';

class DeliverWorth  extends Component{
    constructor(props){
        super(props);
        this.state={
            ifshowpersonList:true,
        };
        this.handdleEditpersonBtn=this.handdleEditpersonBtn.bind(this);
    }
    handdleEditpersonBtn(e){
        console.log(e.target.tagName);
        if(e.target.tagName==='BUTTON'){
            this.setState({
                ifshowpersonList:!this.state.ifshowpersonList
            })
        }
    }
    render(){
        console.log('index中',this.props.userList)
        return <div className="deliverWorth" onClick={this.handdleEditpersonBtn}>
                {this.state.ifshowpersonList?
                    <PersonListWithWorth 
                        userList={this.props.userList}>
                    </PersonListWithWorth>
                    :<PersonList 
                        userList={this.props.userList}
                        handleUserList={this.props.handleUserList}
                        >
                    </PersonList>
                }
            </div>
    }
}

export default DeliverWorth;