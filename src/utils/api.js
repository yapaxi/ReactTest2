import fetch from 'isomorphic-fetch'

class Api {

  async request(href, fetchOptions = {}) {
    const response = await fetch(href, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 0c1ceab18f0440c2b86ef035b0cb1d2c',
      },
      ...fetchOptions,
    })

    let result = null

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      result = await response.json()
    }

    const { status, statusText } = response
    if (status >= 400) {
      return Promise.reject({ status, statusText, data: result })
    }

    return result
  }

  get(href, options) {
    return this.request(href, {
      method: 'GET',
      options: { ...options },
    })
  }

}

export const api = new Api()
