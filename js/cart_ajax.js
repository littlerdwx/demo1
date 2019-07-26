//先拿到goods_id ,如果goods_id不为空就渲染

var isData = null;
var box = document.querySelector("div.empty");
var myWebToal_price = document.querySelector("div.total_price span");
var isSelected = null;

(function () {
    isData = window.localStorage.getItem("goods_id");
    if (isData != "" && isData != null) {
        //渲染购物车数据
        //先把empty这个类名改成cartData,并且去掉margin
        var img = box.querySelector("img");
        var span = box.querySelector("span");
        box.removeChild(img);
        box.removeChild(span);
        box.className = "Cart_list";
        // box.style.margin = "0px";
        // 先把表头创建好
        buildingTableHeader();
        // 然后渲染数据;
        buildingData();
    } else if(isData == null){
        return;
    }
})();





function buildingTableHeader() {
    var table = "<div class='cart-head'><ul class='head-list'><li><input type='checkbox' class='checkAll'/><span>全选</span></li><li class='desc'>良品</li><li>数量</li><li>单价(元)</li><li>小计(元)</li><li>操作</li></ul></div>";
    box.innerHTML = table;
}

function buildingData() {
    var tempArr = isData.split("&");
    for (var index = 0; index < tempArr.length; index++) {
        var parm = "goods_id=" + tempArr[index];
        ajax(webSite + "api_goods.php", "get", parm, "json", function (data) {
            render_data(data);
            // 数据渲染完成后就要注册各种事件了
            reg_event(); // 注册事件
        }, "");
    }
}

function render_data(result) {
    var tbody = document.querySelector("div.Cart_list");
    var tr = document.createElement("div");
    tr.className = "addItemInCart";
    tr.setAttribute("good_id",result.data[0].goods_id);
    tbody.appendChild(tr);
    tr.innerHTML = '<ul><li class="product_img-check"><input type="checkBox" class="checkSingle"><img src="" alt=""></li><li class="desc"><p></p></li><li class="add-reduce"><span class="add">+</span><input type="text" class="Quantity" value="1"><span class="reduce"></span></li><li class="unitPrice"></li><li class="subTotal"></li><li class="delete"><span class="deleteItem">删除</span></li></ul>';
    var imgArr = tr.querySelector("img");
    var pText = tr.querySelector("li.desc p");
    var unitPrice = tr.querySelector("li.unitPrice");
    var subTotal = tr.querySelector("li.subTotal");
    imgArr.src = result.data[0]["goods_thumb"];
    pText.textContent = result.data[0]["goods_desc"];
    unitPrice.textContent = result.data[0]["price"];
    subTotal.textContent = result.data[0]["price"];
}


