
const checkInputValid = (input, selector) => {
  const error = document.querySelector(`#${(input.id)}-error`)
  if (input.validity.valid) {
    error.classList.add(selector.errorClass)
    input.classList.remove(selector.inputErrorClass)
  } else {
    error.textContent = input.validationMessage
    error.classList.remove(selector.errorClass)
    input.classList.add(selector.inputErrorClass)
  }
}

const disableBotton = (inputs, button, selector) => {
  const isFormValid = inputs.every(input => input.validity.valid)
  if (isFormValid) {
    button.classList.remove(selector.inactiveButtonClass)
    button.disabled = ''
  } else {
    button.classList.add(selector.inactiveButtonClass)
    button.disabled = 'disabled'
  }
}



const enableValidation = (selector) => {
  const {formSelector, inputSelector, submitButtonSelector, ...rest} = selector;
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const isFormValid = inputs.every(input => input.validity.valid)

        checkInputValid(input, rest)
        disableBotton(inputs, button, rest)
      });
    });
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

