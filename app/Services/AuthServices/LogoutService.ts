import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class LogoutService {
  constructor(
    private readonly httpContext: typeof HttpContext,
    private readonly defaultResponse: DefaultResponse
  ) {
    this.httpContext = httpContext
    this.defaultResponse = defaultResponse
  }
  public async logout() {
    const ctx = await this.httpContext.get()

    await ctx?.auth.logout()

    return await this.defaultResponse.success('User successfully logged out', 200)
  }
}
