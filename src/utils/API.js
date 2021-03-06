class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUserInfo = (partOfUrl) => {
    return fetch(`${this.url}${partOfUrl}`, {
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  getInitialCards = (partOfUrl) => {
    return fetch(`${this.url}${partOfUrl}`, {
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  editUserInfo = (partOfUrl, name, about) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkStatus(res));
  };

  addNewCard = (partOfUrl, name, link) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkStatus(res));
  };

  likeCard = (partOfUrl, cardId) => {
    return fetch(`${this.url}${partOfUrl}/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  deleteCard = (partOfUrl, cardId) => {
    return fetch(`${this.url}${partOfUrl}/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._checkStatus(res));
  };

  changeLikeCardStatus = (partOfUrl, cardId, status) => {
    return status
      ? this.likeCard(partOfUrl, cardId)
      : this.deleteCard(partOfUrl, cardId);
  };

  updateAvatar = (partOfUrl, avatar) => {
    return fetch(`${this.url}${partOfUrl}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkStatus(res));
  };

  _checkStatus = (res) => {
    if (!res.ok) {
      console.log(res);
      return Promise.reject(res.status);
    } else {
      return res.json();
    }
  };
}

const config = {
  url: "http://nomoreparties.co/cohort11/",
  headers: {
    authorization: "9fac4592-874a-4417-87e6-37c86c526c4e",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);
export default api;
