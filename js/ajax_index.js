$(window).load(function () {
    var pop = document.querySelector("div.popular");
    var parm = "page=1&pagesize=180";
    var i = 0;
    var tag = true;
    var lock = false;
    var noData = document.createElement("div");
    var btnMore = document.querySelector(".text");
    var btnMorePar = document.querySelector(".more"); //More的父节点
    var wrap_content = document.querySelector(".wrapper-content");
    var dataJSON = [{
        "left": -1000
    }];
    var barJSON = [{
        "left": 0
    }];
    var littleBar = wrap_content.querySelector(".strain");
    var banner = document.querySelector(".go"); //广告图
    var now = document.getElementById("banner");
    var timer = null;
    var n = 0;
    var temp = 0;
    var renderOk = false;

    ajax(webSite + "api_goods.php", "get", parm, "json", function (data) {
        // 渲染热销商品到页面
        var tagNum = 18; //首次加载18个商品
        newTag(data, tagNum); //newTag函数用来组装DOM
    }, "")


    // 下面是单击More渲染更多热销商品的代码
    btnMore.onclick = function () {
        // 点击MORE的时候加载9个商品，然后再用ajax滚动预加载
        // 设置一个加载动画增加交互性
        btnMore.style.backgroundImage = "url('./other/loading.gif')";
        btnMore.style.backgroundSize = "cover";
        btnMore.className = "loadingImg";
        btnMore.textContent = "";
        ajax(webSite + "api_goods.php", "get", parm, "json", function (data) {
            btnMorePar.removeChild(btnMore);
            wrap_content.removeChild(btnMorePar);
            var tagNum = 15;
            newTag(data, i + tagNum);
            tag = false;
            return;
        }, "");
    }

    function newTag(data, tagNum) {
        var k = i + 1;
        var tempTag = i;
        for (; i < tempTag + tagNum; i++) {
            var oDiv = document.createElement("div");
            pop.appendChild(oDiv);
            if (k == i) {
                oDiv.className = "center";
                k += 3;
            }
            for (var j = 0; j < 3; j++) {
                var href = document.createElement("a");
                oDiv.appendChild(href);
                if (j == 0) {
                    href.className = "pic";
                    // 每个a标签设置src
                    href.href = "良仓-商品详情.html?goods_id=" + data.data[i]["goods_id"];
                    var img = document.createElement("img");
                    img.src = data.data[i]["goods_thumb"];
                    href.appendChild(img);
                    var masking = document.createElement("div");
                    masking.className = "masking";
                    href.appendChild(masking);
                    addDiv(masking, data, i);
                } else if (j == 1) {
                    href.className = "brand";
                    href.textContent = data.data[i]["goods_name"];

                } else {
                    href.className = "favor";
                    href.textContent = data.data[i]["star_number"];
                }
            }
        }
    }

    // 滚动页面加载更多热销商品
    window.onscroll = function () {
        if (tag == true) {
            return;
        }
        //求浏览器窗口的高度、滚动的高度、文档的高度
        var winH = window.innerHeight;
        var docH = document.body.clientHeight || document.documentElement.clientHeight;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if ((parseInt(scrollTop) + winH) / docH > 0.7 && i < 176) {
            // 开始加载资源
            if (lock) {
                return;
            }
            lock = true;
            ajax(webSite + "api_goods.php", "get", parm, "json", function (data) {
                lock = false;
                newTag(data, 9);
            })

        } else {
            if (noData.textContent == "") {
                noData.textContent = "我也是有底线的！";
                noData.className = "noMoreData";
                wrap_content.appendChild(noData);
            } else {
                return;;
            }
        }
    }

    //添加每个商品下面更详细的标签
    function addDiv(node, data, index) {
        var div1 = document.createElement("div");
        node.appendChild(div1);
        div1.className = "price";
        div1.textContent = "￥" + data.data[index]["price"];
        var div2 = document.createElement("div");
        div2.className = "items";
        node.appendChild(div2);
        var p = document.createElement("p");
        p.textContent = data.data[index]["goods_desc"];
        div2.appendChild(p);
    }




    // 请求广告位
    (function () {
        var parm = "";
        ajax(webSite + "api_position.php", "get", parm, "json", function (data) {
            var position_id = data.data[0].position_id;
            requestAdv(position_id);
        }, "");
    })()



    function changeColor(num) {
        var change = document.createElement("div");
        var changemind = document.querySelector(".change");
        // num表示当前位置 让当前位置颜色更加鲜明
        if (change.lock) {
            return;
        }
        moveStruct(changemind, barJSON[n], 800, "backEaseInOut", function () {});
    }

    function requestAdv(id) {
        ajax(webSite + "api_ad.php", "get", "position_id=" + id, "json", function (data) {
            for (var adv = 0; adv < data.data.length; adv++) {
                var li = document.createElement("li");
                li.className = "active" + adv;
                li.style.left = adv * 1000 + "px";
                var bannerA = document.createElement("a");
                bannerA.href = data.data[adv].thumb;
                var image = document.createElement("img");
                image.src = data.data[adv].url;
                bannerA.appendChild(image);
                li.appendChild(bannerA);
                banner.appendChild(li);
            }
            arrow();
            //制作轮播动画
            var liArr = banner.querySelectorAll("li");
            for (var animation = 1; animation <= liArr.length; animation++) {
                dataJSON.push({
                    "left": parseInt(fetchComputedStyle(liArr[animation - 1], "left"))
                });
            }; //求出每个节点的left值推入数组中；
            renderOk =true;
            //开始轮播
            setInterval(function(){
                var liArr = banner.querySelectorAll("li");
                if (liArr[n].lock) {
                    return;
                }
                n++;
                if (n >= liArr.length) {
                    n = 0;
                }
                //调用changeColor函数改变小横条的状态
                changeColor(n);
                for (var i = 0; i < liArr.length; i++) {
                    moveStruct(liArr[i], dataJSON[i], 500, "qubicEaseInOut", function () {
                        temp++;
                        if (temp == liArr.length) { // liArr数组里面所有的图片都已经滚动到了指定的位置
                            temp = 0;
                            $('ul.go li:eq(0)').css({
                                "left": dataJSON[dataJSON.length - 1]["left"] + "px"
                            })
                            liArr[0].parentNode.appendChild(liArr[0]);
                        };
                    });
                };
            },3000)
            //---------------------------横条部分代码
            var change = document.createElement("div");
            change.className = "change";
            littleBar.appendChild(change);
            for (var bar = 0; bar < data.data.length; bar++) {
                var node = document.createElement("div");
                node.className = "lbt";
                littleBar.appendChild(node);
            }
            var barArr = document.querySelectorAll(".strain div.lbt");
            for(var i = 1;i<barArr.length;i++){
                barJSON.push(
                {
                    "left":i*(parseInt(fetchComputedStyle(barArr[i],"width")) +6)
                }
                )
            }

            //  小横条代码


            function arrow(){
                var left_arrow = document.querySelector("#left-space div.left");
                var right_arrow = document.querySelector("#right-space div.right");
                now.onmouseenter = function () {
                    // clearInterval(timer);
                    left_arrow.style.display = "block";
                    right_arrow.style.display = "block";
                }
                now.onmouseleave = function () {
                    left_arrow.style.display = "none";
                    right_arrow.style.display = "none";
                    // timer = setInterval(mover, 3000);
                }

                left_arrow.onclick = function () {
                    //单击之后把最后一个节点先偏移  -1366px,然后添加到最前面
                    // var liArr = banner.querySelectorAll("li");
                    // liArr[liArr.length - 1].style.left = dataJSON[0]["left"] + "px";
                    // banner.insertBefore(banner.lastElementChild, banner.firstElementChild);
                    // if (liArr[n].lock) {
                    //     return;
                    // }
                    // n--;
                    // if (n < 0) {
                    //     n = liArr.length-1;
                    // }
                    // changeColor();
                    // for (var i = 0; i < liArr.length; i++) {
                    //     moveStruct(liArr[i], dataJSON[i + 1], 1000, "qubicEaseInOut", function () {});
                    // };
                    
                }
                // right_arrow.onclick = function () {
                //    mover();
                // }
            }
        }, "");
    }
})