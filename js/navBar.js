//-------------------- Variables --------------------
var nav = document.querySelector("#nav");
var abrir = document.querySelector("#open");
var cerrar = document.querySelector("#close");

//--------- Eventos ---------
abrir.addEventListener("click", function() {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", function() {
    nav.classList.remove("visible");
});