import axios from 'axios'

const SERVER_URL = 'https://dummyjson.com/auth'

class Requester {
  async login({ username, password }) {

  }

  async loginUsingToken() {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    const { authtoken } = document.cookie
    .split('; ')
    .reduce((acc, cookieItem) => {
      const [key, value] = cookieItem.split('=')
      return { ...acc, [key]: value }
    }, {})


    try {
      if (!authtoken) throw new Error('No auth token')

      const { data: userData } = await axios.get(
        `${ SERVER_URL }/me`,
        { headers: { Authorization: `Beare ${ authtoken }` } }
      )
      return userData
    } catch (e) {
      return e.message
    }

  }
}

export default new Requester()
