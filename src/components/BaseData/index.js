import React, { Component } from 'react';
import './index.less';
import {formateNumber} from '../../services/util.js';
class BaseData extends Component{
    constructor(props){
        super(props);
        this.handleBaseData=this.handleBaseData.bind(this);
    }; 
    componentDidMount(){
        this.props.handleBaseData();
    }
    handleBaseData(e,target){
        let baseData={id:this.props.baseData.id,
                        baseWorth:(target==='baseWorth')?e.target.value:this.props.baseData.baseWorth,
                        basePerson:(target==='basePerson')?e.target.value:this.props.baseData.basePerson,
                        baseDays:(target==='baseDays')?e.target.value:this.props.baseData.baseDays};
        baseData.baseUnitWorth=baseData.baseWorth/baseData.baseDays/baseData.basePerson;
        this.props.handleBaseData('PUT',baseData); 
    }
    render(){
        return <fieldset className="baseData">
                <div className="item">
                    <label>总产值:&ensp;$</label>
                    <input type="number" min="0.00000001" step="0.00000001"required ref
                        value={this.props.baseData.baseWorth||0} 
                        onChange={(e)=>this.handleBaseData(e,'baseWorth')} />
                    <label> 万</label>
                </div>
                <div className="item">
                    <label>总人头数: </label> 
                    <input type="number" min='0.00000001' step="0.00000001" required 
                        value={this.props.baseData.basePerson||0} 
                        onChange={(e)=>this.handleBaseData(e,"basePerson")} />
                    <label> 人</label>
                </div>
                <div className="item">
                    <label>总天数:&ensp;&ensp;</label>
                    <input type="number" min="0.00000001" step="0.00000001" required 
                        value={this.props.baseData.baseDays||0} 
                        onChange={(e)=>this.handleBaseData(e,"baseDays")} />
                    <label> 天</label>
                </div>
                <div className="item">
                    <label>单位产值:$&ensp;</label>
                    <strong><em>{this.props.baseData.baseUnitWorth?formateNumber(this.props.baseData.baseUnitWorth,4):0}</em></strong>
                    <label>&ensp;万/人/天</label>
                </div>
            </fieldset>
    }
}
export default BaseData;