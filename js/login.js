var get_time  = document.getElementsByClassName("getCode")[0];
var n =60;
var timer = null;
var tag = false;
var parm = window.location.search.substring(1);
var jumpProduct = false;
var re = new RegExp('[0-9]*$');
var reg = parm.match(re); // 拿到goods_id
console.log(reg[0]);
if(reg[0]!=""){
    jumpProduct = true;
}

// get_time.onclick = function(){
//     console.log(n); 
//     if(tag){
//         return;
//     }
//     changeStyle();
//     timer = setInterval(fun1,1000);
//     tag = true;
// }

// function callback(){
//     get_time.textContent ="重新获取验证码";
//     n= 60;
//     tag = false;
// }


// function changeStyle(){
//     get_time.style.border = "1px solid transparent";
//     get_time.style.background = "skyblue";
//     get_time.style.color =  "#fff";
// };


// function fun1(){
//     n--;
//     if(n == 0){
//         clearInterval(timer);
//         callback();
//         return;
//     }
//     get_time.innerHTML ="剩余(" + n + ")秒";
// }

(function(){
    var jump_index = document.querySelector("div.logo");
    jump_index.onclick = function(){
        window.location.href = "良仓index-首页.html";
    }
})()


$("#login").click(function(event){
   if(event.preventDefault)
   {
    event.preventDefault();
   }
   else{
       event.returnValue = false;
   }
   // 阻止默认事件 以及兼容

   //验证用户名和密码
   var username = $("#phone");
   var pwd = $("#pwd");
   if(username.val() == "" || pwd.val()==""){
       alert("用户名和密码不能为空！");
       return;
   }
   var parm = "status=login&username="+username.val()+"&password="+pwd.val();
   ajax("http://www.wjian.top/shop/api_user.php","post",parm,"json",function(data){
       if(data.code == 0){
           console.log("登录成功！");//跳转到首页并且要写到localStorage
           window.localStorage.setItem("username",username.val());
           window.localStorage.setItem("password",pwd.val());
           if(jumpProduct){
               alert("来自商品");
               window.location.href  ="良仓-商品详情.html?goods_id="+reg[0];
           }else{
            window.location.href = "良仓index-首页.html";
           }
       }
       else{
           console.log("登录失败，用户名或密码错误！");
       }
   },"")
})