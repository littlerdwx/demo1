var root = document.getElementsByClassName("left-item")[0];

var plus = document.getElementsByClassName("plus")[0];

var reduce = document.getElementsByClassName("reduce")[0];

var number = document.getElementsByClassName("counts")[0];

var choice_type = document.getElementsByClassName("common");
var items = parseInt(number.innerHTML);
plus.onclick = add_item;
reduce.onclick = reduce_item;

function add_item(){
    items++;
    if(items > 10){
        alert("您最多可购买10件该商品！");
        items = 1;
        number.innerHTML = items;
        return;
    }
    console.log(items);
    number.innerHTML = items;
}

function reduce_item(){
    items--;
    if(items < 1){
        items = 1;
        return;
    }
    number.innerHTML = items;
}


add_type();


function add_type(){
    for(var i = 0;i<choice_type.length;i++){
        choice_type[i].index = i;
        choice_type[i].onclick = function(){
            for(var j = 0; j<choice_type.length;j++){
                choice_type[j].style.borderColor = "transparent";
            }
            choice_type[this.index].style["borderColor"]= "#000";
        }
    }
}
