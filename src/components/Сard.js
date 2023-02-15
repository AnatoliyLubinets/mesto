export class Card {
  constructor(cards, userId, elementsTemplate, handleCardClick,
    handleLikeClick, handleDeleteClick, confirmationPopup) {
    this._elementsTemplate = elementsTemplate
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
    this._like = cards.likes
    this._id = cards._id
    this._name = cards.name
    this._link = cards.link
    this._autor = cards.owner
    this._userId = userId
    this._confirmationPopup = confirmationPopup
  }

  //лайк карточки
  toggleLike =  (evt) => {
    const isLiked = this._like.filter(item => item._id === this._userId).length > 0;
    this._handleLikeClick(this._id, isLiked).then((res) => {
      this._like = res.likes;
      evt.target.classList.toggle("elements__heart_active");
      this._elm.querySelector(".elements__number-of-like").textContent = this._like.length;
    })
  };

  //удаление карточки
  deleteCard = (evt) => {
    this._handleDeleteClick(this._id).then(() => {
      evt.target.closest(".elements__item").remove();
    })
  };


  //Отрытие картинки попапа
  _handleClickImage = () => {
    this._handleCardClick(this._link, this._name);
    }

  //Получение темплейт элемента
  _getTemplateElement = () => {
    return document.querySelector(this._elementsTemplate)
    .content.querySelector(".elements__item");
  }

  //Слушатели событий
  _addEventListeners () {
    const elmDeleteButton = this._elm.querySelector(".elements__delete");
    if (this._autor._id !== this._userId) {
      this._elm.querySelector(".elements__delete").remove();
    }
    const elmLikeButton = this._elm.querySelector(".elements__heart");
    // const confirmationSubmitButton = document.querySelector(".popup__button")
    elmDeleteButton.addEventListener("click", () => this._confirmationPopup());
    // confirmationSubmitButton.addEventListener("submit", this.deleteCard);
    // elmDeleteButton.addEventListener("click", this.deleteCard);
    elmLikeButton.addEventListener("click", this.toggleLike);
    this._elmPhoto.addEventListener("click", () => this._handleClickImage());
  }

  //Создание карточки
  createElement() {
    const elementsTemplate = this._getTemplateElement();
    this._elm = elementsTemplate.cloneNode(true);
    this._elm.querySelector(".elements__name").textContent = this._name;
    this._elmPhoto = this._elm.querySelector(".elements__photo");
    this._elmPhoto.src = this._link;
    this._elmPhoto.alt = "Фото" + " " + this._name;
    this._elm.querySelector(".elements__number-of-like").textContent = this._like.length;
    const isLiked = this._like.filter(item => item._id === this._userId).length > 0;
    if (isLiked) {
      this._elm.querySelector(".elements__heart").classList.add("elements__heart_active");
    }
    this._addEventListeners();
    return this._elm;
  }

}
