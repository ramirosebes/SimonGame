//-------------------- Modal Enter Name --------------------
var sectionForm = document.getElementById('enterName');
var form = document.getElementById('formID');
var inputs = document.querySelectorAll('#formID input');

var expressions = {
    name: /^(.*[a-zA-Z]){3,}/,
}

var fields = {
    name: false,
}

function validateForm(e) {
	switch (e.target.name) {
        case "name":
            validateField(expressions.name, e.target, 'name', 'Name');
            break;
    }
}

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
}1

inputs.forEach(function(input) {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

var buttonSend = document.getElementById('buttonSend');

buttonSend.addEventListener('click', function(e) {
    if (fields.name) {
        e.preventDefault();
        document.getElementById('groupName').classList.remove('formGroupCorrect');
        
        fields.name = false; //Validacion para que al apretar restart y luego ingresar de nuevo el formulario no te deje mandarlo de una

        //----- Codigo simon.js -----
        if (!started) {
            sectionForm.classList.add('hide');
            document.getElementById("levelTitle").textContent = "Level " + level;
            started = true;
            setTimeout(function() {
                nextSequence();
            }, 750); //Tiempo a que se encienda el boton
            //----- Timer -----
            restartTime();
            startTime();
            //----- Score -----
            userScore = 0;
            document.getElementById('score').innerHTML = "Score: " + userScore;
            // subtractScoreEveryTenSeconds();
        }
        
    } else {
        e.preventDefault(); //evita que haga la funcion degault de submit
        document.getElementById(`groupName`).classList.add('formGroupIncorrect');
        document.getElementById(`groupName`).classList.remove('formGroupCorrect');
        document.querySelector(`#groupName .formInputError`).classList.add('formInputErrorActive');
    }
});