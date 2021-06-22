var box = document.getElementsByClassName('searchbox');
var button = document.getElementsByClassName("detailedsearch");
var topVip = document.getElementsByClassName("recentsearch");
var tests = document.querySelectorAll(".test");

box[0].style.maxHeight = 200 + "px";
button[0].addEventListener("click", function() {
    
    if (box[0].style.maxHeight != "200px") {
        box[0].style.maxHeight = 200 + "px";
        button[0].style.marginTop = 0 + "px";

        for (let i = 0; i < tests.length; i++) {
            tests[i].style.display = "none";
        }

        setTimeout(function() {
            topVip[0].style.visibility = "visible";
        }, 500);
        button[0].value = "Подробно търсене"
    } else {
        topVip[0].style.visibility = "hidden";

        for (let i = 0; i < tests.length; i++) {
            tests[i].style.display = "inline";
        }

        box[0].style.maxHeight = 600 + "px";
        button[0].style.marginTop = 250 + "px";
        button[0].value = "Съкратено търсене";
    }
});