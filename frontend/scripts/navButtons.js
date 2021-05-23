let history = document.getElementById("trivia");
let index = document.getElementById("home");
let test = document.getElementById("testcar");
let mazdaRotaries = document.getElementById("mazdarotaries");

history.addEventListener("click", function() {
    location.href = "trivia.html";
});

index.addEventListener('click', function() {
    location.href = "index.html";
});

test.addEventListener('click', function() {
    location.href = "vehicletemplate.html";
});

mazdaRotaries.addEventListener('click', function() {
    location.href = "mazdaRotaries.html";
});