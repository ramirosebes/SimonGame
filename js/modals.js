//-------------------- Variables --------------------

var sectionForm = document.getElementById('enterNameID');
var form = document.getElementById('formID');
var inputs = document.querySelectorAll('#formID input');
var buttonSend = document.getElementById('buttonSend');

var expressions = {
    name: /^(.*[a-zA-Z]){3,}/,
};

var fields = {
    name: false,
};

//-------------------- Functions --------------------

function validateForm(e) {
	switch (e.target.name) {
        case "name":
            validateField(expressions.name, e.target, 'name', 'Name');
            break;
    }
};

function validateField(expression, input, field, fieldName) {
    if(expression.test(input.value)) {
        document.getElementById(`group${fieldName}`).classList.remove('formGroupIncorrect');
        document.getElementById(`group${fieldName}`).classList.add('formGroupCorrect');
        document.querySelector(`#group${fieldName} .formInputError`).classList.remove('formInputErrorActive');
        fields[field] = true;
    } else {
        document.getElementById(`group${fieldName}`).classList.add('formGroupIncorrect');
        document.getElementById(`group${fieldName}`).classList.remove('formGroupCorrect');
        document.querySelector(`#group${fieldName} .formInputError`).classList.add('formInputErrorActive');
        fields[field] = false;
    }
};

function handlerModalSendButton(e) {
    if (fields.name) {
        e.preventDefault();
        document.getElementById('groupName').classList.remove('formGroupCorrect');
        fields.name = false;
        if (!started) {
            sectionForm.classList.add('hide');
            document.getElementById("levelTitle").textContent = "Level " + level;
            started = true;
            setTimeout(function() {
                nextSequence();
            }, 750);
            restartTime();
            startTime();
            userScore = 0;
            document.getElementById('score').innerHTML = "Score: " + userScore;
        }
    } else {
        e.preventDefault();
        document.getElementById(`groupName`).classList.add('formGroupIncorrect');
        document.getElementById(`groupName`).classList.remove('formGroupCorrect');
        document.querySelector(`#groupName .formInputError`).classList.add('formInputErrorActive');
    }
};

//-------------------- EventsLiseners --------------------

inputs.forEach(function(input) {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

buttonSend.addEventListener('click', handlerModalSendButton);