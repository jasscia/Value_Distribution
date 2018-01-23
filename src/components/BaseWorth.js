import React, { Component } from 'react';
import './BaseWorth.css';

function formate(number){
    console.log(number);
    return number.toFixed(4)
}
class BaseWorth extends Component{
    constructor(props){
        super(props);
        this.state={
            totalWorth:1500,
            totalPreson:24,
            totalDay:250,
            baseWorth:0.25
        };

        this.changeTotalWorth=this.changeTotalWorth.bind(this);
        this.changeTotalPreson=this.changeTotalPreson.bind(this);
        this.changeTotalDay=this.changeTotalDay.bind(this);
    };

    changeTotalWorth(e){
        this.setState({
            totalWorth:e.target.value,
            baseWorth:e.target.value/this.state.totalDay/this.state.totalPreson
        })
    }
    
    changeTotalPreson(e){
        this.setState({
            totalPreson:e.target.value,
            baseWorth:this.state.totalWorth/this.state.totalDay/e.target.value
        })
    }
    
    changeTotalDay(e){
        this.setState({
            totalDay:e.target.value,
            baseWorth:this.state.totalWorth/e.target.value/this.state.totalPreson
        })
    }

    render(){

        return (
        <fieldset className="baseWorth">
            <div className="item">
                <label>总产值:&ensp;$</label>
                <input type="number" required value={this.state.totalWorth} onChange={this.changeTotalWorth} />
                <label> 万</label>
            </div>
            <div className="item">
                <label>总人头数: </label> 
                <input type="number" min='1' required value={this.state.totalPreson} onChange={this.changeTotalPreson} />
                <label> 人</label>
            </div>
            <div className="item">
                <label>总天数:&ensp;&ensp;</label>
                <input type="number" min='1'  required value={this.state.totalDay} onChange={this.changeTotalDay} />
                <label> 天</label>
            </div>
            <div className="item">
                <label>单位产值:$&ensp;</label>
                <strong><em>{formate(this.state.baseWorth)}</em></strong>
                <label>&ensp;万</label>
            </div>
            <button>提交修改</button>
        </fieldset>)
    }
}
export default BaseWorth;