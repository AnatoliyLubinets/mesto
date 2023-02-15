import { addLink } from "../utils/constants"

export class Api {

  getInitialCards = () => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9'
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(err => {
      console.log(err)
    })
  }

  getProfileInfo = () => {
    return fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }

  profileEdit = (values) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        about: values.info
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }

  createNewCard = (values) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        link: values.link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }


  handleDeleteCard = (_id) => {
    return  fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ _id, {
      method: 'DELETE',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }

  handleLikeClick = (_id) => {
    return  fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ _id +'/likes', {
      method: 'PUT',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }

  handleDeleteLikeClick = (_id) => {
    return  fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ _id +'/likes', {
      method: 'DELETE',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
      },
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }

  handleChangeAvatar = (user) => {
    return  fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: user.link,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject())
  }
}
