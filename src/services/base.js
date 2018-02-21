export function xhr(method,url,data){
  return new Promise(
    function(resolve,reject){
      
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
          try{if(xhr.readyState===4 && xhr.status===200){    
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
