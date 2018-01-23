export function xhr(method,url,data,callback){
  
  var xhr=new XMLHttpRequest();
  xhr.onreadystatechange=function(){
      if(xhr.readyState===4){          
          callback(JSON.parse(xhr.responseText));
      }
  }
  xhr.open(method,url,true);
  if(method!=="GET"){
    xhr.setRequestHeader({
      "Content-Type": "application/x-www-form-urlencoded"
    });
  }
  xhr.send(data);
};


export function formateNumber(number,fixed){
  return number.toFixed(fixed)
}