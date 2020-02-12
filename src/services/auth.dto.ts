import ApiDto from './api.dto'

interface UserLogin {
  phone: string,
  password: string
}

class AuthDTO extends ApiDto {
  login(user: UserLogin) {
    try {
      return this.post('login', user)
    } catch (error) {
      throw error
    }
  }
}
