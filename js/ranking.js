//------------------  Ranking ---------------- --
//--------- Eventos --------- 
var rankingBtn = document.getElementById('liRankingID');
rankingBtn.addEventListener("click", function() {
    var sectionRanking = document.getElementById('rankingID');
    sectionRanking.classList.remove("hide");
    clearRankingTable();
    loadRankingData();
});

// Evento para cerrar el modal de ranking
var closeRanking = document.getElementById('closeRankingModal');
closeRanking.addEventListener("click", function() {
    var sectionRanking = document.getElementById('rankingID');
    sectionRanking.classList.add("hide");
    clearRankingTable();
});

// Evento click del botón "Sort by Score"
document.getElementById("sortByScoreBtn").addEventListener("click", function() {
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];

    // Ordenar los datos por score de forma descendente
    allGameData.sort(function(a, b) {
        return b.finalScore - a.finalScore;
    });

    // Volver a cargar los datos en la tabla
    clearRankingTable();
    loadRankingData();
});

// Evento click del botón "Sort by Date"
document.getElementById("sortByDateBtn").addEventListener("click", function() {
    // var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];

    // Ordenar los datos por fecha de forma descendente
    // allGameData.sort(function(a, b) {
    //     return b.date - a.date;
    // });

    // Volver a cargar los datos en la tabla
    clearRankingTable();
    orderByDateDescending();
});

//---------  Logica --------- 
function saveGameData(gameData) {
    // Obtener todos los datos almacenados previamente (si hay alguno)
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];

    //------------------- NO PERMITIR DUPLICADOS ------------------
    // Buscar si ya existe un registro con el mismo nombre de jugador
    var existingGameData = allGameData.find(function(data) {
        return data.userName === gameData.userName;
    });

    // Si existe un registro y el nuevo puntaje es mayor, actualizar el registro
    if (existingGameData) {
        if (gameData.finalScore > existingGameData.finalScore) {
            existingGameData.finalTime = gameData.finalTime;
            existingGameData.finalScore = gameData.finalScore;
            existingGameData.finalLevel = gameData.finalLevel;
            existingGameData.date = gameData.date;
        }
    } else {
        // Si no existe un registro con el mismo nombre, agregar el nuevo registro al array
        allGameData.push(gameData);
    }

    // Convertir el array de datos en formato JSON y guardarla en Local Storage
    localStorage.setItem("allGameData", JSON.stringify(allGameData));

    //------------------ PERMITIR DUPLICADOS ------------------
    // function saveGameData(gameData) {

    //     var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];
    
    //     allGameData.push(gameData);

    //     localStorage.setItem("allGameData", JSON.stringify(allGameData));
    // }
    
}

// Función para cargar los datos del ranking en la tabla
function loadRankingData() {
    var rankingTable = document.getElementById("rankingTable");
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];

    // Convertir las fechas almacenadas en allGameData a objetos de fecha
    allGameData.forEach(function (data) {
        data.date = new Date(data.date);
    });

    // Ordenar los datos por score de forma descendente
    allGameData.sort(function (a, b) {
        return b.finalScore - a.finalScore;
    });

    // Limpiar la tabla antes de cargar los nuevos datos
    clearRankingTable();

    // Cargar los datos ordenados en la tabla
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
}

// Función para vaciar todos los rows de la tabla (excepto los encabezados)
function clearRankingTable() {
    var rankingTable = document.getElementById("rankingTable");
    var rowCount = rankingTable.rows.length;

    // Comenzamos en 1 para omitir el encabezado
    for (var i = 1; i < rowCount; i++) {
        rankingTable.deleteRow(1); // Siempre eliminamos la segunda fila (índice 1) porque al eliminar una fila, las filas posteriores se renumeran automáticamente.
    }
}

function orderByDateDescending() {
    // Obtener los datos almacenados en Local Storage
    var allGameData = JSON.parse(localStorage.getItem("allGameData")) || [];

    // Ordenar los datos por fecha de forma descendente
    allGameData.sort(function(a, b) {
        return b.date - a.date;
    });

    // Borrar la tabla antes de rellenarla con los datos ordenados
    clearRankingTable();

    // Obtener la tabla del ranking
    var rankingTable = document.getElementById("rankingTable");

    // Rellenar la tabla con los datos ordenados por fecha
    for (var i = 0; i < allGameData.length; i++) {
        var row = rankingTable.insertRow();
        var playerCell = row.insertCell(0);
        var scoreCell = row.insertCell(1);
        var levelCell = row.insertCell(2);
        var dateCell = row.insertCell(3);

        playerCell.textContent = allGameData[i].userName;
        scoreCell.textContent = allGameData[i].finalScore;
        levelCell.textContent = allGameData[i].finalLevel;

        // Formatear la fecha correctamente antes de mostrarla en la tabla
        var date = new Date(allGameData[i].date);
        var formattedDate = formatDate(date);
        dateCell.textContent = formattedDate;
    }
}

function formatDate(date) {
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');

    // Convertir horas en formato AM/PM
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Si hours es 0 o 12, ajustamos a 12 para el formato de 12 horas

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}