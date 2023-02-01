import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupImg = this._popup.querySelector(".image-popup__img");
    this._imagePopupTitle = this._popup.querySelector(".image-popup__title");

  }
  open(src, title) {
    this._imagePopupImg.src = src;
    this._imagePopupTitle.textContent = title;
    this._imagePopupImg.alt = title;
    super.open();
  }
}
