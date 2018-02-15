import React, { Component } from 'react';
import './BaseData.less';
import {formateNumber,throttle} from '../util'
class BaseData extends Component{
    constructor(props){
        super(props);
        this.handleBaseData=this.handleBaseData.bind(this);
    }; 
    handleBaseData(e,target){
        let baseData={id:this.props.baseData.id,
                        baseWorth:(target==='baseWorth')?e.target.value:this.props.baseData.baseWorth,
                        basePerson:(target==='basePerson')?e.target.value:this.props.baseData.basePerson,
                        baseDays:(target==='baseDays')?e.target.value:this.props.baseData.baseDays};
        baseData.baseUnitWorth=baseData.baseWorth/baseData.baseDays/baseData.basePerson;
        this.props.handleBaseData(baseData); 
        this.props.putBaseData(baseData); //这里想改写成节流函数 应该如何操作呢
    }
    render(){
        return <fieldset className="baseData">
                <div className="item">
                    <label>总产值:&ensp;$</label>
                    <input type="number" required ref
                        value={this.props.baseData.baseWorth} 
                        onChange={(e)=>this.handleBaseData(e,'baseWorth')} />
                    <label> 万</label>
                </div>
                <div className="item">
                    <label>总人头数: </label> 
                    <input type="number" min='1' required 
                        value={this.props.baseData.basePerson} 
                        onChange={(e)=>this.handleBaseData(e,"basePerson")} />
                    <label> 人</label>
                </div>
                <div className="item">
                    <label>总天数:&ensp;&ensp;</label>
                    <input type="number" min='1'  required 
                        value={this.props.baseData.baseDays} 
                        onChange={(e)=>this.handleBaseData(e,"baseDays")} />
                    <label> 天</label>
                </div>
                <div className="item">
                    <label>单位产值:$&ensp;</label>
                    <strong><em>{formateNumber(this.props.baseData.baseUnitWorth,4)}</em></strong>
                    <label>&ensp;万/人/天</label>
                </div>
                {/* <button onClick={()=>this.props.putBaseData()}>提交修改</button> */}
            </fieldset>
    }
}

export default BaseData;