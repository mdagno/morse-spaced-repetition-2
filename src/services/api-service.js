import config from '../config';
import TokenService from './token-service';
import AuthService from './auth-api-service';

const ApiService = {
  getUser() {
    return fetch(`${config.API_ENDPOINT}/user`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserDetails() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getLanguageHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postGuess(guess) {
      return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(guess),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
}

export default ApiService;
