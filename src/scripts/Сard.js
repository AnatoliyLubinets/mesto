
export class Card {
  constructor(item, elementsTemplate, openPopup) {
    this._elementsTemplate = elementsTemplate
    this.item = item
    this._openPopup = openPopup
    this.imagePopup = document.querySelector(".image-popup");
    this.imagePopupImg = this.imagePopup.querySelector(".image-popup__img");
    this.imagePopupTitle = this.imagePopup.querySelector(".image-popup__title");

  }

  //лайк карточки
  _toggleLike =  (evt) => {
    evt.target.classList.toggle("elements__heart_active");
  };

  //удаление карточки
  _deleteCard = (evt) => {
    evt.target.closest(".elements__item").remove();
  };


  //Отрытие картинки попапа
  _handleClickImage = () => {
    this.imagePopupImg.src = this.item.link;
    this.imagePopupImg.alt = this.item.name;
    this.imagePopupTitle.textContent = this.item.name;
    this._openPopup(this.item.link, this.item.name);
    }

  //Получение темплейт элемента
  _getTemplateElement = () => {
  return document.querySelector(this._elementsTemplate)
  .content.querySelector(".elements__item");
  }

  //Слушатели событий
  _addEventListeners () {
  const elmDeleteButton = this._elm.querySelector(".elements__delete");
  const elmLikeButton = this._elm.querySelector(".elements__heart");
  elmDeleteButton.addEventListener("click", this._deleteCard);
  elmLikeButton.addEventListener("click", this._toggleLike);
  this._elmPhoto.addEventListener("click", () => this._handleClickImage());
  }

  //Создание карточки
  createElement() {
    const elementsTemplate = this._getTemplateElement();
    this._elm = elementsTemplate.cloneNode(true);
    this._elm.querySelector(".elements__name").textContent = this.item.name;
    this._elmPhoto = this._elm.querySelector(".elements__photo");
    this._elmPhoto.src = this.item.link;
    this._elmPhoto.alt = "Фото" + " " + this.item.name;
    this._addEventListeners()
    return this._elm;
  }

}
