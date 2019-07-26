//-----------------------这是弹出对话框的JS代码
function popOutDialogOne(message,callback){
    var body =document.querySelector("body");
    var mask = document.createElement("div");
    body.appendChild(mask);
    mask.id = "mask";
    mask.innerHTML = "<div id='dialog'><div class='dialogHead'></div><div class='dialogContent'><p></p><button class='ok'>确认</button><button class='cancel'>取消</button></div></div>"
    mask.querySelector("p").textContent = message;
    mask.onclick = function(){
        if(event.target.className == "ok"){
            mask.style.display = "none";
            callback(true);
        }
        else if(event.target.className == "cancel"){
            mask.style.display = "none";
            callback(false);
        }
    }
}


function popOutDialogTwo(message){
    var body =document.querySelector("body");
    var mask = document.createElement("div");
    body.appendChild(mask);
    mask.id = "mask";
    mask.innerHTML = "<div id='dialog'><div class='dialogHead'></div><div class='dialogContent'><p></p><button class='ok'>确认</button></div></div>"
    mask.querySelector("p").textContent = message;
    mask.querySelector("button").style.left ="186px";
    mask.onclick = function(){
        if(event.target.className == "ok"){
            mask.style.display = "none";
        }
    }
}



