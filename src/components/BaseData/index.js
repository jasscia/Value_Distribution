import React, { Component } from 'react';
import './index.less';
import {formateNumber} from '../../services/util.js';
import {updataBaseData,putBaseData} from '../../services/baseDataServices';
class BaseData extends Component{
    constructor(props){
        super(props);
        this.state={
            baseData:{}
        };
        this.handleBaseData=this.handleBaseData.bind(this);
        this.getBaseData = this.getBaseData.bind(this);
    }; 
    componentDidMount(){
        this.getBaseData();
    }
    async updateBaseData(data){
        await putBaseData(data)
        this.getBaseData();
    }
    async getBaseData(){
        let data = await updataBaseData();
        this.setState({
            baseData:data
        })
    }
    handleBaseData(e,target){

        let baseData={id:this.state.baseData.id,
                        baseWorth:(target==='baseWorth')?e.target.value:this.state.baseData.baseWorth,
                        basePerson:(target==='basePerson')?e.target.value:this.state.baseData.basePerson,
                        baseDays:(target==='baseDays')?e.target.value:this.state.baseData.baseDays};
        baseData.baseUnitWorth=baseData.baseWorth/baseData.baseDays/baseData.basePerson;
        this.updateBaseData(baseData); 
    }
    render(){
        let baseData = this.state.baseData;
        return <fieldset className="baseData">
                <div className="item">
                    <label>总产值:&ensp;$</label>
                    <input type="number" min="0.00000001" step="0.00000001"required ref
                        value={baseData.baseWorth||0} 
                        onChange={(e)=>this.handleBaseData(e,'baseWorth')} />
                    <label> 万</label>
                </div>
                <div className="item">
                    <label>总人头数: </label> 
                    <input type="number" min='0.00000001' step="0.00000001" required 
                        value={baseData.basePerson||0} 
                        onChange={(e)=>this.handleBaseData(e,"basePerson")} />
                    <label> 人</label>
                </div>
                <div className="item">
                    <label>总天数:&ensp;&ensp;</label>
                    <input type="number" min="0.00000001" step="0.00000001" required 
                        value={baseData.baseDays||0} 
                        onChange={(e)=>this.handleBaseData(e,"baseDays")} />
                    <label> 天</label>
                </div>
                <div className="item">
                    <label>单位产值:$&ensp;</label>
                    <strong><em>{this.state.baseData.baseUnitWorth?formateNumber(this.state.baseData.baseUnitWorth,4):0}</em></strong>
                    <label>&ensp;万/人/天</label>
                </div>
            </fieldset>
    }
}
export default BaseData;