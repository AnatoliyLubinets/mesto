import photoCards from './data.js'


const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__item');
const elementsList = document.querySelector('#elements-list');

const imagePopupCloseButton = document.querySelector('.image-popup__close-button');


// const elementsImage = document.querySelectorAll('.elements__photo');
// const deleteElement = document.querySelectorAll('.elements__delete');
// const like = document.querySelectorAll('.elements__heart');

const imagePopup = document.querySelector('.image-popup');
const addPopup = document.querySelector('.add-popup');
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const formOfSubmit = popup.querySelector('.popup__submit-form');
const closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_description_name');
let aboutMeInput = popup.querySelector('.popup__input_description_about-me');

const addFormOfSubmit = addPopup.querySelector('.add-popup__submit-form');
const addCloseButton = addPopup.querySelector('.add-popup__close-button');

let addNameInput = addPopup.querySelector('.add-popup__input_description_name');
let addLink = addPopup.querySelector('.add-popup__input_description_link');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let aboutMe = profile.querySelector('.profile__about-me');



//Открытие формы

const openImagePopup = function(evt) {
  imagePopup.querySelector('.image-popup__img').src = evt.target.src;
  imagePopup.querySelector('.image-popup__title').textContent = evt.target.parentElement.querySelector('.elements__name').textContent;
  imagePopup.classList.add('image-popup_opened');
}

const openAddPopup = function() {
addPopup.classList.add('add-popup_opened');
addNameInput.value = '';
addLink.value = '';
}

const openPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

//Закрытие формы

const closeImagePopup = function() {
  imagePopup.classList.remove('image-popup_opened');
}

const closeAddPopup = function() {
  addPopup.classList.remove('add-popup_opened');

}

const closePopup = function() {
  popup.classList.remove('popup_opened');

}

//Отправка формы
const addSubmitForm = function(evt) {
  evt.preventDefault();
  elementsList.prepend(createElement({name: addNameInput.value, link: addLink.value}));
  closeAddPopup();
}

const submitForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
}

//Лайки карточек

const likeHeart = function(evt) {
  evt.target.classList.toggle('elements__heart_active');
}

//Удаление карточки

const deleteCard = function(evt) {
  evt.target.closest('.elements__item').remove();
}



//Слушатели событий
imagePopupCloseButton.addEventListener('click', closeImagePopup);

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formOfSubmit.addEventListener('submit', submitForm);

addFormOfSubmit.addEventListener('submit', addSubmitForm);
addButton.addEventListener('click', openAddPopup);
addCloseButton.addEventListener('click', closeAddPopup);

// like.forEach(item =>
//   item.addEventListener('click', likeHeart));

// deleteElement.forEach(item =>
//   item.addEventListener('click', deleteCard));

// elementsImage.forEach(item =>
//   item.addEventListener('click', openImagePopup));

photoCards.forEach(item => {
  elementsList.prepend(createElement(item))
});

//Добавление карточки

function createElement(item) {
      const elm = elementsTemplate.cloneNode(true);

      elm.querySelector('.elements__name').textContent = item.name;
      elm.querySelector('.elements__photo').src = item.link;
      const elmDeleteButton = elm.querySelector('.elements__delete');
      const elmLikeButton = elm.querySelector('.elements__heart');
      const elmImagePopup = elm.querySelector('.elements__photo');
      elmDeleteButton.addEventListener('click', deleteCard);
      elmImagePopup.addEventListener('click', openImagePopup);
      elmLikeButton.addEventListener('click', likeHeart);

      return elm;


  }
