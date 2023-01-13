import photoCards from "./data.js";
import { FormValidator } from './FormValidator.js'
import { Card } from './card.js'

const elementsTemplate = "#elements-template";
const elementsList = document.querySelector("#elements-list");
const profile = document.querySelector(".profile");
const addPopup = document.querySelector(".add-popup");
const profilePopup = document.querySelector(".profile-popup");
const сloseButtons = document.querySelectorAll(".popup__close-button");
const formOfSubmit = document.querySelector(".popup__submit-form");
const nameInput = document.querySelector(".popup__input_description_name");
const aboutMeInput = document.querySelector(".popup__input_description_about-me");
const addFormOfSubmit = document.querySelector(".add-popup__submit-form");
const addNameInput = document.querySelector(".add-popup__input_description_name");
const addLink = document.querySelector(".add-popup__input_description_link");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const aboutMe = profile.querySelector(".profile__about-me");
const submitButton = addPopup.querySelector(".popup__button");


const selector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Обьявление экземпляров валидации
const addCardFormValidator = new FormValidator(selector, addFormOfSubmit)
const profileFormValidator = new FormValidator(selector, formOfSubmit)

//обращение к экземплярам валидации форм
profileFormValidator.enableValidation()
addCardFormValidator.enableValidation()


//Закрытие попапа на ESC

const closePopupByEsc = (evt, popup) => {
  if(evt.key === 'Escape') {
    closePopup(popup);
  }
}

//Закрытие попапа по оверлею
const closePopupClickOnOverlay = (evt, popup) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

//Открытие попапа

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupClickOnOverlay);
};

//Закрытие попапа

const closePopup = function () {
  const popup = document.querySelector(".popup.popup_opened");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc)
  popup.removeEventListener('click', closePopupClickOnOverlay);
};


//Отправка формы и сзодние карточки

const handleAddSubmitForm = function (evt) {
  evt.preventDefault();
  const cardElement = new Card({ name: addNameInput.value, link: addLink.value }, elementsTemplate, openPopup)
  elementsList.prepend(cardElement.createElement());
  addNameInput.value = "";
  addLink.value = "";
  closePopup();
};


//отправка формы профиля
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
};

  // //Лайки карточек

  // const toggleLike = function (evt) {
  //   evt.target.classList.toggle("elements__heart_active");
  // };

  // //Удаление карточки

  // const deleteCard = function (evt) {
  //   evt.target.closest(".elements__item").remove();
  // };

//Слушатели событий

сloseButtons.forEach((item) => {
  item.addEventListener("click", closePopup);
});

addButton.addEventListener("click", () => {
  openPopup(addPopup)
  if (submitButton.disabled !== 'disabled', submitButton.classList !== 'popup__submit-button_disabled') {
    submitButton.disabled = 'disabled'
    submitButton.classList.add("popup__submit-button_disabled")
  }
  profileFormValidator.resetInputError();
  addCardFormValidator.resetInputError();
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  profileFormValidator.resetInputError();
  addCardFormValidator.resetInputError();
});

formOfSubmit.addEventListener("submit", handleProfileFormSubmit);
addFormOfSubmit.addEventListener("submit", handleAddSubmitForm);

photoCards.forEach((item) => {
  const cardElement = new Card(item, elementsTemplate, openPopup)
  elementsList.prepend(cardElement.createElement());
});

//Добавление карточки

// function createElement(item, evt) {
//   const elm = elementsTemplate.cloneNode(true);
//   elm.querySelector(".elements__name").textContent = item.name;
//   const elmPhoto = elm.querySelector(".elements__photo");
//   elmPhoto.src = item.link;
//   elmPhoto.alt = "Фото" + " " + item.name;
//   const elmDeleteButton = elm.querySelector(".elements__delete");
//   const elmLikeButton = elm.querySelector(".elements__heart");
//   elmDeleteButton.addEventListener("click", deleteCard);

//   elmPhoto.addEventListener("click", (e) => {
//     openPopup(imagePopup);
//     imagePopupImg.src = item.link;
//     imagePopupImg.alt = "Фото" + " " + item.name;
//     imagePopupTitle.textContent = item.name;
//   });

//   elmLikeButton.addEventListener("click", toggleLike);

//   return elm;
// }