function reg_event(event) {
    var event = event || window.event;
    var tbody = document.querySelector("div.Cart_list");
    tbody.onclick = function () {
        //------------全选与不全选  
        var event = window.event || event;
        var checkArray = tbody.querySelectorAll("div.addItemInCart input.checkSingle");
        if (event.target.className == "checkAll" && event.target.checked) {
            //如果单击了全选，就必须得全部选中
            for (var checkIndex = 0; checkIndex < checkArray.length; checkIndex++) {
                checkArray[checkIndex].checked = true;
            }
            sumPrice();
        } else if (event.target.className == "checkAll" && !event.target.checked) {
            for (var checkIndex = 0; checkIndex < checkArray.length; checkIndex++) {
                checkArray[checkIndex].checked = false;
            }
            sumPrice();
        }
        //-----如果所有的checkSingle都被选中，那么也将触发全选
        console.log(event.target.className)
        if (event.target.className == "checkSingle" && event.target.checked) {
            var count = 0;
            for (var checkIndex = 0; checkIndex < checkArray.length; checkIndex++) {
                if (checkArray[checkIndex].checked) {
                    count++;
                }
                // 如果每个单选框都勾选了等于勾选了全选框
                if (count == checkArray.length) {
                    tbody.querySelector("input.checkAll").checked = true;
                }
            }
            sumPrice(); //计算良品总价格
        }
        else if(event.target.className == "checkSingle" && !event.target.checked){
            tbody.querySelector("input.checkAll").checked = false;
        }

        if (event.target.className == "checkSingle" && !event.target.checked) {
            sumPrice(); //计算良品总价格
        }
        // 单击数量代码  
        // 得到span的上一个兄弟节点和下一个兄弟节点 nextElementSibling previousElementSibling
        if (event.target.className == "add") {
            var quantity = parseInt(event.target.nextElementSibling.value); // 获取到单击的对应的商品的数量
            if (quantity >= 10) {
                alert("商品最多只能添加10件");
                quantity = 10;
                return;
            } else {
                    quantity++;
                    event.target.nextElementSibling.value = quantity;
                    updateSubtotal(event.target.parentNode.parentNode, quantity);
            }
            checkNumber_reduce(event.target);
        }
        
        if (event.target.className == "reduce") {
            checkNumber_reduce(event.target);
            var quantity = parseInt(event.target.previousElementSibling.value); // 获取到单击的对应的商品的数量
            if (quantity <= 1) {
                // alert("商品至少要添加1件");
                //直接隐藏，禁止点击
                return;
            } else {
                quantity--;
                event.target.previousElementSibling.value = quantity;
                updateSubtotal(event.target.parentNode.parentNode, quantity);
            }
            checkNumber_reduce(event.target);
        }
        // 删除商品的功能   
        if (event.target.className == "deleteItem") {
            //先提示用户是否真的删除该宝贝?
            popOutDialogOne("确定要删除购物车里的宝贝吗?", function (isBool) {
                isSelected = isBool;
                if (isSelected) {
                    // /删除宝贝的同时需要将localStorage里对应的goods_id删除掉
                    var getCurrentRemoveId = event.target.parentNode.parentNode.parentNode.getAttribute("good_id");
                    var tempStr = window.localStorage.getItem("goods_id");
                    removeGoodsid(getCurrentRemoveId,tempStr);
                    tbody.removeChild(event.target.parentNode.parentNode.parentNode);
                } else {
                    return; // 用户取消单击什么也不做
                }
            });

        }
    }
}

//计算良品总价格
function sumPrice() {
    var sumAll = 0;
    var isChecked = document.querySelectorAll("div.addItemInCart ul input.checkSingle");
    var subPrice = document.querySelectorAll(".subTotal");
    for (var index = 0; index < isChecked.length; index++) {
        if (isChecked[index].checked) {
            sumAll += parseFloat(subPrice[index].textContent);
        }
    }
    myWebToal_price.innerHTML = "&nbsp;&nbsp;￥" + sumAll;
}

//计算更新数量后的小计
function updateSubtotal(node, num) {
    var unitPrice = parseInt(node.querySelector("li.unitPrice").textContent);
    node.querySelector("li.subTotal").textContent = num * unitPrice + ".00";
    //如果添加数量的时候已经被勾选了那么还需要调用sumPrice进行更新
    if (node.querySelector(".checkSingle").checked) {
        sumPrice();
    } else {
        return;
    }
}

function removeGoodsid(currentId,totalId){
    var tempArr = totalId.split("&");
    for(var index = 0;index<tempArr.length;index++){
        if(currentId == tempArr[index]){
            tempArr.splice(index,1);
        }
        else{
            continue;
        }
    }
    window.localStorage.setItem("goods_id",tempArr.join("&"));
    if(localStorage.getItem("goods_id") == ""){
        window.location.reload();
    }
}

function checkNumber_reduce(node){
        if(node.className == "add"){
            if(node.nextElementSibling.value > 1){
                node.nextElementSibling.nextElementSibling.textContent = "-";
            }
            else{
                node.nextElementSibling.nextElementSibling.style = "none";
                node.nextElementSibling.nextElementSibling.textContent = "";
            }
        }

        if(node.className == "reduce"){
            if(node.previousElementSibling.value > 1){
                node.style.border = "1px solid #FF6600";
                node.textContent = "-";
            }
            else{
                node.style.border = "1px solid transparent";
                node.textContent = "";
            }
        }
}