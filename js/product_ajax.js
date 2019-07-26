var flag = null;
var tag = true;
var pop = null; //
var parm = window.location.search.substring(1);
var re = new RegExp('[0-9]*$');
var reg = parm.match(re); // 拿到goods_id
var parent = document.querySelector(".wrapper-content");

(
    function () {
        //跳转页面后拿到goods_ids发送ajax请求api，拿到该商品对应的描述信息和图片填充到容器中
        ajax(webSite + "api_goods.php", "get", "goods_id=" + reg[0], "json", function (data) {
            //需要拿到的数据 code 、goods_desc goods_name goods_thumb price star_number 根据cat_id拿到cat_name
            building(data);
            get_small(data.data[0].cat_id);
        }, "")
    }
)()


//渲染到页面
function building(data) {
    var bannerImg = parent.querySelector(".top-run-pic img");
    var oBox = parent.querySelector(".top-run-pic");
    var fdjImg = parent.querySelector("div.left-top-item div.fdj_banner img");
    var fdj =  parent.querySelector("div.left-top-item div.fdj_banner");
    var favors = parent.querySelector(".right-list .favor");
    var desc = parent.querySelector(".right-list .brand");
    var price = parent.querySelector(".right-list .price .define");
    var title = parent.querySelector("h3 a");
    title.textContent = data.data[0].goods_name;
    desc.textContent = data.data[0].goods_desc;
    bannerImg.src = data.data[0].goods_thumb;
    fdjImg.src =  data.data[0].goods_thumb;
    favors.textContent = data.data[0].star_number;
    price.innerText = data.data[0].price + "  元";

    var sdaArr = parent.querySelectorAll("div.right-item div a.sda img");
    var span = parent.querySelectorAll("div.right-item div span");
    var priceArr = parent.querySelectorAll("div.right-item div div.price");
    var nameArr = parent.querySelectorAll("div.right-item div a.name");
    for (var i = 0; i < sdaArr.length; i++) {
        sdaArr[i].src = data.data[0].goods_thumb;
        span[i].textContent = data.data[0].goods_name;
        priceArr[i].textContent = data.data[0].price;
        nameArr[i].textContent = data.data[0].goods_desc;
    }

    var smallImg = document.querySelectorAll("div.bottom-run-pic ul li");
    for(var i = 0; i<smallImg.length;i++){
        smallImg[i].style.background = 'url('+data.data[0].goods_thumb+') no-repeat 0px 0px';
        smallImg[i].style.backgroundSize = 'contain';
    }
    smallImg[0].style.border =" 1px solid black";
    var nTag = 0;
    var spanBtn = document.querySelector("div.bottom-run-pic span.right");
    var spanLeftBtn = document.querySelector("div.bottom-run-pic span.left");   
    spanBtn.onclick = function(){
        if(nTag >= 4){
            nTag = -1;
        }
        nTag++;
        for(var j = 0;j<smallImg.length;j++){
            smallImg[j].style.border = "1px solid #fff";
        }
        smallImg[nTag].style.border =" 1px solid black";
    };

    spanLeftBtn.onclick = function(){
        if(nTag <= 0){
            nTag = 5;
        }
        nTag--;
        for(var j = 0;j<smallImg.length;j++){
            smallImg[j].style.border = "1px solid #fff";
        }
        smallImg[nTag].style.border =" 1px solid black";
    };

    var slide = parent.querySelector("div.slide_bg");

    oBox.onmouseenter = function(){
        slide.style.display = "block";
        fdj.style.display = "block";
    }

    oBox.onmouseleave = function(){
        console.log("???");
        slide.style.display =  "none";        
        fdj.style.display = "none";
    }
    oBox.onmousemove = function(event){
            var l = event.clientX-getAllLeft(oBox) - slide.offsetWidth /2;
            var t = event.clientY-getAllTop(oBox)- slide.offsetHeight / 2 +40;
            if(l < 0){
                l = 0;
            }
            if(t <0){
                t = 0;
            }
            if( l > oBox.clientWidth - slide.offsetWidth){
                l = oBox.clientWidth - slide.offsetWidth;
            }
            if(t >= oBox.clientHeight - slide.offsetHeight){t = oBox.clientHeight - slide.offsetHeight};
            slide.style.left = l +"px";
            slide.style.top =  t +"px";
            // 求比例
            var scale = (fdjImg.offsetWidth - fdj.clientWidth) / (oBox.clientWidth- slide.offsetWidth);
            fdjImg.style.left = -l * scale+"px";
            console.log(scale)
            fdjImg.style.top = -t * scale+"px";
        };    
}


