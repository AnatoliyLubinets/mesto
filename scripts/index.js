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
const buttonOpenAddCardPopup = profile.querySelector(".profile__add-button");
const buttonOpenEditProfilePopup = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const aboutMe = profile.querySelector(".profile__about-me");
const сloseButtons = document.querySelectorAll(".popup__close-button");

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

const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    closePopup();
  }
}


//Закрытие попапа по оверлею
const closePopupClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup();
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
  const popup = document.querySelector(".popup_opened");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown',  closePopupByEsc);
  popup.removeEventListener('click', closePopupClickOnOverlay);
};

сloseButtons.forEach((item) => {
  item.addEventListener("click", closePopup);
});

//Отправка формы и сзодние карточки

const handleAddSubmitForm = function (evt) {
  evt.preventDefault();
  elementsList.prepend(createCard({ name: addNameInput.value, link: addLink.value }));
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


//Слушатели событий

//слушатель клика для отключени кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenAddCardPopup.addEventListener("click", () => {
  openPopup(addPopup)
  addCardFormValidator.disableSubmitButton();
  addCardFormValidator.resetInputError();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  profileFormValidator.disableSubmitButton();
  profileFormValidator.resetInputError();
});



const createCard = (item) => {
  const cardElement = new Card(item, elementsTemplate, openPopup)
    return cardElement.createElement();
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddSubmitForm);

photoCards.forEach((item) => {
  elementsList.prepend(createCard(item));
});
