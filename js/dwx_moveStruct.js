function fetchComputedStyle(obj, property) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[property];
    } else {
        return obj.currentStyle[property];
    }
}


var Tween = {
    linear: function(t, b, c, d) {
        //0 1 -1 300
        // 1 1 -1 300
        return c * t / d + b;
    },
    //二次的
    quadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    quadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    quadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    qubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    qubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    qubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    sineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    sineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    sineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    expoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    expoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    expoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    circEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    circEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    elasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    elasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    backEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backEaseOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    bounceEaseIn: function(t, b, c, d) {
        return c - Tween.bounceEaseOut(d - t, 0, c, d) + b;
    },
    bounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    bounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.bounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.bounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}

//封装一个函数，拿到所有的元素节点
function take_all_ChildNodes(obj){
    if(arguments.length!=1){
        console.log("只接受一个对象参数！");
        return;
    }
    var nodeArray = new Array();
    for(var i = 0;i<obj.childNodes.length;i++){
        if(obj.childNode[i].nodeType == 1){
            nodeArray.push(obj.childNode[i]);
        };
    };
    return nodeArray;
}


function moveStruct(object_,finallyJson,moveTime,moveString,callback){
    if(arguments.length < 3){
        console.log("最少要有三个参数！")
        return;
    };
    if( checkType(arguments[0]) != "object" && checkType(arguments[1]) !="object" && checkType(arguments[2]) != 'number'){
        console.log("参数类型错误，第一个和第二个必须为Object，第三个为number");
        return;
    };
    object_.lock = true;// 函数节流
    var start = {};
    var step = {};
    var maxCount = 0;
    var count = 0;
    var timer = null;
    var interval = window.navigator.userAgent.indexOf("MISE") == -1 ? 5 : 50;

    for(var i in finallyJson){
        start[i] = parseInt(fetchComputedStyle(object_,i))
    }

    for(var j in finallyJson){
        step[j] = finallyJson[j] - start[j];
    }
    maxCount = parseInt(moveTime / interval);
    clearInterval(timer);
    timer =  setInterval(fun1,interval);
    function fun1(){
        for(var k in finallyJson){
            if( k == 'opacity'){
                object_.style[k] = Tween[moveString](count,start[k],step[k],maxCount);
            }
            else{
                object_.style[k] = Tween[moveString](count, start[k],step[k], maxCount) + 'px';   
            }
        }
        count++;
        if(count == maxCount){
            clearInterval(timer);
            for(var k in finallyJson){
                if(k == 'opacity'){
                    object_.style[k] = finallyJson[k];
                }
                else{
                    object_.style[k] = finallyJson[k]+"px";
                }
            }
            callback.apply(object_);
            object_.lock = false;
        }
    };
}


function checkType(obj){
    return typeof obj;
}