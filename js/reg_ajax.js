//用户名要求
//用户名（3-20位字母数字下滑线）
//密码密码（最小长度为6位,最长20）
var username = $("#_phone");
var password = $("#pwd")
var rePassword =$("#check");
var btn = $("button");
var check =document.querySelector("input.radio");
var userTag;
var pwdTag;
var jumpTag = false;

username.blur(function(){
    var val = username.val();
    var tip = $("span.tips1");
    var reg = /(?=.*[A-Za-z])(?=.*[\d])(?=.*_)/g;
    if(val.length >3 && val.length < 20){
        if(reg.test(val)){
            userTag = true;
            tip.css("backgroundImage","url('./icon/正确.png')");
        }
        else{
            userTag = false;
            tip.css("backgroundImage","url('./icon/错误.png')");
            return;
        }
    }
    else{
        userTag = false;
        tip.css("backgroundImage","url('./icon/错误.png')");
        return;
    }
})

password.keyup(function(){
    var val = password.val();
    var regNum = /^[0-9]+$/g;
    var regWord = /^[a-zA-Z]+$/g;
    var hybrid = /(?=.*[A-Za-z])(?=.*[\d])/g;
    if(val.length < 6 || val.length > 20){
        pwdTag = false;
        $("span.feeble").hide(0);
        $("span.medium").hide(0);
        $("span.strong").hide(0);
        return;
    }
    else{
        pwdTag = true;
        if(regNum.test(val)){
            $("span.feeble").css("display","inline-block");
        }
        else if(regWord.test(val)){
            $("span.feeble").css("display","inline-block");
            $("span.medium").css("display","inline-block");
            $("span.strong").css("display","none");
        }
        else if(hybrid.test(val)){
            $("span.feeble").css("display","inline-block");
            $("span.medium").css("display","inline-block");
            $("span.strong").css("display","inline-block");
        }
    }
})




btn.click(function(event){
   
    event.preventDefault();//阻止按钮默认事件
    $("div#Mask").show();

    var valid1 = rePassword.val() === password.val();
    var valid2 = check.checked;
    console.log(userTag,pwdTag,valid2);
    if(rePassword.val() === password.val() && check.checked && userTag && pwdTag && valid2){
        $("div.content p ").text("恭喜您注册成功！即将为您跳转到登录页面.....");
        //跳到登录页面
        jumpTag = true;
    }
    else if(rePassword.val()=="" ||  password.val() =="" ||username.val()=="" )
    {
        $("div.content p ").text("用户名或密码不能为空!");
    }
    else{
        if(!valid1){
            $("div.content p ").text("两次输入的密码不一致!")
        }
        else if(!valid2){
            $("div.content p ").text("没有勾选协议")
        }
        else if(userTag == false || pwdTag == false){
            $("div.content p ").text("用户名和密码格式错误!")
        }
    }
}
)

$("button.ok").click(function(){
    $("div#Mask").hide();
    //发送ajax请求写入到服务器端

    if(jumpTag){
        var parm  = "status=register&username="+username.val()+"&password="+password.val();
        console.log(parm);
        ajax("http://www.wjian.top/shop/api_user.php/","post",parm,"json",
        function(data){
            console.log(data);
            if(data.code == 0){
                window.location.href = "良仓-登录.html";
            }
            else{
                console.log(data.messsage);
            }
        },"")
        
    }
})


var x = document.querySelector("form a.title");
x.href = "良仓index-首页.html";