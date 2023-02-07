export class Api {

  getUserInfo = () => {
    fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9'
      }
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  getCards = () => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9'
      }
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  profileEdit = () => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '',
        about: ''
      })
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  createNewCard = () => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  numberLike = () => {

  }

  handleDeleteCard = (id) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/'+ id, {
      method: 'DELETE',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
      },
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  handleLikeClick = (id) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/likes'+ id, {
      method: 'PUT ',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  handleDeleteClick = (id) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards//likes'+ id, {
      method: 'DELETE',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
      },
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }

  handleChangeAvatar = () => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => res.json())
      console.log(res)
    .catch(console.log)
  }
}
