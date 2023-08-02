//-------------------- Variables --------------------
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userScore = 0;
var totalScore = 0;
var userName = " ";
var form = document.getElementById('formClass');

// Start button
document.getElementById("startBtn").addEventListener("click", function() {
    if (!started) {
        var sectionForm = document.getElementById('enterName');
        sectionForm.classList.remove('hide');
    }
});

// Resert button
document.getElementById("resetBtn").addEventListener("click", function() {
    if (started) {a
        //----- Simon -----
        document.getElementById("level-title").textContent = "Press Start button to start.";
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        started = false;
        //----- Timer -----
        stopTime();
        restartTime();
        //----- Score -----
        userScore = 0;
        document.getElementById('score').innerHTML = "Score: " + userScore;
    }
});

// Eventes colors buttons
var buttons = document.querySelectorAll(".btnSimon");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if (started) {
            var userChosenColor = this.getAttribute("id");
            userClickedPattern.push(userChosenColor);

            playSound(userChosenColor);
            animatePress(userChosenColor);

            checkAnswer(userClickedPattern.length - 1);

            //----- Score ----- 
            //Me permite que no se agregue 100+ cuando se equivoca
            var bodyElement = document.body;
            if (!bodyElement.classList.contains("game-over")) {
                userScore += 100;
                document.getElementById('score').innerHTML = "Score: " + userScore;
            }
        }
    });
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");

        document.body.classList.add("game-over");
        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 750);

        document.getElementById("level-title").textContent = "Game over, Press start button to Restart.";

        //----- Timer -----
        stopTime();
        //-----------------
        startOver();
        
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Muestra toda la secuencia del patrón al jugador
    for (var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                animatePress(gamePattern[i]);
                playSound(gamePattern[i]);
            }, i * 750); // Tiempo a que se encienda el boton
        })(i);
    }
}

function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function() {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    // Crear un objeto con la información del juego actual
    var gameData = {
        userName: document.getElementById('inputName').value,
        finalTime: document.getElementById('time').textContent,
        finalScore: userScore,
        finalLevel: level,
        date: Date.now()
    };

    // Guardar el objeto en Local Storage
    saveGameData(gameData);
    //-----Reset EnterName -----
    level = 0;
    gamePattern = [];
    started = false;
    form.reset();
}

//---------- Timer ----------
var timeRef = Date.now();
var timeCount = false;
var accumulated = 0;

function startTime() {
    timeCount = true;
}

function stopTime() {
    timeCount = false;
}

function restartTime() {
    accumulated = 0;
}

setInterval(function() {
    var time = document.getElementById("time");
    if (timeCount) {
        accumulated += Date.now() - timeRef;
    }
    timeRef = Date.now();
    time.innerHTML = formatMS(accumulated);
}, 1000 / 60);

function formatMS(time_ms) {
    var MS = time_ms % 1000;
    var St = Math.floor((time_ms - MS) / 1000);
    var S = St % 60;
    var M = Math.floor(St / 60) % 60;
    var H = Math.floor(St / 60 / 60);

    Number.prototype.ceros = function(n) {
        return (this + "").padStart(n, 0);
    }

    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2) + "." + MS.ceros(3);
}