function getAllLeft(node){  //求净位置
    var left =node.offsetLeft;
    while( node = node.offsetParent){
        left += node.offsetLeft;
    };
    return left;
};


function getAllTop(node){
    var Top =node.offsetTop;
    while(node = node.offsetParent){
        if(node.nodeType == 1){
            // console.log(node,node.offsetTop);
            Top += node.offsetTop;
        }
        else{

        }
    };
    return Top;
};

//左上角的导航
function get_small(id) {
    var aTag = parent.querySelectorAll(".describe-title a")[1];
    ajax(webSite + "api_cat.php", "get", "cat_id=" + id, "json", function (data) {
        var arr = data.data;
        var buk = null;
        for (var k in arr) {
            if (id == arr[k]["cat_id"]) {
                aTag.textContent = arr[k]["cat_name"];
            }
        }
    }, "")
}

//加入购物车 & 立即购买
(function () {
    $(".cart").click(function () {
        // IsLogin是判断用户是否登录了
        if (isLogin) {
            //加入购物车前需要拿到这个商品的id存到本地的localStorage里
            var str = window.localStorage.getItem("goods_id");
            var data = window.localStorage.getItem("goods_id");
            if (!str) {
                //为空
                console.log("hhah");
                window.localStorage.setItem("goods_id", reg[0]);
                popOutDialogTwo("恭喜您添加到成功添加到购物车");
            } else {
                var tempArr = data.split("&"); //检测是否重复
                var count = 0;
                for (var repeat = 0; repeat < tempArr.length; repeat++) {
                    if (tempArr[repeat] == reg[0]) {
                        count++;
                    }
                }
                if (count == 0) {
                    data = data + "&" + reg[0];
                    popOutDialogTwo("恭喜您添加到成功添加到购物车");
                    window.localStorage.setItem("goods_id", data)
                } else {
                    popOutDialogTwo("该宝贝已经添加到了购物车,不能重复添加哦");
                }
            }
        } else {
            window.location.href = "良仓-登录.html?goods_id=" + reg[0];
        }
    })
})()


//立即购买只需要直接跳转到购物车页面，并且将该商品加入到购物车
// 要check 该商品以前是否加入过购物车，yes则直接跳到购物车，else 加入购物车再跳转
;
(function () {
    $(".right-list button").click(
        function () {
            if (isLogin) {
                //跳转到购物车页面前需要要check 该商品以前是否加入过购物车
                var str = window.localStorage.getItem("goods_id");
                var data = window.localStorage.getItem("goods_id");
                if (!str) {
                    //为空 从未加入过购物车
                    window.localStorage.setItem("goods_id", reg[0])
                } else {
                    var tempArr = data.split("&"); //检测是否重复
                    var count = 0;
                    for (var repeat = 0; repeat < tempArr.length; repeat++) {
                        if (tempArr[repeat] == reg[0]) {
                            count++;
                        }
                    }
                    if (count == 0) { // 该goods_id从未存储
                        data = data + "&" + reg[0]; //存储然后跳转
                        window.localStorage.setItem("goods_id", data)
                        window.location.href = "良仓-购物车.html";
                    } else { //该goods_id有存储记录;
                        window.location.href = "良仓-购物车.html";
                    }
                }
            } else {
                window.location.href = "良仓-登录.html?goods_id=" + reg[0];
            }
        }
    )
})()


