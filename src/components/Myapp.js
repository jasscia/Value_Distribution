import React, { Component } from 'react';
import './Myapp.css';
import BaseData from './BaseData';
import Project from './Project';
import DeliverWorth from './DeliverWorth';

class Myapp extends Component{
    constructor(props){
        super(props);
        this.state={activeBar:"project"};

        this.ToBaseData=this.ToBaseData.bind(this);
        this.ToProject=this.ToProject.bind(this);
        this.ToDeliverWorth=this.ToDeliverWorth.bind(this);
    };
    
    ToBaseData(){
        this.setState({activeBar:"baseData"})
    };
    ToProject(){
        this.setState({activeBar:"project"})
    };
    ToDeliverWorth(){
        this.setState({activeBar:"deliverWorth"})
    };


    render(){
        function Content(props) {
            if (props.activeBar==="baseData") {
              return <BaseData />;
            }
            if (props.activeBar==="project") {
                return <Project />;
            }
            if (props.activeBar==="deliverWorth") {
                return <DeliverWorth />;
            }
          }

        return (<div className="myApp">
            <div className="content">
                <Content activeBar={this.state.activeBar}/>
            </div>
            <nav className="tabBar">
                <div className={this.state.activeBar==='baseData'?'bar active':'bar'} onClick={this.ToBaseData}>基数</div>
                <div className={this.state.activeBar==='project'?'bar active':'bar'} onClick={this.ToProject}>项目信息</div>
                <div className={this.state.activeBar==='deliverWorth'?'bar active':'bar'} onClick={this.ToDeliverWorth}>产值分配</div>                
            </nav>
        </div>)
    }

}
export default Myapp;