var pop = null;  // // 创建一个存放商品分类的容器变量var flag = null;
var tag = true;
var isJump = null;
var parm = window.location.search.substring(1);
var re = new RegExp('(^|&)'+ "search_text" +'=([^&]*)(&|$)');
var reg = parm.match(re)[2];
var parent = document.querySelector(".wrapper-content");
var pageSize  = 12;
var page = 1;


(
    function(){
        pop = document.createElement("div");
        pop.className = 'popular';
        parent.appendChild(pop);
        flag = true;//先创建好父节点再调用ajax请求数据
    }
)()


function getPage(page){
    ajax(webSite+"api_goods.php","get",parm+'&page='+page+'&pagesize='+pageSize,"json",function(result){  
        console.log(result);
        if(flag == true){
            if(result.code == 0){
               newTag(result,pageSize);
               if(tag && result.data.length > 12){
                paging();}//只让它执行一次}
               }
            else{
                pop.parentNode.removeChild(pop);
                addTips();
            }
        }
        else{return;}
    },"");
}

getPage(page);   


function newTag(data,tagNum){
    var i = 0;
    var k = i+1;
    for(;i<tagNum;i++){
        var oDiv = document.createElement("div");
        pop.appendChild(oDiv);
        if( k == i){
            oDiv.className = "center";
            k+=3;
        }
        for(var j = 0;j<3;j++){
            var href = document.createElement("a");
            oDiv.appendChild(href);
            if( j==0){
                href.className = "pic";
                href.href = "良仓-商品详情.html?goods_id="+data.data[i]["goods_id"];
                var img = document.createElement("img");
                img.src = data.data[i]["goods_thumb"];
                href.appendChild(img);
                var masking = document.createElement("div");
                masking.className = "masking";
                href.appendChild(masking);
                addDiv(masking,data,i);
            }
            else if(j==1){
                href.className = "brand";
                href.textContent = data.data[i]["goods_name"];
            }
            else{
                href.className = "favor";
                href.textContent = data.data[i]["star_number"];
            }
        }
    }
}

function addDiv(node,data,index){
    var  div1 = document.createElement("div");
    node.appendChild(div1);
    div1.className = "price";
    div1.textContent = "￥"+data.data[index]["price"];
    var div2 = document.createElement("div");
    div2.className = "items";
    node.appendChild(div2);
    var p = document.createElement("p");
    p.textContent = data.data[index]["goods_desc"];
    div2.appendChild(p);
}

function addTips(){
   var text =  document.createElement("p");
   text.className = "search_tips";
   text.textContent = "暂时没有找到 '"+decodeURI(reg)+"' 关键词下的分类"
   parent.appendChild(text);
}


function paging(){
    tag = false;
    var wrap = document.createElement("div");
    wrap.className = "wrap-paging";
    parent.appendChild(wrap);
    var box = document.createElement("div");
    box.className = "paging-box";
    wrap.appendChild(box);
    $(".paging-box").pagination({
        jump:true,
        current:1,
        coping:false,
        mode:"fixed",
        pageCount:8,
        count:7,
        jumpBtn :"",
        nextContent:"",
        prevContent:"",
        callback:function(api){
            var Max = api.getPageCount();
            fun1(Max);
            if(api.getCurrent() == Max){
                $(".next").css("background","none")
            }
            else{
                $(".next").css("background","url('../良仓.生活美学平台_files/icon.png') -23px -599px no-repeat");
            }
            if(api.getCurrent()!=1){
                $(".prev").css("background","url('../良仓.生活美学平台_files/icon.png') -23px -580px no-repeat");
            }
            isJump = true;
            getNewage(api.getCurrent());
        }
    }
    );   
}


function getNewage(page){
    if(isJump){
        var divArr = document.querySelectorAll(".popular>div");
        for(var rd = 0;rd<divArr.length;rd++){
            divArr[rd].parentNode.removeChild(divArr[rd]);
        }
        isJump = false;
    }
    if(isJump == false){
        ajax(webSite+"api_goods.php","get",parm+'&page='+page+'&pagesize='+pageSize,"json",function(result){  
            if(flag == true){
                if(result.code == 0){
                   newTag(result,pageSize);
                   isJump = true;
                   window.scrollTo(0,0);
                   if(tag){
                    paging();}//只让它执行一次}
                   }
                else{
                    pop.parentNode.removeChild(pop);
                    addTips();
                }
            }
            else{return;}
            //业务逻辑
        },"");
    }
}

function fun1(max){
    var a = document.querySelectorAll(".jump-btn")[0];
        a.onclick = function(){
            var value = document.querySelector(".jump-ipt").value;
            if(value!=""){
                    getNewage(max);
            } 
    }
}