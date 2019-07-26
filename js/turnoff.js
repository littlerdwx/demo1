start();
function start(){
    var tag = document.getElementById("r-fixed")
    var btn = tag.getElementsByClassName("turnOff")[0];
    btn.onclick = function(){
        tag.style.display = "none";
    }
}
