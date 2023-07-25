// STEP 1
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start button
document.getElementById("startBtn").addEventListener("click", function() {
    if (!started) {
        document.getElementById("level-title").textContent = "Level " + level;
        started = true;
        restartTime();
        startTime();
        setTimeout(function() {
            nextSequence();
        }, 750); //Tiempo a que se encienda el boton
    }
});

// Resert button
document.getElementById("resetBtn").addEventListener("click", function() {
    if (started) {
        document.getElementById("level-title").textContent = "Press Start button to start";
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        started = false;
        stopTime();
        restartTime();
    }
});

// Eventos para los botones de colores
var buttons = document.querySelectorAll(".btnSimon");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if (started) {
            var userChosenColor = this.getAttribute("id");
            userClickedPattern.push(userChosenColor);

            playSound(userChosenColor);
            animatePress(userChosenColor);

            checkAnswer(userClickedPattern.length - 1);
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

        document.getElementById("level-title").textContent = "Game over, Press start button to Restart";
        stopTime();

        startOver();
    }
}

// STEP 2
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
    level = 0;
    gamePattern = [];
    started = false;
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
