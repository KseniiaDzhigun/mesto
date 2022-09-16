export class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  getInitialUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialData() {
    return Promise.all([this.getInitialUserInfo(), this.getInitialCards()]);
  }


  editUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  likeCard(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  removeLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  changeAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  }


