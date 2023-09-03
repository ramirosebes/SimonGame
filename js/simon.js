//-------------------- Variables --------------------

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userScore = 0;
var totalScore = 0;
var userName = " ";
var form = document.querySelector('#formID');
var buttons = document.querySelectorAll(".btnSimon");
var timeRef = Date.now();
var timeCount = false;
var accumulated = 0;
var intervalId;

//-------------------- Functions --------------------

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
        document.body.classList.add("gameOver");
        setTimeout(function() {
            document.body.classList.remove("gameOver");
        }, 750);
        document.querySelector("#levelTitle").textContent = "Game over, Press start button to Restart.";
        stopTime();
        startOver();
    }
};

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#levelTitle").textContent = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                animatePress(gamePattern[i]);
                playSound(gamePattern[i]);
            }, i * 750);
        })(i);
    }
};

function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(function() {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function startOver() {
    var gameData = {
        userName: document.querySelector('#inputName').value,
        finalTime: document.querySelector('#timeID').textContent,
        finalScore: userScore,
        finalLevel: level,
        date: Date.now()
    };
    saveGameData(gameData);
    level = 0;
    gamePattern = [];
    started = false;
    form.reset();
    stopSubtractingScore();
};

//---------- Timer ----------

function startTime() {
    timeCount = true;
    startSubtractingScore();
};

function stopTime() {
    timeCount = false;
};

function restartTime() {
    accumulated = 0;
};

setInterval(function() {
    var time = document.querySelector("#timeID");
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
};

//---------- Penalty ----------
function showPenalty() {
    var penaltyElement = document.querySelector('.penaltyClass');
    penaltyElement.classList.remove('hide');
    setTimeout(function() {
        penaltyElement.classList.add('hide');
    }, 1000);
};

function startSubtractingScore() {
    stopSubtractingScore();
    intervalId = setInterval(function() {
    userScore -= 50;
    document.querySelector('#score').innerHTML = "Score: " + userScore;
    showPenalty();
    }, 10000);
};

function stopSubtractingScore() {
    clearInterval(intervalId);
};

//---------- Handlers ----------

function handlerSimonStartButton() {
    if (!started) {
        var sectionForm = document.querySelector('#enterNameID');
        sectionForm.classList.remove('hide');
    }
};

function handlerSimonResetButton() {
    if (started) {
        document.querySelector("#levelTitle").textContent = "Press Start button to start.";
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        started = false;
        stopTime();
        restartTime();
        form.reset();
        userScore = 0;
        document.querySelector('#score').innerHTML = "Score: " + userScore;
        stopSubtractingScore();
    }
};

function handlerSimonColorsButtons() {
    if (started) {
        var userChosenColor = this.getAttribute("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        var bodyElement = document.body;
        if (!bodyElement.classList.contains("gameOver")) {
            userScore += 100;
            document.querySelector('#score').innerHTML = "Score: " + userScore;
        }
    }
};

//-------------------- EventsLiseners --------------------

document.querySelector("#startBtn").addEventListener("click", handlerSimonStartButton);

document.querySelector("#resetBtn").addEventListener("click", handlerSimonResetButton);

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handlerSimonColorsButtons);
};