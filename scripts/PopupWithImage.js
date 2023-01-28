import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{

  open(src, title) {
    const imagePopupImg = this._popup.querySelector(".image-popup__img");
    const imagePopupTitle = this._popup.querySelector(".image-popup__title");
    imagePopupImg.src = src;
    imagePopupTitle.textContent = title;
    imagePopupImg.alt = title;
    super.open();
  }
}
