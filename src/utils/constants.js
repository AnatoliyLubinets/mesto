
export const elementsTemplate = "#elements-template";
export const profile = document.querySelector(".profile");
export const formEditProfile = document.querySelector(".popup__submit-form");
export const formAddCard = document.querySelector(".add-popup__submit-form");
export const addNameInput = document.querySelector(".add-popup__input_description_name");
export const addLink = document.querySelector(".add-popup__input_description_link");
export const buttonOpenAddCardPopup = profile.querySelector(".profile__add-button");
export const buttonOpenEditProfilePopup = profile.querySelector(".profile__edit-button");
export const buttonOpenEditAvatarPopup = document.querySelector(".profile__avatar-button");
export const formEditAvatar = document.querySelector(".avatar-popup__submit-form");
export const confirmationPopupForm = document.querySelector(".confirmation-popup__submit-form");
export const openConfirmationPopupButtons = document.querySelector("#elements-template").content.querySelectorAll(".elements__delete");
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
