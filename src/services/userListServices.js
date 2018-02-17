import {xhr} from "./util.js";
export async function updataUserList(){
  let url='http://qq.kkiqq.cn/api/userlist',
      method='GET',
      data=null;
      let res= await xhr(method,url,data);
      console.log('请求成功 userList是:',res.data);
      return res.data;
};
export async function postUserList(userName){  
  let url="http://qq.kkiqq.cn/api/userlist";
  let method='POST';
  let data={name:userName};
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('新增成功',res);
  return;
};
export async function deleteUserList(id){
  let url="http://qq.kkiqq.cn/api/userlist/"+id;
  let method='DELETE';
  let data={};
  let res=await xhr(method,url,JSON.stringify(data));
    console.log('删除成功',res);
    return;
}