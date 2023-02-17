import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }


  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>
      this._handleSubmit(evt, this._id, this._elm)
    );
  }

  open(_elm, _id){
    super.open();
    this._id = _id;
    this._elm = _elm;
  }

}
