import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/v1',
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

instance.interceptors.request.use((config: any) => {
  return config
}, Promise.reject)

class ApiDTO {
  private instance: any = instance

  public async get(...args: any[]): Promise<any> {
    try {
      return await this.instance.get(...args)
    } catch (error) {
      throw error.response
    }
  }

  public async post(...args: any[]): Promise<any> {
    try {
      return await this.instance.post(...args)
    } catch (error) {
      throw error.response
    }
  }

  public async put(...args: any[]): Promise<any> {
    try {
      return await this.instance.put(...args)
    } catch (error) {
      throw error.response
    }
  }

  public async delete(...args: any[]): Promise<any> {
    try {
      return await this.instance.delete(...args)
    } catch (error) {
      throw error.response
    }
  }

  public getInstance(): any {
    return this.instance
  }
}

export default ApiDTO
