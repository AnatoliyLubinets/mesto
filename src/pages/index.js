import './../pages/index.css';
import photoCards from "./../utils/data.js";
import { FormValidator } from "./../components/FormValidator";
import { Card } from "./../components/Сard.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
import { PopupWithConfirmation } from "./../components/PopupWithConfirmation.js";
import { UserInfo } from './../components/UserInfo.js';
import { Section } from './../components/Section.js';
import { Api } from './../components/api.js';
import { elementsTemplate, buttonOpenEditAvatarPopup, formEditProfile, formAddCard, buttonOpenAddCardPopup, buttonOpenEditProfilePopup, formEditAvatar, openConfirmationPopupButtons } from './../utils/constants.js';

const api = new Api()

Promise.all([api.getCards(), api.getUserInfo()])


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
const avatarFormPopupValidator = new FormValidator(validationConfig, formEditAvatar)

//обращение к экземплярам валидации форм
profileFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarFormPopupValidator.enableValidation()



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

const handleAddSubmitForm = function (evt, values) {
  evt.preventDefault();
  cardList.addItem(createCard(values));
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

const handleAvatarFormSubmit = function (evt, values) {
  evt.preventDefault();
  if (values) {
    avatarFormPopup.close();
  }
}

//"Экземпляр попапа подтверждения"
const confirmationPopup = new PopupWithConfirmation('.confirmation-popup');
confirmationPopup.setEventListeners();

//Экземпляр попапа редактирования аватара
const avatarFormPopup = new PopupWithForm('.avatar-popup', handleAvatarFormSubmit);
avatarFormPopup.setEventListeners();

//Экземпляр попапа добавления карточки
const addCardPopup = new PopupWithForm ('.add-popup', handleAddSubmitForm);
addCardPopup.setEventListeners();


//Экземпляр попапа с формай редактирования профиля
const profileFormPopup = new PopupWithForm ('.profile-popup', handleProfileFormSubmit);
profileFormPopup.setEventListeners();

//Слушатели событий

//Открытие попапа подтверждения удаления карточки
openConfirmationPopupButtons.forEach((item) => {
  item.addEventListener("click", confirmationPopup.open());
});


//слушатель клика для отключени кнопки сабмита и сброс ошибок при открытии модалки карточки
buttonOpenAddCardPopup.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.resetInputError();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  profileFormPopup.setFormvalues({ name, info })
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetInputError();
  profileFormPopup.open();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки аватара
buttonOpenEditAvatarPopup.addEventListener("click", () => {
  avatarFormPopup.open();
  avatarFormPopupValidator.toggleButtonState();
  avatarFormPopupValidator.resetInputError();
});
