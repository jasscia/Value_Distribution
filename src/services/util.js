export function xhr(method,url,data){
  return new Promise(
    function(resolve,reject){      
      let xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
          try{
            if(xhr.readyState===4 && xhr.status===200){    
              resolve(JSON.parse(xhr.responseText));
          }
        }catch(error){console.log(error)}
      }
      xhr.open(method,url,true);
      if(method!=="GET"){
        xhr.setRequestHeader(
          "Content-Type","application/json"
        );
      }
      xhr.send(data);   
  })
};

export function formateNumber(number,fixed){
  return number.toFixed(fixed)
}
export function throttle(handleFn,delay){
  console.log('进入 节流 函数');
  var timer=null;
  return function(){
    console.log('进入 回调函数，参数是：',arguments)
    var context=this;
    var args=arguments;
    clearTimeout(timer);
    timer=setTimeout(function(){
      handleFn.apply(context,args);
    },delay)
  }
}