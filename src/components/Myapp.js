import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './Myapp.less';
import BaseData from './BaseData';
import Project from './Project';
import DeliverWorth from './DeliverWorth';
class Myapp extends Component{
    constructor(){
        super();
        this.state={
            activeBar:"baseData"
        }
        this.changeActiveBar=this.changeActiveBar.bind(this)
    }
    changeActiveBar(target){
        this.setState({
            activeBar:target
        })
    }
    render(){
        return <Router>
            <div className="myApp">
                <nav className="tabBar">
                    <Link to="/" 
                        className={this.state.activeBar==="baseData"?"bar":"bar active"} 
                        onClick={()=>this.changeActiveBar("baseData")}>产值基数</Link>
                    <Link to="/project" 
                        className={this.state.activeBar==="project"?"bar":"bar active"} 
                        onClick={()=>this.changeActiveBar("project")}>项目信息</Link>
                    <Link to="/deliverWorth"  
                        className={this.state.activeBar==="deliverWorth"?"bar":"bar active"} 
                        onClick={()=>this.changeActiveBar("deliverWorth")}>人员产值</Link>                
                </nav>
                <Route exact path="/" component={BaseData}/>
                <Route  path="/project" component={Project}/>
                <Route  path="/deliverWorth" component={DeliverWorth}/>
            </div>
        </Router>
    }
}
export default Myapp;