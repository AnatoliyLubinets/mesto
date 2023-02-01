export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

 _handleEscClose = (evt) => {
    if(evt.key === "Escape") {
      this.close();
    };
  };

//Открытие попапа
    open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener('keydown', this._handleEscClose);
  };

  //Закрытие попапа
    close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener('keydown', this._handleEscClose);
  };

  //Слушатель закрытия попапа по оверлею или по клику на кнопку закрытия
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') ||
          evt.target.classList.contains('popup__close-button')) {
            this.close();
          };
    });
  };
}
