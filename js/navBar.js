//-------------------- Variables --------------------
var nav = document.querySelector("#nav");
var abrir = document.querySelector("#open");
var cerrar = document.querySelector("#close");
var rankingBtn = document.getElementById('li-ranking');

abrir.addEventListener("click", function() {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", function() {
    nav.classList.remove("visible");
});

rankingBtn.addEventListener("click", function() {
    var sectionRanking = document.getElementById('ranking');
    sectionRanking.classList.remove("hide");
    clearRankingTable();
    loadRankingData();
})