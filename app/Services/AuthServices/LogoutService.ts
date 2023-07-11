import DefaultResponse from '@ioc:Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class LogoutService {

  public async logout() {
    const ctx = await HttpContext.get()

    await ctx?.auth.logout()

    return await DefaultResponse.success('User successfully logged out', 200)
  }
}
