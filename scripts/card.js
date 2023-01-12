export class Card {
  constructor(data, elementsTemplate, handleClickImage) {
    this._elementsTemplate = elementsTemplate
    this._data = data
    this._handleClickImage = handleClickImage
  }

  //лайк карточки
  _toggleLike =  (evt) => {
    evt.target.classList.toggle("elements__heart_active");
  };

  //удаление карточки
  _deleteCard = (evt) => {
    evt.target.closest(".elements__item").remove();
  };

_getTemplateElement = () => {
  return document.querySelector(this._elementsTemplate)
  .content.querySelector(".elements__item");
}

_addEventListeners () {
  const elmDeleteButton = this._elm.querySelector(".elements__delete");
  const elmLikeButton = this._elm.querySelector(".elements__heart");
  elmDeleteButton.addEventListener("click", this._deleteCard);
  elmLikeButton.addEventListener("click", this._toggleLike);
  this._elmPhoto.addEventListener("click", () => this._handleClickImage(this._data.name, this._data.link));
}

  createElement() {
    const elementsTemplate = this._getTemplateElement();
    this._elm = elementsTemplate.cloneNode(true);
    this._elm.querySelector(".elements__name").textContent = this._data.name;
    this._elmPhoto = this._elm.querySelector(".elements__photo");
    this._elmPhoto.src = this._data.link;
    this._elmPhoto.alt = "Фото" + " " + this._data.name;
    this._addEventListeners()
    return this._elm;
  }

}
