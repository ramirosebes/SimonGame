//-------------------- Variables --------------------

var sectionForm = document.querySelector('#enterNameID');
var form = document.querySelector('#formID');
var inputs = document.querySelectorAll('#formID input');
var buttonSend = document.querySelector('#buttonSend');

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
        document.querySelector(`#group${fieldName}`).classList.remove('formGroupIncorrect');
        document.querySelector(`#group${fieldName}`).classList.add('formGroupCorrect');
        document.querySelector(`#group${fieldName} .formInputError`).classList.remove('formInputErrorActive');
        fields[field] = true;
    } else {
        document.querySelector(`#group${fieldName}`).classList.add('formGroupIncorrect');
        document.querySelector(`#group${fieldName}`).classList.remove('formGroupCorrect');
        document.querySelector(`#group${fieldName} .formInputError`).classList.add('formInputErrorActive');
        fields[field] = false;
    }
};

//---------- Handlers ----------

function handlerModalSendButton(e) {
    if (fields.name) {
        e.preventDefault();
        document.querySelector('#groupName').classList.remove('formGroupCorrect');
        fields.name = false;
        if (!started) {
            sectionForm.classList.add('hide');
            document.querySelector("#levelTitle").textContent = "Level " + level;
            started = true;
            setTimeout(function() {
                nextSequence();
            }, 750);
            restartTime();
            startTime();
            userScore = 0;
            document.querySelector('#score').innerHTML = "Score: " + userScore;
        }
    } else {
        e.preventDefault();
        document.querySelector(`#groupName`).classList.add('formGroupIncorrect');
        document.querySelector(`#groupName`).classList.remove('formGroupCorrect');
        document.querySelector(`#groupName .formInputError`).classList.add('formInputErrorActive');
    }
};

//-------------------- EventsLiseners --------------------

inputs.forEach(function(input) {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

buttonSend.addEventListener('click', handlerModalSendButton);