var sectionForm = document.getElementById('enterName');
var form = document.getElementById('formClass');
var inputs = document.querySelectorAll('#formClass input');

var expressions = {
    name: /^(.*[a-zA-Z]){3,}/,
}

var fields = {
    name: false,
}

function validateForm(e) {
	switch (e.target.name) {
        case "name":
            validateField(expressions.name, e.target, 'name');
            break;
    }
}

function validateField(expression, input, field) {
    if(expression.test(input.value)) {
        document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.add('form__group-correct');
        document.querySelector(`#group__${field} .form__input-error`).classList.remove('form__input-error-active');
        fields[field] = true;
    } else {
        document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
        document.getElementById(`group__${field}`).classList.remove('form__group-correct');
        document.querySelector(`#group__${field} .form__input-error`).classList.add('form__input-error-active');
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
        gameData.userName = document.getElementById('inputName').value;
        form.reset();
        e.preventDefault();
        document.getElementById('group__name').classList.remove('form__group-correct');
        
        fields.name = false; //Validacion para que al apretar restart y luego ingresar de nuevo el formulario no te deje mandarlo de una

        //----- Codigo simon.js -----
        if (!started) {
            sectionForm.classList.add('hide');
            document.getElementById("level-title").textContent = "Level " + level;
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
        }
        
    } else {
        e.preventDefault(); //evita que haga la funcion degault de submit
        document.getElementById(`group__name`).classList.add('form__group-incorrect');
        document.getElementById(`group__name`).classList.remove('form__group-correct');
        document.querySelector(`#group__name .form__input-error`).classList.add('form__input-error-active');
    }
});