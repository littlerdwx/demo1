// 此JS文件为 良仓所有页面的相同交互行为以及定义的全局变量
//-------------------------全局变量
var webSite = "http://www.wjian.top/shop/";
var classifySite = "良仓-分类.html?cat_id=";
var detailSite = "";
var login = document.querySelector(".login-li a");
var regs = document.querySelector(".reg-li a");
var isLogin = null;
var body =this.document.querySelector("body");
var boxTop = this.document.createElement("div");
boxTop.className = "returnTop";
body.appendChild(boxTop);
window.onmousewheel = function(event){
    if(document.documentElement.scrollTop > 100){
        this.console.log("把节点添加到这里");
        boxTop.style.display  ="block";
    }
    else{
        boxTop.style.display  ="none";
    }
};

boxTop.onclick = function(){
    $("html,body").animate({scrollTop:0},400);
    boxTop.style.display  ="none";
};



//下面是创建头部的商品分类代码
(function () {
    var nodeShop = document.querySelector(".subNav>ul>li.shop")
    var baby = document.createElement("div");
    baby.className = "li-child";
    nodeShop.appendChild(baby);
    //发送ajax请求
    ajax(webSite + "api_cat.php", "get", "", "json", function (result) {
        if (result.code == 0) {
            //创建N个a标签，其中N就是数组的长度
            //给每个a标签设置href
            for (var ahref = 0; ahref < result.data.length; ahref++) {
                var newUrl = document.createElement("a");
                newUrl.textContent = result.data[ahref].cat_name;
                newUrl.href = classifySite + result.data[ahref].cat_id;
                baby.appendChild(newUrl);
            }
        } else {
            console.log(result.message);
        }
    }, "");

})();

//下面是检测用户是否登录，需要从localStorage拿到username和pwd
(
    function () {
        var user = window.localStorage.getItem("username");
        var booleanNum = user == null;
        if (user != null) {
            //用户存在，那么开始渲染nav部分的li，把登录和购物车干掉，然后弄出个人中心
            // 很多逻辑代码在这里写，包括退出部分
            isLogin = true;
            login.style.display = "none";
            regs.style.display = "none";
            $("li.userCenter").show();
            $("li.userCenter>a").text(user);
        } else {
            isLogin = false;
            $("li.userCenter").hide();
            login.style.display = "block";
            regs.style.display = "block";
        }
    }
)()

//页脚小手左右运动
var finger = document.getElementById("liangcangShop");
var finger_move = finger.getElementsByClassName("littleFinger")[0];
var finger_tag = false;
var timer = null;
finger_move.onmouseover = function () {
    if (finger_tag) {
        return;
    }
    finger_tag = true;
    moveStruct(finger_move, {
        "left": -14
    }, 400, "linear", function () {
        moveStruct(this, {
            "left": 0
        }, 300, "linear", function () {
            moveStruct(this, {
                "left": -12
            }, 400, "linear", function () {
                moveStruct(this, {
                    "left": 0
                }, 400, "linear", function () {
                    finger_tag = false;
                });
            });
        });
    });
}

// 微信小图标显示二维码
var footer = document.getElementById("footer");
var footer_tag1 = false;
var footer_tag2 = false;
var mark = 0;
var img_none = footer.getElementsByClassName("wrap_code")[0];
var icons = footer.getElementsByClassName("icon_small");
for (var icon_num = 0; icon_num < icons.length; icon_num++) {
    icons[icon_num].index = icon_num;
    icons[icon_num].onmouseover = enter_dis;
    icons[icon_num].onmouseout = leave_dis;
}

//-------------------------尾部代码
function enter_dis() {
    if (footer_tag1) {
        return;
    };
    if (icons[this.index].className == "wb icon_small") {
        img_none.style.display = "block";
    };
    moveStruct(icons[this.index], {
        "opacity": 1
    }, 10, "linear", function () {
        footer_tag1 = false;
    });
}

function leave_dis() {
    if (footer_tag2) {
        return;
    }
    if (icons[this.index].className == "wb icon_small") {
        img_none.style.display = "none";
    };
    moveStruct(icons[this.index], {
        "opacity": 0.2
    }, 10, "linear", function () {
        footer_tag2 = false;
    });
}


function setUrl() {
    var homepage = document.querySelector("div.l-logo a");
    var cartUrl = document.querySelector("li.subParent a");
    cartUrl.href = "良仓-购物车.html";
    homepage.href = "良仓index-首页.html";
    login.href = "良仓-登录.html";
    regs.href = "良仓-注册.html";
    var home = document.querySelector(".subNav a.home");
    home.href = "良仓index-首页.html";
}

setUrl();



var node_fdj = document.getElementsByClassName("fdj")[0];
var a_fdj = node_fdj.getElementsByTagName("a")[0];
var searchTxt = document.querySelector("div.wrap_fdj input");
var move = node_fdj.getElementsByTagName("div")[0];

a_fdj.onfocus = function () {
    searchTxt.focus();
    if (move.lock) {
        return;
    }
    moveStruct(move, {
        "left": 0,
        "opacity": 1,
        "width": 226
    }, 200, "linear", function () {
    });
}

