//-------------------- Variables --------------------

var form = document.querySelector('#formID');
var inputs = document.querySelectorAll('#formID input');
var textarea = document.querySelector('#inputTextarea')
var buttonSend = document.querySelector('#buttonSend');

var expressions = {
    name: /^[a-zA-Z0-9]{1,}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    textarea: /.{5,}/,
};

var fields = {
    name: false,
    email: false,
    textarea: false,
};

//-------------------- Functions --------------------

function validateForm(e) {
	switch (e.target.name) {
        case "name":
            validateField(expressions.name, e.target, 'name', 'Name');
            break;
        case "email":
            validateField(expressions.email, e.target, 'email', 'Email');
            break;
        case "textarea":
            validateField(expressions.textarea, e.target, 'textarea', 'Textarea');
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

function handlerContactUsButtonSend(e) {
    if (fields.name && fields.email && fields.textarea ) {
        form.reset();
        fields.name = false;
        fields.email = false;
        fields.textarea = false
        document.querySelector('#formMessageSuccessfulID').classList.add('formMessageSuccessfulActive');
        setTimeout(() => {
            document.querySelector('#formMessageSuccessfulID').classList.remove('formMessageSuccessfulActive');
            document.querySelector('#groupName').classList.remove('formGroupCorrect');
            document.querySelector('#groupEmail').classList.remove('formGroupCorrect');
            document.querySelector('#groupTextarea').classList.remove('formGroupCorrect');
		}, 3000);
        document.querySelector('#formMessageID').classList.remove('formMessageActive');
    } else {
        e.preventDefault(); //evita que haga la funcion degault de submit
        document.querySelector('#formMessageID').classList.add('formMessageActive');
    }
};

//-------------------- EventsLiseners --------------------

inputs.forEach(function(input) {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

textarea.addEventListener('keyup', validateForm);
textarea.addEventListener('blur', validateForm);

buttonSend.addEventListener('click', handlerContactUsButtonSend);