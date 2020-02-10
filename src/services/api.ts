import axios from 'axios'

export class ApiService {
  private instance: any

  constructor() {
    this.instance = axios
  }

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

export default new ApiService()
