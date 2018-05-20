import React, {Component } from 'react';
import {Route, Link} from 'react-router-dom';
import ProjectList from './ProjectList';
import CreatePro from './CreatePro';
import EditPro from './EditProject';
import './project.less';
import './projectlist.less';
class Project extends Component{
   
    render(){
         let {match} = this.props;
          return <div className="myApp">
                    <Route exact path={`${match.path}`} component={ProjectList}/>
                    <Route exact path={`${match.path}/list`} component={ProjectList}/>
                    <Route exact path={`${match.path}/create`} component={CreatePro}/>
                    <Route  path={`${match.path}/edit/:id`} component={EditPro}/>
               </div>   
        
    }
}
export default Project;