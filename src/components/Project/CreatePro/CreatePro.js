import React,{Component} from 'react';
import { formateNumber } from '../../../services/util.js'

export class ProInfo extends Component{
    render(){ 
        console.log('state是',this.props.state)       
    return <div className={'proInfo'} >
                <div className="item">
                    <label htmlFor="projectName">项目名称：</label>
                    <input id="projectName" type="text" ref="project_name"
                        value={this.props.state.project_name}
                        onChange={(e) => this.props.handleNewItem(e,"project_name")} />
                    <label htmlFor="projectName">&ensp;&ensp;&ensp;</label>
                </div>
                <div className="item">
                    <label htmlFor="worth">合同金额：</label>
                    <input id="worth" type="number" ref="worth"
                        value={this.props.state.worth}
                        onChange={(e) => this.props.handleNewItem(e, "worth")} />
                    <label htmlFor="worth">&ensp;万</label>
                </div>
                <div className="item">
                    <label htmlFor="dayNum">计算工期：</label>
                    <input id="dayNum" type="number" ref="day_num"
                        value={this.props.state.day_num}
                        onChange={(e) => this.props.handleNewItem(e, "day_num")} />
                    <label htmlFor="dayNum">&ensp;天</label>
                </div>
    
                <div className="result">
                    <section>产值基数：
                          <em>{formateNumber(this.props.state.baseUnitWorth || 1, 2)}</em>
                        &ensp;万/人/天
                      </section>
                    <section>单位产值：
                          <em>{formateNumber(this.props.state.proUnitWorth || 1, 2)}</em>
                        &ensp;万/人/天
                      </section>
                    <section>参与人数：
                          <em  ref="person_num">{this.props.state.person_num}</em>
                        &ensp;人
                      </section>
                    <section>难度系数：
                          <em  ref="base_scale">{formateNumber(this.props.state.base_scale || 1, 2)}</em>
                    </section>
                </div>
            </div>
    }
}


export class Detail extends Component{
    render(){
        let element = this.props.state.detail.map(person => {
            console.log(this.props.state.detail.indexOf(person));
            return <div key={this.props.state.detail.indexOf(person.name)} className="list">
                <label >{person.name}</label>
                <input value={person.value} 
                        onChange={(e)=>this.props.handleNewItem(e,'detail',this.props.state.detail.indexOf(person),'value')}/>
                <input type="radio" name="leader" 
                        checked={person.rol?true:false}  
                        onChange={(e)=>this.props.handleNewItem(e,'detail',this.props.state.detail.indexOf(person),'rol')}/>
            </div>
        })
        return <div className='detail' ref="detail">
            {element}
        </div>
    }
}