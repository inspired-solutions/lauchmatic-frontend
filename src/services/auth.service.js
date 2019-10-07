import api from './api'

class AuthService {
  static async login(username, password) {
    try {
      const body = { username, password };
      return await api.post('/api/login/', body);
    } catch (error) {
      return error.response;
    }
  }

  async refreshToken(token) {

  }
}

export default AuthService;
