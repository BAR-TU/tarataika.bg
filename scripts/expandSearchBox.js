var box = document.getElementsByClassName("searchbox");
var button = document.getElementsByClassName("detailedsearch");
var topVip = document.getElementsByClassName("topVip");

box[0].style.maxHeight = 200 + "px";
button[0].addEventListener("click", function() {
    
    if (box[0].style.maxHeight != "200px") {
        box[0].style.maxHeight = 200 + "px";
        setTimeout(function() {
            topVip[0].style.visibility = "visible";
        }, 500);
    } else {
        topVip[0].style.visibility = "hidden";
        box[0].style.maxHeight = 600 + "px";
    }
});