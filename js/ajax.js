function ajax(url,typeStr,parm,dataType,callback,setHeader){
    // 第一个是请求的URL地址，第二个是请求的方法,第三个是回调函数,parm是传递过来的参数
    var xhr = null; 
    var data = null;
    var str = null;
    //兼容旧的浏览器 
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }
    else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(typeStr.toUpperCase() == "GET"){
        url +="?"+parm;
    }
    xhr.open(typeStr,url,true);
    if(typeof setHeader == "function"){
        var str = setHeader();
        xhr.setRequestHeader(str.split(",")[0],str.split(",")[1]);
     }
    if(typeStr.toUpperCase() == "POST"){
        data = parm;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlEncoded");
    }
    xhr.send(data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
         if(xhr.status == 200){
            var data = xhr.responseText;
            if(dataType == "json"){
                data = JSON.parse(data);
                callback(data);
            }
            else{
                callback(data);
         }   
        }
    }
}
}