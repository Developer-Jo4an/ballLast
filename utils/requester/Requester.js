import axios from 'axios'

class Requester {
  async getTodos() {
    const { data: todos } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    return todos
  }
}

export default new Requester()
