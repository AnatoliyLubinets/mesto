import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._button = this._form.querySelector('.popup__button');
  }

  _getInputValues(){
    const values = {}
    this._inputs.forEach(input => {
      const name = input.name
      const value = input.value
      values[name] = value
    });
    return values
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>
    this._handleSubmit(evt, this._getInputValues()));
  }
  close(){
    super.close();
    this._form.reset();
  }

  setFormValues(values){
    this._inputs.forEach(input => {
      const name = input.name
      if(values[name]) {
        input.value = values[name]
      }
    });
  };

  setSubmitButtonText(text) {
    this._button.textContent = text;
  }

}
