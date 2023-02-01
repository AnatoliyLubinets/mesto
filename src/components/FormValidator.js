export class FormValidator {
  constructor(validationConfig, form) {
    this._form = form
    this._validationConfig = validationConfig
    this._inputs = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this.submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

  //Валидация формы

  enableValidation() {
    this._addEventListeners()

  }

  //Слушатели событий
  _addEventListeners () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValid(input)
        this.toggleButtonState(this._inputs, this._button)
      });
    });
  }

  //Проверяем валидность инпутов и показываем/прячем ошибку

  _checkInputValid = (input) => {
    const error = this._form.querySelector(`#${(input.id)}-error`)
    if (input.validity.valid) {
      error.classList.add(this._validationConfig.errorClass)
      input.classList.remove(this._validationConfig.inputErrorClass)
    } else {
      error.textContent = input.validationMessage
      error.classList.remove(this._validationConfig.errorClass)
      input.classList.add(this._validationConfig.inputErrorClass)
    }
  }

  //Проверяем инпуты на валидность и включаем/выключаем кнопку

  toggleButtonState = () => {
    const isFormValid = this._inputs.every(input => input.validity.valid)
    if (isFormValid) {
      this.submitButton.classList.remove(this._validationConfig.inactiveButtonClass)
      this.submitButton.disabled = ''
    } else {
      this.submitButton.classList.add(this._validationConfig.inactiveButtonClass)
      this.submitButton.disabled = 'disabled'
    }
  }

    //сброс ошибок инпутов
  resetInputError() {
      this._inputs.forEach(input => {
        const error = this._form.querySelector(`#${(input.id)}-error`)
        error.classList.remove(this._validationConfig.errorClass)
        input.classList.remove(this._validationConfig.inputErrorClass)
        error.textContent = " "
      });
  }

}
