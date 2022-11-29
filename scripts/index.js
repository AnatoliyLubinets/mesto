import photoCards from './data.js'

const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__item');
const elementsList = document.querySelector('#elements-list');

const profile = document.querySelector('.profile');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');


const formOfSubmit = document.querySelector('.popup__submit-form');
const nameInput = document.querySelector('.popup__input_description_name');
const aboutMeInput = document.querySelector('.popup__input_description_about-me');
const сloseButton = document.querySelectorAll('.popup__close-button');

// const elementsImage = document.querySelectorAll('.elements__photo');
// const deleteElement = document.querySelectorAll('.elements__delete');
// const like = document.querySelectorAll('.elements__heart');

const addFormOfSubmit = document.querySelector('.add-popup__submit-form');
const addNameInput = document.querySelector('.add-popup__input_description_name');
const addLink = document.querySelector('.add-popup__input_description_link');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const aboutMe = profile.querySelector('.profile__about-me');



//Открытие попапа

const openPopup = function(evt, elm) {
  const popup = document.querySelector(elm);
  if (elm === '.profile-popup') {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = aboutMe.textContent;
  } else if (elm === '.image-popup') {
    imagePopupImg.src = evt.target.src;
    imagePopupTitle.textContent = evt.target.parentElement.querySelector('.elements__name').textContent;
  }
  popup.classList.add('popup_opened');
}

//Закрытие попапа

const closePopup = function() {
  const popup = document.querySelector('.popup.popup_opened');
  popup.classList.remove('popup_opened');
}

//Отправка формы
const handleAddSubmitForm = function(evt) {
  evt.preventDefault();
  elementsList.prepend(createElement({name: addNameInput.value, link: addLink.value}));
  addNameInput.value = '';
  addLink.value = '';
  closePopup();
}

const handleProfileFormSubmit = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
}

//Лайки карточек
const toggleLike = function(evt) {
  evt.target.classList.toggle('elements__heart_active');
}

//Удаление карточки
const deleteCard = function(evt) {
  evt.target.closest('.elements__item').remove();
}

//Слушатели событий
сloseButton.forEach(item => {
item.addEventListener('click', closePopup);
});

addButton.addEventListener('click',(e) => openPopup(e, '.add-popup') );
editButton.addEventListener('click', (e) => openPopup(e, '.profile-popup'));
formOfSubmit.addEventListener('submit', handleProfileFormSubmit);
addFormOfSubmit.addEventListener('submit', handleAddSubmitForm);



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
  const elmPhoto = elm.querySelector('.elements__photo');
  elmPhoto.src = item.link;
  elmPhoto.alt = item.name;
  const elmDeleteButton = elm.querySelector('.elements__delete');
  const elmLikeButton = elm.querySelector('.elements__heart');
  const elmСardImage  = elm.querySelector('.elements__photo');
  elmDeleteButton.addEventListener('click', deleteCard);
  elmСardImage.addEventListener('click', (e) => openPopup(e, '.image-popup'));
  elmLikeButton.addEventListener('click', toggleLike);

  return elm;
}
