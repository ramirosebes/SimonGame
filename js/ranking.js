//-------------------- Variables --------------------
var rankingBtn = document.getElementById('liRankingID');
var closeRanking = document.getElementById('closeRankingModal');

//-------------------- Functions --------------------

function saveGameData(gameData) {
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];
    var existingGameData = allGameData.find(function(data) {
        return data.userName === gameData.userName;
    });
    if (existingGameData) {
        if (gameData.finalScore > existingGameData.finalScore) {
            existingGameData.finalTime = gameData.finalTime;
            existingGameData.finalScore = gameData.finalScore;
            existingGameData.finalLevel = gameData.finalLevel;
            existingGameData.date = gameData.date;
        }
    } else {
        allGameData.push(gameData);
    }
    localStorage.setItem("allGameData", JSON.stringify(allGameData));
};

function loadRankingData() {
    var rankingTable = document.getElementById("rankingTable");
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];
    allGameData.forEach(function (data) {
        data.date = new Date(data.date);
    });
    allGameData.sort(function (a, b) {
        return b.finalScore - a.finalScore;
    });
    clearRankingTable();
    for (var i = 0; i < allGameData.length; i++) {
        var row = rankingTable.insertRow();
        var playerCell = row.insertCell(0);
        var scoreCell = row.insertCell(1);
        var levelCell = row.insertCell(2);
        var dateCell = row.insertCell(3);
        playerCell.textContent = allGameData[i].userName;
        scoreCell.textContent = allGameData[i].finalScore;
        levelCell.textContent = allGameData[i].finalLevel;
        dateCell.textContent = allGameData[i].date.toLocaleString();
    }
};

function clearRankingTable() {
    var rankingTable = document.getElementById("rankingTable");
    var rowCount = rankingTable.rows.length;
    for (var i = 1; i < rowCount; i++) {
        rankingTable.deleteRow(1);
    }
};

function orderByDateDescending() {
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];
    allGameData.sort(function(a, b) {
        return b.date - a.date;
    });
    clearRankingTable();
    var rankingTable = document.getElementById("rankingTable");
    for (var i = 0; i < allGameData.length; i++) {
        var row = rankingTable.insertRow();
        var playerCell = row.insertCell(0);
        var scoreCell = row.insertCell(1);
        var levelCell = row.insertCell(2);
        var dateCell = row.insertCell(3);
        playerCell.textContent = allGameData[i].userName;
        scoreCell.textContent = allGameData[i].finalScore;
        levelCell.textContent = allGameData[i].finalLevel;
        var date = new Date(allGameData[i].date);
        var formattedDate = formatDate(date);
        dateCell.textContent = formattedDate;
    }
};

function formatDate(date) {
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};

//---------- Handlers ----------

function handlerRainkingOpenButton() {
    var sectionRanking = document.getElementById('rankingID');
    sectionRanking.classList.remove("hide");
    clearRankingTable();
    loadRankingData();
};

function handlerRankingCloseButton() {
    var sectionRanking = document.getElementById('rankingID');
    sectionRanking.classList.add("hide");
    clearRankingTable();
};

function handlerRankingSortByScoreButton() {
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];
    allGameData.sort(function(a, b) {
        return b.finalScore - a.finalScore;
    });
    clearRankingTable();
    loadRankingData();
};

function handlerRankingSortByDateButton() {
    clearRankingTable();
    orderByDateDescending();
};

//-------------------- EventsLiseners --------------------

rankingBtn.addEventListener("click", handlerRainkingOpenButton);

closeRanking.addEventListener("click", handlerRankingCloseButton);

document.getElementById("sortByScoreBtn").addEventListener("click", handlerRankingSortByScoreButton);

document.getElementById("sortByDateBtn").addEventListener("click", handlerRankingSortByDateButton);