//Обьявим переменные

const editForm = document.querySelector('.edit-form');
const profile = document.querySelector('.profile');

const closeButton = editForm.querySelector('.edit-form__close-button');
const submitButton = editForm.querySelector('.edit-form__submit-button');
let nameInput = editForm.querySelector('.edit-form__input_name');
let aboutMeInput = editForm.querySelector('.edit-form__input_about-me');

const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let aboutMe = profile.querySelector('.profile__about-me');

//Открытие формы

const openEditForm = function() {
  editForm.classList.add('edit-form_opened');
}

//Закрытие формы

const closeEditForm = function() {
  editForm.classList.remove('edit-form_opened');
}

//Закрытие формы по клику не в форме

const closeEditFormByClickOnOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.taget === event.currentTarget) {
    closeEditForm();
  }
}

//Перезапись имени и профессии, закрытие формы

const SubmitForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closeEditForm();
}

//Слушатели событий

editForm.addEventListener('submit', SubmitForm);
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
editForm.addEventListener('click', closeEditFormByClickOnOverlay);
