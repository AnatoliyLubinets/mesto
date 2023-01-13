export class FormValidator {
  constructor(selector, form) {
    this._form = form
    this._selector = selector
  }

  //Валидация формы

  enableValidation() {

    const inputs = Array.from(this._form.querySelectorAll(this._selector.inputSelector));
    const button = this._form.querySelector(this._selector.submitButtonSelector);
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })

      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValid(input)
          this._disableBotton(inputs, button)
        });
      });
  }

  //Проверяем валидность инпутов и показываем/прячем ошибку

  _checkInputValid = (input) => {
    const error = this._form.querySelector(`#${(input.id)}-error`)
    if (input.validity.valid) {
      error.classList.add(this._selector.errorClass)
      input.classList.remove(this._selector.inputErrorClass)
    } else {
      error.textContent = input.validationMessage
      error.classList.remove(this._selector.errorClass)
      input.classList.add(this._selector.inputErrorClass)
    }
  }

  //Проверяем инпуты на валидность и включаем/выключаем кнопку

  _disableBotton = (inputs, button) => {
    const isFormValid = inputs.every(input => input.validity.valid)
    if (isFormValid) {
      button.classList.remove(this._selector.inactiveButtonClass)
      button.disabled = ''
    } else {
      button.classList.add(this._selector.inactiveButtonClass)
      button.disabled = 'disabled'
    }
  }

  resetInputError() {
    const inputs = Array.from(this._form.querySelectorAll(this._selector.inputSelector));
    console.log(inputs);
      inputs.forEach(input => {
        const error = this._form.querySelector(`#${(input.id)}-error`)
        error.classList.remove(this._selector.errorClass)
        input.classList.remove(this._selector.inputErrorClass)
        error.textContent = " "
      });
  }
}
