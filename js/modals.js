// var form = document.getElementById('formClass');
// var inputs = document.querySelectorAll('#formClass input');

// var expressions = {
//     name: /^[a-zA-Z0-9]{1,}$/,
// }

// var fields = {
//     name: false,
// }

// function validateForm(e) {
// 	switch (e.target.name) {
//         case "name":
//             validateField(expressions.name, e.target, 'name');
//             break;
//     }
// }

// function validateField(expression, input, field) {
//     if(expression.test(input.value)) {
//         document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
//         document.getElementById(`group__${field}`).classList.add('form__group-correct');
//         document.querySelector(`#group__${field} .form__input-error`).classList.remove('form__input-error-active');
//         fields[field] = true;
//     } else {
//         document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
//         document.getElementById(`group__${field}`).classList.remove('form__group-correct');
//         document.querySelector(`#group__${field} .form__input-error`).classList.add('form__input-error-active');
//         fields[field] = false;
//     }
// }1

// inputs.forEach(function(input) {
//     input.addEventListener('keyup', validateForm);
//     input.addEventListener('blur', validateForm);
// });

// var buttonSend = document.getElementById('buttonSend');

// buttonSend.addEventListener('click', function(e) {
//     if (fields.name) {
//         form.reset();
//         setTimeout(() => {
//             document.getElementById('group__name').classList.remove('form__group-correct');
// 		}, 1000);

//         document.getElementById('form__message').classList.remove('form__message-active');
//     } else {
//         e.preventDefault(); //evita que haga la funcion degault de submit
//     }
// });