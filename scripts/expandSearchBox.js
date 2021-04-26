var box = document.getElementsByClassName("searchbox");
var button = document.getElementsByClassName("detailedsearch");
box[0].style.maxHeight = 200 + "px";
button[0].addEventListener("click", function() {
    
    if (box[0].style.maxHeight != "200px") {
        box[0].style.maxHeight = 200 + "px";
    } else {
        box[0].style.maxHeight = 600 + "px";
    }
});