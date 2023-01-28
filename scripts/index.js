import photoCards from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Сard.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

const elementsTemplate = "#elements-template";
const profile = document.querySelector(".profile");
const formEditProfile = document.querySelector(".popup__submit-form");
const formAddCard = document.querySelector(".add-popup__submit-form");
const addNameInput = document.querySelector(".add-popup__input_description_name");
const addLink = document.querySelector(".add-popup__input_description_link");
const buttonOpenAddCardPopup = profile.querySelector(".profile__add-button");
const buttonOpenEditProfilePopup = profile.querySelector(".profile__edit-button");


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

//Экземпляр попапа
const addCardPopup = new Popup ('.add-popup');
addCardPopup.setEventListeners();


//Экземпляр попапа с картинкой
const popupWithImage = new PopupWithImage ('.image-popup');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__about-me'});

const createCard = (item) => {
  const cardElement = new Card(item, elementsTemplate, (src, link) => {popupWithImage.open(src, link)})
    return cardElement.createElement();
}

const cardList = new Section({
  items: photoCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
'#elements-list'
);

cardList.renderItems();

//Отправка формы и создание карточки

const handleAddSubmitForm = function (evt) {
  evt.preventDefault();
  cardList.addItem(createCard({ name: addNameInput.value, link: addLink.value }));
  addNameInput.value = "";
  addLink.value = "";
  addCardPopup.close();
};


//отправка формы профиля
const handleProfileFormSubmit = function (evt, values) {
  evt.preventDefault();
  if (values) {
    userInfo.setUserInfo(values.name, values.info);
    profileFormPopup.close();
  };
};

//Экземпляр попапа с формай редактирования профиля
const profileFormPopup = new PopupWithForm ('.profile-popup', handleProfileFormSubmit);
profileFormPopup.setEventListeners();

//Слушатели событий

//слушатель клика для отключени кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenAddCardPopup.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.disableSubmitButton();
  addCardFormValidator.resetInputError();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  profileFormPopup.setFormvalues({ name, info })
  profileFormValidator.disableSubmitButton();
  profileFormValidator.resetInputError();
  profileFormPopup.open();
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddSubmitForm);
