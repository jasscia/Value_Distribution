export function xhr(method,url,data){
  return new Promise(
    function(resolve,reject){
      
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
          if(xhr.readyState===4){
            // console.log(data);      
              resolve(JSON.parse(xhr.responseText));
          }
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