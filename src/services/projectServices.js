import {xhr} from './util.js';
export async function updataProjectList(){
  let url="http://qq.kkiqq.cn/api/project";
  let method='GET';
  let data={};
  let res=xhr(method,url,JSON.stringify(data));
  console.log(res.data[0]);
  return res.data[0];
};
export async function postProjectListList(data){
  let url="http://qq.kkiqq.cn/api/project";
  let method='POST';
  // let data=data;
  let res=xhr(method,url,JSON.stringify(data));
  console.log(res.data);
  return;
}
export async function deleteProjectListList(id){
  let url="http://qq.kkiqq.cn/api/project/"+id;
  let method='DELETE';
  let data={};
  let res=xhr(method,url,JSON.stringify(data));
  console.log(res.data);
  return;
}
export async function getProjectItem(id){
  let url="http://qq.kkiqq.cn/api/project"+id;
  let method='GET';
  let data={};
  let res=xhr(method,url,JSON.stringify(data));
  console.log(res.data);
  return res.data;
};
export async function putProjectListItem(id,data){
  let url="http://qq.kkiqq.cn/api/project"+id;
  let method='PUT';
  // let data=data;
  let res=xhr(method,url,JSON.stringify(data));
  console.log(res.data);
  return;
}