import {xhr} from './base';
export function  updataUserList(){
        let url='http://qq.kkiqq.cn/api/userlist',
            method='GET',
            data=null;
            xhr(method,url,data)
            .then((res)=>{
                this.setState({
                    userList:res.data
                });
                console.log('baseData请求结果为',res.data);
            });
    };
export function   postUserList(userName){  
        let url="http://qq.kkiqq.cn/api/userlist";
        let method='POST';
        let data={name:userName};
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            console.log('新增成功',res);
            // this.updataUserList();
        })
    };
export function    deleteUserList(id){  
        let url="http://qq.kkiqq.cn/api/userlist/"+id;
        let method='DELETE';
        let data={};
        xhr(method,url,JSON.stringify(data))
        .then((res)=>{
            console.log('删除成功',res);
        });
    }