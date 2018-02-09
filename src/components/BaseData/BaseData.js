import React from 'react';
import './BaseData.less';
import { formateNumber } from '../util';
function BaseDataList(props){
    let baseData=props.baseData,
        handleBaseData=props.handleBaseData,
        putBaseData=props.putBaseData;

    return <fieldset className="baseData">
            <div className="item">
                <label>总产值:&ensp;$</label>
                <input type="number" required 
                      value={baseData.baseWorth} 
                      onChange={(e)=>handleBaseData(e,'baseWorth')} />
                <label> 万</label>
            </div>
            <div className="item">
                <label>总人头数: </label> 
                <input type="number" min='1' required 
                      value={baseData.basePerson} 
                      onChange={(e)=>handleBaseData(e,"basePerson")} />
                <label> 人</label>
            </div>
            <div className="item">
                <label>总天数:&ensp;&ensp;</label>
                <input type="number" min='1'  required 
                      value={baseData.baseDay} 
                      onChange={(e)=>handleBaseData(e,"baseDay")} />
                <label> 天</label>
            </div>
            <div className="item">
                <label>单位产值:$&ensp;</label>
                <strong><em>{formateNumber(baseData.baseUnitWorth,4)}</em></strong>
                <label>&ensp;万/人/天</label>
            </div>
            <button onClick={putBaseData}>提交修改</button>
        </fieldset>
}

export default BaseDataList;