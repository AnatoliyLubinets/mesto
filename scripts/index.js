import photoCards from "./data.js";
import { FormValidator } from './FormValidator.js'
import { Card } from './Сard.js'

const elementsTemplate = "#elements-template";
const elementsList = document.querySelector("#elements-list");
const profile = document.querySelector(".profile");
const addPopup = document.querySelector(".add-popup");
const profilePopup = document.querySelector(".profile-popup");
const formEditProfile = document.querySelector(".popup__submit-form");
const nameInput = document.querySelector(".popup__input_description_name");
const aboutMeInput = document.querySelector(".popup__input_description_about-me");
const formAddCard = document.querySelector(".add-popup__submit-form");
const addNameInput = document.querySelector(".add-popup__input_description_name");
const addLink = document.querySelector(".add-popup__input_description_link");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const aboutMe = profile.querySelector(".profile__about-me");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Обьявление экземпляров валидации
const addCardFormValidator = new FormValidator(validationConfig, formAddCard)
const profileFormValidator = new FormValidator(validationConfig, formEditProfile)

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
  const сloseButton = popup.querySelector(".popup__close-button");
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', evt => closePopupByEsc(evt, popup));
  popup.addEventListener('click', evt => closePopupClickOnOverlay(evt, popup));
  сloseButton.addEventListener('click', () => closePopup(popup));
};

//Закрытие попапа

const closePopup = function (popup) {
  const сloseButton = popup.querySelector(".popup__close-button");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', evt => closePopupByEsc(evt, popup));
  popup.removeEventListener('click', evt => closePopupClickOnOverlay(evt, popup));
  сloseButton.removeEventListener('click', () => closePopup(popup));
};


//Отправка формы и сзодние карточки

const handleAddSubmitForm = function (evt) {
  evt.preventDefault();
  const cardElement = new Card({ name: addNameInput.value, link: addLink.value }, elementsTemplate, openPopup)
  elementsList.prepend(cardElement.createElement());
  addNameInput.value = "";
  addLink.value = "";
  closePopup(addPopup);
};


//отправка формы профиля
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup(profilePopup);
};


//Слушатели событий

addButton.addEventListener("click", () => {
  openPopup(addPopup)
  addCardFormValidator.disableSubmitButton();
  addCardFormValidator.resetInputError();
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  profileFormValidator.disableSubmitButton();
  profileFormValidator.resetInputError();
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddSubmitForm);

photoCards.forEach((item) => {
  const cardElement = new Card(item, elementsTemplate, openPopup)
  elementsList.prepend(cardElement.createElement());
});
