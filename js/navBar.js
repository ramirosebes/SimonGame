//-------------------- Variables --------------------

var nav = document.querySelector("#navID");
var open = document.querySelector("#open");
var close = document.querySelector("#close");

//-------------------- Functions --------------------

function handlerNavBarOpenButton() {
    nav.classList.add("visible");
};

function handlerNavBarCloseButton() {
    nav.classList.remove("visible");
};

//-------------------- EventsLisener --------------------

open.addEventListener("click", handlerNavBarOpenButton);

close.addEventListener("click", handlerNavBarCloseButton);