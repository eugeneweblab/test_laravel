import axios from 'axios'

class UserAPI {
  constructor () {
    let baseURL = 'http://localhost:8000'
    
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
  setAuthToken (token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${ token }`
    }
    else {
      delete this.api.defaults.headers.common['Authorization']
    }
  }
  
  async login (email, password) {
    const response = await this.api.post('/login', { email, password })
    return response.data
  }
  
  async getUsers (perPage = 10, page = 1) {
    const response = await this.api.get(`/users?per_page=${ perPage }&page=${ page }`)
    return response.data
  }
  
  async updateUser (id, data) {
    const response = await this.api.put(`/users/${ id }`, data)
    return response.data
  }
  
  async register (name, email, password, role = 'regular') {
    const response = await this.api.post('/register', {
      name,
      email,
      password,
      role
    })
    return response.data
  }
  
  async deleteUser (id) {
    const response = await this.api.delete(`/users/${ id }`)
    return response.data
  }
  
  async logout () {
    const response = await this.api.post('/logout')
    return response.data
  }
}

export default UserAPI