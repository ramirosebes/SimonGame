var form = document.getElementById('formClass');
var inputs = document.querySelectorAll('#formClass input');
var textarea = document.querySelector('#inputTextarea')

var expressions = {
    name: /^[a-zA-Z0-9]{1,}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    textarea: /.{5,}/,
}

var fields = {
    name: false,
    email: false,
    textarea: false,
}

function validateForm(e) {
	switch (e.target.name) {
        case "name":
            validateField(expressions.name, e.target, 'name');
            break;
        case "email":
            validateField(expressions.email, e.target, 'email');
            break;
        case "textarea":
            validateField(expressions.textarea, e.target, 'textarea');
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
}

inputs.forEach(function(input) {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

textarea.addEventListener('keyup', validateForm);
textarea.addEventListener('blur', validateForm);

// form.addEventListener('submit', function(e) {
//     e.preventDefault(); //evita que haga la funcion degault de submit

//     if (fields.name && fields.email && fields.textarea ) {
//         form.reset();

//         document.getElementById('form_message-successful').classList.add('form__message-successful-active');
//         setTimeout(() => {
// 			document.getElementById('form_message-successful').classList.remove('form__message-successful-active');
//             document.getElementById('group__name').classList.remove('form__group-correct');
//             document.getElementById('group__email').classList.remove('form__group-correct');
//             document.getElementById('group__textarea').classList.remove('form__group-correct');
// 		}, 3000);

//         document.getElementById('form__message').classList.remove('form__message-active')
//     } else {
//         document.getElementById('form__message').classList.add('form__message-active')
//     }
// });

var buttonSend = document.getElementById('buttonSend');

buttonSend.addEventListener('click', function(e) {
    if (fields.name && fields.email && fields.textarea ) {
        form.reset();

        document.getElementById('form_message-successful').classList.add('form__message-successful-active');
        setTimeout(() => {
			document.getElementById('form_message-successful').classList.remove('form__message-successful-active');
            document.getElementById('group__name').classList.remove('form__group-correct');
            document.getElementById('group__email').classList.remove('form__group-correct');
            document.getElementById('group__textarea').classList.remove('form__group-correct');
		}, 3000);

        document.getElementById('form__message').classList.remove('form__message-active');
    } else {
        e.preventDefault(); //evita que haga la funcion degault de submit
        document.getElementById('form__message').classList.add('form__message-active');
    }
});