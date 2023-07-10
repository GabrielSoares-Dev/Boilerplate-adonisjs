import HttpContext from '@ioc:Adonis/Core/HttpContext'
import type { DefaultResponseInterface } from 'App/Interfaces/Utils/DefaultResponseInterface'

export default class DefaultResponse implements DefaultResponseInterface {
  private http: typeof HttpContext

  constructor(http: typeof HttpContext) {
    this.http = http
  }
  public async success(message: string, statusCode: number) {
    const ctx = await this.http.get()

    const response = {
      statusCode,
      message,
    }

    return await ctx?.response.status(statusCode).json(response)
  }
  public async successWithContent(message: string, statusCode: number, content: any) {
    const ctx = await this.http.get()

    const response = {
      statusCode,
      message,
      content,
    }

    return await ctx?.response.status(statusCode).json(response)
  }
}