searchTxt.onkeydown = function(event){
    var event = event || window.event;
    if(event.keyCode==13){
        if(searchTxt.value !=""){
            window.location.href = "良仓-搜索.html?search_text="+searchTxt.value ;
        }
        else{
            return;
        }
    }

}

searchTxt.onblur = function(){
        if (move.lock) {
        return;
    }
    moveStruct(move, {
        "left": 226,
        "width": 0,
    }, 200, "linear", function () {
        move.style.opacity = 0;
    });
}

var cartA = document.querySelector(".subParent a");


cartA.onclick = function () {
    // cartA.href = "";
    // 单击购物车的时候需要先判断是否登录了，如果登录了就跳转到对应的个人购物车页面
    // 如果没有登录就跳转到登录页面
    var name = window.localStorage.getItem("username");
    if (name == null) {
        cartA.href = "良仓-登录.html";
    } else {
        //
    }
};

(function () {
    var logout = document.querySelector("ul.userMenu li.login-out");
    var tempStr = decodeURI(window.location.href);
    var re = new RegExp('[\u4E00-\u9FA5-]+');
    logout.onclick = function () {
        isLogin = false;
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("goods_id");
        if (tempStr.match(re)[0] == "良仓-购物车") {
            window.location.href = "良仓index-首页.html";
        } else {
            window.location.reload();
        }
    }
})()


;
(
    function () {
        //  如果用户登录了，移到nav的购物车要显示至少3件商品，如果超过3件则出现查看更更多
        if (isLogin) {
            if (window.localStorage.getItem("goods_id") == null) {
                return;
            }
            // 如果不为空
            var goods = window.localStorage.getItem("goods_id").split("&");

            var subParent = document.querySelector(".subParent");
            var subchild = subParent.querySelector(".sub-nav1");
            if (goods) {
                //渲染至多三件商品
                //如果有goods_id就把这个隐藏
                subchild.style.display = "none";
                var sub_cart_goods = document.createElement("ul");
                sub_cart_goods.className = "sub_cart"; //创建一个ul标签
                subParent.append(sub_cart_goods);
                var goods_len = goods.length <= 3 ? goods.length : 3;
                // 最多渲染3个
                for (var index = 0; index < goods_len; index++) {
                    ajax(webSite + "api_goods.php", "get", "goods_id=" + goods[index], "json", function (data) {
                        // 有几个数据就动态创建几个li再appenchild到ul中
                        createLi(sub_cart_goods, data)
                    }, "")
                }

                //再创建一个li标签 查看我的购物车
                // 创建一个查看更多的标签
            } else {
                subchild.style.display = "block";
            }
        } else {
            return;
        }
    }
)()



function createLi(node, data) {
    var li = document.createElement("li");
    var str = "";
    var temp = "<div class='left-cart'><img src=<%=goods_thumb%>></div><div class='right-cart'><p class='myCartgoodsName'><%=goods_name%></p><p class='colorful'>颜色：自然色</p><p class='price_num'><span>数量： 1件</span><span>￥<%=price%></span></p></div>"
    var comple = _.template(temp)
    str = comple(data.data[0]);
    node.appendChild(li);
    li.innerHTML = str;
    if (mark == 2) {
       var li = document.createElement("li");
       li.innerHTML = "<a href='良仓-购物车.html'/>查看更多购物车宝贝</a>"
       node.appendChild(li);
       li.className = "lookMycart";
    }
    mark++;
}

;
(function () {
    var btn = document.querySelector("li.subParent a");
    btn.onmouseenter = function () {
        
        document.querySelector("li.subParent ul.sub_cart").style.display = "block";
        var tmp = document.querySelector("li.subParent ul.sub_cart");
        tmp.onmouseenter = function () {
            document.querySelector("li.subParent ul.sub_cart").style.display = "block";
        }
        tmp.onmouseleave = function () {
            document.querySelector("li.subParent ul.sub_cart").style.display = "none";
        }
    }
})()



;(
    function(){
       var len =  document.querySelectorAll("div.subNav>ul>li");
       var header = document.querySelector("#content>div.headerNaive");
        for(var i = 0 ;i<len.length;i++){
            len[i].onmouseenter = function(){
                if(this.className != ""){
                    var temp = document.querySelector(this.localName+'.'+this.className+'>div.li-child')
                    if(temp != null){
                        var pd = this.lastElementChild.offsetHeight;
                        var wd = parseInt(fetchComputedStyle(this.lastElementChild,"offsetWidth"));
                        header.style.height=pd +"px";
                        header.style.borderBottomColor = "#ccc";
                    }
                    else{
                        return;
                    }
                }
                else{
                    return;
                }
            }
            len[i].onmouseleave = function(){
                if(this.className != ""){
                    var temp = document.querySelector(this.localName+'.'+this.className+'>div.li-child')
                    if(temp != null){
                        header.style.height=0+"px";
                        header.style.borderBottomColor = "transparent";
                    }
                    else{
                        return;
                    }
                }
                else{
                    return;
                }
            }
        }
    }
)()


