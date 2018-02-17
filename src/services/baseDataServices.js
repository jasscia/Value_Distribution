import {xhr} from "./util.js";

export async function updataBaseData(){
    let url='http://qq.kkiqq.cn/api/baseworth';
    let method='GET';
    let data=null;
    let res=await xhr(method,url,data);
    console.log('请求成功，baseData是：',res.data[0]);
    return res.data[0];
  }
  export async function putBaseData(baseData){   
    let url="http://qq.kkiqq.cn/api/baseworth/1";
    let method='PUT';
    let data=baseData;
    let res=await xhr(method,url,JSON.stringify(data));
    console.log('新增成功',res);
};