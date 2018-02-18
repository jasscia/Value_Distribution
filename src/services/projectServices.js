import {xhr} from './util.js';
export async function updataProjectList(){
  let url="http://qq.kkiqq.cn/api/project";
  let method='GET';
  let data={};
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('请求成功，projectList是',res.data);
  return res.data;
};
export async function postProjectList(data){
  let url="http://qq.kkiqq.cn/api/project";
  let method='POST';
  // let data=data;
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('更新成功',res.data);
  return;
}
export async function deleteProjectList(id){
  let url="http://qq.kkiqq.cn/api/project/"+id;
  let method='DELETE';
  let data={};
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('删除成功',res.data);
  return;
}
export async function getProjectItem(id){
  let url="http://qq.kkiqq.cn/api/project/"+id;
  let method='GET';
  let data={};
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('请求成功，projectItem是',res.data);
  return res.data;
};
export async function putProjectItem(id,data){
  let url="http://qq.kkiqq.cn/api/project/"+id;
  let method='PUT';
  // let data=data;
  let res=await xhr(method,url,JSON.stringify(data));
  console.log('新增成功',res.data);
  return;
}