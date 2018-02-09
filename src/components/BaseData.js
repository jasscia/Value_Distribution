import React, { Component } from 'react';
import './BaseData.less';
import { xhr,formateNumber } from './util';

class BaseData extends Component{
    constructor(props){
        super(props);
        this.state={
            baseWorth:1,
            basePerson:1,
            baseDay:1,
            baseUnitWorth:0
        };
        this.putBaseData=this.putBaseData.bind(this);
        this.changebaseWorth=this.changebaseWorth.bind(this);
        this.changebasePerson=this.changebasePerson.bind(this);
        this.changebaseDay=this.changebaseDay.bind(this);
    };

    componentDidMount(){
        
        let url="http://qq.kkiqq.cn/api/baseworth";
        let method='GET';
        let data=null;
        xhr(method,url,data)
        .then((response)=>{
            let baseData=response.data[0];
            this.setState({
                baseWorth:baseData.baseWorth,
                basePerson:baseData.basePerson,
                baseDay:baseData.baseDays,
                baseUnitWorth:baseData.baseUnitWorth
            });
        });
    };

    putBaseData(){
        let url="http://qq.kkiqq.cn/api/baseworth/1";
        let method='PUT';
        let data={
            baseWorth:this.state.baseWorth,
            basePerson:this.state.basePerson,
            baseDay:this.state.baseDay,
            baseUnitWorth:this.state.baseUnitWorth
        };
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{});
    };

    changebaseWorth(e){
        this.setState({
            baseWorth:e.target.value,
            baseUnitWorth:e.target.value/this.state.baseDay/this.state.basePerson
        })
    }
    
    changebasePerson(e){
        this.setState({
            basePerson:e.target.value,
            baseUnitWorth:this.state.baseWorth/this.state.baseDay/e.target.value
        })
    }
    
    changebaseDay(e){
        this.setState({
            baseDay:e.target.value,
            baseUnitWorth:this.state.baseWorth/e.target.value/this.state.basePerson
        })
    }

    render(){

        return (
        <fieldset className="baseData">
            <div className="item">
                <label>总产值:&ensp;$</label>
                <input type="number" required value={this.state.baseWorth} onChange={this.changebaseWorth} />
                <label> 万</label>
            </div>
            <div className="item">
                <label>总人头数: </label> 
                <input type="number" min='1' required value={this.state.basePerson} onChange={this.changebasePerson} />
                <label> 人</label>
            </div>
            <div className="item">
                <label>总天数:&ensp;&ensp;</label>
                <input type="number" min='1'  required value={this.state.baseDay} onChange={this.changebaseDay} />
                <label> 天</label>
            </div>
            <div className="item">
                <label>单位产值:$&ensp;</label>
                <strong><em>{formateNumber(this.state.baseUnitWorth,4)}</em></strong>
                <label>&ensp;万/人/天</label>
            </div>
            <button onClick={this.putBaseData}>提交修改</button>
        </fieldset>)
    }
}

export default BaseData;