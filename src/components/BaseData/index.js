import React, { Component } from 'react';
import BaseDataList from './BaseData';
import {xhr} from '../util'
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
        this.handleBaseData=this.handleBaseData.bind(this);
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
    handleBaseData(e,target){
      let baseWorth=(target==='baseWorth')?e.target.value:this.state.baseWorth,
          basePerson=(target==='basePerson')?e.target.value:this.state.basePerson,
          baseDay=(target==='baseDay')?e.target.value:this.state.baseDay;
      this.setState({
          baseWorth:baseWorth,
          basePerson:basePerson,
          baseDay:baseDay,
          baseUnitWorth:baseWorth/baseDay/basePerson
      });
    }

    render(){

        return <BaseDataList baseData={this.state} 
                            handleBaseData={this.handleBaseData} 
                            putBaseData={this.putBaseData}>
                </BaseDataList>
        
    }
}

export default BaseData;