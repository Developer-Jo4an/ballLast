import {convertCookie} from '../auth/auth';
import axios from 'axios';

const SERVER_URL = 'https://dummyjson.com/auth';

class Requester {
  async login(data) {
    const {username, password} = data;
    if (!username || !password) throw new Error('Invalid user data');

    const {data: userData} = await axios.post(
      `${SERVER_URL}/login`,
      data
    );
    return userData;
  }

  async loginUsingToken() {
    const {authtoken} = convertCookie();

    if (!authtoken) throw new Error('No authorization token');

    const {data: userData} = await axios.get(
      `${SERVER_URL}/me`,
      {headers: {Authorization: `Bearer ${authtoken}`}}
    );
    return userData;
  }
}

export default new Requester();
